import * as Constant from "../../constant/constants";
import React, { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import styles from "../../styles/Approval.module.scss";
import Checkbox from "@mui/material/Checkbox";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { IconButton } from "@mui/material";
import { handleStatus } from "../../utils/utils";
import { Stack } from "@mui/system";

const Approval = ({ events }) => {
  const [index, setIndex] = useState(0);
  const [datas, setDatas] = useState(events);
  const tabs = ["FOR APPROVAL", "HISTORY"];

  const handleEventEdit = (id) => {
    // Approve Event
    const eventSelected = events[id];
    const eventUpdated = { ...eventSelected, status: 1 };
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
                <th>STAFF</th>
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
                  <td className={styles.reporter}>Nguyen Van A</td>
                  <td>{data.title}</td>
                  <td>
                    {data.start} - {data.end}
                  </td>
                  <td>{handleStatus(data.status)}</td>
                  <td>1 day</td>
                  <td className={styles.reporter}>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="success"
                      onClick={() => handleEventEdit(data.id)}
                    >
                      <ThumbUpAltOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={() => handleEventEdit(data.id)}
                    >
                      <ThumbDownAltOutlinedIcon />
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
  const res = await axios.get(Constant.eventsAPI);
  const events = res.data;

  return {
    props: { events },
    revalidate: 1,
  };
};

export default Approval;
