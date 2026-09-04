import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

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

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
