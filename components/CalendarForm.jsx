import React, { useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";

const CalendarForm = ({onEventAdded}) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dataCalendarFrom = (fromData) => {
    setFrom(fromData);
  };
  
  const dataCalendarTo = (toData) => {
    setTo(toData);
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    onEventAdded({
      from,
      to
    })
  }

  return (
    <div className="calendar__form">
      <form onSubmit={handleSubmit}>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} />
        <CalendarTo dataCalendarTo={dataCalendarTo}/>
        <label htmlFor="absence_type">Absence Type</label>
        <select name="absenceType" id="absence_type">
          <option value="1">Sick leave</option>
          <option value="2">WFH</option>
        </select>

        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" id="comment" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CalendarForm;
