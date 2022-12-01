import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import HorizontalLinearStepper from "../../components/Step";
import styles from "../../styles/Flow.module.scss";

const ApprovalFlow = () => {
  const flows = [
    [
      {
        flow: "Creat a request",
        description: "Create new request",
      },
      {
        flow: "Waiting for Manager approval",
        description: "Wait for manager approve and check at Request page",
      },
    ],
    [
      {
        flow: "Creat a request",
        description: "Create new request",
      },
      {
        flow: "Waiting for Manager approval",
        description: "Wait for manager approve and check at Request page",
      },
      {
        flow: "Waiting for Admin approval",
        description: "Wait for manager approve and check at Request page",
      },
    ],
  ];

  return (
    <div>
      <div className={styles.header}>
        <Link href="/configuration/absence-type">
          <button className={styles.returnBtn}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        </Link>
        <button className={styles.createBtn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          CREATE FLOW
        </button>
      </div>

      <div className={styles.content}>
        {flows.map((flow, index) => (
          <div className={styles.flow} key={index}>
            <div className={styles.title}>
              <h3>Flow {index + 1}</h3>
            </div>
            <div className={styles.step}>
              <HorizontalLinearStepper steps={flows[index]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalFlow;
