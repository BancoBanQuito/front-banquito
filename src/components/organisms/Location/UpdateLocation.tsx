import { Box, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { Dropdown } from "../../atoms/Dropdown";
import { SizeButton } from "../../atoms/SizeButton";
import { updateProvince, updateCanton, updateParish, getProvinces, getCantons, getParishes } from "./functions";
import { Province, Canton, Parish } from "./types";

export const UpdateLocation = () => {
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

  const [dropdownValue, setDropdownValue] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cantons, setCantons] = useState<Canton[]>([]);
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [provinceName, setProvinceName] = useState("");
  const [newProvinceName, setNewProvinceName] = useState("");
  const [cantonName, setCantonName] = useState("");
  const [newCantonName, setNewCantonName] = useState("");
  const [parroquiaName, setParroquiaName] = useState("");
  const [newParroquiaName, setNewParroquiaName] = useState("");
  const [newZipCode, setNewZipCode] = useState("");

  const handleOnChange = (value: string) => {
    setNewProvinceName("");
    setNewCantonName("");
    setNewParroquiaName("");
    setDropdownValue(value);
  };

  const handleClick = () => {
    dropdownValue === "Provincia"
      ? provinceName && newProvinceName
        ? updateProvince(provinceName, newProvinceName)
        : alert("Seleccione una provincia e ingrese un nombre de provincia")
      : dropdownValue === "Cantón"
      ? cantonName && newCantonName
        ? updateCanton(cantonName, newCantonName)
        : alert("Seleccione un cantón e ingrese un nombre de cantón")
      : dropdownValue === "Parroquia"
      ? parroquiaName && newZipCode && newParroquiaName
        ? updateParish(parroquiaName, newParroquiaName, newZipCode)
        : alert(
            "Seleccione una parroquia, ingrese un nombre de parroquia y un código postal"
          )
      : alert("Seleccione una jerarquía");
  };

  useEffect(() => {
    getProvinces().then(setProvinces);
    getCantons().then(setCantons);
    getParishes().then(setParishes);
  }, [dropdownValue]);

  return (
    <Box sx={boxStyles}>
      <Typography variant="h4">Actualizar Ubicación</Typography>
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
        <DropDownValueComponent
          items={provinces}
          setHierarchyName={setProvinceName}
          newHierarchyName={newProvinceName}
          setNewHierarchyName={setNewProvinceName}
          dropdownValue={dropdownValue}
        />
      ) : dropdownValue === "Cantón" ? (
        <DropDownValueComponent
          items={cantons}
          setHierarchyName={setCantonName}
          newHierarchyName={newCantonName}
          setNewHierarchyName={setNewCantonName}
          dropdownValue={dropdownValue}
        />
      ) : dropdownValue === "Parroquia" ? (
        <DropDownValueComponent
          items={parishes}
          setHierarchyName={setParroquiaName}
          newHierarchyName={newParroquiaName}
          setNewHierarchyName={setNewParroquiaName}
          dropdownValue={dropdownValue}
          zipCode={newZipCode}
          setZipCode={setNewZipCode}
        />
      ) : null}
      <SizeButton
        text="Actualizar"
        style={ButtonStyle.BIG}
        palette={{ backgroundColor: "#1D3557", accent: "#F1FAEE" }}
        onClick={handleClick}
      />
    </Box>
  );
};

const isProvince = (item: Province | Canton | Parish): item is Province => {
  return (item as Province).provinceName !== undefined;
};

const isCanton = (item: Province | Canton | Parish): item is Canton => {
  return (item as Canton).cantonName !== undefined;
};

const isParish = (item: Province | Canton | Parish): item is Parish => {
  return (item as Parish).parishName !== undefined;
};

interface DropDownValueComponentProps {
  items: Province[] | Canton[] | Parish[];
  setHierarchyName: (value: string) => void;
  newHierarchyName: string;
  setNewHierarchyName: (value: string) => void;
  dropdownValue: string;
  zipCode?: string;
  setZipCode?: (value: string) => void;
}

const DropDownValueComponent = (props: DropDownValueComponentProps) => {
  const {
    items,
    setHierarchyName,
    newHierarchyName,
    setNewHierarchyName,
    dropdownValue,
    setZipCode,
    zipCode,
  } = props;
  return (
    <>
      <Dropdown
        label={`Seleccionar ${dropdownValue}`}
        items={items.map((item) => ({
          name: isProvince(item)
            ? item.provinceName
            : isCanton(item)
            ? item.cantonName
            : (isParish(item) && item.parishName) || "",
          value: isProvince(item)
            ? item.provinceName
            : isCanton(item)
            ? item.cantonName
            : (isParish(item) && item.parishName) || "",
        }))}
        backgroundColor="#1D3557"
        selectedTextColor="white"
        width={250}
        height={50}
        onChange={(value) => setHierarchyName(value)}
        inputLabelColor="white"
      />
      <TextField
        label="Nuevo nombre"
        variant="outlined"
        color="primary"
        type="text"
        value={newHierarchyName}
        onChange={(e) => setNewHierarchyName(e.target.value)}
      />
      {dropdownValue === "Parroquia" && (
        <TextField
          label="Código Postal"
          variant="outlined"
          color="primary"
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode && setZipCode(e.target.value)}
        />
      )}
    </>
  );
};
