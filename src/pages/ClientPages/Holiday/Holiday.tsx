import React from "react";
import { Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TableMolecule from "../../../components/molecules/TableMolecule";
import { IHoliday } from "../../../components/organisms/Holiday/Types";
import EnvManager from "../../../config/EnvManager";

const Holiday: React.FC = () => {
  const [holidays, setHolidays] = useState<IHoliday[]>([]);
  const [searchText, setSearchText] = useState("");
  const filteredHolidays =
    holidays.filter(
      (holiday) => holiday.name.includes(searchText.toUpperCase()),
    );

  useEffect(() => {
    fetch(`${EnvManager.SETTINGS_URL}/api/holiday`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setHolidays(data))
      .catch((error) => console.log(error));
  }, []);

  const headers = [<>Fecha</>, <>Codigo</>, <>Nombre</>, <>Tipo</>];

  const rows = filteredHolidays.map((holiday) => [
    <>{holiday.date}</>,
    <>{holiday.code}</>,
    <>{holiday.name}</>,
    <>{holiday.type}</>,
  ]);

  return (
    <Container style={containerStyle}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" align="center">
          Feriados
        </Typography>
      </Container>
      <Container sx={{ display: "flex", justifyContent: "flex-start" }}>
        <TextField
          label="Buscar por fecha, nombre o codigo"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value.toUpperCase())
          }
          sx={{ width: "350px" }}
        />
      </Container>
      <Container style={containerTableStyle}>
        <TableMolecule headers={headers} rows={rows} />
      </Container>
    </Container>
  );
};

export default Holiday;

const containerStyle = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",
  marginTop: "100px",
};

const containerTableStyle = {
  marginTop: "10px",
};

const searchBarStyle = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "flex-start",
};

