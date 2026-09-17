import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiry = await addInquiry(body);
    return NextResponse.json({
      ok: true,
      id: inquiry.id,
      message: "The atelier has received your request.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save the request.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
