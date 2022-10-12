import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Constant from "../config/constants";
import { handleStatus } from "../utils/utils";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";
import moment from "moment"


const CalendarModal = ({ show, setShow, event }) => {
  console.log(event);
  const handleClose = () => setShow(false);
  const [data,setData] = useState({
    id: event.id,
    start:event.start,
    end:event.end,
    reason:{
      status:event.reason.status,
      comment:event.reason.comment
    },
    title:event.title,
    status:event.status
  });
  const route = useRouter();

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

  const handleChange = (e) => {
    const {name,value} = e.target;
    e.preventDefault();
    setData({
      ...data,
      [name]:value
    })
    console.log(data);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Absence Type: {event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CalendarFrom dataCalendarFrom={dataCalendarFrom} oldData={moment(event.start).format("yyyy-MM-DD")}/>
        <CalendarTo dataCalendarTo={dataCalendarTo} oldData={moment(event.end).format("yyyy-MM-DD")}/>
        <input type="text" value={data.reason.comment} onChange={handleChange} name="comment"></input>
        <h6>Status: {handleStatus(Number(event.status))}</h6>
        <h6>Name: AAAA</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleDelete(event.id)}>
          Delete
        </Button>
        <Button variant="success" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalendarModal;
