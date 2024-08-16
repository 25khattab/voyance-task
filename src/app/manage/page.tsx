import { auth } from "@/auth";
import ManageBooking from "@/components/manage-booking";
import { getAppointments } from "@/data-access/appointments";
import { redirect } from "next/navigation";

export default async function Manage() {
  const session = await auth();
  if (!session || !session.user.admin) redirect("login");
  const appointments = await getAppointments();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <h1>Manage Appointments</h1>
      <ManageBooking appointments={appointments} />
    </main>
  );
}
