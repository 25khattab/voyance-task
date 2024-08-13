import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const adminSecretKey = process.env.ADMIN_SECRET_KEY;

  const requestBody = await request.json();
  const { email, secretKey } = requestBody;

  // Validate input
  if (!email || !secretKey) {
    return new NextResponse(JSON.stringify({ error: "Email and secret key are required" }), { status: 400 });
  }

  // Validate secret key
  if (secretKey !== adminSecretKey) {
    return new NextResponse(JSON.stringify({ error: "Invalid secret key" }), { status: 403 });
  }

  const user = await db.update(users).set({ admin: true }).where(eq(users.email, email)).returning();

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
