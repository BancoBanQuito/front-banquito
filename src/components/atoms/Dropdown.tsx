import React from "react";
import { FormControl, SxProps } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme } from "@emotion/react";
import { ColorPalette } from "../../style/ColorPalette";

interface DropdownProps {
  label: string;
  items: { name: string; value: any }[];
  width: number | string;
  height: number | string;
  defaultValue?: string;
  required?: boolean;
  backgroundColor?: string | "white";
  selectedTextColor?: string | "white";
  onChange?: (value: any) => void;
  inputLabelColor?: string | "white";
  inputFocusedLabelColor?: string | "#4B4B4B";
  value?: string;
  disabled?: boolean;
}

const formControlStyles = (props: DropdownProps) => ({
  width: props.width || 200,
  height: props.height || 50,
});

const selectStyles = (props: DropdownProps): SxProps<Theme> => ({
  margin: 1,
  color: props.backgroundColor === 'white' ? ColorPalette.SECONDARY : props.selectedTextColor || "white",
  "& .MuiSelect-select": {
    backgroundColor: props.backgroundColor,
    borderRadius: "10px",
  },
  "& .MuiSelect-icon": {
    color: props.backgroundColor === 'white' ? ColorPalette.SECONDARY : props.selectedTextColor || "white",
    fontSize: "4rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "10px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: "10px",
  },
});

const inputLabelStyles = (props: DropdownProps) => ({
  color: props.backgroundColor === 'white' ? ColorPalette.SECONDARY : props.inputLabelColor || "white",
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
      <Select
        required={!!props.required}
        sx={selectStyles(props)}
        label={label}
        defaultValue={props.defaultValue}
        onChange={handleChange}
        value={props.value}
        disabled={props.disabled}>
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
