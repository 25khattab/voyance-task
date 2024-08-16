"use server";

import { auth } from "@/auth";
import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const bookAppointment = async (bookingDate: string) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  if (userId === undefined) return;
  // check if there is no appointment with the same time
  const alreadyBooked =
    (await db.select().from(appointments).where(eq(appointments.createdAt, bookingDate))).length > 0 ? true : false;
  if (alreadyBooked) return;
  await db.insert(appointments).values({ userId, createdAt: bookingDate });
};
