import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../../styles/EventLog.module.scss";
import { IconButton } from "@mui/material";
import Link from "next/link";

const EventLogs = () => {
  return (
    <div className={styles.eventLog}>
      <div className={styles.headerLog}>
        <div className={styles.icon}>
          <Link href="/user/dashboard">
            <IconButton size="small">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>
        <h1 className={styles.title}>EVENT HISTORY LOGS</h1>
      </div>
      <div className={styles.tableLog}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Updated At</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Event Created</td>
              <td>01/01/2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Event Status: Pending to Approved</td>
              <td>02/01/2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Event Approved By: Leader</td>
              <td>02/01/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventLogs;
