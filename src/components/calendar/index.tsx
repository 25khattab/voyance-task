"use client";
import "./style.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { appointment } from "@/db/schema";

type Props = {
  handleDateClick: (arg: DateClickArg) => void;
  appointments: appointment[];
};

export default function Calendar({ handleDateClick, appointments }: Props) {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={(e) => handleDateClick(e)}
      contentHeight={"auto"}
      allDaySlot={false}
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      slotDuration={"01:00:00"}
      slotMinTime={"12:00:00"}
      slotMaxTime={"22:00:00"}
      eventContent={renderEventContent}
      events={appointments.map((e) => ({
        date: e.createdAt!,
      }))}
    />
  );
}

const renderEventContent = (eventInfo: any) => {
  // console.log(eventInfo);
  // Check if the current view is timeGridWeek
  if (
    eventInfo.view.type === "timeGridWeek" ||
    eventInfo.view.type === "timeGridDay"
  ) {
    return <div></div>;
  } else {
    return (
      <div>
        <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
      </div>
    );
  }
};
