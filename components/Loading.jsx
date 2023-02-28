import styles from "../styles/Loading.module.scss";

const Loading = () => {
  return (
    <>
      <div className={styles.customLoader}>
        <h4 className={styles.loadingText}>Loading...</h4>
      </div>
    </>
  );
};

export default Loading;
