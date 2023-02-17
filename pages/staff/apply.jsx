import axios from "axios";
import dynamic from "next/dynamic";
import { createRef } from "react";
import CalendarForm from "../../components/CalendarForm";
import style from "../../styles/Apply.module.scss";
import { useSession } from "next-auth/react";
import moment from "moment";
import LinearIndeterminate from "../../components/Progress";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import IconButton from "@mui/material/IconButton";

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false,
});

const Apply = ({ formatEvents, absences, flows }) => {
  const calendarRef = createRef();
  const { data: session } = useSession();

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
        <div className={style.icon}>
          <IconButton className={style.iconButton}>
            <MenuBookTwoToneIcon fontSize="large"/>
          </IconButton>
          <IconButton className={style.iconButton}>
            <ViewListTwoToneIcon fontSize="large"/>
          </IconButton>
          <IconButton className={style.iconButton}>
            <AccountCircleTwoToneIcon fontSize="large"/>
          </IconButton>
        </div>
      </div>

      <div className={style.container}>
        <div className={style.leftSide}>
          <Calendar ref={calendarRef} events={formatEvents} />
        </div>
        <div className={style.rightSide}>
          <CalendarForm absences={absences} flows={flows} sessionInfo={session} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const events = res1.data;
  const formatEvents = events.map((event) => ({
    ...event,
    start: moment(event.start).format("yyyy-MM-DD"),
    end: moment(event.end).format("yyyy-MM-DD"),
  }));
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/types`);
  const absences = res2.data;
  const res3 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows`);
  const flows = res3.data;

  return {
    props: {
      formatEvents,
      absences,
      flows,
    },
  };
};

export default Apply;
