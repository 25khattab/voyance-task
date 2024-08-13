"use client";
import Calendar from "@/components/calendar";
import BookAppointmentDialog from "@/components/calendar/book-appointment-dialog";
import { appointment, appointments } from "@/db/schema";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { useState } from "react";

export default function UserBooking({
  appointments,
}: {
  appointments: appointment[];
}) {
  const [dialogState, setDialogState] = useState(false);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const handleDateClick = (arg: DateClickArg) => {
    if (arg.view.type === "dayGridMonth") return;
    console.log(arg);
    if (appointments.some((e) => e.createdAt === arg.dateStr)) return;
    setBookingDate(arg.dateStr);
    setDialogState(true);
  };
  return (
    <div className="">
      <Calendar handleDateClick={handleDateClick} appointments={appointments} />
      <BookAppointmentDialog
        open={dialogState}
        setOpen={setDialogState}
        bookingDate={bookingDate}
      />
    </div>
  );
}
