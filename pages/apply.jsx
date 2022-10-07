import axios from "axios";
import dynamic from "next/dynamic";
import { createRef, useEffect, useRef, useState } from "react";
import CalendarForm from "../components/CalendarForm";
import style from "../styles/Apply.module.scss";
const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events }) => {
  const [eventData, setEventData] = useState({});
  const calendarRef = createRef();

  const onEventAdded = (formData) => {
    setEventData(formData);
  };

  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={events} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm onEventAdded={onEventAdded} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/events");
  const events = res.data;

  return {
    props: { events },
  };
};

export default Apply;
