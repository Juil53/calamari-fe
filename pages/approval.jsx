import styles from "../styles/Approval.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Tabs from "../components/Tabs";

const Approval = () => {
  const [index, setIndex] = useState(0);

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
          <Tabs index={index} setIndex={setIndex} />
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
              <tr>
                <td className={styles.reporter}>
                  <div className={styles.imgWrapper}>
                    <img className={styles.avatar} src="/imgs/avatar.jpg" alt="avatar" />
                  </div>
                  Nguyen Van A
                </td>
                <td>Annual Leave</td>
                <td>2022-10-12 - 2022-10-15</td>
                <td>1 day</td>
                <td>in 3 days</td>
              </tr>
              <tr>
              <td className={styles.reporter}>
                  <div className={styles.imgWrapper}>
                    <img className={styles.avatar} src="/imgs/avatar2.png" alt="avatar" />
                  </div>
                  Nguyen Van B
                </td>
                <td>Annual Leave</td>
                <td>2022-10-12 - 2022-10-15</td>
                <td>1 day</td>
                <td>in 0 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tabContent} hidden={index !== 1}>
          Tab2 Content
        </div>
      </div>
    </>
  );
};

export default Approval;
