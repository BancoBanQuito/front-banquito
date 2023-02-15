import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../atoms/Spinner";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import { Box } from "@mui/system";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import axios from "axios";

const UpdateHoliday: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [activateSpinner, setActivateSpinner] = useState(false);
  const handleSubmit = async () => {
    if (date && name && type && code) {
      try {
        setActivateSpinner(true);
        const dateFormatted = date?.format("YYYY-MM-DD");
        const response = await axios(`${EnvManager.SETTINGS_URL}/api/holiday`, {
          method: "PUT",
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
        alert("Actualizacion exitosa");
      } catch (error) {
        setActivateSpinner(false);
        alert("No existe informacion del feriado ingresado");
      }
    } else {
      alert("Todos los campos son obligatorios");
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
            Actualizar Informacion
          </Typography>
        </Container>
        <DatePickerAtom
          label="Fecha"
          value={date}
          fullWidth
          onChange={(time) => setDate(time)} />
        <TextFieldAtom
          required
          fullWidth
          label="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type='text' />
        <TextFieldAtom
          required
          fullWidth
          label="Tipo"
          value={type}
          onChange={(event) => setType(event.target.value)}
          type='text' />
        <TextFieldAtom
          required
          fullWidth
          label="Codigo"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          type='text' />

        <SizeButton
          submit
          text={"Actualizar"}
          style={ButtonStyle.BIG} palette={{
            backgroundColor: ColorPalette.PRIMARY,
          }} />
      </Box>
    </>
  );
};

export default UpdateHoliday;

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
