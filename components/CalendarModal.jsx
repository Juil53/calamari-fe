import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

const CalendarModal = ({ show, setShow, event }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Title: {event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Reason: {event.reason.comment}</h4>
        <h6>From: <span>{moment(event.start).format("dddd, DD MMM YYYY")}</span></h6>
        <h6>To: <span>{moment(event.end).format("dddd, DD MMM YYYY")}</span></h6>
        <h6>Name: Jon Snow</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalendarModal;
