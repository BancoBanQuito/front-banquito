import { Typography, Container, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableMolecule from "../../molecules/TableMolecule";
import { getProvinces } from "./functions";
import { Province } from "./types";
import TextFieldAtom from "../../atoms/TextFieldAtom";

const headers = [
  <Typography>Provincia</Typography>,
  <Typography>Cantón</Typography>,
  <Typography>Parroquia</Typography>,
  <Typography>Código Postal</Typography>,
];

export const ViewLocations = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // getProvinces().then(setProvinces);
  }, []);

  const filteredRows = () => {
    return provinces.length > 0
      ? provinces.flatMap((province) =>
        province.cantons.flatMap((canton) =>
          canton.parishes.filter((parish) => {
            return (
              parish.parishName.toLowerCase().indexOf(searchText) > -1 ||
              canton.cantonName.toLowerCase().indexOf(searchText) > -1 ||
              province.provinceName.toLowerCase().indexOf(searchText) > -1
            );
          }).map((parish) => [
            <Typography>{province.provinceName}</Typography>,
            <Typography>{canton.cantonName}</Typography>,
            <Typography>{parish.parishName}</Typography>,
            <Typography>{parish.zipCode}</Typography>,
          ]))).filter((row) => row.length > 0)
      : [];
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600
        }}>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h4" align="center">Ver Ubicaciones</Typography>
        </Container>
        <TextFieldAtom
          fullWidth
          label="Buscar por provincia, cantón o parroquia"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value.toLowerCase())}
          type='text' />
        <TableMolecule headers={headers} rows={filteredRows()} />
      </Box>
      {/* <Container style={containerStyle}>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h4" align="center">
            Ver Ubicaciones
          </Typography>
          <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              label="Buscar por provincia, cantón o parroquia"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value.toLowerCase())
              }
              sx={{ width: "350px" }}
            />
          </Container>
        </Container>
        <Container style={containerTableStyle}>
          <TableMolecule headers={headers} rows={filteredRows} />
        </Container>
      </Container> */}
    </>
  );
};