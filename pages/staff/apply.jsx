import AddBoxIcon from "@mui/icons-material/AddBox";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import SearchIcon from "@mui/icons-material/Search";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import TableChartSharpIcon from "@mui/icons-material/TableChartSharp";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import moment from "moment";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { createRef, useState } from "react";
import AccountMenu from "../../components/AccountMenu";
import CalendarForm from "../../components/CalendarForm";
import BasicModal from "../../components/Modal";
import LinearIndeterminate from "../../components/Progress";
import TableMode from "../../components/TableMode";
import style from "../../styles/Apply.module.scss";
import SearchModal from "../../components/SearchModal";
import Tooltip from "@mui/material/Tooltip";

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ formatEvents, absences }) => {
  const [open, setOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const calendarRef = createRef();
  const { data: session } = useSession();

  const handleOpen = (arg) => {
    setOpen(true);
    switch (arg) {
      case "create":
        return setShowCreateModal(true);
      case "search":
        return setShowSearchModal(true);
      default:
        break;
    }
  };
  const handleClose = (childData) => {
    setShowCreateModal(childData);
    setShowSearchModal(childData);
  };

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
        <Tooltip title="Day left">
          <div className={style.dayLeft}>
            <p>Day Left</p>
            <div className={style.progress}>
              <LinearIndeterminate />
            </div>
          </div>
        </Tooltip>

        <div className={style.iconWrapper}>
          {session?.role === "staff" ? (
            <Link href="/staff/events/events-log">
              <Tooltip title="Event logs">
                <IconButton className={style.iconButton}>
                  <StickyNote2OutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Link>
          ) : (
            <>
              <Tooltip title="Search...">
                <IconButton className={style.iconButton} onClick={() => handleOpen("search")}>
                  <SearchIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              {/* Modal */}
              {open && (
                <BasicModal showModal={showSearchModal} onHandleClose={handleClose}>
                  <SearchModal />
                </BasicModal>
              )}
            </>
          )}
          {viewMode === "calendar" ? (
            <Tooltip title="Table view">
              <IconButton
                className={style.iconButton}
                onClick={() => handleChangeViewMode(viewMode)}
              >
                <TableChartSharpIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Calendar view">
            <IconButton className={style.iconButton} onClick={() => handleChangeViewMode(viewMode)}>
              <CalendarTodaySharpIcon fontSize="large" />
            </IconButton>
            </Tooltip>
          )}
          <AccountMenu />
        </div>
      </div>

      <div className={style.container}>
        <div className={style.addEvent}>
          <Button
            variant="contained"
            size="small"
            endIcon={<AddBoxIcon />}
            onClick={() => handleOpen("create")}
          >
            Create
          </Button>
        </div>
        <div className={style.calendarWrapper}>{renderView(viewMode)}</div>
        {open && (
          <BasicModal showModal={showCreateModal} onHandleClose={handleClose}>
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
