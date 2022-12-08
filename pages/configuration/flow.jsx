import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Flow.module.scss";
import FlowStep from "../../components/FlowStep";
import axios from "axios";

export async function getStaticProps() {
  const res = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/flow");
  const flows = res.data;

  return {
    props: {
      flows,
    },
    revalidate: 10, // In seconds
  };
}

const ApprovalFlow = ({ flows }) => {
  console.log(flows);
  return (
    <div>
      <div className={styles.header}>
        <Link href="/configuration">
          <button className={styles.returnBtn}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        </Link>
        <Link href="/configuration/create-flow">
          <button className={styles.createBtn}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            CREATE FLOW
          </button>
        </Link>
      </div>

      {flows.length > 0 ? (
        <div className={styles.content}>
          {flows.map((flow, index) => (
            <React.Fragment key={index}>
              <FlowStep steps={flow} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ApprovalFlow;
