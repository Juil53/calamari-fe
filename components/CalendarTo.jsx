import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "../styles/CalendarModal.module.scss";

const CalendarTo = ({ dataCalendarTo, oldData }) => {
  const [calendar, setCalendar] = useState("");
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    setCalendar(format(new Date(), "yyyy-MM-dd"));
    document.addEventListener("keydown", hideOnEsc, true);
    document.addEventListener("click", hideOnClickOutsite, true);
    document.addEventListener("click", hideOnClickInside, true);

    return () => {
      document.removeEventListener("keydown", hideOnEsc, true);
      document.removeEventListener("click", hideOnClickOutsite, true);
      document.removeEventListener("click", hideOnClickInside, true);
    };
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

  const hideOnClickInside = (event) => {
    if (refOne.current && refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    setCalendar(format(date, "yyyy-MM-dd"));
    dataCalendarTo(format(date, "yyyy-MM-dd"));
  };

  return (
    <>
      <label htmlFor="">To</label>
      <input
        className={styles.modalInput}
        value={oldData ? oldData : calendar}
        readOnly
        onClick={() => setOpen(!open)}
      />
      <div ref={refOne}>{open && <Calendar date={new Date()} onChange={handleSelect} />}</div>
    </>
  );
};

export default CalendarTo;
