import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Sidebar.module.scss";
import {
  faBars,
  faPenToSquare,
  faCalendar,
  faFileLines,
  faCircleCheck,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const Sidebar = () => {
  const sidebar = useRef();

  const openSidebar = () =>  sidebar.current.classList.toggle("active");

  return (
    <nav>
      <div className={`${styles.sidebar}`} ref={sidebar}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image src="/imgs/logo.svg" alt="" width={128} height={77} />
          <FontAwesomeIcon icon={faBars} id={styles.hamburger} onClick={openSidebar}/>
        </div>

        {/* NavBtn */}
        <ul className={styles.nav_lists}>
          <li>
            <Link href="#">
              <a>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>Apply</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Calendar</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <FontAwesomeIcon icon={faFileLines} />
                <span>Request</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Approval</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>
                <FontAwesomeIcon icon={faChartSimple} />
                <span>Entitlement</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
