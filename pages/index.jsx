import Head from "next/head";
import Login from "./auth/login";
import styles from "../styles/Home.module.scss"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <Login/>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
