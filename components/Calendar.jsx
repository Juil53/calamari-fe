import { useState } from "react";
import * as Constant from "../config/constants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from '@fullcalendar/moment'
import CalendarModal from "./CalendarModal";
import moment from "moment";

const Calendar = ({ ref, events }) => {
  const [show, setShow] = useState(false);
  const [event,setEvent] = useState({
    id:null,
    title: null,
    start: null,
    end: null,
    data:{
      status:Constant.PENDING,
      comment:null
    }
  })

  const handleEvent = (info) => {
    setShow(true);
    setEvent({
      id:info.event.id,
      title:info.event.title,
      start:moment(info.event.start).format("yyyy-MM-DD"),
      end:moment(info.event.end).format("yyyy-MM-DD"),
      data:info.event.extendedProps
    })
  };

  return (
    <>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,momentPlugin]}
        firstDay={1}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "prev,next today",
        }}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        navLinks={true}
        initialView="dayGridMonth"
        dayMaxEvents={2}
        events={events}
        eventClick={handleEvent}
      />
      <CalendarModal show={show} setShow={setShow} event={event}/>
    </>
  );
};

export default Calendar;
