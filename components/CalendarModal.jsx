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
import { IconButton } from "@mui/material";

const CalendarModal = ({ show, setShow, event }) => {
  const route = useRouter();
  const handleClose = () => setShow(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    id: "",
    start: "",
    end: "",
    title: "",
    name: "",
    status: "",
    comment: "",
  });

  useEffect(() => {
    if (event.id) {
      setUpdatedEvent({
        id: event.id,
        start: event.start,
        end: event.end,
        title: event.title,
        comment: event.data.comment,
        status: event.data.status,
        name: event.data.name,
      });
    }
  }, [event]);

  const dataCalendarFrom = (start) => setUpdatedEvent({ ...updatedEvent, start });
  const dataCalendarTo = (end) => setUpdatedEvent({ ...updatedEvent, end });

  const handleDelete = async (id) => {
    setShow(false);
    try {
      await axios.delete(`${Constant.API}${id}`);
      alert("Deleted");
      route.reload();
    } catch (err) {
      alert(`Data ${err.response.data}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({
      ...updatedEvent,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedEvent);

    //post updated Event
    try {
      await axios.put(`${Constant.API}${event.id}`, updatedEvent);
      alert("updated");
    } catch (error) {
      console.log(error);
      alert("failed");
    }
  };

  return (
    <>
      <Modal open={show} onClose={handleClose}>
        <div className={style.box}>
          <button className={style.closeIcon}>
            <CloseIcon onClick={handleClose}/>
          </button>
          <h2>Absence Type: {updatedEvent.title.toUpperCase()}</h2>
          <form onSubmit={handleSubmit}>
            <CalendarFrom dataCalendarFrom={dataCalendarFrom} oldData={updatedEvent.start} />
            <CalendarTo dataCalendarTo={dataCalendarTo} oldData={updatedEvent.end} />
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              rows="2"
              value={updatedEvent.comment}
              onChange={handleChange}
              name="comment"
            />
            <h5>Status: {handleStatus(updatedEvent.status)}</h5>
            <h5>Name: Nguyen Van A</h5>
            <div className={style.modalFooter}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(updatedEvent.id)}
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
