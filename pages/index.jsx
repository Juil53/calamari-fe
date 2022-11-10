import Head from "next/head";
import styles from "../styles/Login.module.scss";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="keywords" content="" />
      </Head>

      <div className={styles.bgImage}></div>

      {/* Header */}
      <nav className={styles.head}>
        <div className={styles.logo}>
          <img src="/imgs/logo.svg" alt="logo" />
        </div>
        <div className={styles.signup}>
          <Link href="/register">
            <a className={styles.signup_btn}>
              <span className={styles.signup_blur}>Don't have an account yet?</span>
              Sign up
            </a>
          </Link>
        </div>
      </nav>

      <div className={styles.bgText}>
        {/* Form */}
        <section className={styles.content}>
          <h2>Login</h2>
          <div className={styles.wrapper}>
            <form action="POST">
              <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="jonsnow@gmail.com" />
              </div>
              <div className={styles.password}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="" />
              </div>
              <button type="submit" className={styles.submit}>
                Login
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
