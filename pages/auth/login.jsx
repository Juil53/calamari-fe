import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.scss";
import errors from "../../utils/errorMessage";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const SignInError = ({ error }) => {
    const errorMessage = error && (errors[error] ?? errors.default);
    return <p className={styles.errorText}>{errorMessage}</p>;
  };

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
      setIsDisabled(true);
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      if (res.ok) {
        router.push("/user/dashboard");
      } else {
        setError(res.error);
        setIsDisabled(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <nav className={styles.head}>
        <div className={styles.headerText}>LEAVE MANAGEMENT</div>
      </nav>

      <div className={styles.bgText}>
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
              <div className={styles.error}>{error && <SignInError error={error} />}</div>
            </form>
            <div className={styles.registerSection}>
              <p className={styles.registerText}>
                <span className={styles.registerHighlight}>Don't have an account yet?</span>
                Contact Admin to register!
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
