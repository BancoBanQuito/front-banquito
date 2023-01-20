import React from "react";
import { Box, Typography } from "@mui/material";
import { Dropdown } from "../../atoms/Dropdown";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";

export const CreateLocation = () => {
  const mockedItems = ["Provincia", "Cantón", "Parroquia"];

  const boxStyles = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  });

  const handleClick = () => {
    console.log("Click");
  };

  return (
    <Box sx={boxStyles()}>
      <Typography variant="h4">Crear Ubicación</Typography>
      <Dropdown
        label="Jerarquía"
        items={mockedItems}
        backgroundColor="#1D3557"
        selectedTextColor="white"
      />
      <TextFieldAtom
        id="outlined-basic"
        label="Nombre"
        color="primary"
        type="text"
        placeholder="Nombre"
        variant="outlined"
      />

      <TextFieldAtom
        id="outlined-basic"
        label="Codigo Postal"
        color="primary"
        type="text"
        placeholder="Codigo Postal"
        variant="outlined"
      />

      <SizeButton
        text="Crear"
        style={ButtonStyle.BIG}
        palette={{ backgroundColor: "#1D3557", accent: "#F1FAEE" }}
        onClick={handleClick}
      />
    </Box>
  );
};
