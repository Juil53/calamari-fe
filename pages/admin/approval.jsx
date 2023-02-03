import * as Constant from "../../constant/constants";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Search from "../../components/Search";
import Tabs from "../../components/Tabs";
import styles from "../../styles/Approval.module.scss";

const Approval = ({ events }) => {
  const [index, setIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [approvedEvent,setApprovedEvent] = useState(selectedEvent)
  const tabs = ["FOR APPROVAL", "HISTORY"];

  const handleSelectEvent = (id) => {
    setSelectedEvent(events[id]);
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
          <table>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>STAFF</th>
                <th>TYPE</th>
                <th>ABSENCE PERIOD</th>
                <th>REQUESTED</th>
                <th>START</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} onClick={() => handleSelectEvent(event.id)}>
                  <td>
                    <img className={styles.avatar} src="/imgs/avatar.jpg" alt="avatar" />
                  </td>
                  <td className={styles.reporter}>Nguyen Van A</td>
                  <td>{event.title}</td>
                  <td>
                    {event.start} - {event.end}
                  </td>
                  <td>1 day</td>
                  <td>in 3 days</td>
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
