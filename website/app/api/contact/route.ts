import { deliverInquiry, validateInquiry } from "@/lib/inquiryMail";

export const dynamic = "force-dynamic";

const CLIENT_ERROR = "Unable to send your message right now. Please try again shortly.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateInquiry(body);
  if (!validated.ok) {
    return Response.json({ success: false, error: validated.error }, { status: 400 });
  }

  const result = await deliverInquiry(validated.data);
  if (!result.ok) {
    if (result.reason !== "config") {
      console.error("[contact] delivery failed", {
        reason: result.reason,
        status: result.status,
        providerMessage: result.providerMessage,
      });
    } else {
      console.error("[contact] RESEND_API_KEY is not configured");
    }
    return Response.json(
      { success: false, error: CLIENT_ERROR },
      { status: result.reason === "config" ? 503 : 502 },
    );
  }

  return Response.json({ success: true, id: result.id });
}
