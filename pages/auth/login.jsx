import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Login.module.scss";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
      });
      if (res.ok) {
        setIsDisabled(true);
      } else {
        router.push({
          pathname: "/auth/error",
          query: {
            error: res.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Image src="/imgs/logo.svg" alt="logo" width={200} height={50} />
        </div>
        <div className={styles.signup}>
          <Link href="/auth/register">
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
          <div className={styles.wrapper}>
            <form method="POST" action="/api/auth/callback/credentials">
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
              <button
                className={styles.signIn}
                type="button"
                onClick={handleSignIn}
                disabled={isDisabled}
              >
                Sign In
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
