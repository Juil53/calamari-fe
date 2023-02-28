import {
  faBars, faChartSimple,
  faCircleCheck, faGear,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";

const Sidebar = (props) => {
  const route = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const openSidebar = () => setOpen(!open);

  const adminMenu = () => {
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
  };

  if (session?.role == "admin") {
    return (
      <nav>
        <div className={open ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
          <div className={styles.menu}>
            {/* Logo */}
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                <Link href="/">
                  <img
                    src="/imgs/logo.svg"
                    alt="logo"
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
            {adminMenu()}
          </div>

          {/* Profile */}
          {/* {session ? <Profile user={session.user} open={open} /> : null} */}
        </div>
      </nav>
    );
  }
};

export default Sidebar;
