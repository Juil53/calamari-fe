import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CalendarPicker({name}) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={name}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} size="small" sx={{ m: 1 }} />}
      />
    </LocalizationProvider>
  );
}
