import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createRazorpayOrder, razorpayKeyId } from "@/lib/server/razorpay";
import { donationStoreConfigured, insertDonation } from "@/lib/server/donation-store";
import { allowRequest, cleanText, getClientIp, validEmail, validPhone } from "@/lib/server/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!allowRequest(`donation:${ip}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Too many donation attempts. Please try again shortly." }, { status: 429 });

    const body = (await request.json()) as Record<string, unknown>;
    const amount = Number(body.amount);
    const donorName = cleanText(body.name, 120);
    const donorEmail = cleanText(body.email, 160);
    const donorPhone = cleanText(body.phone, 30);
    const purpose = cleanText(body.purpose, 120) || "General healthcare support";

    const minDonation = Number(process.env.MIN_DONATION_INR || 100);
    const maxDonation = Number(process.env.MAX_DONATION_INR || 500000);
    if (!Number.isFinite(amount) || amount < minDonation || amount > maxDonation) return NextResponse.json({ error: `Donation amount must be between ₹${minDonation.toLocaleString("en-IN")} and ₹${maxDonation.toLocaleString("en-IN")}.` }, { status: 400 });
    if (donorName.length < 2) return NextResponse.json({ error: "Please enter the donor name." }, { status: 400 });
    if (!validEmail(donorEmail)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!validPhone(donorPhone)) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });

    const storeRequired = process.env.REQUIRE_DONATION_STORE !== "false";
    if (process.env.NODE_ENV === "production" && storeRequired && !donationStoreConfigured()) {
      return NextResponse.json({ error: "Live donations are not enabled until donation storage is configured." }, { status: 503 });
    }

    const amountPaise = Math.round(amount * 100);
    const internalReference = `SHF-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const order = await createRazorpayOrder({
      amountPaise,
      receipt: internalReference.slice(0, 40),
      notes: { donorName, donorEmail, purpose, internalReference },
    });

    await insertDonation({
      internalReference,
      razorpayOrderId: order.id,
      amountPaise,
      currency: order.currency || "INR",
      donorName,
      donorEmail,
      donorPhone,
      purpose,
      status: "created",
    });

    return NextResponse.json({
      keyId: razorpayKeyId(),
      orderId: order.id,
      amount: amountPaise,
      currency: order.currency || "INR",
      internalReference,
    });
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    const detail = process.env.NODE_ENV === "development" && error instanceof Error ? ` ${error.message}` : "";
    return NextResponse.json({ error: `Unable to start the donation right now.${detail}` }, { status: 503 });
  }
}
