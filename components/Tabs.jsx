import React from "react";
import styles from "../styles/Tabs.module.scss";

const Tabs = ({ index, setIndex, tabs }) => {
    return (
        <div className={styles.tabs}>
            <div className={styles.tabList}>
                {tabs.map((tab, i) => (
                    <div
                        key={i}
                        className={`${styles.tabHead} ${i == index ? styles.active : null}`}
                        onClick={() => setIndex(i)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
