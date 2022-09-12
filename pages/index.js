import Head from "next/head";
import styles from "../styles/Login.module.scss";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="keywords" content="" />
      </Head>
      <div className={styles.container}>
        <nav className={styles.head}>
          <div className={styles.logo}>
            <img src="/imgs/logo.svg" alt="logo" />
          </div>
          <div className={styles.signup}>
            <a href="#" className={styles.signup_blur}>
              Don't have an account yet?
            </a>
            <a href="#" className={styles.signup_btn}>Sign up</a>
          </div>
        </nav>
        <section className={styles.content}>
          <h2>Login</h2>
          <div className={styles.wrapper}>
            <form action="POST">
              <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
              </div>
              <div className={styles.password}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
              </div>
              <input type="submit" value="Login" className={styles.submit} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
