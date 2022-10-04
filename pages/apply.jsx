import dynamic from "next/dynamic";
import { useState } from "react";
import CalendarForm from "../components/CalendarForm";
import style from "../styles/Apply.module.scss";
const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

const Apply = () => {
  const [eventData,setEventData] = useState({})

  const onEventAdded = (formData) => {
    setEventData(formData)
  };

  console.log(eventData);

  return (
    <>
      <h2 className={style.title}>Absence Request</h2>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar />
        </div>
        <div className={style.rightSide}>
          <CalendarForm onEventAdded={onEventAdded} />
        </div>
      </div>
    </>
  );
};

export default Apply;
