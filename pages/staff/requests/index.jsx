import {
  faCaretDown,
  faCaretUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import styles from "../../../styles/Request.module.scss";
import { handleStatus } from "../../../utils/utils";

export default function Request({ formatEvents }) {
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
            <th>Name</th>
            <th>Reason</th>
            <th className={styles.period}>
              <div className={styles.period__container}>
                <div>Absence period</div>
                <div className={styles.period__icon__container}>
                  <FontAwesomeIcon icon={faCaretUp} className={styles.period__icon} />
                  <FontAwesomeIcon icon={faCaretDown} className={styles.period__icon} />
                </div>
              </div>
            </th>
            <th>Requested</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {formatEvents.map((event) => (
            <Link key={event.id} href={`/staff/requests/${event.id}`}>
              <tr>
                <td>{event.submitter}</td>
                <td>{event.title.toUpperCase()}</td>
                <td>
                  {event.start} / {event.end}
                </td>
                <td>1 day</td>
                <td className={styles.status}>
                  <div className={styles.status__container}>
                    <span>{handleStatus(event.status)}</span>
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
  const result = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const events = result.data;
  const formatEvents = events.map((event) => ({
    ...event,
    start: moment(event.start).format("yyyy-MM-DD"),
    end: moment(event.end).format("yyyy-MM-DD"),
  }));

  return {
    props: {
      formatEvents,
      revalidate: 60,
    },
  };
};
