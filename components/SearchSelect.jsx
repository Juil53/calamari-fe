import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SearchSelect({ fieldName, types, status }) {
  const [options, setOptions] = React.useState("");

  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-simple-select-standard-label">{fieldName}</InputLabel>
      <Select value={options} onChange={handleChange} label="Type">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {types && types.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
        {status && status.map((stat) => <MenuItem value={stat}>{stat}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
