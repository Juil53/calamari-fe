import React from "react";
import SearchInput from "./SearchInput";
import SearchSelect from "./SearchSelect";
import styles from "../styles/SearchBox.module.scss";
import CalendarPicker from "./CalendarPicker";

const status = ["Pending", "Approved", "Declined"];
const types = ["Remote", "Sick", "Holiday", "OFF"];

const SearchBox = () => {
  return (
    <div className={styles.searchWrapper}>
      <h3>Search</h3>
      <div className={styles.searchBox}>
        <SearchInput fieldName="Name" />
        <SearchSelect fieldName="Type" types={types} />
        <SearchSelect fieldName="Status" status={status} />
        <CalendarPicker name="From" />
        <CalendarPicker name="To" />
      </div>
    </div>
  );
};

export default SearchBox;
