"use client";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style.scss";

type Props = {
  handleDateClick?: (arg: DateClickArg) => void;
  handleEventClick?: (arg: EventClickArg) => void;
  events: EventSourceInput;
  eventContent: (eventInfo: any) => JSX.Element;
};

export default function Calendar({ handleDateClick, events, eventContent, handleEventClick }: Props) {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
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
      eventContent={eventContent}
      events={events}
      eventClick={handleEventClick}
    />
  );
}
