import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  label: string;
  items: string[];
}

export const Dropdown = (props: DropdownProps) => {
  const { label, items } = props;

  const [dropDownValue, setDropDownValue] = useState<string>();
  const handleChange = (event: SelectChangeEvent) => {
    setDropDownValue(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={dropDownValue} onChange={handleChange}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
