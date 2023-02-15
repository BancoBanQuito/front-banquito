import React, { useState } from "react";
import { Box, Container, FormLabel, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../atoms/Spinner";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import axios from "axios";

const CreateHoliday: React.FC = () => {
  const [activateSpinner, setActivateSpinner] = useState(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const handleSubmit = async () => {
    if (date && name && type && code) {

      try {
        const dateFormatted = date?.format("YYYY-MM-DD");
        setActivateSpinner(true);
        const response = await axios(`${EnvManager.SETTINGS_URL}/api/holiday/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: JSON.stringify({
            name: name,
            type: type,

            date: dateFormatted,
            code: code,
          }),
        });
        if (response.status !== 200) {
          setActivateSpinner(false);
          throw new Error(response.statusText);
        }
        setActivateSpinner(false);
        // alert("Creada con éxito");
      } catch (error) {
        setActivateSpinner(false);
        // alert("Ya existe la fecha seleccionada");
      }
    } else {
      // alert("Todos los campos son obligatorios");
    }
  };

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500
        }}>
        <Container sx={containertTitleStyles}>
          <Typography variant="h4" align="center">
            Feriado
          </Typography>
        </Container>
        <DatePickerAtom
          fullWidth
          label={"Fecha"} value={date}
          onChange={(time) => {
            setDate(time);
          }} />
        <TextFieldAtom
          label="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type='text'
          fullWidth />
        <TextFieldAtom
          label="Tipo"
          value={type}
          onChange={(event) => setType(event.target.value)}
          type='text'
          fullWidth />
        <TextFieldAtom
          label="Codigo"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          type='text'
          fullWidth />

        <SizeButton
          submit
          text={"Crear"}
          style={ButtonStyle.BIG} palette={{
            backgroundColor: ColorPalette.PRIMARY
          }} />
      </Box>
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
