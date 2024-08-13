"use server";

import { auth } from "@/auth";
import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import { redirect } from "next/navigation";

export const bookAppointment = async (bookingDate: string) => {
  const session = await auth();
  if (!session){ 
    redirect("/login")
  }
  const userId = session.user.id;
  if (userId === undefined) return;
  console.log(bookingDate)
  await db.insert(appointments).values({ userId, createdAt: bookingDate });
};
