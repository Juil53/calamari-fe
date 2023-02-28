import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import BasicModal from "../../components/Modal";
import styles from "../../styles/LogOut.module.scss";

function Logout() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleRedirectBack = () => {
    setOpen(false);
    router.back();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` })
  }

  return (
    <BasicModal showModal={open}>
      <div className={styles.title}>
        <h2>LOG OUT</h2>
      </div>
      <Divider />
      <div className={styles.content}>
        <span>Are you sure?</span>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleSignOut} size="small" variant="contained" color="primary">
          Yes
        </Button>
        <Button onClick={handleRedirectBack} size="small" variant="contained" color="error">
          No
        </Button>
      </div>
    </BasicModal>
  );
}

export default Logout;

Logout.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
