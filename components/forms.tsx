"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";

export type FoundationFormType =
  | "Contact"
  | "Get Involved"
  | "Patient Support"
  | "Heart Patient Support";

type FieldConfig = {
  purpose?: boolean;
  engagement?: boolean;
  medical?: boolean;
  supportRequired?: boolean;
};

const configs: Record<FoundationFormType, FieldConfig> = {
  Contact: { purpose: true },
  "Get Involved": { engagement: true },
  "Patient Support": { medical: true, supportRequired: true },
  "Heart Patient Support": { medical: true, supportRequired: true },
};

export function FoundationForm({
  type,
  compact = false,
}: {
  type: FoundationFormType;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const config = configs[type];
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const patientForm =
    type === "Patient Support" || type === "Heart Patient Support";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          type,
          turnstileToken: data.get("cf-turnstile-response") || "",
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(result.error || "Unable to submit the form.");
      form.reset();
      setStatus("success");
      setMessage("Your enquiry has been sent to the Foundation team.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the form right now.",
      );
    }
  }

  return (
    <>
      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <form
        onSubmit={submit}
        className={`form-shell ${compact ? "form-shell-compact" : ""}`}
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Full name{" "}
            <input
              className="field"
              name="name"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Your name"
            />
          </label>
          <label className="form-label">
            Email{" "}
            <input
              className="field"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Phone{" "}
            <input
              className="field"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91"
            />
          </label>
          <label className="form-label">
            City / District{" "}
            <input
              className="field"
              name="city"
              autoComplete="address-level2"
              placeholder="Your location"
            />
          </label>
        </div>

        {config.purpose ? (
          <label className="form-label">
            Purpose
            <select className="field" name="purpose" defaultValue="" required>
              <option value="" disabled>
                Select a purpose
              </option>
              <option>General enquiry</option>
              <option>Patient support</option>
              <option>Heart care support</option>
              <option>Health camp</option>
              <option>Volunteering / partnership</option>
              <option>Donation</option>
            </select>
          </label>
        ) : null}

        {config.engagement ? (
          <>
            <label className="form-label">
              I would like to
              <select className="field" name="purpose" defaultValue="" required>
                <option value="" disabled>
                  Select
                </option>
                <option>Volunteer in community programmes</option>
                <option>Volunteer as a healthcare professional</option>
                <option>Discuss a hospital / institutional partnership</option>
                <option>Discuss a CSR partnership</option>
                <option>Host a health camp</option>
                <option>Support events / outreach</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                Professional background{" "}
                <input
                  className="field"
                  name="profession"
                  placeholder="Optional"
                />
              </label>
              <label className="form-label">
                Organisation / institution{" "}
                <input
                  className="field"
                  name="organisation"
                  placeholder="Optional"
                />
              </label>
            </div>
          </>
        ) : null}

        {config.medical ? (
          <label className="form-label">
            Medical condition / diagnosis{" "}
            <textarea
              className="field"
              rows={3}
              name="medicalCondition"
              required
              placeholder={
                type === "Heart Patient Support"
                  ? "Briefly describe the heart condition and current diagnosis"
                  : "Brief diagnosis / medical condition"
              }
            />
          </label>
        ) : null}
        {config.supportRequired ? (
          <label className="form-label">
            Support required{" "}
            <select
              className="field"
              name="supportRequired"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option>Heart-care guidance</option>
              <option>Cardiac screening / referral</option>
              <option>Treatment-support enquiry</option>
              <option>Diagnostic support</option>
              <option>Assistive-device support</option>
              <option>Other medical assistance</option>
            </select>
          </label>
        ) : null}
        <label className="form-label">
          Message{" "}
          <textarea
            className="field"
            rows={compact ? 4 : 5}
            name="message"
            placeholder="Please share the information that will help us understand your enquiry."
          />
        </label>
        {siteKey ? (
          <div className="cf-turnstile" data-sitekey={siteKey} />
        ) : null}
        {/* {patientForm ? (
          <p className="text-xs leading-5 text-[#718193]">
            For medical emergencies, contact the nearest appropriate emergency
            service or hospital. Patient-support requests are reviewed according
            to programme scope and available resources.
          </p>
        ) : null} */}
        {message ? (
          <div
            className={`form-status ${status === "success" ? "form-status-success" : "form-status-error"}`}
          >
            {status === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message}</span>
          </div>
        ) : null}
        <button
          className="btn-primary w-fit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle size={17} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={17} /> Submit
            </>
          )}
        </button>
      </form>
    </>
  );
}
