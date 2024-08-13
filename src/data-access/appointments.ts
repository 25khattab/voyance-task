import { auth } from "@/auth";
import { db } from "@/db/connection";

export const getAppointments = async () => {
  const data = await db.query.appointments.findMany();
  return data;
};
