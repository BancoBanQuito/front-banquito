import React, { useState } from "react";
import { Box, Container, FormLabel, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../atoms/Spinner";
import DatePickerAtom from "../../atoms/DatePickerAtom";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";

const DeleteHoliday: React.FC = () => {

  const [date, setDate] = useState<Dayjs | null>(null);
  const [type, setType] = useState<string>("");
  const [code, setCode] = useState<BigInt>();
  const [name, setName] = useState<string>("");
  const [activateSpinner, setActivateSpinner] = useState(false);

  const handleSubmit = async () => {
    if (date) {
      try {
        const dateFormatted = date?.format("YYYY-MM-DD");
        setActivateSpinner(true);
        const response = await fetch(`${EnvManager.SETTINGS_URL}/api/holiday/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            type: type,
            code: code,
            name: name,
            date: dateFormatted,

          }),
        });
        if (!response.ok) {
          setActivateSpinner(false);
          throw new Error(response.statusText);
        }
        setActivateSpinner(false);
        alert("Feriado Eliminado");
      } catch (error) {
        setActivateSpinner(false);
        alert("No existe informacion de esa fecha");
      }
    } else {
      alert("Seleccione la fecha para eliminar");
    }
  };

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Container sx={containertTitleStyles}>
          <Typography variant="h4" align="center">
            Eliminar Feriado
          </Typography>
        </Container>
        <DatePickerAtom
          label={"Fecha"}
          value={date}
          fullWidth
          onChange={(time) => { setDate(time); }} />
        <SizeButton
          text={"Eliminar"}
          style={ButtonStyle.BIG}
          palette={{
            backgroundColor: ColorPalette.PRIMARY
          }} />
      </Box>
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
