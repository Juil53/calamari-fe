import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../../components/CalendarForm";
import * as Constant from "../../constant/constants";
import style from "../../styles/Apply.module.scss";
import { useSession } from "next-auth/react"

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events, absences,flows }) => {
  const calendarRef = createRef();
  const { data: session, status } = useSession()
  
  return (
    <>
      <h4 className={style.title}>Absence Request</h4>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={events} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm absences={absences} flows={flows} sessionInfo={session}/>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const events = res1.data;
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/type`);
  const absences = res2.data;
  const res3 = await axios.get(Constant.flowAPI)
  const flows = res3.data;

  return {
    props: {
      events,
      absences,
      flows
    },
  };
};

export default Apply;
