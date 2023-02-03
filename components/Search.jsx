import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styles from "../styles/Search.module.scss";

const Search = () => {
  const inputRef = useRef(null);
  const triggerFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <form action="" className={styles.searchForm} onClick={triggerFocusInput}>
        <input ref={inputRef} type="search" required className={styles.searchInput} placeholder="Type something!"/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
      </form>
    </div>
  );
};

export default Search;
