import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ events }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      firstDay={1}
      headerToolbar={{
        start: "dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
        right: "prev,next today"
      }}
      businessHours={{
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        startTime: "7:00",
        endTime: "23:00"
      }}
      nowIndicator={true}
      selectable={false}
      selectMirror={true}
      navLinks={true}
      initialView="dayGridMonth"
      events={events}
      dayMaxEvents={2}
    />
  );
};

export default Calendar;
