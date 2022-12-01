import styles from "../../styles/AbsenceType.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const AbsenceType = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link href="/configuration">
            <button className={styles.returnBtn}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>
          <li>
            <Link href="/configuration/create-absence-type">
              <a>
                <button className={styles.approveBtn}>
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  ADD
                </button>
              </a>
            </Link>
          </li>
          <h4 className={styles.title}>Absence Types</h4>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tabContent}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className={styles.rowActionTitle}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sick Leave</td>
                <td className={styles.rowAction}>
                  <button className={styles.btnEdit}>Edit</button>
                  <button className={styles.btnDelete}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Work from home</td>
                <td className={styles.rowAction}>
                  <button className={styles.btnEdit}>Edit</button>
                  <button className={styles.btnDelete}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Holiday</td>
                <td className={styles.rowAction}>
                  <button className={styles.btnEdit}>Edit</button>
                  <button className={styles.btnDelete}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AbsenceType;
