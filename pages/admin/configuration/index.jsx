import styles from "../../../styles/Configuration.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faArrowsTurnToDots, faUser } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../components/Card";
import Link from "next/link";

const Configuration = () => {
  const settings = [
    {
      name: "Absence Type",
      path: "configuration/absence-type",
      icon: <FontAwesomeIcon icon={faBook} />,
    },
    {
      name: "Approval Flow",
      path: "configuration/flow",
      icon: <FontAwesomeIcon icon={faArrowsTurnToDots} />,
    },
    {
      name: "People",
      path: "/",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <h4 className={styles.title}>SETTINGS</h4>
        </div>
      </div>

      <div className={styles.content}>
        {settings.map((setting, index) => (
          <Link href={setting.path} key={index}>
            <a>
              <Card name={setting.name} icon={setting.icon} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Configuration;
