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
  faGear
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const Sidebar = (props) => {
  const route = useRouter();
  const sidebar = useRef();
  const openSidebar = () => sidebar.current.classList.toggle(styles.active);

  return (
    <nav>
      <div className={`${styles.sidebar}`} ref={sidebar}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <Image
              src="/imgs/logo.svg"
              alt=""
              width={150}
              height={40}
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
          <li className={route.pathname.includes("/calendar") ? `${styles.navActive}` : ""}>
            <Link href="/calendar">
              <a>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Calendar</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/request") ? `${styles.navActive}` : ""}>
            <Link href="/request">
              <a>
                <FontAwesomeIcon icon={faFileLines} />
                <span>Request</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/approval") ? `${styles.navActive}` : ""}>
            <Link href="/approval">
              <a>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Approval</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/users") ? `${styles.navActive}` : ""}>
            <Link href="/users">
              <a>
                <FontAwesomeIcon icon={faChartSimple} />
                <span>Users</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/configuration") ? `${styles.navActive}` : ""}>
            <Link href="/configuration">
              <a>
                <FontAwesomeIcon icon={faGear} />
                <span>Configuration</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
