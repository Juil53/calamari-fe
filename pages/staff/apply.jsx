import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import style from "../../styles/Apply.module.scss";
import { useSession } from "next-auth/react";
import moment from "moment";
import LinearIndeterminate from "../../components/Progress";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import BasicModal from "../../components/Modal";
import CalendarForm from "../../components/CalendarForm";
import TableMode from "../../components/TableMode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ formatEvents, absences }) => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const { data: session } = useSession();
  const calendarRef = createRef();

  const handleOpen = () => setOpen(true);
  const handleClose = (childData) => setOpen(childData);
  const handleChangeViewMode = (viewMode) => {
    switch (viewMode) {
      case "calendar":
        return setViewMode("table");
      case "table":
        return setViewMode("calendar");
      default:
        break;
    }
  };

  const renderView = (viewMode) => {
    switch (viewMode) {
      case "calendar":
        return <Calendar ref={calendarRef} events={formatEvents} />;
      case "table":
        return <TableMode ref={calendarRef} events={formatEvents} />;
      default:
        break;
    }
  };

  return (
    <>
      <div className={style.topWrapper}>
        <h4 className={style.header}>APPLY</h4>
        <div className={style.dayLeft}>
          <p>Day Left</p>
          <div className={style.progress}>
            <LinearIndeterminate />
          </div>
        </div>
        <div className={style.iconWrapper}>
          <span>Hello User!</span>
          <IconButton className={style.iconButton}>
            <MenuBookTwoToneIcon fontSize="large" />
          </IconButton>
          {viewMode === "calendar" ? (
            <IconButton className={style.iconButton} onClick={() => handleChangeViewMode(viewMode)}>
              <ViewListTwoToneIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton className={style.iconButton} onClick={() => handleChangeViewMode(viewMode)}>
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton className={style.iconButton}>
            <AccountCircleTwoToneIcon fontSize="large" />
          </IconButton>
        </div>
      </div>

      <div className={style.container}>
        <div className={style.addEvent}>
          <Button variant="contained" size="small" endIcon={<AddBoxIcon />} onClick={handleOpen}>
            Create Request
          </Button>
        </div>
        <div className={style.calendarWrapper}>{renderView(viewMode)}</div>
        {open && (
          <BasicModal showModal={open} onHandleClose={handleClose}>
            <CalendarForm absences={absences} />
          </BasicModal>
        )}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/types`);
  const res3 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows`);
  const events = res1.data;
  const absences = res2.data;
  const flows = res3.data;
  const formatEvents = events.map((event) => ({
    ...event,
    start: moment(event.start).format("yyyy-MM-DD"),
    end: moment(event.end).format("yyyy-MM-DD"),
  }));

  return {
    props: {
      formatEvents,
      absences,
      flows,
    },
  };
};

export default Apply;
