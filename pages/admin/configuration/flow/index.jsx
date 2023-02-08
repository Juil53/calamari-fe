import { faArrowLeftLong, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";
import FlowStep from "../../../../components/FlowStep";
import Loading from "../../../../components/Loading";
import styles from "../../../../styles/Flow.module.scss";

const ApprovalFlow = ({ flows }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${id}`);
      alert("Delete Successfully!");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link href="/admin/configuration">
          <button className={styles.returnBtn}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        </Link>
        <Link href="/admin/configuration/create-flow">
          <button className={styles.createBtn}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            CREATE FLOW
          </button>
        </Link>
      </div>

      {flows && (
        <div className={styles.content}>
          <div className={styles.leftSide}>
            {flows.map((flow, index) => (
              <div key={index} className={styles.flow}>
                <Link href={`/admin/configuration/flow/${flow.id}`}>
                  <div className={styles.editIcon}>
                    <span>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span>Edit</span>
                  </div>
                </Link>
                <div className={styles.deleteIcon} onClick={() => handleDelete(flow.id)}>
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                  <span>Delete</span>
                </div>
                <div className={styles.flowDetail}>
                  <h4>{flow.flowName.toUpperCase()}</h4>
                  <span>Created At: {moment(flow.createdAt).format("yyyy-MM-DD")}</span>
                </div>
                <div className={styles.flowChart}>
                  <FlowStep flow={flow} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.rightSide}>
            Description
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalFlow;

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows`);
  const flows = res.data;

  return {
    props: { flows },
    revalidate: 60,
  };
};
