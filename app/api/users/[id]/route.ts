import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  return NextResponse.json({ id: id });
}
