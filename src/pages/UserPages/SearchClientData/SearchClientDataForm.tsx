import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import BranchBox from "../../../components/organisms/Branch/BranchBox";

const SearchClientDataForm: React.FC = () => {
  const [idSegment, setIdSegment] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("");

  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [segmento, setSegmento] = useState("");

  const [statusSegment, setStatusSegment] = useState<string>("");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [rows, setRows] = useState<JSX.Element[][]>([
    [<Typography></Typography>, <Typography></Typography>],
  ]);

  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
    { value: "O", label: "Otro" },
  ];

  const maritalOptions = [
    { value: "Soltero", label: "Soltero" },
    { value: "Casado", label: "Casado" },
    { value: "Divorciado", label: "Divorciado" },
    { value: "Separado", label: "Separado" },
    { value: "Union", label: "Union Libre" },
    { value: "Viudo", label: "Viudo" },
  ];

  const onChangeStatus = (value: string) => {
    setStatusSegment(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const setStatus = async (value: string, idSegment: string, name: string) => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/segments/updates/${idSegment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            status: value,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("Segmento actualizado");
      fetchSegment();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSegment = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/segments");
      const data = await response.json();
      const rows = data.map((segment: any) => {
        return [
          <Typography>{segment.name}</Typography>,
          <Typography>
            <BranchBox
              label=""
              value={segment.status}
              options={genderOptions}
              onChange={(value: string) =>
                setStatus(value, segment.idSegment, segment.name)
              }
            />
          </Typography>,
        ];
      });
      setRows(rows);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSegment();
  }, []);

  /* Funcion Boton*/
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/api/segments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          idSegment: idSegment,
          name: nameSegment,
          status: statusSegment,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchSegment();
      alert("Volviendo");
    } catch (error) {
      console.error(error);
    }
  };

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
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Fecha de Nacimiento:</FormLabel>
        <TextField
          value={fechaNacimiento}
          onChange={(event) => setFechaNacimiento(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
        <TextField
          value={carrera}
          onChange={(event) => setCarrera(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Lugar de Trabajo:</FormLabel>
        <TextField
          value={lugarTrabajo}
          onChange={(event) => setLugarTrabajo(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Referencia:</FormLabel>
        <TextField
          value={referencia}
          onChange={(event) => setReferencia(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Telefono:</FormLabel>
        <TextField
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Direccion:</FormLabel>
        <TextField
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Segmento:</FormLabel>
        <TextField
          value={segmento}
          onChange={(event) => setSegmento(event.target.value)}
          variant="standard"
        />
      </Container>

      {/* Dropbox*/}
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Genero:"
            value={statusSegment}
            options={genderOptions}
            onChange={onChangeStatus}
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Estado Civil:"
            value={statusSegment}
            options={maritalOptions}
            onChange={onChangeStatus}
          />
        </div>
      </Container>
      {/* Boton*/}
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Pagina Principal{" "}
        </Button>
      </Container>
    </>
  );
};

export default SearchClientDataForm;

const containerStyles = () => ({
  display: "flex",
  justifyContent: "flex-start",
});

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

const containerFormLabelStyles = () => ({
  marginTop: "50px",
  marginLeft: "280px",
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
