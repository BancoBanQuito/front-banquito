import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";

const urlCloud = `${EnvManager.CLIENT_URL}/api/client/`;

const isAvailable = true;

const SearchClientDataForm: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string | null>(
    localStorage.getItem("identification")
  );
  const [typeIdentification, setTypeIdentification] = useState<string | null>(
    localStorage.getItem("typeIdentification")
  );
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [segmento, setSegmento] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [activateSpinner, setActivateSpinner] = useState(false);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const fetchClientByIdAndTypeId = async () => {
    try {
      setActivateSpinner(true);
      setTypeIdentification(localStorage.getItem("typeIdentification"));
      const response = await fetch(
        urlCloud + `${idCliente}/${typeIdentification}`
      );
      const data = await response.json();
      setEmail(data.email);
      setFullname(data.fullName);
      setBirthDate(formatDate(new Date(data.birthDate)));
      setCarrera(data.career);
      setLugarTrabajo(data.companyName);
      setReferencia(data.reference.name + " (" + data.reference.related + ")");
      setTelefono(data.phone.phoneNumber);
      setDireccion(data.address.lineOne + " y " + data.address.lineTwo);
      setSegmento(data.segment.name);
      setGenero(data.gender);
      setEstadoCivil(data.maritalStatus);
      setStatus(data.status);
      setActivateSpinner(false);
    } catch (error) {
      setActivateSpinner(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientByIdAndTypeId();
  }, []);

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Informacion Cliente
        </Typography>
      </Container>
      <Grid container>
        <Grid item xs={7}>
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
        </Grid>

        <Grid item xs={3}>
          <Container>
            <Box sx={boxStile}>
              <p>{fullName}</p>
              <p>Identificación: {idCliente}</p>
              <p>Tipo de Itentificación: {typeIdentification}</p>
              <p>Estado: {status}</p>
            </Box>
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
        </Grid>
        {/* Boton*/}
        <Container sx={containerTextFieldStyles}>
          <Button
            onClick={() => {
              navigate("/usuario");
            }}
            sx={buttonStyles}
          >
            Pagina Principal
          </Button>
        </Container>
      </Grid>
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
const boxStile = () => ({
  textAlign: "left",
  color: "#F1FAEE",
  marginTop: "70px",
  marginBottom: "20px",
  background: "#1D3557",
  padding: "20px",
  borderRadius: "10px",
  fontSize: "20px",
});
