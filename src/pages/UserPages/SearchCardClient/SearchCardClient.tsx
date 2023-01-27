import React, { useState, useEffect } from "react";

import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import BranchBox from "../../../components/organisms/Branch/BranchBox";

const local = "http://localhost:8080/";
const SearchCardClient: React.FC = () => {
  const [identification, setIdentification] = useState("");
  const [typeIdentification, setTypeIdentification] = useState<string>("");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);

  const identificationOptions = [
    { value: "DNI", label: "Cedula" },
    { value: "RUC", label: "RUC" },
    { value: "PAS", label: "Pasaporte" },
  ];

  const onChangeStatus = (value: string) => {
    setTypeIdentification(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  /* Funcion Boton*/
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(`/details/${identification}/${typeIdentification}`);
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Buscar Cliente
        </Typography>
      </Container>
      {/* Label Input*/}
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Identificación:</FormLabel>
        <TextField
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          variant="standard"
        />
      </Container>

      {/* Dropbox*/}
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Tipo Identificación:"
            value={typeIdentification}
            options={identificationOptions}
            onChange={onChangeStatus}
          />
        </div>
      </Container>
      {/* Boton*/}
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Ver Información
        </Button>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Editar
        </Button>
      </Container>
    </>
  );
};

export default SearchCardClient;

const containertTitleStyles = () => ({
  textAlign: "center",
  marginTop: "70px",
  marginBottom: "20px",
});

const containerTextFieldStyles = () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "50px",
  marginBottom: "20px",
});

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#E63946",
  color: "white",
  ":hover": {
    background: "#E63946",
    color: "white",
  },
});
