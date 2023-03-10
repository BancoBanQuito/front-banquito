import React, { useState } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/atoms/Dropdown";

const SearchCardClient: React.FC = () => {
  const [identification, setIdentification] = useState("");
  const [typeIdentification, setTypeIdentification] = useState<string>("");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);

  const identificationOptions = [
    { value: "DNI", name: "Cedula" },
    { value: "RUC", name: "RUC" },
    { value: "PAS", name: "Pasaporte" },
  ];

  const navigate = useNavigate();

  const onChangeStatus = (value: string) => {
    setTypeIdentification(value);
    localStorage.setItem("typeIdentification", value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  /* Funcion Boton*/
  const handleSubmit = (event: React.FormEvent) => {
    try {
      localStorage.setItem("identification", identification);
      localStorage.setItem("typeIdentification", typeIdentification);
      navigate("/banca/info-cliente");
    } catch (error) {
      console.error(error);
    }
  };

  const editClient = (event: React.FormEvent) => {
    try {
      localStorage.setItem("identification", identification);
      localStorage.setItem("typeIdentification", typeIdentification);
      navigate("/banca/actualizar-info-cliente");
    } catch (error) {
      console.error(error);
    }
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
        <FormLabel sx={formLabelStyles}>Identificación: </FormLabel>
        <TextField
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          variant="standard"
        />
      </Container>

      {/* Dropbox*/}
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <Dropdown
            label="Tipo Identificación: "
            value={typeIdentification}
            items={identificationOptions}
            onChange={onChangeStatus}
            width={"100%"}
            height={"auto"} />
        </div>
      </Container>
      {/* Boton*/}
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Ver Información
        </Button>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={editClient} sx={buttonStyles}>
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
