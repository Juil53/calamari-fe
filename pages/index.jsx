import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import * as Constant from "../constant/constants";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [signIn, setSignIn] = useState({});
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: "https://dvhnghia-backend.herokuapp.com/login",
        method: "POST",
        data: JSON.stringify(signIn),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    // router.push("/apply")
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />

        <title>Login</title>
        <meta name="keywords" content="" />
      </Head>

      <div className={styles.bgImage}></div>

      {/* Header */}
      <nav className={styles.head}>
        <div className={styles.logo}>
          <Image src="/imgs/logo.svg" alt="logo" width={200} height={50} />
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
            <form onSubmit={handleSubmit} method="POST">
              <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="jonsnow@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.password}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder=""
                  onChange={handleChange}
                />
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
