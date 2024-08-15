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
    <div className="">
      <Calendar handleDateClick={handleDateClick} events={events} eventContent={renderEventContent} />
      <BookAppointmentDialog open={dialogState} setOpen={setDialogState} bookingDate={bookingDate} />
    </div>
  );
}

const renderEventContent = (eventInfo: any) => {
  // console.log(eventInfo);
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
