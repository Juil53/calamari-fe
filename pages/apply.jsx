import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../components/CalendarForm";
import * as Constant from "../config/constants";
import style from "../styles/Apply.module.scss";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = ({ results }) => {
  const calendarRef = createRef();

  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={results.events} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm absences={results.absences} />
        </div>
      </div>
    </>
  );
};

// Call this function before return the Page HTML
export const getStaticProps = async () => {
  // Fetch API/DB
  const res = await axios.get(Constant.API);
  const results = res.data;

  // Return props for this Page Component
  return {
    props: { results },
    revalidate: 1,
  };
};

export default Apply;
