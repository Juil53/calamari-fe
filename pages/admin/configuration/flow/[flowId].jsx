import { faArrowLeftLong, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../../../components/Loading";
import styles from "../../../../styles/CreateApproveFlow.module.scss";

const FlowDetail = ({ oldFlow }) => {
  const router = useRouter();

  if (!oldFlow) {
    return null;
  }
  if (router.isFallback) {
    return <Loading />;
  }

  const [currentFlow, setCurrentFlow] = useState(oldFlow);

  const selectStep = (e) => {
    const count = Number(e.target.value);
    if (count > 0) {
      const tempArray = [];
      for (let i = 0; i < count; i++) {
        tempArray.push(i);
      }
      setCurrentFlow(tempArray.length);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const tempsFlow = [...currentFlow];
    const tempFlow = { ...tempsFlow[index], [name]: value };
    tempsFlow[index] = tempFlow.flow;
    setCurrentFlow(tempsFlow);
  };

  const handleSubmit = async (id) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows/${id}`, {
        flow: currentFlow,
      });
      await axios.post("/api/revalidate", { id: id });
      alert("Update Success");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link href="/admin/configuration/flow">
            <button className={styles.returnBtn}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>
          <button
            type="submit"
            className={styles.approveBtn}
            onClick={() => handleSubmit(currentFlow.id)}
          >
            <span>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
            SAVE
          </button>
          <h2 className={styles.title}>EDIT FLOW DETAIL</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftSideContent}>
          <div className={styles.tabsContent}>
            <div className={styles.steps}>
              <h4>Choose Number of Steps</h4>
              <select onChange={selectStep}>
                <option value="1">1 Steps</option>
                <option value="2">2 Steps</option>
                <option value="3">3 Steps</option>
                <option value="4">4 Steps</option>
              </select>
            </div>
            <div>
              <form>
                <h3>{currentFlow.flowName}</h3>
                <div className={styles.stepWrapper}>
                  <select name="flow" onChange={(e) => handleChange(e, index)}>
                    <option value="REQUEST">REQUEST</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.rightSideContent}>
          <h5 className={styles.title}>How does it work?</h5>
          <p className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deserunt explicabo,
            consectetur maiores hic quia harum iusto tempora facere neque?
          </p>
        </div>
      </div>
    </>
  );
};

export default FlowDetail;

export const getStaticPaths = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows`);
  const flows = await response.data;
  return {
    paths: flows.map((flow) => ({ params: { flowId: flow?.id?.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flow/${params.flowId}`);
  const oldFlow = await response.data;
  return {
    props: { oldFlow },
    revalidate: 60,
  };
};
