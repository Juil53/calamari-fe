import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { handleStatus } from "../utils/utils";
import Link from "next/link";
import SearchBox from "./SearchBox";
import styles from "../styles/TableMode.module.scss";

const TableMode = ({ events }) => {
  return (
    <div className={styles.myRequest}>
      <div className={styles.searchBox}>
        <SearchBox />
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Submitter</th>
              <th>TYPE</th>
              <th className={styles.period}>
                <div className={styles.periodContainer}>
                  <div>Absence period</div>
                  <div className={styles.periodIconWrapper}>
                    <FontAwesomeIcon icon={faCaretUp} className={styles.periodIcon} />
                    <FontAwesomeIcon icon={faCaretDown} className={styles.periodIcon} />
                  </div>
                </div>
              </th>
              <th>COMMENT</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <Link key={event._id} href={`/staff/requests/${event.id}`}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{event.submitter}</td>
                  <td>{event.title.toUpperCase()}</td>
                  <td>
                    {event.start} / {event.end}
                  </td>
                  <td>{event.comment}</td>
                  <td className={styles.status}>
                    <div className={styles.statusContainer}>
                      <span>{handleStatus(event.status)}</span>
                    </div>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(TableMode);
