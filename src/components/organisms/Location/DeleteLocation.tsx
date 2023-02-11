import { Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { Dropdown } from "../../atoms/Dropdown";
import { SizeButton } from "../../atoms/SizeButton";
import { deleteProvince, deleteCanton, deleteParish, getProvinces, getCantons, getParishes } from "./functions";
import { Province, Canton, Parish } from "./types";


export const DeleteLocation = () => {
  const boxStyles = () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: '100%',
    maxWidth: 500
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
      : console.log("first") /* alert("Asegúrese de llenar todos los campos"); */
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: 600
    }}>
      <Container>
        <Typography variant="h4">Eliminar Ubicaciones</Typography>
      </Container>
      <Dropdown
        label="Jerarquía"
        items={[
          { name: "Provincia", value: "Provincia" },
          { name: "Cantón", value: "Cantón" },
          { name: "Parroquia", value: "Parroquia" },
        ]}
        width={'100%'}
        height={'auto'}
        backgroundColor={ColorPalette.TERNARY}
        onChange={(value) => setDropdownValue(value)}
      />
      {dropDownValue === "Provincia" ? (
        <Dropdown
          label="Nombre de la Provincia"
          items={provinces.map((province) => ({
            name: province.provinceName,
            value: province.provinceName,
          }))}
          width={'100%'}
          height={'auto'}
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
          width={'100%'}
          height={'auto'}
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
          width={'100%'}
          height={'auto'}
          backgroundColor={ColorPalette.TERNARY}
          selectedTextColor={ColorPalette.ACCENT}
          inputLabelColor={ColorPalette.ACCENT}
          inputFocusedLabelColor={ColorPalette.ACCENT}
          onChange={(value) => setName(value)}
        />
      ) : null}

      <SizeButton
        palette={{ backgroundColor: ColorPalette.PRIMARY }}
        icon=""
        onClick={handleSubmit}
        text="Eliminar"
        style={ButtonStyle.BIG}
      />
    </Box>
  );
};
