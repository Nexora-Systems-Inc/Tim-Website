import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  DEFAULT_INQUIRY_FROM,
  INQUIRY_INBOX,
  buildInquiryEmail,
  deliverInquiry,
  escapeHtml,
  validateInquiry,
} from "./inquiryMail.ts";

const sample = {
  name: "Tim Agostinucci",
  email: "tim@example.com",
  phone: "514-555-0100",
  subject: "Acquisition d'une œuvre",
  message: "Bonjour, je souhaite des renseignements sur cette toile.",
  artwork: "C-0008",
};

const previousEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  RESEND_API_URL: process.env.RESEND_API_URL,
};

afterEach(() => {
  for (const [key, value] of Object.entries(previousEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("inquiry mail", () => {
  it("rejects an incomplete inquiry", () => {
    const result = validateInquiry({ name: "Tim", email: "not-an-email", message: "" });
    assert.equal(result.ok, false);
  });

  it("keeps the artwork reference and visitor reply address", () => {
    const result = validateInquiry({
      ...sample,
      email: "Tim@Example.com",
      artwork: "C-0008",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.email, "tim@example.com");
    assert.equal(result.data.artwork, "C-0008");

    const email = buildInquiryEmail(result.data);
    assert.match(email.subject, /C-0008/);
    assert.match(email.text, /tim@example.com/);
    assert.match(email.html, /C-0008/);
    assert.equal(escapeHtml(`<b>`), "&lt;b&gt;");
  });

  it("drops an artwork value that is not a catalog reference", () => {
    const result = validateInquiry({ ...sample, artwork: "https://evil.example" });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.artwork, "");
  });

  it("sends only to Manon's inbox and treats a provider id as acceptance", async () => {
    const seen: { url?: string; body?: Record<string, unknown>; auth?: string } = {};
    const result = await deliverInquiry(sample, {
      apiKey: "re_test",
      from: DEFAULT_INQUIRY_FROM,
      endpoint: "https://resend.test/emails",
      fetch: async (url, init) => {
        seen.url = String(url);
        seen.auth = new Headers(init?.headers).get("Authorization") ?? "";
        seen.body = JSON.parse(String(init?.body));
        return new Response(JSON.stringify({ id: "email_accepted_123" }), { status: 200 });
      },
    });

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.id, "email_accepted_123");
    assert.equal(result.to, INQUIRY_INBOX);
    assert.equal(seen.url, "https://resend.test/emails");
    assert.equal(seen.auth, "Bearer re_test");
    assert.deepEqual(seen.body?.to, [INQUIRY_INBOX]);
    assert.equal(seen.body?.reply_to, sample.email);
    assert.equal(seen.body?.from, DEFAULT_INQUIRY_FROM);
    assert.match(String(seen.body?.text), /C-0008/);
  });

  it("does not treat a provider rejection as a successful send", async () => {
    const result = await deliverInquiry(sample, {
      apiKey: "re_test",
      from: DEFAULT_INQUIRY_FROM,
      endpoint: "https://resend.test/emails",
      fetch: async () =>
        new Response(JSON.stringify({ message: "The domain is not verified." }), {
          status: 403,
        }),
    });

    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.reason, "provider");
    assert.equal(result.status, 403);
    assert.match(result.providerMessage ?? "", /not verified/);
  });

  it("reports a missing API key before calling the provider", async () => {
    delete process.env.RESEND_API_KEY;
    let called = false;
    const result = await deliverInquiry(sample, {
      apiKey: "",
      from: DEFAULT_INQUIRY_FROM,
      fetch: async () => {
        called = true;
        return new Response("{}", { status: 200 });
      },
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.reason, "config");
    assert.equal(called, false);
  });
});
