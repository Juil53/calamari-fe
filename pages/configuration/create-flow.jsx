import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/CreateApproveFlow.module.scss";
import FlowStep from "../../components/FlowStep";
import { useRouter } from "next/router";
import axios from "axios";

const CreateFlow = () => {
  const [options, setOptions] = useState([]);
  const [flows, setFlows] = useState([]);
  const router = useRouter();
  const selectRef = useRef();

  const handleResetOptions = () => {
    setOptions([]);
    setFlows([]);
    selectRef.current.value = 0;
  };

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
    const tempFlows = [...flows];
    const tempFlow = { ...tempFlows[option], [name]: value };
    tempFlows[option] = tempFlow.flow;
    setFlows(tempFlows);
  };

  const renderInputStep = () => {
    return options.map((option, index) => (
      <div key={index}>
        <form>
          <h3>Step {option + 1}</h3>
          <div className={styles.stepWrapper}>
            <select name="flow" onChange={(e) => handleChange(e, option)}>
              <option value="">Select options</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </form>
      </div>
    ));
  };

  const handleSubmit = () => {
    try {
      axios.post("https://633d07937e19b17829061bcf.mockapi.io/calendar/flow", {
        flow:flows
      });
      alert("OKE");
    } catch (error) {
      console.log(error);
    }
    router.push("/configuration/flow");
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
              {options.length === 0 ? (
                <select name="" id="" onChange={selectStep} ref={selectRef}>
                  <option value="0">0</option>
                  <option value="1">1 Step</option>
                  <option value="2">2 Steps</option>
                  <option value="3">3 Steps</option>
                  <option value="4">4 Steps</option>
                </select>
              ) : (
                <select name="" id="" onChange={selectStep} ref={selectRef} disabled>
                  <option value="">{options.length} Steps</option>
                </select>
              )}

              {options.length > 0 ? <button onClick={handleResetOptions}>Reset</button> : ""}
            </div>

            {/* {flows.length > 0 ? (
              <div className={styles.stepsContent}>
                <div className={styles.step}>
                  <FlowStep steps={flows} isCreatePage={true} />
                </div>
              </div>
            ) : (
              ""
            )} */}

            {options.length > 0 ? renderInputStep() : ""}
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
