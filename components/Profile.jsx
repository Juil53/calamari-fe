import { signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Profile.module.scss";

function Profile({ user, open }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };

  if (!user) return null;

  return (
    <div
      className={open ? `${styles.wrapper} ${styles.active}` : `${styles.wrapper}`}>
      <div className={styles.avatarWrapper} onClick={handleSignOut}>
        <Image className={styles.avatar} src={user.avatar} width={50} height={50} alt="avatar" />
      </div>
      <div className={open ? `${styles.info} ${styles.active}` : `${styles.info}`}>
        <p className={styles.username}>{user.fullName}</p>
        <span className={styles.role}>{user.role}</span>
      </div>
    </div>
  );
}

export default Profile;
