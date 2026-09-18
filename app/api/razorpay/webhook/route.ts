import { NextResponse } from "next/server";
import { bodyHash } from "@/lib/server/security";
import { recordWebhookEvent, updateDonationByOrder } from "@/lib/server/donation-store";
import { verifyWebhookSignature } from "@/lib/server/razorpay";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const raw = await request.text();
  try {
    const signature = request.headers.get("x-razorpay-signature") || "";
    if (!verifyWebhookSignature(raw, signature)) return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });

    const payload = JSON.parse(raw) as any;
    const eventType = String(payload.event || "unknown");
    const eventId = request.headers.get("x-razorpay-event-id") || bodyHash(raw);
    const recorded = await recordWebhookEvent(eventId, eventType, payload);
    if (recorded.duplicate) return NextResponse.json({ ok: true, duplicate: true });

    const payment = payload?.payload?.payment?.entity;
    const order = payload?.payload?.order?.entity;
    const orderId = String(payment?.order_id || order?.id || "");
    if (orderId) {
      if (eventType === "payment.captured" || eventType === "order.paid") {
        await updateDonationByOrder(orderId, {
          razorpayPaymentId: payment?.id ? String(payment.id) : undefined,
          status: "captured",
          verifiedAt: new Date().toISOString(),
        });
      } else if (eventType === "payment.failed") {
        await updateDonationByOrder(orderId, { razorpayPaymentId: payment?.id ? String(payment.id) : undefined, status: "failed" });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Razorpay webhook failed", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
