import nodemailer from "nodemailer";
import { escapeHtml } from "./security";

export type FormEmailPayload = {
  type: string;
  fields: Record<string, string>;
};

function getMailerConfig() {
  const user = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!user || !appPassword) {
    throw new Error(
      "Email delivery is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD.",
    );
  }

  return {
    user,
    appPassword,
  };
}

export async function sendFormEmail(payload: FormEmailPayload) {
  const { user, appPassword } = getMailerConfig();

  const destination =
    process.env.FORM_DESTINATION_EMAIL || "shiwendrakumarshuklarbl@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user,
      pass: appPassword,
    },
  });

  const rows = Object.entries(payload.fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) => `
        <tr>
          <td
            style="
              padding:10px 12px;
              border-bottom:1px solid #e8ecef;
              font-weight:700;
              vertical-align:top;
              width:180px;
            "
          >
            ${escapeHtml(key)}
          </td>

          <td
            style="
              padding:10px 12px;
              border-bottom:1px solid #e8ecef;
              white-space:pre-wrap;
            "
          >
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

  const html = `
    <div
      style="
        font-family:Arial,sans-serif;
        color:#0a2444;
        max-width:720px;
        margin:auto;
      "
    >
      <div
        style="
          border:1px solid #e1e8e6;
          border-radius:16px;
          overflow:hidden;
        "
      >
        <div
          style="
            background:#07172e;
            color:white;
            padding:20px 24px;
          "
        >
          <h2 style="margin:0;font-size:20px;">
            SAVIOR Healthcare Foundation
          </h2>

          <p
            style="
              margin:7px 0 0;
              color:rgba(255,255,255,.65);
              font-size:13px;
            "
          >
            New ${escapeHtml(payload.type)} website submission
          </p>
        </div>

        <table
          style="
            border-collapse:collapse;
            width:100%;
            font-size:14px;
            background:white;
          "
        >
          ${rows}
        </table>
      </div>

      <p
        style="
          color:#82909b;
          font-size:11px;
          margin-top:14px;
        "
      >
        This email was submitted through the SAVIOR Healthcare Foundation website.
      </p>
    </div>
  `;

  const text = Object.entries(payload.fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n\n");

  await transporter.sendMail({
    from: `"SAVIOR Healthcare Foundation Website" <${user}>`,

    to: destination,

    replyTo: payload.fields.Email || user,

    subject: `SAVIOR Website — ${payload.type}`,

    text,

    html,
  });
}
