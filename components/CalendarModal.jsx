import * as Constant from "../constant/constants";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { handleStatus } from "../utils/utils";
import axios from "axios";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import style from "../styles/Modal.module.scss";

const CalendarModal = ({ show, setShow, event }) => {
  console.log(event)
  const route = useRouter();
  const handleClose = () => setShow(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: "",
    start: "",
    end: "",
    reason: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    if (event.id) {
      setCurrentEvent({
        id: event.id,
        start: event.start,
        end: event.end,
        reason: event.reason,
        status: event.data.status,
        name: event.data.submitter,
      });
    }
  }, [event]);

  const dataCalendarFrom = (start) => setCurrentEvent({ ...currentEvent, start });
  const dataCalendarTo = (end) => setCurrentEvent({ ...currentEvent, end });

  const handleDelete = async (id) => {
    setShow(false);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/event/${id}`);
      alert("Deleted");
      route.reload();
    } catch (err) {
      alert(`Data ${err.response.data}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        //post updated Event
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/event/${event.id}`, currentEvent);
            alert("Updated");
        } catch (error) {
            console.log(error);
            alert("Failed");
        }
    };

  return (
    <>
      <Modal open={show} onClose={handleClose}>
        <div className={style.box}>
          <button className={style.closeIcon}>
            <CloseIcon onClick={handleClose}/>
          </button>
          <h2>Reason: {currentEvent.reason.toUpperCase()}</h2>
          <form onSubmit={handleSubmit}>
            <CalendarFrom dataCalendarFrom={dataCalendarFrom} oldData={currentEvent.start} />
            <CalendarTo dataCalendarTo={dataCalendarTo} oldData={currentEvent.end} />
            <h5>Status: {handleStatus(currentEvent.status)}</h5>
            <h5>Submitter: {currentEvent.name}</h5>
            <div className={style.modalFooter}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(currentEvent.id)}
              >
                Delete
              </Button>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CalendarModal;
