import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as Constant from "../constant/constants";
import styles from "../styles/CalendarForm.module.scss";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";

const CalendarForm = ({ absences }) => {
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
                    color: "#fff",
                    backgroundColor: "#fd6868",
                    [name]: value,
                });
                break;
            case "sick":
                setData({
                    ...data,
                    color: "#fff",
                    backgroundColor: "#0d6efd",
                    [name]: value,
                });
                break;
            case "holiday":
                setData({
                    ...data,
                    color: "#fff",
                    backgroundColor: "#00FFFF",
                    [name]: value,
                });
                break;
            default:
                setData({
                    ...data,
                    [name]: value,
                });
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Data add vao DB
        try {
            await axios({
                method: "POST",
                url: Constant.eventsAPI,
                data,
            });
            alert("Post Success");
            router.reload()
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
                            <option value={absence.value}>{absence.name}</option>
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
