import React from "react";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ColorType } from "../../types/ColorType";

interface Props {
  label: string;
  value: number | string | Dayjs | null;
  color?: ColorType;
  onChange: (newValue: Dayjs | null) => void;
  fullWidth?: boolean;
  required?: boolean;
}


const DatePickerAtom = (props: Props) => {
  const handleChange = (newValue: Dayjs | null) => {
    props.onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={props.value}
        onChange={handleChange}
        renderInput={(params) => <TextField
          sx={{ margin: 1 }}
          color={props.color}
          required={!!props.required}
          fullWidth={!!props.fullWidth} {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerAtom;
