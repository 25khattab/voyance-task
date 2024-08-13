"use client";
import Calendar from "@/components/calendar";
import ManageAppointmentDialog from "@/components/manage-booking/manage-appointment-dialog";
import { appointment } from "@/db/schema";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useState } from "react";

export default function ManageBooking({ appointments }: { appointments: appointment[] }) {
  const [dialogState, setDialogState] = useState(false);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const handleEventClick = (args: EventClickArg) => {
    setBookingDate(args.event.extendedProps.createdAt);
    setAppointmentId(args.event.extendedProps.appointmentId);
    setDialogState(true);
  };
  return (
    <div className="">
      <Calendar
        handleDateClick={undefined}
        handleEventClick={handleEventClick}
        events={appointments.map((e) => ({
          date: e.createdAt!,
          approved: e.approved ?? false,
          appointmentId: e.id,
          createdAt: e.createdAt,
        }))}
        eventContent={renderEventContent}
      />
      <ManageAppointmentDialog
        open={dialogState}
        setOpen={setDialogState}
        bookingDate={bookingDate}
        appointmentId={appointmentId}
      />
    </div>
  );
}

const renderEventContent = (eventInfo: any) => {
  // console.log(eventInfo);
  // Check if the current view is timeGridWeek
  const { event } = eventInfo;
  const backgroundColor = event.extendedProps.approved ? "green" : "red";
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
