"use client";
import Calendar from "@/components/calendar";
import BookAppointmentDialog from "@/components/user-booking/book-appointment-dialog";
import { DateClickArg } from "@fullcalendar/interaction/index.js";

import { useState } from "react";

export default function UserBooking({
  events,
}: {
  events: {
    date: string;
    forUser: boolean;
    approved: boolean;
  }[];
}) {
  const [dialogState, setDialogState] = useState(false);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const handleDateClick = (arg: DateClickArg) => {
    if (arg.view.type === "dayGridMonth") return;
    if (events.some((e) => e.date === arg.dateStr)) return;
    setBookingDate(arg.dateStr);
    setDialogState(true);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full" style={{ backgroundColor: "green" }} />
          <span>Approved Appointment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full" style={{ backgroundColor: "orange" }} />
          <span>Unapproved Appointment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full" style={{ backgroundColor: "red" }} />
          <span>Booked Appointment</span>
        </div>
      </div>
      <Calendar handleDateClick={handleDateClick} events={events} eventContent={renderEventContent} />
      <BookAppointmentDialog open={dialogState} setOpen={setDialogState} bookingDate={bookingDate} />
    </div>
  );
}

const renderEventContent = (eventInfo: any) => {
  // Check if the current view is timeGridWeek
  const { event } = eventInfo;
  const forUser = event.extendedProps.forUser;
  const backgroundColor = forUser ? (event.extendedProps.approved ? "green" : "orange") : "red";
  if (eventInfo.view.type === "timeGridWeek" || eventInfo.view.type === "timeGridDay") {
    return <div style={{ backgroundColor }} className="fc-timegrid-event fc-event-main h-full w-full"></div>;
  } else {
    return (
      <div style={{ backgroundColor }} className="fc-timegrid-event fc-event-main h-full w-full">
        <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
      </div>
    );
  }
};
