import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TableMolecule from "../../../components/molecules/TableMolecule";
import { IHoliday } from "../../../components/organisms/Holiday/Types";
import EnvManager from "../../../config/EnvManager";
import TextFieldAtom from "../../../components/atoms/TextFieldAtom";

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
      }}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" align="center">
          Feriados
        </Typography>
      </Container>
      <TextFieldAtom
        label="Buscar por fecha, nombre o codigo"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value.toUpperCase())}
        fullWidth
        type={"text"} />
      <Container style={containerTableStyle}>
        <TableMolecule headers={headers} rows={rows} />
      </Container>
    </Box>
  );
};

export default Holiday;


const containerTableStyle = {
  marginTop: "10px",
};
