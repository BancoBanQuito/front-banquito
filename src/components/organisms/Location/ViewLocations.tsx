import React, { useEffect, useState } from "react";
import { Container, Typography, TextField } from "@mui/material";
import { Province } from "./types";
import { getProvinces } from "./functions";
import TableMolecule from "@/components/molecules/TableMolecule";

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
    getProvinces().then(setProvinces);
  }, []);

  const filteredRows =
    provinces.length > 0
      ? provinces
          .flatMap((province) =>
            province.cantons.flatMap((canton) =>
              canton.parishes
                .filter((parish) => {
                  return (
                    parish.parishName.toLowerCase().indexOf(searchText) > -1 ||
                    canton.cantonName.toLowerCase().indexOf(searchText) > -1 ||
                    province.provinceName.toLowerCase().indexOf(searchText) > -1
                  );
                })
                .map((parish) => [
                  <Typography>{province.provinceName}</Typography>,
                  <Typography>{canton.cantonName}</Typography>,
                  <Typography>{parish.parishName}</Typography>,
                  <Typography>{parish.zipCode}</Typography>,
                ])
            )
          )
          .filter((row) => row.length > 0)
      : [];

  return (
    <Container style={containerStyle}>
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
    </Container>
  );
};

const containerTableStyle = {
  marginTop: "10px",
};

const containerStyle = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",
  marginTop: "70px",
};
