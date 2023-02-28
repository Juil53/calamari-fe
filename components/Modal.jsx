import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../styles/Modal.module.scss";

export default function BasicModal({ showModal, onHandleClose, children }) {
  const sendData = () => {
    if (onHandleClose) {
      onHandleClose(false);
    }
  };

  return (
    <div>
      <Modal open={showModal} onClose={sendData}>
        <Box className={styles.box}>{children}</Box>
      </Modal>
    </div>
  );
}
