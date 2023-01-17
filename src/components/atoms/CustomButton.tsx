
import React from "react";
import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)`
&{
  border-radius: 10px;
  transition: all .3s ease-out;
}
&:hover{
  filter: opacity(0.75);
  transition: all .3s ease-in-out;
}`;

export default CustomButton;