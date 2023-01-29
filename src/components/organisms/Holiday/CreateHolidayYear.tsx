import React, { useState } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Button from "@mui/material/Button";

const CreateHolidayYear: React.FC = () => {
  const [date, setDate] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date) return alert("Todos los campos son obligatorios");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/holiday/${date}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.ok) {
        setIsLoading(false);
        alert("Fines de semana creados para el año "+ date );
      } else {
        setIsLoading(false);
        alert("Ya existen los fines de semana para el año " + date);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Fines de Semana
        </Typography>
      </Container>
      <Container sx={containerFormLabelStyles}></Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Fecha:</FormLabel>
        <TextField
          variant="standard"
          sx={formLabelStyles}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <LoadingButton
          sx={buttonStyles}
          onClick={handleSubmit}
          loading={isLoading}
        >
          Crear
        </LoadingButton>
      </Container>
    </>
  );
};

export default CreateHolidayYear;

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
