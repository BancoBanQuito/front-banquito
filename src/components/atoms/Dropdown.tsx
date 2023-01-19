import React from "react";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownProps {
  label: string;
  items: string[];
  width: number | string;
  height: number | string;
  backgroundColor?: string | "white";
  onChange?: (value: string) => void;
}

const formControlStyles = (props: DropdownProps) => ({
  width: props.width,
  height: props.height,
});

const selectStyles = (props: DropdownProps) => ({
  "& .MuiSelect-select": {
    backgroundColor: props.backgroundColor,
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

const inputLabelStyles = () => ({
  color: "white",
  fontSize: "1rem",
  "&.Mui-focused": {
    color: "black",
  },
});

export const Dropdown = (props: DropdownProps) => {
  const { label, items } = props;

  const handleChange = (event: SelectChangeEvent) => {
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <FormControl sx={formControlStyles(props)}>
      <InputLabel sx={inputLabelStyles}>{label}</InputLabel>
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
