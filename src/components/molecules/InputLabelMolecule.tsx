import React from "react";
import InputAtom from "../atoms/InputAtom";
import LabelAtom from "../atoms/LabelAtom";

interface LabelInputProps {
  text: string;
  fontStyle?: string;
  fontSize?: string;
  color?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hintText?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const LabelInputMolecule: React.FC<LabelInputProps> = ({
  text,
  fontStyle,
  fontSize,
  color,
  value,
  onChange,
  hintText,
  disabled = false,
  defaultValue,
}) => {
  return (
    <>
      <LabelAtom
        text={text}
        fontStyle={fontStyle}
        fontSize={fontSize}
        color={color}
      />
      <InputAtom
        value={value}
        onChange={onChange}
        hintText={hintText}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default LabelInputMolecule;
