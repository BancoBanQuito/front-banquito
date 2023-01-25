import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { createCanton, createParish, createProvince } from "./functions";
import { Dropdown } from "src/components/atoms/Dropdown";
import { SizeButton } from "src/components/atoms/SizeButton";
import { ButtonStyle } from "src/style/ButtonStyle";

export const CreateLocation = () => {
  const boxStyles = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  });

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

  const [dropdownValue, setDropdownValue] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [cantonName, setCantonName] = useState("");
  const [parishName, setParishName] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleClick = () => {
    dropdownValue === "Provincia"
      ? provinceName
        ? createProvince(provinceName)
        : alert("Ingrese un nombre de provincia")
      : dropdownValue === "Cantón"
      ? provinceName && cantonName
        ? createCanton(provinceName, cantonName)
        : alert("Ingrese un nombre de provincia y cantón")
      : dropdownValue === "Parroquia"
      ? provinceName && cantonName && parishName && zipCode
        ? createParish(provinceName, cantonName, parishName, zipCode)
        : alert(
            "Ingrese un nombre de provincia, cantón, parroquia y código postal"
          )
      : alert("Seleccione una jerarquía");
  };

  const handleOnChange = (value: string) => {
    setProvinceName("");
    setCantonName("");
    setParishName("");
    setZipCode("");
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
        inputLabelColor="white"
      />

      {dropdownValue === "Provincia" ? (
        <TextField
          id="outlined-basic"
          label="Nombre de provincia"
          color="primary"
          type="text"
          variant="outlined"
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
        />
      ) : dropdownValue === "Cantón" ? (
        <>
          <TextField
            id="outlined-basic"
            label="Nombre de provincia"
            color="primary"
            type="text"
            variant="outlined"
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nombre de cantón"
            color="primary"
            type="text"
            variant="outlined"
            value={cantonName}
            onChange={(e) => setCantonName(e.target.value)}
          />
        </>
      ) : dropdownValue === "Parroquia" ? (
        <>
          <TextField
            id="outlined-basic"
            label="Nombre de provincia"
            color="primary"
            type="text"
            variant="outlined"
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nombre de cantón"
            color="primary"
            type="text"
            variant="outlined"
            value={cantonName}
            onChange={(e) => setCantonName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nombre de parroquia"
            color="primary"
            type="text"
            variant="outlined"
            value={parishName}
            onChange={(e) => setParishName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Codigo Postal"
            color="primary"
            type="text"
            variant="outlined"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
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
