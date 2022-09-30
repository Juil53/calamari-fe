import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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

const Sidebar = (props) => {
  const sidebar = useRef();
  const openSidebar = () => sidebar.current.classList.toggle(styles.active);

  const route = useRouter();

  return (
    <nav>
      <div className={`${styles.sidebar}`} ref={sidebar}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <Image
              src="/imgs/logo.svg"
              alt=""
              width={128}
              height={77}
              className={styles.brandLogo}
            />
          </div>
          <div className={styles.hamWrapper}>
            <FontAwesomeIcon
              icon={faBars}
              id={styles.hamburger}
              onClick={() => {
                openSidebar(), props.changeStatus(!props.show);
              }}
            />
          </div>
        </div>

        {/* NavBtn */}
        <ul className={styles.nav_lists}>
          <li className={route.pathname == "/apply" ? `${styles.navActive}` : ""}>
            <Link href="/apply">
              <a>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>Apply</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname == "/calendar" ? `${styles.navActive}` : ""}>
            <Link href="/calendar">
              <a>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Calendar</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname == "/request" ? `${styles.navActive}` : ""}>
            <Link href="/request">
              <a>
                <FontAwesomeIcon icon={faFileLines} />
                <span>Request</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname == "/approval" ? `${styles.navActive}` : ""}>
            <Link href="/approval">
              <a>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Approval</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname == "/entitlement" ? `${styles.navActive}` : ""}>
            <Link href="/entitlement">
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
