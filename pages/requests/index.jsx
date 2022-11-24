import {
  faCaretDown,
  faCaretUp,
  faCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import * as Constant from "../../constant/constants";
import styles from "../../styles/Request.module.scss";
import { handleStatus } from "../../utils/utils";

export default function Request({ events }) {
  return (
    <div className={styles.my__request}>
      <div className={styles.filter}>
        <div className={styles.title}>Filters</div>
        <div className={styles.filter__ip}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.filter__ip__ic} />
          <input type="text" placeholder="..." />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Absence type</th>
            <th className={styles.period}>
              <div className={styles.period__container}>
                <div>Absence period</div>
                <div className={styles.period__icon__container}>
                  <FontAwesomeIcon icon={faCaretUp} className={styles.period__icon} />
                  <FontAwesomeIcon icon={faCaretDown} className={styles.period__icon} />
                </div>
              </div>
            </th>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <Link key={event.id} href={`/requests/${event.id}`}>
              <tr>
                <td>{event.title}</td>
                <td>
                  {event.start} - {event.end}
                </td>
                <td>1 day</td>
                <td className={styles.status}>
                  <div className={styles.status__container}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={`${styles.status__icon} ${styles.success}`}
                    />
                    <div>{handleStatus(event.status)}</div>
                  </div>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getStaticProps = async () => {
  // Fetch API/DB
  const res1 = await axios.get(Constant.eventsAPI);
  const events = res1.data;

  return {
    props: {
      events,
    },
  };
};
