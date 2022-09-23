import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.scss"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className={styles.content}>
        <h1>Content here</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
