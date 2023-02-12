import { Box, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { Dropdown } from "../../atoms/Dropdown";
import { SizeButton } from "../../atoms/SizeButton";
import { createProvince, createCanton, createParish } from "./functions";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import { ColorPalette } from "../../../style/ColorPalette";

export const CreateLocation = () => {
  const boxStyles = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    width: '100%',
    maxWidth: 500
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
        : console.log("first")/* alert("Ingrese un nombre de provincia") */
      : dropdownValue === "Cantón"
        ? provinceName && cantonName
          ? createCanton(provinceName, cantonName)
          : console.log("first")/* alert("Ingrese un nombre de provincia y cantón") */
        : dropdownValue === "Parroquia"
          ? provinceName && cantonName && parishName && zipCode
            ? createParish(provinceName, cantonName, parishName, zipCode)
            : console.log("first")/* alert("Ingrese un nombre de provincia, cantón, parroquia y código postal") */
          : console.log("first")/* alert("Seleccione una jerarquía"); */
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
        width={'100%'}
        height={'auto'}
        onChange={handleOnChange}
        inputLabelColor="white"
      />

      {dropdownValue === "Provincia" ? (
        <TextFieldAtom
          fullWidth
          label="Nombre de provincia"
          color="primary"
          type="text"
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
        />
      ) : dropdownValue === "Cantón" ? (
        <>
          <TextFieldAtom
            fullWidth
            label="Nombre de provincia"
            color="primary"
            type="text"
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
          />
          <TextFieldAtom
            fullWidth
            label="Nombre de cantón"
            color="primary"
            type="text"
            value={cantonName}
            onChange={(e) => setCantonName(e.target.value)}
          />
        </>
      ) : dropdownValue === "Parroquia" ? (
        <>
          <TextFieldAtom
            fullWidth
            label="Nombre de provincia"
            color="primary"
            type="text"
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
          />
          <TextFieldAtom
            fullWidth
            label="Nombre de cantón"
            color="primary"
            type="text"
            value={cantonName}
            onChange={(e) => setCantonName(e.target.value)}
          />
          <TextFieldAtom
            fullWidth
            label="Nombre de parroquia"
            color="primary"
            type="text"
            value={parishName}
            onChange={(e) => setParishName(e.target.value)}
          />
          <TextFieldAtom
            fullWidth
            label="Codigo Postal"
            color="primary"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </>
      ) : null}

      <SizeButton
        text="Crear"
        style={ButtonStyle.BIG}
        palette={{ backgroundColor: ColorPalette.PRIMARY }}
        onClick={handleClick}
      />
    </Box>
  );
};
