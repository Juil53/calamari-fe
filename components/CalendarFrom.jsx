import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarFrom = ({dataCalendarFrom,oldData}) => {
  const [calendar, setCalendar] = useState("");
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    setCalendar(format(new Date(), "yyyy-MM-dd"));
    document.addEventListener("keydown", hideOnEsc, true);
    document.addEventListener("click", hideOnClickOutsite, true);

    return () => {
        document.removeEventListener("keydown", hideOnEsc, true);
        document.removeEventListener("click", hideOnClickOutsite, true);
    }
  }, []);

  const hideOnEsc = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutsite = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    //set Data
    setCalendar(format(date, "yyyy-MM-dd"));
    //truyen Data ra parent component
    dataCalendarFrom(format(date, "yyyy-MM-dd"));
  };

  return (
    <>
      <label htmlFor="">From</label>
      <input value={oldData ? oldData : calendar} readOnly onClick={() => setOpen(!open)} />
      <div ref={refOne}>{open && <Calendar date={new Date()} onChange={handleSelect} />}</div>
    </>
  );
};

export default CalendarFrom;
