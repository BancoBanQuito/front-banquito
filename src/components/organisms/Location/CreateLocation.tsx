import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Dropdown } from "../../atoms/Dropdown";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";

export const CreateLocation = () => {
  const mockedItems = [
    {
      name: "Provincia",
      value: "Provincia",
    },
    {
      name: "Cantón",
      value: "Cantón",
    },
    {
      name: "Parroquia",
      value: "Parroquia",
    },
  ];

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

  const [dropdownValue, setDropdownValue] = useState("");

  const handleOnChange = (value: string) => {
    setDropdownValue(value);
  };

  return (
    <Box sx={boxStyles()}>
      <Typography variant="h4">Crear Ubicación</Typography>
      <Dropdown
        label="Jerarquía"
        items={mockedItems}
        backgroundColor="#1D3557"
        selectedTextColor="white"
        width={200}
        height={50}
        onChange={handleOnChange}
      />

      {dropdownValue === "Provincia" ? (
        <TextFieldAtom
          id="outlined-basic"
          label="Nombre"
          color="primary"
          type="text"
          placeholder="Nombre"
          variant="outlined"
        />
      ) : dropdownValue === "Cantón" ? (
        <TextFieldAtom
          id="outlined-basic"
          label="Nombre"
          color="primary"
          type="text"
          placeholder="Nombre"
          variant="outlined"
        />
      ) : dropdownValue === "Parroquia" ? (
        <>
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
        </>
      ) : null}

      <SizeButton
        text="Crear"
        style={ButtonStyle.BIG}
        palette={{ backgroundColor: "#1D3557", accent: "#F1FAEE" }}
        onClick={handleClick}
      />
    </Box>
  );
};
