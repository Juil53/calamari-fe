import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../../components/CalendarForm";
import * as Constant from "../../constant/constants";
import style from "../../styles/Apply.module.scss";

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events, absences }) => {
  const calendarRef = createRef();

  return (
    <>
      <h4 className={style.title}>Absence Request</h4>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={events} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm absences={absences} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res1 = await axios.get(Constant.eventsAPI);
  const events = res1.data;
  const res2 = await axios.get(Constant.absencesAPI);
  const absences = res2.data;

  return {
    props: {
      events,
      absences,
    },
  };
};

export default Apply;
