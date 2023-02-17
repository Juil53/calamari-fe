import React, { useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Search.module.scss";

const Search = () => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <div className={styles.searchForm}>
        <input
          ref={inputRef}
          onClick={handleClick}
          type="search"
          required
          className={styles.searchInput}
          placeholder="Type something!"
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
      </div>
    </div>
  );
};

export default Search;
