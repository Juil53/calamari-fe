import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as Constant from "../constant/constants";
import styles from "../styles/CalendarForm.module.scss";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import { useSession } from "next-auth/react";

const CalendarForm = ({ absences }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState({
    status: Constant.PENDING,
  });

  const submitter = session?.user.email;

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
    const type = document.querySelector("#absence_type").value;

    switch (type) {
      case "remote":
        setData({
          ...data,
          submitter,
          color: "#fff",
          background_color: "#FF9AA2",
          [name]: value,
        });
        break;
      case "sick":
        setData({
          ...data,
          submitter,
          color: "#fff",
          background_color: "#B5EAD7",
          [name]: value,
        });
        break;
      default:
        setData({
          ...data,
          submitter: submitter || "no user",
          [name]: value,
        });
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(data)
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events/create`, data);
      alert("Post Success");
      // router.reload();
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <div className={styles.calendarForm}>
      <h3>CREATE A REQUEST</h3>
      <form onSubmit={handleSubmit}>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} />
        <CalendarTo dataCalendarTo={dataCalendarTo} />
        <label htmlFor="absence_type">Absence Type</label>
        <select name="type" id="absence_type" onChange={handleChange}>
          <option value="">Select absences</option>
          {absences.map((absence, index) => (
            <React.Fragment key={`absence_${index}`}>
              <option value={absence.value}>{absence.name.toUpperCase()}</option>
            </React.Fragment>
          ))}
        </select>
        <label htmlFor="title">Reason</label>
        <input name="title" id="title" onChange={handleChange} />
        <label htmlFor="approver">Select Approver</label>
        <select name="approver" id="approver" onChange={handleChange}>
          <option value="">Select absences</option>
          <option value="leader">Leader</option>
          <option value="admin">Admin</option>
        </select>
        <Button variant="contained" color="success" type="submit" endIcon={<SendIcon />}>
          SEND
        </Button>
      </form>
    </div>
  );
};

export default CalendarForm;
