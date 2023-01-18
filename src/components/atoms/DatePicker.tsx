import React from "react";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  label: string;
  value?: Dayjs;
  onChange: (newValue: Dayjs | null) => void;
}

const DatePickerAtom = (props: Props) => {
  const [value, setValue] = React.useState<Dayjs>();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={value as Dayjs}
        onChange={(newValue) => {
          setValue(newValue as Dayjs);
          props.onChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerAtom;
