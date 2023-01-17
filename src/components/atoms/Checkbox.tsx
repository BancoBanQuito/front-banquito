import React from "react";
import { Box, Checkbox as MuiCheckbox } from "@mui/material";

/* Example of how to use this atom:

 const [isCheck, setIsCheck] = useState(false);

  const handleChange = (value: boolean) => setIsCheck(value);

  return (
    <>
      <Checkbox
        label="This is a label"
        onChange={handleChange}
        defaultChecked={false}
        checkedColor="red"
      />
    </>
  );
  
*/

interface CheckboxProps {
  label: string;
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
  checkedColor?: string;
  size?: "small" | "medium";
}

const MuiCheckboxStyles = (props: CheckboxProps) => ({
  "&.Mui-checked": {
    color: props.checkedColor || "default",
  },
});

export const Checkbox = (props: CheckboxProps) => {
  const { label, onChange, defaultChecked } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <Box>
      <MuiCheckbox
        size={props.size || "medium"}
        sx={MuiCheckboxStyles(props)}
        onChange={handleChange}
        color="primary"
        inputProps={{ "aria-label": label }}
        defaultChecked={defaultChecked}
      />
      {label}
    </Box>
  );
};
