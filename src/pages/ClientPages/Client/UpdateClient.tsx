import React, { useState, useEffect } from "react";
import { Box, Container, FormLabel, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import BranchBox from "./ClientBox";
import EnvManager from "../../../config/EnvManager";

export const UpdateClient: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [typePhone, setTypePhone] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [lineOne, setLineOne] = useState<string>("");
  const [lineTwo, setLineTwo] = useState<string>("");
  const [identification, setIdentification] = useState<string>("");
  const [typeIdentification, setTypeIdentification] = useState<string>("");

  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);

  const onChangeStatus = (value: string) => {
    setGender(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const onChangeTypePhone = (value: string) => {
    setTypePhone(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const optionsStatus = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const optionTypePhone = [
    { value: "MBL", label: "Móvil" },
    { value: "CON", label: "Convencional" },
  ];

  useEffect(() => {
    fetch(`${EnvManager.CLIENT_URL}/api/client/email/dpaz@espe.edu.ec`)
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setGender(data.gender);
        setCareer(data.career);
        setTypePhone(data.phone.phoneType);
        setPhone(data.phone.phoneNumber);
        setFullName(data.fullname);
        setLineOne(data.address.lineOne);
        setLineTwo(data.address.lineTwo);
        setTypeIdentification(data.identificationType);
        setIdentification(data.identification);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*const handleUpdate = () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedClient),
      headers: {
        'Content-Type': 'application/json',
      },
    };*/

  /*const setStatus = async (value: string, idSegment: string, name: string) => {
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
  };*/

  /*const fetchSegment = async () => {
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
              options={optionsStatus}
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
  }, []);*/

  /*const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/client/1727624742", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          idSegment: idSegment,
          name: nameSegment,
          status: statustSegment,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchSegment();
      alert("Segmento creado con éxito");
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Container sx={containertTitleStyles}>
            <Typography variant="h4" align="center">
              Actualizar mis datos
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Correo:</FormLabel>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Genero:"
                value={gender}
                options={optionsStatus}
                onChange={onChangeStatus}
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Tipo Teléfono:"
                value={typePhone}
                options={optionTypePhone}
                onChange={onChangeTypePhone}
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Teléfono:</FormLabel>
            <TextField
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>
        <Grid item xs={0}>
          <Container>
            <Box sx={boxStile}>
              <p>{fullName}</p>
              <p>Identificación: {identification}</p>
              <p>Tipo de Itentificación: {typeIdentification}</p>
            </Box>
          </Container>
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Direccion
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea 1:</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => setLineOne(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea 2:</FormLabel>
            <TextField
              value={lineTwo}
              onChange={(event) => setLineTwo(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>
        <Container sx={containerTextFieldStyles}>
          <Button sx={buttonStyles}>Guardar</Button>
        </Container>
      </Grid>
    </>
  );
};

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
  width: "150px",
  height: "30px",
  padding: "25px",
  borderRadius: "10px",
  fontSize: "18px",
  ":hover": {
    background: "#F26d77",
    color: "white",
  },
});
