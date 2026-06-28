import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
    }

    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const company = String(data.company ?? "").trim();
    const subject = String(data.subject ?? "").trim();
    const message = String(data.message ?? "").trim();
    const honeypot = String(data._gotcha ?? "").trim();

    // honeypot — pretend success so bots don't retry
    if (honeypot) return NextResponse.json({ ok: true });

    // server-side validation (mirrors the client)
    if (!name || !subject || !message || !emailRe.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set — see .env.example");
      return NextResponse.json(
        { ok: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO || "sajidhsaz@gmail.com";
    const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio · ${subject}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
