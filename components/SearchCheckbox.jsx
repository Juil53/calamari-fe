import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import React, { useState } from "react";

export default function SearchCheckbox({ status }) {
  console.log(status);
  const [state, setState] = useState(status);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormGroup sx={{ flexDirection: "row" }}>
          {status.map((stat) => (
            <FormControlLabel
              key={`${stat}`}
              control={<Checkbox onChange={handleChange} name={stat} />}
              label={stat}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
