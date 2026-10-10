/**
 * Server-side delivery for website inquiries.
 * The inbox is the address published on the site and confirmed in the project baseline.
 * It is not read from the environment, so a missing or unrelated env var cannot redirect mail.
 */

export const INQUIRY_INBOX = "info@mlalondeartistepeintre.ca";

/** Domain already verified for Resend (resend._domainkey.nexorasystems.ca). */
export const DEFAULT_INQUIRY_FROM =
  "M Lalonde Artiste Peintre <noreply@nexorasystems.ca>";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  subject: 120,
  message: 5000,
  artwork: 32,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ARTWORK_RE = /^[A-Za-z0-9-]{1,32}$/;

export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  artwork: string;
};

export function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateInquiry(
  body: unknown,
): { ok: true; data: InquiryInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const name = sanitizeText(raw.name, LIMITS.name);
  const email = sanitizeText(raw.email, LIMITS.email).toLowerCase();
  const phone = sanitizeText(raw.phone, LIMITS.phone);
  const subject = sanitizeText(raw.subject, LIMITS.subject);
  const message = sanitizeText(raw.message, LIMITS.message);
  const artworkRaw = sanitizeText(raw.artwork, LIMITS.artwork);
  const artwork = ARTWORK_RE.test(artworkRaw) ? artworkRaw : "";

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please check your details and try again." };
  }

  return { ok: true, data: { name, email, phone, subject, message, artwork } };
}

export function buildInquiryEmail(data: InquiryInput) {
  const subject = [
    "Demande — mlalondeartistepeintre.ca",
    data.subject,
    data.artwork ? `œuvre ${data.artwork}` : "",
  ]
    .filter(Boolean)
    .join(" — ")
    .slice(0, 180);

  const text = [
    "Nouvelle demande envoyée depuis le site mlalondeartistepeintre.ca",
    "",
    `Nom: ${data.name}`,
    `Courriel: ${data.email}`,
    `Téléphone: ${data.phone || "—"}`,
    `Objet: ${data.subject || "—"}`,
    `Œuvre: ${data.artwork || "—"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="margin: 0 0 16px;">Nouvelle demande envoyée depuis <strong>mlalondeartistepeintre.ca</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr><td style="padding: 6px 0; font-weight: bold; width: 110px;">Nom</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Courriel</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Téléphone</td><td style="padding: 6px 0;">${escapeHtml(data.phone || "—")}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Objet</td><td style="padding: 6px 0;">${escapeHtml(data.subject || "—")}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Œuvre</td><td style="padding: 6px 0;">${escapeHtml(data.artwork || "—")}</td></tr>
      </table>
      <p style="margin: 20px 0 8px; font-weight: bold;">Message</p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

export type DeliveryResult =
  | { ok: true; id: string; to: string }
  | {
      ok: false;
      reason: "config" | "provider" | "network";
      status?: number;
      providerMessage?: string;
    };

type DeliverOptions = {
  fetch?: typeof fetch;
  endpoint?: string;
  apiKey?: string;
  from?: string;
};

export function inquiryFromAddress() {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  return configured || DEFAULT_INQUIRY_FROM;
}

export async function deliverInquiry(
  data: InquiryInput,
  options: DeliverOptions = {},
): Promise<DeliveryResult> {
  const apiKey = (options.apiKey ?? process.env.RESEND_API_KEY ?? "").trim();
  const from = (options.from ?? inquiryFromAddress()).trim();
  if (!apiKey || !from) {
    return { ok: false, reason: "config" };
  }

  const endpoint = (
    options.endpoint ??
    process.env.RESEND_API_URL ??
    RESEND_ENDPOINT
  ).trim();
  const fetchImpl = options.fetch ?? fetch;
  const email = buildInquiryEmail(data);

  let response: Response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "M-Lalonde-Website/1.0",
      },
      body: JSON.stringify({
        from,
        to: [INQUIRY_INBOX],
        reply_to: data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });
  } catch (error) {
    return {
      ok: false,
      reason: "network",
      providerMessage: error instanceof Error ? error.message : "network error",
    };
  }

  const payload = (await response.json().catch(() => null)) as
    | { id?: unknown; message?: unknown; error?: { message?: unknown } }
    | null;
  const id = payload && typeof payload.id === "string" ? payload.id : "";
  if (!response.ok || !id) {
    const providerMessage =
      payload && typeof payload.message === "string"
        ? payload.message
        : payload?.error && typeof payload.error.message === "string"
          ? payload.error.message
          : `HTTP ${response.status}`;
    return {
      ok: false,
      reason: "provider",
      status: response.status,
      providerMessage,
    };
  }

  return { ok: true, id, to: INQUIRY_INBOX };
}
