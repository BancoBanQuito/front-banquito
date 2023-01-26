import React from "react";
import { Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TableMolecule from "/src/components/molecules/TableMolecule";
import { IHoliday } from "/src/components/organisms/Holiday/Types";

const Holiday: React.FC = () => {
  const [holidays, setBranches] = useState<IHoliday[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:8081/api/holiday")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setBranches(data))
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
