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
import { Divider } from "@mui/material";

const CalendarModal = ({ show, setShow, event }) => {
  console.log(event);
  const route = useRouter();
  const handleClose = () => setShow(false);
  const [currentEvent, setCurrentEvent] = useState({
    // id: event.data._id,
    // start: event.start,
    // end: event.end,
    // title: event.title,
    // name: event.data.name,
    // status: event.data.status,
  });

  // useEffect(() => {
  //   if (event.data.id) {
  //     setCurrentEvent({
  //       id: event.data._id,
  //       start: event.start,
  //       end: event.end,
  //       title: event.data.title,
  //       status: event.data.status,
  //       name: event.data.submitter,
  //     });
  //   }
  // }, [event]);

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
            <CloseIcon onClick={handleClose} />
          </button>
          <h3 className={style.modaleHeader}>{event.title?.toUpperCase()}</h3>
          <Divider />
          <form onSubmit={handleSubmit}>
            <CalendarFrom dataCalendarFrom={dataCalendarFrom} oldData={event.start} />
            <CalendarTo dataCalendarTo={dataCalendarTo} oldData={event.end} />
            <p className={style.modalTitle}>
              Status:
              <span className={style.modalText}>{handleStatus(event.data.status)}</span>
            </p>
            <p className={style.modalTitle}>
              Submitter:
              <span className={style.modalText}>{event.data.submitter}</span>
            </p>
            <div className={style.modalFooter}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(event.data._id)}
              >
                Withdraw
              </Button>
              <Button variant="contained" type="submit" size="small" color="success">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CalendarModal;
