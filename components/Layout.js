import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.scss";
import { useState } from "react";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="layout">
      <Sidebar changeStatus={(show) => setShow(show)} show={show}/>
      <div className={show === true ? styles.activeContent : styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
