import styles from "../styles/PageNotFound.module.scss";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <section className={styles.page_404}>
      <div className={styles.container}>
        <div className={styles.fourZeroFourBg}>
          <h2>404</h2>
        </div>
        <div className={styles.contant_box_404}>
          <h3>Look like you're lost</h3>
          <p>the page you are looking for not available!</p>
          <Link href="/staff/apply">
            <a className={styles.link_404}>Go to Home</a>
          </Link>
        </div>
      </div>
    </section>
  );
}

PageNotFound.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
