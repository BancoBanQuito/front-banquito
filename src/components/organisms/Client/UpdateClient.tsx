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
import BranchBox from "../Branch/BranchBox";
import TableMolecule from "../../molecules/TableMolecule";

export const UpdateClient: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("OTRO");
  const [career, setCareer] = useState<string>("");
  const [typePhone, setTypePhone] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullName, setFullName] = useState<string>("Full Name");
  const [lineOne, setLineOne] = useState<string>("");
  const [lineTwo, setLineTwo] = useState<string>("");
  const [identification, setIdentification] = useState<string>("111111111");
  const [typeIdentification, setTypeIdentification] = useState<string>("DNI");
  const [codeLocation, setCodeLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
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
    const user = localStorage.getItem("email");
    if (user) {
      setUserName(user);
    }
    alert(user);
    fetch(`http://localhost:8083/api/client/email/${user}`)
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
        setCodeLocation(data.codeLocation);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/client/personal-data`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            identificationType: typeIdentification,
            identification: identification,
            fullname: fullName,
            email: email,
            gender: gender,
            career: career,
            phone: {
              phoneNumber: phone,
              phoneType: typePhone,
            },
            address: {
              codeLocation: codeLocation,
              lineOne: lineOne,
              lineTwo: lineTwo,
              latitude: latitude,
              longitude: longitude,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("Cliente actualizado");
    } catch (error) {
      console.error(error);
    }
  };

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
          <Button onClick={handleUpdate} sx={buttonStyles}>
            Guardar
          </Button>
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
