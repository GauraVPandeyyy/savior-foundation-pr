import { NextResponse } from "next/server";
import { updateDonationByOrder } from "@/lib/server/donation-store";
import { fetchRazorpayOrder, fetchRazorpayPayment, verifyPaymentSignature } from "@/lib/server/razorpay";
import { cleanText } from "@/lib/server/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const orderId = cleanText(body.razorpay_order_id, 120);
    const paymentId = cleanText(body.razorpay_payment_id, 120);
    const signature = cleanText(body.razorpay_signature, 300);
    if (!orderId || !paymentId || !signature) return NextResponse.json({ error: "Incomplete payment verification data." }, { status: 400 });

    if (!verifyPaymentSignature(orderId, paymentId, signature)) {
      await updateDonationByOrder(orderId, { status: "verification_failed" });
      return NextResponse.json({ error: "Payment signature could not be verified." }, { status: 400 });
    }

    const [payment, order] = await Promise.all([fetchRazorpayPayment(paymentId), fetchRazorpayOrder(orderId)]);
    if (payment.order_id !== orderId || payment.currency !== "INR" || order.currency !== "INR" || payment.amount !== order.amount) {
      await updateDonationByOrder(orderId, { razorpayPaymentId: paymentId, status: "verification_failed" });
      return NextResponse.json({ error: "Payment details did not match the donation order." }, { status: 400 });
    }

    const accepted = payment.status === "captured" || payment.status === "authorized";
    if (!accepted) {
      await updateDonationByOrder(orderId, { razorpayPaymentId: paymentId, status: payment.status || "pending" });
      return NextResponse.json({ error: "Payment has not reached a verified payable state yet." }, { status: 409 });
    }

    const status = payment.status === "captured" || payment.captured ? "captured" : "authorized";
    await updateDonationByOrder(orderId, {
      razorpayPaymentId: paymentId,
      status,
      verifiedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, paymentId, paymentStatus: status });
  } catch (error) {
    console.error("Payment verification failed", error);
    const detail = process.env.NODE_ENV === "development" && error instanceof Error ? ` ${error.message}` : "";
    return NextResponse.json({ error: `Unable to verify payment right now.${detail}` }, { status: 503 });
  }
}
