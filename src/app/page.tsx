import UserBooking from "@/components/user-booking";
import { getAppointments } from "@/data-access/appointments";

export default async function Home() {
  const appointments = await getAppointments();
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <h1>Make An Appointment</h1>
      <div className="">
        <UserBooking appointments={appointments} />
      </div>
    </main>
  );
}
