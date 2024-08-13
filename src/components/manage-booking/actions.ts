"use server";

import { auth } from "@/auth";
import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export const approveAppointment = async (appointmentId: string) => {

  const session = await auth();
  console.log(session)
  if (session?.user.admin !== true) return;
  await db
    .update(appointments)
    .set({ approved: true })
    .where(eq(appointments.id, appointmentId));
};

export const rejectAppointment = async (appointmentId: string) => {
    const session = await auth();
    if (session?.user.admin !== true) return;
    await db
      .delete(appointments)
      .where(eq(appointments.id, appointmentId));
  };
