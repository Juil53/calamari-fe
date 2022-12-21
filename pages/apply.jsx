import axios from "axios";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../components/CalendarForm";
import Loading from "../components/Loading";
import * as Constant from "../constant/constants";
import style from "../styles/Apply.module.scss";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = ({ events, absences }) => {
  const calendarRef = createRef();
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <h2>You need to Login to access this Page</h2>;
  }

  return (
    <>
      <h4 className={style.title}>Absence Request</h4>
      <p>Hello: {session.user.email}</p>
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
