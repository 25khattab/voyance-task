import { auth } from "@/auth";
import UserBooking from "@/components/user-booking";
import { getAppointments } from "@/data-access/appointments";

export default async function Home() {
  const session = await auth();
  const appointments = await getAppointments();
  const events = appointments.map((e) => ({
    date: e.createdAt!,
    forUser: session === null ? false : session.user.id === e.userId,
    approved: e.approved ?? false,
  }));
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <h1>Make An Appointment</h1>
      <div className="">
        <UserBooking events={events} />
      </div>
    </main>
  );
}
