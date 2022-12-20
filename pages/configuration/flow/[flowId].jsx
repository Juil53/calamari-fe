import { faArrowLeftLong, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Loading from "../../../components/Loading";
import styles from "../../../styles/CreateApproveFlow.module.scss";

const FlowDetail = ({ oldFlow }) => {
  const router = useRouter();
  if (!oldFlow) {
    return null;
  }
  if (router.isFallback) {
    return <Loading />;
  }

  const [currentFlow, setCurrentFlow] = useState(oldFlow.flow);
  const selectRef = useRef();

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
      await axios.put(`https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${id}`, {
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
          <Link href="/configuration/flow">
            <button className={styles.returnBtn}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>
          <button
            type="submit"
            className={styles.approveBtn}
            onClick={() => handleSubmit(oldFlow.id)}
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
              <select onChange={selectStep} ref={selectRef} value={currentFlow.length}>
                <option value="1">1 Steps</option>
                <option value="2">2 Steps</option>
                <option value="3">3 Steps</option>
                <option value="4">4 Steps</option>
              </select>
            </div>
            <div>
              {currentFlow.map((flow, index) => (
                <form key={index}>
                  <h3>Step {index + 1}</h3>
                  <div className={styles.stepWrapper}>
                    <select name="flow" onChange={(e) => handleChange(e, index)} value={flow}>
                      <option value="REQUEST">REQUEST</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                </form>
              ))}
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
  const response = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/flow");
  const flows = await response.data;
  return {
    paths: flows.map((flow) => ({ params: { flowId: flow.id } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(
    `https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${params.flowId}`
  );
  const oldFlow = await response.data;

  console.log(`Generating page for /flow/${params.flowId}`);
  return {
    props: { oldFlow },
    revalidate: 120,
  };
};
