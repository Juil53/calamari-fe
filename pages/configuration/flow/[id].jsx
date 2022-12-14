import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Loading from "../../../components/Loading";
import styles from "../../../styles/CreateApproveFlow.module.scss";
import { faArrowLeftLong, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getStaticPaths = async () => {
  const response = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/flow");
  const flows = await response.data;
  return {
    paths: flows.map((flow) => ({ params: { id: flow.id } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(
    `https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${params.id}`
  );
  const flow = await response.data;
  return {
    props: {
      flow,
    },
    revalidate: 120,
  };
};

const FlowDetail = ({ flow }) => {
  if (!flow) {
    return null;
  }

  const [options, setOptions] = useState(flow.flow);
  const [newFlow, setNewFlow] = useState([]);
  const selectRef = useRef();
  const router = useRouter();
  console.log("options", options);
  console.log("newFlow", newFlow);

  const selectStep = (e) => {
    const count = Number(e.target.value);
    if (count > 0) {
      const tempArray = [];
      for (let i = 0; i < count; i++) {
        tempArray.push(i);
      }
      setOptions(tempArray);
    }
  };

  const handleChange = (e, option) => {
    const { name, value } = e.target;
    // const tempFlows = [...flow.flow];
    // const tempFlow = { ...tempFlows[option], [name]: value };
    // tempFlows[option] = tempFlow.flow;
    // setNewFlow(tempFlows);
  };

  const handleSubmit = async (id) => {
    try {
      console.log(newFlow);
      // await axios.put(`https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${id}`, {
      //   flow: newFlow,
      // });
      // await axios.post("/api/revalidate", { id: id });
      alert("Update Success");
      // router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link href="/configuration/flow">
            <button className={styles.returnBtn}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>
          <button type="submit" className={styles.approveBtn} onClick={() => handleSubmit(flow.id)}>
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
              <select name="" id="" onChange={selectStep} ref={selectRef} value={options.length}>
                <option value="1">1 Steps</option>
                <option value="2">2 Steps</option>
                <option value="3">3 Steps</option>
                <option value="4">4 Steps</option>
              </select>
            </div>
          </div>

          {options.map((option, index) => (
            <div key={index}>
              <form>
                <h3>Step {index + 1}</h3>
                <div className={styles.stepWrapper}>
                  <select name="flow" onChange={(e) => handleChange(e, index)} value={option}>
                    <option value="REQUEST">REQUEST</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </form>
            </div>
          ))}
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
