import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarTo = ({dataCalendarTo}) => {
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
    setCalendar(format(date, "yyyy-MM-dd"));
    dataCalendarTo(format(date, "yyyy-MM-dd"))
  };

  return (
    <>
      <label htmlFor="">To</label>
      <input value={calendar} readOnly onClick={() => setOpen(!open)} />
      <div ref={refOne}>{open && <Calendar date={new Date()} onChange={handleSelect} />}</div>
    </>
  );
};

export default CalendarTo;
