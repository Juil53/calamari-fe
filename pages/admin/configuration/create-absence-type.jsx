import * as Constant from "../../../constant/constants";
import axios from "axios";
import styles from "../../../styles/CreateAbsenceType.module.scss";
import Tabs from "../../../components/Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

const CreateAbsenceType = () => {
  const tabs = ["General", "Accrual", "Requesting", "Carry-over", "Fields & Visibility"];
  const [index, setIndex] = useState(0);
  const [absenceType, setAbsenceType] = useState({
    name: "",
    durationType: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAbsenceType({
      ...absenceType,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.API_ENDPOINT}/type`, absenceType);
      alert("Post success");
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link href="/admin/configuration/absence-type">
            <button className={styles.returnBtn}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>
          <button className={styles.approveBtn} onClick={handleSubmit}>
            <span>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
            SAVE
          </button>
          <h4 className={styles.title}>Creating absence type</h4>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftSideContent}>
          <div className={styles.tabs}>
            <Tabs index={index} setIndex={setIndex} tabs={tabs} />
          </div>
          <div className={styles.tabsContent}>
            <div className="generalTab" hidden={index != 0}>
              <label htmlFor="typeName">Type Name</label>
              <input type="text" id="typeName" name="name" onChange={handleChange} />
              <label htmlFor="considerAs">Consider as</label>
              <select name="value" onChange={handleChange}>
                <option value="">Select type</option>
                <option value="sick">Sick</option>
                <option value="remote">Work from home</option>
                <option value="holiday">Holiday</option>
              </select>
              <label htmlFor="durationUnit">Duration unit</label>
              <select name="durationType" onChange={handleChange}>
                <option value="">Select duration</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
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

export default CreateAbsenceType;
