import Head from "next/head";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import * as Constant from "../constant/constants"

export default function Login() {
    const [signIn, setSignIn] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSignIn({
            ...signIn,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const res = await axios({
            url: "http://localhost:3000/api/login",
            method: "POST",
            data: JSON.stringify(signIn),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                        <form onSubmit={handleSubmit} action="POST">
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
