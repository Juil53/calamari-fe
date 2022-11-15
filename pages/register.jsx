import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import { validationUserSchema } from "../validation/validationSchema";
import styles from "../styles/Login.module.scss";
import * as Constant from "../constant/constants";
import Image from "next/image";

export default function Register() {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "STAFF",
        },
        validationSchema: validationUserSchema,
        onSubmit: async (values) => {
            const hash = bcrypt.hashSync(values.password, 10);
            values.password = hash;

            try {
                await axios({
                    url: Constant.usersAPI,
                    method: "POST",
                    data: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                alert("Created success!");
                formik.resetForm();
            } catch (error) {
                alert(error.response.data.message);
            }
        },
    });

    return (
        <div>
            <Head>
                <title>Register</title>
                <meta name="keywords" content="" />
            </Head>
            <div className={styles.bgImage}></div>

            {/* Header */}
            <nav className={styles.head}>
                <div className={styles.logo}>
                    <Image src="/imgs/logo.svg" alt="logo" width={50} height={50}/>
                </div>
                <div className={styles.signup}>
                    <Link href="/">
                        <a className={styles.signup_btn}>
                            <span className={styles.signup_blur}>Already have an account?</span>
                            Sign in
                        </a>
                    </Link>
                </div>
            </nav>

            {/* Form */}
            <div className={styles.bgText}>
                <section className={styles.content}>
                    <h2>Register</h2>
                    <div className={styles.wrapper}>
                        <form onSubmit={formik.handleSubmit} method="POST">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Nguyen Van A..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fullName}
                                className={
                                    formik.touched.fullName &&
                                    formik.errors.fullName &&
                                    `${styles.isInvalid}`
                                }
                            />
                            <span style={{ color: "red" }}>
                                {formik.touched.fullName && formik.errors.fullName ? (
                                    <div style={{ color: "red" }}>{formik.errors.fullName}</div>
                                ) : null}
                            </span>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="nguyenvana@gmail.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={
                                    formik.touched.email &&
                                    formik.errors.email &&
                                    `${styles.isInvalid}`
                                }
                            />
                            <span style={{ color: "red" }}>
                                {formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                            </span>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={
                                    formik.touched.password &&
                                    formik.errors.password &&
                                    `${styles.isInvalid}`
                                }
                            />
                            <span style={{ color: "red" }}>
                                {formik.touched.password && formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                            </span>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword &&
                                    `${styles.isInvalid}`
                                }
                            />
                            <span style={{ color: "red" }}>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </span>
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                name="role"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            >
                                <option value="">Select a role</option>
                                <option value="ADMIN" disabled>
                                    ADMIN
                                </option>
                                <option value="STAFF">STAFF</option>
                                <option value="MANAGER">MANAGER</option>
                            </select>
                            <span style={{ color: "red" }}>
                                {formik.errors.role ? <div>{formik.errors.role}</div> : null}
                            </span>
                            <button type="submit">SUBMIT</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

Register.getLayout = function PageLayout(page) {
    return <>{page}</>;
};
