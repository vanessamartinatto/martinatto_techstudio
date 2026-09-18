import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  isMailConfigured,
  sendNotificationEmail,
  sendConfirmationEmail,
} from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  projectType: z.string().trim().min(1).max(60),
  description: z.string().trim().min(10).max(2000),
  lang: z.enum(["it", "en", "pt"]).optional().default("it"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "INVALID_INPUT", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const saved = await db.contactRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: parsed.data.projectType,
        description: parsed.data.description,
        lang: parsed.data.lang,
      },
    });

    // Best-effort email delivery: a mail failure must never fail the request
    // (the submission is already persisted in the DB).
    let emailStatus: "sent" | "failed" | "not_configured" = "not_configured";

    if (isMailConfigured()) {
      try {
        await Promise.all([
          sendNotificationEmail(parsed.data),
          sendConfirmationEmail(parsed.data),
        ]);
        emailStatus = "sent";
      } catch (error) {
        console.error("Email delivery error:", error);
        emailStatus = "failed";
      }
    }

    return NextResponse.json(
      { ok: true, id: saved.id, emailStatus },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
