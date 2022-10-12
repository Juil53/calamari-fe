import axios from "axios";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import styles from "../styles/CalendarForm.module.scss";
import * as Constant from "../config/constants";

const CalendarForm = () => {
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
      status: Constant.PENDING,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Data add vao DB
    try {
      await axios.post("https://633d07937e19b17829061bcf.mockapi.io/calendar/events", data);
      alert("Post Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="calendar__form">
      <form onSubmit={handleSubmit}>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} />
        <CalendarTo dataCalendarTo={dataCalendarTo} />
        <label htmlFor="absence_type">Absence Type</label>
        <select name="title" id="absence_type" onChange={handleChange}>
          <option value="">Open this select menu</option>
          <option value="Sick">Sick</option>
          <option value="Work from home">Work from home</option>
        </select>

        <div className={styles.color}>
          <div className={styles.colorText}>
            <label htmlFor="">Color</label>
            <input type="color" id={styles.textColor} name="color" onChange={handleChange} />
          </div>
          <div className={styles.colorBg}>
            <label htmlFor="">Background</label>
            <input
              type="color"
              id={styles.bgColor}
              name="backgroundColor"
              onChange={handleChange}
            />
          </div>
        </div>

        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" id="comment" onChange={handleChange} />

        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CalendarForm;
