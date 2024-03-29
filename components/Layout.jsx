import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.scss";
import { useState, memo } from "react";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  switch (session?.role) {
    case "admin":
      return (
        <div className="layout">
          <Sidebar changeStatus={(show) => setShow(show)} show={show} />
          <div className={show === true ? styles.activeContent : styles.content}>{children}</div>
        </div>
      );

    default:
      return <div className={styles.staffContent}>{children}</div>;
  }
};

export default memo(Layout);
