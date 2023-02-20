import { faCaretDown, faCaretUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import Link from "next/link";
import { memo } from "react";
import styles from "../styles/Request.module.scss";
import { handleStatus } from "../utils/utils";
import InputAdornment from "@mui/material/InputAdornment";

const TableMode = ({ events }) => {
  return (
    <div className={styles.myRequest}>
      <div className={styles.searchBox}>
        <TextField
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment  position="start" className={styles.inputAdornment}>
                Submitter
              </InputAdornment>
            ),
          }}
        />
      </div>
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
          {events.map((event) => (
            <Link key={event.id} href={`/staff/requests/${event.id}`}>
              <tr>
                <td>{event.id}</td>
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
  );
};

export default memo(TableMode);
