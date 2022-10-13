import React from "react";
import styles from "../styles/Tabs.module.scss";

const Tabs = ({index,setIndex}) => {
  
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        <div
          className={`${styles.tabHead} ${index == 0 ? styles.active : null}`}
          onClick={() => setIndex(0)}
        >
          FOR APPROVAL
        </div>
        <div
          className={`${styles.tabHead} ${index == 1 ? styles.active : null}`}
          onClick={() => setIndex(1)}
        >
          HISTORY
        </div>
      </div>
    </div>
  );
};

export default Tabs;
