import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../components/CalendarForm";
import * as Constant from "../config/constants";
import style from "../styles/Apply.module.scss";
const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events }) => {
  const calendarRef = createRef();

  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={events} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(Constant.API);
  const events = res.data;

  return {
    props: { events },
  };
};

export default Apply;
