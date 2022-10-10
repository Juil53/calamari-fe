import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import axios from "axios";
import * as Constant from "../config/constants";
import { useRouter } from "next/router";
import { handleStatus } from "../utils/utils";

const CalendarModal = ({ show, setShow, event }) => {
  const handleClose = () => setShow(false);
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

  const handleChange = () => {

  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Absence Type: {event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>From</h6>
        <input type="text" value={moment(event.start).format("dddd, DD MMM YYYY")} onChange={()=>handleChange()}/>
        <h6>To</h6>
        <input type="text" value={moment(event.end).format("dddd, DD MMM YYYY")} onChange={()=>handleChange()}/>
        <h6>Note: {event.reason.comment}</h6>
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
