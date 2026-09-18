import { createHmac, timingSafeEqual } from "crypto";

function required(name: "RAZORPAY_KEY_ID" | "RAZORPAY_KEY_SECRET" | "RAZORPAY_WEBHOOK_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function razorpayKeyId() {
  return required("RAZORPAY_KEY_ID");
}

export async function createRazorpayOrder(input: { amountPaise: number; receipt: string; notes?: Record<string, string> }) {
  const keyId = required("RAZORPAY_KEY_ID");
  const keySecret = required("RAZORPAY_KEY_SECRET");
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes || {},
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as { id?: string; amount?: number; currency?: string; status?: string; error?: { description?: string } };
  if (!response.ok || !data.id) throw new Error(data.error?.description || "Unable to create Razorpay order");
  return data as { id: string; amount: number; currency: string; status: string };
}

export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const secret = required("RAZORPAY_KEY_SECRET");
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature || "");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = required("RAZORPAY_WEBHOOK_SECRET");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature || "");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function fetchRazorpayPayment(paymentId: string) {
  const keyId = required("RAZORPAY_KEY_ID");
  const keySecret = required("RAZORPAY_KEY_SECRET");
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });
  const data = (await response.json()) as {
    id?: string;
    order_id?: string;
    amount?: number;
    currency?: string;
    status?: string;
    captured?: boolean;
    error?: { description?: string };
  };
  if (!response.ok || !data.id) throw new Error(data.error?.description || "Unable to confirm Razorpay payment status");
  return data as { id: string; order_id: string; amount: number; currency: string; status: string; captured: boolean };
}

export async function fetchRazorpayOrder(orderId: string) {
  const keyId = required("RAZORPAY_KEY_ID");
  const keySecret = required("RAZORPAY_KEY_SECRET");
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });
  const data = (await response.json()) as {
    id?: string;
    amount?: number;
    amount_paid?: number;
    currency?: string;
    status?: string;
    error?: { description?: string };
  };
  if (!response.ok || !data.id) throw new Error(data.error?.description || "Unable to confirm Razorpay order status");
  return data as { id: string; amount: number; amount_paid: number; currency: string; status: string };
}
