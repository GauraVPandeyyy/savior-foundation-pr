import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/server/email";
import {
  allowRequest,
  cleanText,
  getClientIp,
  validEmail,
  validPhone,
  verifyTurnstile,
} from "@/lib/server/security";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "Contact",
  "Get Involved",
  "Patient Support",
  "Heart Patient Support",
]);

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!allowRequest(`form:${ip}`, 7, 10 * 60_000))
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 50_000)
      return NextResponse.json(
        { error: "Submission is too large." },
        { status: 413 },
      );

    const body = (await request.json()) as Record<string, unknown>;
    if (cleanText(body.website, 200)) return NextResponse.json({ ok: true });

    const type = cleanText(body.type, 80);
    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 160);
    const phone = cleanText(body.phone, 30);
    const city = cleanText(body.city, 120);
    const message = cleanText(body.message, 4000);
    const purpose = cleanText(body.purpose, 180);
    const medicalCondition = cleanText(body.medicalCondition, 1000);
    const supportRequired = cleanText(body.supportRequired, 500);
    const availability = cleanText(body.availability, 500);
    const profession = cleanText(body.profession, 300);
    const organisation = cleanText(body.organisation, 300);
    const proposedLocation = cleanText(body.proposedLocation, 300);
    const turnstileToken = cleanText(body.turnstileToken, 2500);

    if (!allowedTypes.has(type))
      return NextResponse.json(
        { error: "Invalid form type." },
        { status: 400 },
      );
    if (name.length < 2)
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 },
      );
    if (!email || !validEmail(email))
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    if (!validPhone(phone))
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 },
      );
    if (
      (type === "Patient Support" || type === "Heart Patient Support") &&
      medicalCondition.length < 3
    )
      return NextResponse.json(
        {
          error: "Please briefly describe the medical condition or diagnosis.",
        },
        { status: 400 },
      );
    if (message.length < 5 && !medicalCondition && !purpose)
      return NextResponse.json(
        { error: "Please add a little more information." },
        { status: 400 },
      );
    if (!(await verifyTurnstile(turnstileToken, ip)))
      return NextResponse.json(
        { error: "Spam protection verification failed." },
        { status: 400 },
      );

    const fields: Record<string, string> = {
      Name: name,
      Email: email,
      Phone: phone,
      "City / District": city,
      Purpose: purpose,
      Profession: profession,
      Organisation: organisation,
      Availability: availability,
      "Proposed location": proposedLocation,
      "Medical condition": medicalCondition,
      "Support required": supportRequired,
      Message: message,
      "Submitted from IP": ip === "unknown" ? "Not available" : ip,
    };

    await sendFormEmail({ type, fields });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Form submission failed", error);
    const detail =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? ` ${error.message}`
        : "";
    return NextResponse.json(
      { error: `Unable to submit the form right now.` },
      { status: 503 },
    );
  }
}
