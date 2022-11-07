import styles from "../styles/Card.module.scss";

function Card({ name, icon }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardText}>{name}</p>
      <span>
        {icon}
      </span>
    </div>
  );
}

export default Card;
