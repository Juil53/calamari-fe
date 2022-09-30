import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import style from "../styles/Apply.module.scss";

const Apply = () => {
  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
      <div className={style.container}>
        <div className={style.leftSide}>
          <div>
            <FullCalendar
              plugins={[interactionPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              nowIndicator={true}
              editable={true}
              initialEvents={[{ title: "nice event", start: new Date() }]}
            />
          </div>
        </div>
        <div className={style.rightSide}></div>
      </div>
    </>
  );
};

export default Apply;
