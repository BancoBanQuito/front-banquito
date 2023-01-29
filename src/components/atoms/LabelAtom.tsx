import React from "react";
import { string } from "prop-types";

interface LabelProps {
  text: string;
  fontStyle?: string;
  fontSize?: string;
  color?: string;
}

const LabelAtom: React.FC<LabelProps> = ({
  text,
  fontStyle,
  fontSize,
  color,
}) => {
  return (
    <label style={{ fontStyle: fontStyle, fontSize: fontSize, color: color }}>
      {text}
    </label>
  );
};

LabelAtom.propTypes = {
  text: string.isRequired,
};

export default LabelAtom;
