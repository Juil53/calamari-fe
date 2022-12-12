import { faArrowLeftLong, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";
import FlowStep from "../../../components/FlowStep";
import styles from "../../../styles/Flow.module.scss";
import { useRouter } from "next/router";
import { useFetch } from "../../../hooks/useFetch";

const ApprovalFlow = () => {
  const router = useRouter();
  const { data, error, loading } = useFetch(
    "https://633d07937e19b17829061bcf.mockapi.io/calendar/flow"
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${id}`);
      alert("Delete Successfully!");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      
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
      {data && (
        <div className={styles.content}>
          {data.map((flow, index) => (
            <div key={index} className={styles.flow}>
              <div className={styles.editIcon}>
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span>Edit</span>
              </div>
              <div className={styles.deleteIcon} onClick={() => handleDelete(flow.id)}>
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span>Delete</span>
              </div>
              <div className={styles.flowDetail}>
                <h4>Flow: {flow.id}</h4>
                <span>Created At: {moment(flow.createdAt).format("yyyy-MM-DD")}</span>
              </div>
              <div className={styles.flowChart}>
                <FlowStep steps={flow.flow} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ApprovalFlow;
