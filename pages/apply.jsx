import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../components/CalendarForm";
import * as Constant from "../constant/constants";
import style from "../styles/Apply.module.scss";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events,absences }) => {
  console.log(absences);
  const calendarRef = createRef();

  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
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

// Call this function before return the Page HTML
export const getStaticProps = async () => {
  // Fetch API/DB
  const res = await axios.get(Constant.API);
  const res2 = await axios.get(Constant.API2);
  const events = res.data;
  const absences = res2.data;

  // Return props for this Page Component
  return {
    props: { 
      events,
      absences
     },
    revalidate: 1,
  };
};

export default Apply;
