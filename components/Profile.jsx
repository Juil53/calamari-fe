import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Profile.module.scss";

function Profile({ user, open }) {
  const router = useRouter()
  const handleSignOut = () => {
    signOut(router.push('/auth/logout'));
  };

  if (!user) return null;

  return (
    <div
      className={open ? `${styles.wrapper} ${styles.active}` : `${styles.wrapper}`}>
      <div className={styles.avatarWrapper} onClick={handleSignOut}>
        <Image className={styles.avatar} src={user.avatar ? user.avatar : '/imgs/default_avatar.jpg'} width={50} height={50} alt="avatar" />
      </div>
      <div className={open ? `${styles.info} ${styles.active}` : `${styles.info}`}>
        <p className={styles.username}>{user.fullName}</p>
        <span className={styles.role}>{user.role}</span>
      </div>
    </div>
  );
}

export default Profile;
