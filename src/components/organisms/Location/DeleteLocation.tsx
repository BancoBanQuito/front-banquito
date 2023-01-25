import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  deleteCanton,
  deleteParish,
  deleteProvince,
  getCantons,
  getParishes,
  getProvinces,
} from "./functions";
import { Dropdown } from "/src/components/atoms/Dropdown";
import { SizeButton } from "/src/components/atoms/SizeButton";
import { ButtonStyle } from "/src/style/ButtonStyle";
import { ColorPalette } from "/src/style/ColorPalette";
import { Province, Canton, Parish } from "./types";

export const DeleteLocation = () => {
  const boxStyles = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  });

  const [dropDownValue, setDropdownValue] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cantons, setCantons] = useState<Canton[]>([]);
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    dropDownValue && name
      ? dropDownValue === "Provincia"
        ? deleteProvince(name)
        : dropDownValue === "Cantón"
        ? deleteCanton(name)
        : dropDownValue === "Parroquia"
        ? deleteParish(name)
        : null
      : alert("Asegúrese de llenar todos los campos");
  };

  useEffect(() => {
    setName("");
    dropDownValue === "Provincia"
      ? getProvinces().then(setProvinces)
      : dropDownValue === "Cantón"
      ? getCantons().then(setCantons)
      : dropDownValue === "Parroquia"
      ? getParishes().then(setParishes)
      : null;
  }, [dropDownValue]);

  return (
    <Box sx={boxStyles()}>
      <Typography variant="h4">Eliminar Ubicaciones</Typography>
      <Dropdown
        label="Jerarquía"
        items={[
          { name: "Provincia", value: "Provincia" },
          { name: "Cantón", value: "Cantón" },
          { name: "Parroquia", value: "Parroquia" },
        ]}
        width={200}
        height={70}
        backgroundColor={ColorPalette.TERNARY}
        selectedTextColor={ColorPalette.ACCENT}
        inputLabelColor={ColorPalette.ACCENT}
        inputFocusedLabelColor={ColorPalette.ACCENT}
        onChange={(value) => setDropdownValue(value)}
      />
      {dropDownValue === "Provincia" ? (
        <Dropdown
          label="Nombre de la Provincia"
          items={provinces.map((province) => ({
            name: province.provinceName,
            value: province.provinceName,
          }))}
          width={250}
          height={70}
          backgroundColor={ColorPalette.TERNARY}
          selectedTextColor={ColorPalette.ACCENT}
          inputLabelColor={ColorPalette.ACCENT}
          inputFocusedLabelColor={ColorPalette.ACCENT}
          onChange={(value) => setName(value)}
        />
      ) : dropDownValue === "Cantón" ? (
        <Dropdown
          label="Nombre del Cantón"
          items={cantons.map((canton) => ({
            name: canton.cantonName,
            value: canton.cantonName,
          }))}
          width={250}
          height={70}
          backgroundColor={ColorPalette.TERNARY}
          selectedTextColor={ColorPalette.ACCENT}
          inputLabelColor={ColorPalette.ACCENT}
          inputFocusedLabelColor={ColorPalette.ACCENT}
          onChange={(value) => setName(value)}
        />
      ) : dropDownValue === "Parroquia" ? (
        <Dropdown
          label="Nombre de la Parroquia"
          items={parishes.map((parish) => ({
            name: parish.parishName,
            value: parish.parishName,
          }))}
          width={250}
          height={70}
          backgroundColor={ColorPalette.TERNARY}
          selectedTextColor={ColorPalette.ACCENT}
          inputLabelColor={ColorPalette.ACCENT}
          inputFocusedLabelColor={ColorPalette.ACCENT}
          onChange={(value) => setName(value)}
        />
      ) : null}

      <SizeButton
        palette={{ backgroundColor: ColorPalette.TERNARY }}
        icon=""
        onClick={handleSubmit}
        text="Eliminar"
        style={ButtonStyle.BIG}
      />
    </Box>
  );
};
