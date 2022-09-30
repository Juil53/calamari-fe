import PasswordInput from "../components/PasswordInput";

import styles from "../styles/SetNewPassword.module.scss";

export default function SetNewPassword() {
  return (
    <div className={styles.container}>
      <div className={styles.setnewpassword__container}>
        <div className={styles.logo}>
          <img src="/imgs/logo.svg" alt="logo" />
        </div>
        <section className={styles.content}>
          <h2>Set a new password</h2>
          <div className={styles.wrapper}>
            <form action="POST">
              <PasswordInput/>
              <PasswordInput/>
              <input
                type="submit"
                value="Set a password"
                className={styles.submit}
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

SetNewPassword.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
