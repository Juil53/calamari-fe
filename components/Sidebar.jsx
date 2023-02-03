import {
  faBars,
  faCalendar,
  faChartSimple,
  faCircleCheck,
  faFileLines,
  faGear,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import Profile from "./Profile";

const Sidebar = (props) => {
  const route = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const openSidebar = () => setOpen(!open);

  const conditionRenderSidebar = () => {
    if (session?.role == "admin") {
      return (
        <ul className={styles.nav_lists}>
          <li className={route.pathname == "/staff/apply" ? `${styles.navActive}` : ""}>
            <Link href="/staff/apply">
              <a>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>Apply</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/staff/calendar") ? `${styles.navActive}` : ""}>
            <Link href="/staff/calendar">
              <a>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Calendar</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/staff/request") ? `${styles.navActive}` : ""}>
            <Link href="/staff/requests">
              <a>
                <FontAwesomeIcon icon={faFileLines} />
                <span>Request</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/admin/approval") ? `${styles.navActive}` : ""}>
            <Link href="/admin/approval">
              <a>
                <FontAwesomeIcon icon={faCircleCheck} />
                <span>Approval</span>
              </a>
            </Link>
          </li>
          <li className={route.pathname.includes("/staff/people") ? `${styles.navActive}` : ""}>
            <Link href="/staff/people">
              <a>
                <FontAwesomeIcon icon={faChartSimple} />
                <span>People</span>
              </a>
            </Link>
          </li>
          <li
            className={route.pathname.includes("/admin/configuration") ? `${styles.navActive}` : ""}
          >
            <Link href="/admin/configuration">
              <a>
                <FontAwesomeIcon icon={faGear} />
                <span>Configuration</span>
              </a>
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className={styles.nav_lists}>
        <li className={route.pathname == "/staff/apply" ? `${styles.navActive}` : ""}>
          <Link href="/staff/apply">
            <a>
              <FontAwesomeIcon icon={faPenToSquare} />
              <span>Apply</span>
            </a>
          </Link>
        </li>
        <li className={route.pathname.includes("/staff/calendar") ? `${styles.navActive}` : ""}>
          <Link href="/staff/calendar">
            <a>
              <FontAwesomeIcon icon={faCalendar} />
              <span>Calendar</span>
            </a>
          </Link>
        </li>
        <li className={route.pathname.includes("/staff/request") ? `${styles.navActive}` : ""}>
          <Link href="/staff/requests">
            <a>
              <FontAwesomeIcon icon={faFileLines} />
              <span>Request</span>
            </a>
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div className={open ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
        <div className={styles.menu}>
          {/* Logo */}
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>
              <Link href="/">
                <Image
                  src="/imgs/logo.svg"
                  alt=""
                  width={150}
                  height={40}
                  className={styles.brandLogo}
                />
              </Link>
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
          {conditionRenderSidebar()}
        </div>

        {/* Profile */}
        {session ? <Profile user={session.user} open={open} /> : null}
      </div>
    </nav>
  );
};

export default Sidebar;
