import React from "react";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  label: string | "Dropdown";
  items: string[];
  width?: number | 200;
  height?: number | 50;
  backgroundColor?: string | "white";
  selectedTextColor?: string | "white";
  onChange?: (value: string) => void;
  inputLabelColor?: string | "white";
  inputFocusedLabelColor?: string | "#4B4B4B";
}

const formControlStyles = (props: DropdownProps) => ({
  width: props.width || 200,
  height: props.height || 50,
});

const selectStyles = (props: DropdownProps) => ({
  "& .MuiSelect-select": {
    backgroundColor: props.backgroundColor,
    color: props.selectedTextColor,
  },
  "& .MuiSelect-icon": {
    color: "white",
    fontSize: "4rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: props.backgroundColor,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: props.backgroundColor,
  },
});

const inputLabelStyles = (props: DropdownProps) => ({
  color: props.inputLabelColor || "white",
  fontSize: "1rem",

  "&.Mui-focused": {
    color: props.inputFocusedLabelColor || "#6a6161",
    fontWeight: "bold",
  },
});

export const Dropdown = (props: DropdownProps) => {
  const { label, items } = props;

  const handleChange = (event: SelectChangeEvent) => {
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <FormControl sx={formControlStyles(props)}>
      <InputLabel sx={inputLabelStyles(props)}>{label}</InputLabel>
      <Select sx={selectStyles(props)} label={label} onChange={handleChange}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

/* Example of how to use this atom:

  const mockedItems = ["Item 1", "Item 2", "Item 3"];

  const [selectedItem, setSelectedItem] = useState<string>(mockedItems[0]);

  const handleDropdownChange = (value: string) => setSelectedItem(value);

  return (
    <Dropdown
      label="Dropdown"
      items={mockedItems}
      width={300}
      height={50}
      backgroundColor="lightblue"
      onChange={handleDropdownChange}
    />
  );
*/
