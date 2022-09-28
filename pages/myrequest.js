import {
  faCaretDown,
  faCaretUp,
  faCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/MyRequest.module.scss";

export default function MyRequest() {
  return (
    <div className={styles.my__request}>
      <div className={styles.filter}>
        <div className={styles.title}>Filters</div>
        <div className={styles.filter__ip}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.filter__ip__ic}
          />
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
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    className={styles.period__icon}
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className={styles.period__icon}
                  />
                </div>
              </div>
            </th>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual leave</td>
            <td>10/9/2022 - 26/9/2022</td>
            <td>1 day</td>
            <td className={styles.status}>
              <div className={styles.status__container}>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={`${styles.status__icon} ${styles.success}`}
                />
                <div>Success</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
