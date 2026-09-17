import { NextResponse } from "next/server";
import { stats } from "@/lib/store";

export async function GET() {
  const data = await stats();
  return NextResponse.json({ service: "reflector-atelier", ...data });
}
