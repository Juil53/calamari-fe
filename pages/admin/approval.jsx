import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import styles from "../../styles/Approval.module.scss";
import { handleStatus } from "../../utils/utils";

const Approval = ({ formatEvents }) => {
  const [index, setIndex] = useState(0);
  const [datas, setDatas] = useState(formatEvents);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const tabs = ["FOR APPROVAL", "HISTORY"];

  const handleEventApprove = async (id) => {
    // Approve Event
    const selectedIndex = datas.findIndex((data) => data._id === id);
    const eventSelected = datas[selectedIndex];
    const eventUpdated = { ...eventSelected, status: 1 };
    const updatedData = datas.map((data) => (data._id === id ? eventUpdated : data));
    setDatas(updatedData);
    setUpdatedEvent(eventUpdated);
  };

  const handleEventDecline = (id) => {
    // Decline Event
    const selectedIndex = datas.findIndex((data) => data._id === id);
    const eventSelected = datas[selectedIndex];
    const eventUpdated = { ...eventSelected, status: 2 };
    const updatedData = datas.map((data) => (data._id === id ? eventUpdated : data));
    setDatas(updatedData);
    setUpdatedEvent(eventUpdated);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events/${id}`, updatedEvent);
      alert("Saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Search />
        </div>
        <div className={styles.rightSide}>
          <Tabs index={index} setIndex={setIndex} tabs={tabs} />
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tabContent} hidden={index !== 0}>
          <table className={styles.noSpacing}>
            <thead>
              <tr>
                {/* <th></th> */}
                <th>IMAGE</th>
                <th>EMAIL</th>
                <th>TYPE</th>
                <th>ABSENCE PERIOD</th>
                <th>STATUS</th>
                <th>REQUESTED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => (
                <tr key={data._id}>
                  <td>
                    <img className={styles.avatar} src="/imgs/default_avatar.jpg" alt="avatar" />
                  </td>
                  <td className={styles.reporter}>{data.submitter}</td>
                  <td>{data.title}</td>
                  <td>
                    {data.start} / {data.end}
                  </td>
                  <td>{handleStatus(data.status)}</td>
                  <td>1 day</td>
                  <td className={styles.reporter}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="success"
                        onClick={() => handleEventApprove(data._id)}
                      >
                        {data.status === 1 ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => handleEventDecline(data._id)}
                      >
                        {data.status === 2 ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
                      </IconButton>
                    </Stack>
                  </td>
                  <td>
                    <button onClick={(e) => handleSubmit(e, data._id)}>Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tabContent} hidden={index !== 1}></div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const events = res.data;
  const formatEvents = events.map((event) => ({
    ...event,
    start: moment(event.start).format("yyyy-MM-DD"),
    end: moment(event.end).format("yyyy-MM-DD"),
  }));

  return {
    props: { formatEvents },
    revalidate: 60,
  };
};

export default Approval;
