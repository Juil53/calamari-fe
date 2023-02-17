import { faArrowLeftLong, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/CreateApproveFlow.module.scss";
import { handleConvertNumber } from "../../../utils/utils";

const CreateFlow = () => {
  const router = useRouter();
  const [flowLength, setFlowLength] = useState(null);
  const [flow, setFlow] = useState({
    flowName: "Default flow",
    stepOne: null,
    stepTwo: null,
    stepThree: null,
  });

  const selectStep = (e) => {
    const count = Number(e.target.value);
    if (count > 0) {
      const stepLength = null;
      for (let i = 0; i < count; i++) {
        stepLength++;
      }
      setFlowLength(stepLength);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlow({
      ...flow,      
      [name]: value,
    });
  };

  const handleSubmit = () => {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flow`, flow);
      handleRevalidation()
      alert("Create successfully");
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/configuration/flow");
  };

  const renderInputStep = (flowLength) => {
    const content = [];
    for (let i = 0; i < flowLength; i++) {
      content.push(
        <form key={i}>
          <h3>Step</h3>
          <div className={styles.stepWrapper}>
            <select name={`step${handleConvertNumber(i+1)}`} onChange={handleChange}>
              <option value="">Select options</option>
              <option value="REQUEST">REQUEST</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </form>
      );
    }
    return content;
  };

  const handleRevalidation = async () => {
    await axios.post(
      `/api/revalidate-page?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN}`,
      { path: "/admin/configuration/flow" }
    );
    router.reload("/admin/configuration/flow");
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
          <button type="submit" className={styles.approveBtn} onClick={handleSubmit}>
            <span>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
            SAVE
          </button>
          <h2 className={styles.title}>Creating absence type</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftSideContent}>
          <div className={styles.tabsContent}>
            <div className={styles.steps}>
              <h4>Choose Number of Steps</h4>
              <select name="" id="" onChange={selectStep} defaultValue={"default"}>
                <option value="default" disabled>
                  Select Steps
                </option>
                <option value="1">1 Step</option>
                <option value="2">2 Steps</option>
                <option value="3">3 Steps</option>
              </select>
            </div>

            {flowLength && renderInputStep(flowLength)}
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

export default CreateFlow;
