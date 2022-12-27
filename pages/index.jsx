import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.logo}>
          <Image src="/imgs/logo.svg" alt="logo" width={200} height={50} />
        </div>
        <div className={styles.intro}>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore et ea officiis
            quis, at eum inventore voluptas nobis sint.
          </p>
          <Link href={session ? "/apply" : "/auth/login"} passHref>
            <button className={styles.start}>
              Get started!
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
