import React from "react";
import { FormControl, SxProps } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme } from "@emotion/react";

interface DropdownProps {
  label: string;
  items: { name: string; value: any }[];
  width: number | string;
  height: number | string;
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

const selectStyles = (props: DropdownProps): SxProps<Theme> => ({
  color: props.selectedTextColor || "white",
  "& .MuiSelect-select": {
    backgroundColor: props.backgroundColor,
    borderRadius: "10px",
  },
  "& .MuiSelect-icon": {
    color: "white",
    fontSize: "4rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: props.backgroundColor,
    borderRadius: "10px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: props.backgroundColor,
    borderRadius: "10px",
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
          <MenuItem key={index} value={item.value}>
            {item.name}
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
