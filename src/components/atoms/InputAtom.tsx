import React, { ChangeEvent } from "react";
import { string, func } from "prop-types";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hintText?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const InputAtom: React.FC<InputProps> = ({
  value,
  onChange,
  hintText,
  disabled = false,
  defaultValue,
}) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        placeholder={hintText}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </>
  );
};

InputAtom.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

export default InputAtom;
