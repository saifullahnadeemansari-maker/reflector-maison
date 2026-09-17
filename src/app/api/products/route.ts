import { NextResponse } from "next/server";
import { listWatches } from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    maison: "REFLECTOR",
    count: listWatches().length,
    watches: listWatches(),
  });
}
