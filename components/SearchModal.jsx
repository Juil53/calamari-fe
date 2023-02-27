import React from "react";
import SearchInput from "./SearchInput";
import SearchSelect from "./SearchSelect";
import styles from "../styles/SearchModal.module.scss";
import CalendarPicker from "./CalendarPicker";
import { Button } from "@mui/material";

const status = ["Approved", "Pending", "Withdraw","Cancelled"];
const types = ["Remote", "Sick", "Holiday", "OFF"];

const SearchModal = () => {
  return (
    <div className={styles.searchWrapper}>
      <h2>FILTER MODAL</h2>
      <div className={styles.searchModal}>
        <SearchInput fieldName="Name" />
        <SearchSelect fieldName="Type" types={types} />
        <SearchSelect fieldName="Status" status={status} />
        <CalendarPicker name="From" />
        <CalendarPicker name="To" />
      </div>
      <div className={styles.searchActions}>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchModal;
