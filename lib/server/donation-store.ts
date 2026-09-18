type DonationRecord = {
  internalReference: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amountPaise: number;
  currency?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  purpose?: string;
  status: string;
  verifiedAt?: string;
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export function donationStoreConfigured() {
  return Boolean(config());
}

async function rest(path: string, init: RequestInit) {
  const cfg = config();
  if (!cfg) throw new Error("Donation persistence is not configured");
  const response = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  return response;
}

export async function insertDonation(record: DonationRecord) {
  if (!config()) return false;
  const response = await rest("donations", {
    method: "POST",
    body: JSON.stringify({
      internal_reference: record.internalReference,
      razorpay_order_id: record.razorpayOrderId,
      razorpay_payment_id: record.razorpayPaymentId,
      amount_paise: record.amountPaise,
      currency: record.currency || "INR",
      donor_name: record.donorName,
      donor_email: record.donorEmail,
      donor_phone: record.donorPhone || null,
      purpose: record.purpose || null,
      status: record.status,
      verified_at: record.verifiedAt || null,
    }),
  });
  if (!response.ok) throw new Error(`Donation database insert failed: ${await response.text()}`);
  return true;
}

export async function updateDonationByOrder(orderId: string, patch: Partial<DonationRecord>) {
  if (!config()) return false;
  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.razorpayPaymentId) payload.razorpay_payment_id = patch.razorpayPaymentId;
  if (patch.status) payload.status = patch.status;
  if (patch.verifiedAt) payload.verified_at = patch.verifiedAt;
  const response = await rest(`donations?razorpay_order_id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Donation database update failed: ${await response.text()}`);
  return true;
}

export async function recordWebhookEvent(eventId: string, eventType: string, payload: unknown) {
  if (!config()) return { stored: false, duplicate: false };
  const response = await rest("razorpay_webhook_events", {
    method: "POST",
    body: JSON.stringify({ event_id: eventId, event_type: eventType, payload }),
  });
  if (response.status === 409) return { stored: true, duplicate: true };
  if (!response.ok) throw new Error(`Webhook event insert failed: ${await response.text()}`);
  return { stored: true, duplicate: false };
}
