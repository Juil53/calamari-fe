import * as Constant from "../constant/constants";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { handleStatus } from "../utils/utils";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CalendarFrom from "./CalendarFrom";
import CalendarTo from "./CalendarTo";

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Absence Type: {updatedEvent.title.toUpperCase()}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <CalendarFrom
                        dataCalendarFrom={dataCalendarFrom}
                        oldData={updatedEvent.start}
                    />
                    <CalendarTo dataCalendarTo={dataCalendarTo} oldData={updatedEvent.end} />
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        rows="2"
                        value={updatedEvent.comment}
                        onChange={handleChange}
                        name="comment"
                    />
                    <h6>Status: {handleStatus(updatedEvent.status)}</h6>
                    <h6>Name: Nguyen Van A</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" style={{width:'20%'}} onClick={() => handleDelete(updatedEvent.id)}>
                        Delete
                    </Button>
                    <Button variant="success" type="submit" style={{width:'20%'}}>
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default CalendarModal;
