"use client";

import { useState } from "react";

import { bankDetails } from "@/lib/site";
import {
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
  LoaderCircle,
  QrCode,
  ShieldCheck,
} from "lucide-react";
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

const presets = [500, 1100, 2500, 5100, 11000];

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function DonationExperience() {
  const [amount, setAmount] = useState(1100);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<
    "idle" | "working" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const enabled = process.env.NEXT_PUBLIC_RAZORPAY_ENABLED === "true";

  async function donate(formData: FormData) {
    setStatus("working");
    setMessage("");
    try {
      if (!enabled)
        throw new Error(
          "Online payment is not available through the website at this time.",
        );
      const finalAmount = custom ? Number(custom) : amount;
      if (!Number.isFinite(finalAmount) || finalAmount < 100)
        throw new Error(
          "Please enter a valid donation amount of at least ₹100.",
        );
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay)
        throw new Error(
          "Razorpay Checkout could not be loaded. Please try again.",
        );

      const donor = {
        amount: finalAmount,
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        purpose: String(
          formData.get("purpose") || "General healthcare support",
        ),
      };
      const createResponse = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(donor),
      });
      const order = (await createResponse.json()) as any;
      if (!createResponse.ok)
        throw new Error(order.error || "Unable to start donation.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "SAVIOR Healthcare Foundation",
        description: donor.purpose,
        order_id: order.orderId,
        prefill: { name: donor.name, email: donor.email, contact: donor.phone },
        theme: { color: "#0b8f80" },
        handler: async (response: any) => {
          const verifyResponse = await fetch("/api/donations/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(response),
          });
          const verified = (await verifyResponse.json()) as any;
          if (!verifyResponse.ok) {
            setStatus("error");
            setMessage(
              verified.error ||
                "Payment verification failed. Please contact the Foundation with your payment reference.",
            );
            return;
          }
          setStatus("success");
          setMessage(
            verified.paymentStatus === "captured"
              ? `Donation payment verified and captured. Payment reference: ${verified.paymentId}`
              : `Payment verified and authorised. Final capture status will also be reconciled through the secure payment webhook. Reference: ${verified.paymentId}`,
          );
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setMessage(
              "Payment window closed. No donation was marked as successful.",
            );
          },
        },
      });
      rzp.on("payment.failed", (response: any) => {
        setStatus("error");
        setMessage(
          response?.error?.description ||
            "Payment failed. Please try again or use bank transfer.",
        );
      });
      rzp.open();
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start the donation.",
      );
    }
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[1.05fr_.95fr]">
      <form action={donate} className="donation-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">Online donation</span>
            <h2 className="mt-4 editorial-serif text-3xl font-semibold tracking-[-.025em] text-[#0a2444]">
              Choose an amount
            </h2>
          </div>
          <HeartHandshake className="text-[#e24d47]" size={34} />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {presets.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => {
                setAmount(value);
                setCustom("");
              }}
              className={`amount-chip ${amount === value && !custom ? "amount-chip-active" : ""}`}
            >
              ₹{value.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <label className="form-label mt-4">
          Custom amount (₹)
          <input
            className="field"
            type="number"
            min="100"
            step="1"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Donor name <input className="field" name="name" required />
          </label>
          <label className="form-label">
            Email <input className="field" name="email" type="email" required />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Phone <input className="field" name="phone" inputMode="tel" />
          </label>
          <label className="form-label">
            Support area{" "}
            <select
              className="field"
              name="purpose"
              defaultValue="General healthcare support"
            >
              <option>General healthcare support</option>
              <option>Heart-care programmes</option>
              <option>Health camps</option>
              <option>Patient support</option>
              <option>Women & child health</option>
              <option>Disability support</option>
            </select>
          </label>
        </div>
        {/* <div className="mt-6 flex gap-3 rounded-2xl bg-[#edf7f4] p-4 text-sm leading-6 text-[#42675f]">
          <ShieldCheck className="mt-0.5 shrink-0 text-[#0b8f80]" size={20} />
          <span>
            Payment details are handled by Razorpay Checkout. This website does
            not store card, UPI PIN or banking credentials.
          </span>
        </div> */}
        {message ? (
          <div
            className={`form-status mt-4 ${status === "success" ? "form-status-success" : status === "error" ? "form-status-error" : ""}`}
          >
            {status === "success" ? (
              <CheckCircle2 size={18} />
            ) : status === "error" ? (
              <AlertCircle size={18} />
            ) : null}
            <span>{message}</span>
          </div>
        ) : null}
        <button
          type="submit"
          className="btn-primary mt-6"
          disabled={status === "working" || !enabled}
        >
          {status === "working" ? (
            <>
              <LoaderCircle size={17} className="animate-spin" /> Preparing…
            </>
          ) : enabled ? (
            <>Proceed securely</>
          ) : (
            <>Online payment unavailable</>
          )}
        </button>
      </form>

      <div className="donation-bank-panel">
        <div className="flex items-start justify-between gap-5">
          <div>
            <span className="eyebrow eyebrow-inverse">Bank Transfer</span>

            <h2 className="mt-5 editorial-serif text-3xl font-semibold tracking-[-.025em]">
              Direct bank transfer
            </h2>

            {/* <p className="mt-4 max-w-xl leading-7 text-white/65">
              Contributions can also be made directly to the Foundation’s
              designated bank account.
            </p> */}
          </div>

          <ShieldCheck size={30} className="shrink-0 text-[#8dd8cc]" />
        </div>

        <div className="grid gap-7">
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex aspect-square items-center w-[180px] h-[180px] justify-center rounded-2xl bg-white p-1">
              {bankDetails.qrImage ? (
                <img
                  src={bankDetails.qrImage}
                  alt="SAVIOR Healthcare Foundation donation QR code"
                  className="h-full w-full object-contain rounded-2xl"
                />
              ) : (
                <div className="grid h-full w-full place-items-center rounded-xl border-2 border-dashed border-[#b8c9c5] text-center text-[#6a7c79]">
                  <div>
                    <QrCode size={52} className="mx-auto" />
                    <span className="mt-3 block text-xs font-bold uppercase tracking-[.1em]">
                      QR Code
                    </span>

                    <span className="mt-1 block text-[10px]">
                      Replace with official QR
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-3 text-center text-[10px] leading-5 text-white/45">
              Scan the official QR code to make a UPI contribution.
            </p>
          </div>
          <dl className="grid">
            {[
              ["Account Holder", bankDetails.accountName],
              ["Bank", bankDetails.bankName],
              ["Account Number", bankDetails.accountNumber],
              //["Account Type", bankDetails.accountType],
              ["IFSC", bankDetails.ifsc],
              ["Branch", bankDetails.branch],
              ["UPI ID", bankDetails.upi],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[130px_1fr] gap-5 border-b border-white/10 py-3"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[.12em] text-white/40">
                  {label}
                </dt>

                <dd className="text-sm font-semibold text-white/85">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* <p className="mt-3 text-center text-[10px] leading-5 text-white/45">
          Scan the official QR code to make a UPI contribution.
        </p> */}
        {/* <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-white/48">
          Please retain your transaction reference for donation acknowledgement.
        </p> */}
      </div>
    </div>
  );
}
