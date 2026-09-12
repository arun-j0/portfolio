import { Resend } from "resend";
import { NextResponse } from "next/server";
import data from "@/data";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);

    const body = await request.json();
    const { from_name, from_email, message } = body;

    const emailData = await resend.emails.send({
      from: `${data.contact.name} <onboarding@resend.dev>`,
      to: [data.contact.email],
      subject: `New Contact Form Message from ${from_name}`,
      text: `
Name: ${from_name}
Email: ${from_email}
Message: ${message}
      `,
    });

    return NextResponse.json(emailData);
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
