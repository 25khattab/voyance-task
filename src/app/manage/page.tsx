import ManageBooking from "@/components/manage-booking";
import { getAppointments } from "@/data-access/appointments";

export default async function Manage() {
  const appointments = await getAppointments();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <h1>Manage Appointments</h1>
      <div className="">
        <ManageBooking appointments={appointments} />
      </div>
    </main>
  );
}
