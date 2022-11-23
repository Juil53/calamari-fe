import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import Tabs from "../components/Tabs";
import * as Constant from "../constant/constants";
import styles from "../styles/Approval.module.scss";

const Approval = ({ events }) => {
  const [index, setIndex] = useState(0);
  const tabs = ["FOR APPROVAL", "HISTORY"];

  const handleClick = (id) => {
    console.log(`Row ${id} clicked!`);
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
          <h4 className={styles.title}>Approval</h4>
        </div>
        <div className={styles.rightSide}>
          <Tabs index={index} setIndex={setIndex} tabs={tabs} />
        </div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchBox}>
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <span>...</span>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tabContent} hidden={index !== 0}>
          <table>
            <thead>
              <tr>
                <th>REPORTER</th>
                <th>TYPE</th>
                <th>ABSENCE PERIOD</th>
                <th>REQUESTED</th>
                <th>STARTS</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} onClick={() => handleClick(event.id)}>
                  <td className={styles.reporter}>
                    <div className={styles.imgWrapper}>
                      <img className={styles.avatar} src="/imgs/avatar.jpg" alt="avatar" />
                    </div>
                    Nguyen Van A
                  </td>
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
