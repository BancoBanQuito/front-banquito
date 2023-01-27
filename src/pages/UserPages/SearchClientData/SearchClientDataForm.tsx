import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const urlCloud =
  "https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/client/";

const local = "http://localhost:8080/api/client/";

const isAvailable = true;

const SearchClientDataForm: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string | null>(
    localStorage.getItem("identification")
  );
  const [typeIdentification, setTypeIdentification] = useState<string | null>(
    localStorage.getItem("typeIdentification")
  );
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [segmento, setSegmento] = useState("");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const fetchClientByIdAndTypeId = async () => {
    try {
      setTypeIdentification(localStorage.getItem("typeIdentification"));
      const response = await fetch(
        local + `${idCliente}/${typeIdentification}`
      );
      const data = await response.json();
      setEmail(data.email);
      setBirthDate(formatDate(new Date(data.birthDate)));
      setCarrera(data.career);
      setLugarTrabajo(data.companyName);
      setReferencia(data.reference.name + " (" + data.reference.related + ")");
      setTelefono(data.phone.phoneNumber);
      setDireccion(data.address.lineOne + " y " + data.address.lineTwo);
      setSegmento("VIP");
      setGenero(data.gender);
      setEstadoCivil(data.maritalStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientByIdAndTypeId();
  }, []);

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Información Cliente
        </Typography>
      </Container>
      {/* Label Input*/}
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Email:</FormLabel>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Fecha de Nacimiento:</FormLabel>
        <TextField
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
        <TextField
          value={carrera}
          onChange={(event) => setCarrera(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Lugar de Trabajo:</FormLabel>
        <TextField
          value={lugarTrabajo}
          onChange={(event) => setLugarTrabajo(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Referencia:</FormLabel>
        <TextField
          value={referencia}
          onChange={(event) => setReferencia(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Telefono:</FormLabel>
        <TextField
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Direccion:</FormLabel>
        <TextField
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Segmento:</FormLabel>
        <TextField
          value={segmento}
          onChange={(event) => setSegmento(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Estado Civil:</FormLabel>
        <TextField
          value={estadoCivil}
          onChange={(event) => setSegmento(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Genero:</FormLabel>
        <TextField
          value={genero}
          onChange={(event) => setSegmento(event.target.value)}
          variant="standard"
          disabled={isAvailable}
        />
      </Container>

      {/* Boton*/}
      <Container sx={containerTextFieldStyles}>
        <Button onClick={() => {}} sx={buttonStyles}>
          Pagina Principal
        </Button>
      </Container>
    </>
  );
};

export default SearchClientDataForm;

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
