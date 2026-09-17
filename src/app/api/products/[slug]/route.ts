import { NextResponse } from "next/server";
import { findWatch } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const watch = findWatch(slug);
  if (!watch) {
    return NextResponse.json({ error: "Reference not found." }, { status: 404 });
  }
  return NextResponse.json({ watch });
}
