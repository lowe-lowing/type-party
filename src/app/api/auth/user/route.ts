import { authOptions, getUserAuth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  //   const { session } = await getUserAuth();
  console.log("session", session);

  if (!session || !session.user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}
