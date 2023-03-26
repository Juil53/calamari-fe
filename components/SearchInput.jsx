import * as React from "react";
import TextField from "@mui/material/TextField";

export default function SearchInput() {
  return (
    <TextField
      label="Submitter"
      variant="outlined"
      sx={{ m: 1, minWidth: 150, flexGrow: 1 }}
      size="small"
    />
  );
}
