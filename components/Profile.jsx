import { signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Profile.module.scss";

function Profile({ user }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper} onClick={handleSignOut}>
      <Image className={styles.avatar} src={user.avatar} width={50} height={50} alt="avatar" />
      <div className={styles.info}>
        <h3 className={styles.username}>{user.fullName}</h3>
        <span className={styles.role}>{user.role}</span>
      </div>
    </div>
  );
}

export default Profile;
