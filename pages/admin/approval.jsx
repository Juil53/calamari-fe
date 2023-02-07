import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import styles from "../../styles/Approval.module.scss";
import { handleStatus } from "../../utils/utils";

const Approval = ({ formatEvents }) => {
  console.log(formatEvents)

  const [index, setIndex] = useState(0);
  const [datas, setDatas] = useState(formatEvents);
  const tabs = ["FOR APPROVAL", "HISTORY"];

  const handleEventApprove = (id) => {
    // Approve Event
    const selectedIndex = formatEvents.findIndex((item) => item.id === id);
    const eventSelected = formatEvents[selectedIndex];
    const eventUpdated = { ...eventSelected, status: 1 };
    const updatedData = datas.map((data) => (data.id === id ? eventUpdated : data));
    setDatas(updatedData);
  };

  const handleEventDecline = (id) => {
    // Decline Event
    const selectedIndex = formatEvents.findIndex((item) => item.id === id);
    const eventSelected = formatEvents[selectedIndex];
    const eventUpdated = { ...eventSelected, status: 0 };
    const updatedData = datas.map((data) => (data.id === id ? eventUpdated : data));
    setDatas(updatedData);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <button className={styles.approveBtn}>
            <span>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            APPROVE ALL
          </button>
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
                <th></th>
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
                <tr key={data.id}>
                  <td className={styles.reporter}>
                    <Checkbox />
                  </td>
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
                        onClick={() => handleEventApprove(data.id)}
                      >
                        {data.status === 1 ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => handleEventDecline(data.id)}
                      >
                        {data.status === 0 ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
                      </IconButton>
                    </Stack>
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
    revalidate: 1,
  };
};

export default Approval;
