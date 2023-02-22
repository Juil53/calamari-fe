import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import TableChartSharpIcon from "@mui/icons-material/TableChartSharp";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { createRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import moment from "moment";
import dynamic from "next/dynamic";
import CalendarForm from "../../components/CalendarForm";
import BasicModal from "../../components/Modal";
import LinearIndeterminate from "../../components/Progress";
import TableMode from "../../components/TableMode";
import style from "../../styles/Apply.module.scss";
import Link from "next/link";

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ formatEvents, absences }) => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const calendarRef = createRef();
  const { data: session } = useSession();

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
          <p>
            Hello <span>{session?.user.full_name}</span>
          </p>
          <Link href="/staff/events/events-log">
            <IconButton className={style.iconButton}>
              <StickyNote2OutlinedIcon fontSize="large" />
            </IconButton>
          </Link>
          {viewMode === "calendar" ? (
            <IconButton className={style.iconButton} onClick={() => handleChangeViewMode(viewMode)}>
              <TableChartSharpIcon fontSize="large" />
            </IconButton>
          ) : (
            <IconButton className={style.iconButton} onClick={() => handleChangeViewMode(viewMode)}>
              <CalendarTodaySharpIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton className={style.iconButton}>
            <AccountBoxSharpIcon fontSize="large" />
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
