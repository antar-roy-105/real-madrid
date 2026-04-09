import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json({ message: "Not available" }, { status: 404 });
}
