import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import styles from "../styles/PasswordInput.module.scss";

const PasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState("password");

  const handleShowPassword = () =>{
    if(isShowPassword === "password" ){
      setIsShowPassword("text");
    }else{
      setIsShowPassword("password");
    }
  }

  return (
    <div className={styles.password}>
      <label htmlFor="password">Password</label>
      <input type={isShowPassword} id="password" />
      <FontAwesomeIcon
        icon={isShowPassword === "password" ? faEyeSlash : faEye}
        className={styles.icon}
        onClick={handleShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
