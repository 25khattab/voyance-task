"use client";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { forwardRef } from "react";
import "./style.scss";

type Props = {
  handleDateClick?: (arg: DateClickArg) => void;
  handleEventClick?: (arg: EventClickArg) => void;
  events: EventSourceInput;
  eventContent: (eventInfo: any) => JSX.Element;
};

const Calendar = forwardRef<FullCalendar, Props>(({ handleDateClick, events, eventContent, handleEventClick }, ref) => {
  return (
    <FullCalendar
      ref={ref} // Assign the ref to FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
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
      dateClick={(dateInfo) => {
        const today = new Date();
        // for the user to switch to week view of the day clicked on the month view
        if (dateInfo.view.type === "dayGridMonth") {
          today.setHours(0, 0, 0, 0);
        }
        const eventDate = new Date(dateInfo.date);
        // Check if the event date is in the past
        if (eventDate < today) {
          return;
        }
        handleDateClick && handleDateClick(dateInfo);
      }}
      eventClick={(clickInfo) => {
        const today = new Date();
        if (clickInfo.event.start === null) return;
        const eventDate = new Date(clickInfo.event.start);
        // Check if the event date is in the past
        if (eventDate < today) {
          return; // Ignore clicks on events from past dates
        }
        handleEventClick && handleEventClick(clickInfo);
      }}
    />
  );
});

export default Calendar;
