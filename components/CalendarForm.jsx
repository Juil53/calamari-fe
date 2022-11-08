import axios from "axios";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import styles from "../styles/CalendarForm.module.scss";
import * as Constant from "../constant/constants";

const CalendarForm = ({ absences }) => {
  const [data, setData] = useState({});

  // filter Unique duration Type
  const setAbs = [...new Set(absences.map((absence) => absence.durationType))];

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
    console.log(data);
    //Data add vao DB
    try {
      await axios({
        method: "POST",
        url: "/api/events",
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Post Success");
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <div className={styles.calendarForm}>
      <form onSubmit={handleSubmit}>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} />
        <CalendarTo dataCalendarTo={dataCalendarTo} />
        <label htmlFor="absence_type">Absence Type</label>
        <select name="title" id="absence_type" onChange={handleChange}>
          <option value="">Select absence type</option>
          {absences.map((absence) => (
            <React.Fragment key={absence.id}>
              <option value={absence.name}>{absence.name}</option>
            </React.Fragment>
          ))}
        </select>
        <label htmlFor="durationType">Duration type</label>
        <select name="durationType" id="durationType" onChange={handleChange}>
          <option value="">Select duration Type</option>
          {setAbs.map((abs, index) => (
            <React.Fragment key={index}>
              <option value={abs}>{abs}</option>
            </React.Fragment>
          ))}
        </select>
        <div className={styles.color}>
          <div className={styles.colorText}>
            <label htmlFor="">Color</label>
            <input
              type="color"
              id={styles.textColor}
              name="color"
              onChange={handleChange}
              defaultValue="#ffffff"
            />
          </div>
          <div className={styles.colorBg}>
            <label htmlFor="">Background</label>
            <input
              type="color"
              id={styles.bgColor}
              name="backgroundColor"
              defaultValue="#fd6868"
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
