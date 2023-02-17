import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as Constant from "../constant/constants";
import styles from "../styles/CalendarForm.module.scss";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import { Button } from "@mui/material";

const CalendarForm = ({ absences,flows,sessionInfo}) => {
  const router = useRouter();
  const [data, setData] = useState({
    status: Constant.PENDING,
  });

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
    const title = document.querySelector("#absence_type").value;

    switch (title) {
      case "remote":
        setData({
          ...data,
          submitter: sessionInfo.user.email,
          color: "#fff",
          backgroundColor: "#fd6868",
          createdAt:new Date(),
          [name]: value,
        });
        break;
      case "sick":
        setData({
          ...data,
          submitter: sessionInfo.user.email,
          color: "#fff",
          backgroundColor: "#0d6efd",
          createdAt:new Date(),
          [name]: value,
        });
        break;
      case "holiday":
        setData({
          ...data,
          submitter: sessionInfo.user.email,
          color: "#fff",
          backgroundColor: "#00ff66",
          createdAt:new Date(),
          [name]: value,
        });
        break;
      default:
        setData({
          ...data,
          createdAt:new Date(),
          submitter: sessionInfo.user.email || 'default',
          [name]: value,
        });
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Data add vao DB
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/event`,data);
      alert("Post Success");
      router.reload();
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
          <option value="">Select absences</option>
          {absences.map((absence) => (
            <React.Fragment key={absence.id}>
              <option value={absence.value}>{absence.name.toUpperCase()}</option>
            </React.Fragment>
          ))}
        </select>
        <label htmlFor="durationType">Duration</label>
        <select name="durationType" id="durationType" onChange={handleChange}>
          <option value="">Select duration</option>
          {setAbs.map((abs, index) => (
            <React.Fragment key={index}>
              <option value={abs}>{abs.toUpperCase()}</option>
            </React.Fragment>
          ))}
        </select>
        <label htmlFor="flow">Flow</label>
        <select name="flow" id="flow" onChange={handleChange}>
          <option value="">Select a flow</option>
          {flows.map((flow, index) => (
            <React.Fragment key={index}>
              <option value={flow.name}>{flow.flowName.toUpperCase()}</option>
            </React.Fragment>
          ))}
        </select>
        <label htmlFor="comment">Reason</label>
        <textarea name="comment" id="comment" onChange={handleChange} />
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ width: "80px" }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CalendarForm;
