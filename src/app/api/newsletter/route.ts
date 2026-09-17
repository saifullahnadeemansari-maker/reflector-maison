import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await addSubscriber(body.email);
    return NextResponse.json({
      ok: true,
      already: result.already,
      message: result.already
        ? "This address is already on the list."
        : "You are on the atelier list.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to subscribe.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
