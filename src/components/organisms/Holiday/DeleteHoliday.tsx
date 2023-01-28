import React, { useState } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";

const DeleteHoliday: React.FC = () => {
  
  const [date, setDate] = useState<Dayjs | null>(null);
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<BigInt>();
  const [name, setName] = useState<string>("");
  
  const handleSubmit = async () => {
    if (date ) {
      try {
        const dateFormatted = date?.format("YYYY-MM-DD");
        const response = await fetch("https://settings-banquitoapp-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/holiday/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            
            type:type,
            code: code,
            name: name,
            date: dateFormatted,
            
          }),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        alert("Feriado Eliminado");
      } catch (error) {
        alert("No existe informacion de esa fecha");
      }
    } else {
      alert("Seleccione la fecha para eliminar");
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Eliminar Feriado
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
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Eliminar
        </Button>
      </Container>
    </>
  );
};

export default DeleteHoliday;

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
