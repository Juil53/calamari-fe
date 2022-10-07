import axios from "axios";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";

const CalendarForm = ({ onEventAdded }) => {
  const [data, setData] = useState({});

  const dataCalendarFrom = (start) => {
    setData({
      ...data,
      start,
    });
  };

  const dataCalendarTo = (end) => {
    setData({
      ...data,
      end,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEventAdded(data);
    axios
      .post("https://633d07937e19b17829061bcf.mockapi.io/calendar/events", data)
      .then((res) => {
        console.log("post success", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="calendar__form">
      <form onSubmit={handleSubmit}>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} />
        <CalendarTo dataCalendarTo={dataCalendarTo} />
        <label htmlFor="absence_type">Absence Type</label>
        <select className="form-select" aria-label="Default select example" name="title" id="absence_type" onChange={handleChange}>
          <option value="">Open this select menu</option>
          <option value="Sick">Sick</option>
          <option value="Work from home">Work from home</option>
        </select>

        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" id="comment" onChange={handleChange} />

        <button className="btn btn-success" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CalendarForm;
