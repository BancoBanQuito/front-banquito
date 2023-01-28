import React, { useState } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";

const CreateHoliday: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const handleSubmit = async () => {
    if (date && name && type && code) {
      
      try {
        const dateFormatted = date?.format("YYYY-MM-DD");
        const response = await fetch("https://settings-banquitoapp-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/holiday/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            type: type,
            
            date: dateFormatted,
            code: code,
          }),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        alert("Creada con éxito");
      } catch (error) {
        alert("Ya existe la fecha seleccionada");
      }
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Feriado
        </Typography>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Fecha:</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(time) => {
              setDate(time);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={formLabelStyles} />
            )}
          />
        </LocalizationProvider>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Tipo:</FormLabel>
        <TextField
          value={type}
          onChange={(event) => setType(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Codigo:</FormLabel>
        <TextField
          value={code}
          onChange={(event) => setCode(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerFormLabelStyles}></Container>

      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Crear
        </Button>
      </Container>
    </>
  );
};

export default CreateHoliday;

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
});

const containerFormLabelStyles = () => ({
  marginTop: "50px",
  marginLeft: "280px",
});

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#1D3557",
  color: "white",
  ":hover": {
    background: "#1D3557",
    color: "white",
  },
});
