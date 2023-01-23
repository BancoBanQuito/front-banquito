import React from "react";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  label: string;
  value: Dayjs|null;
  onChange: (newValue: Dayjs | null) => void;
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
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerAtom;
