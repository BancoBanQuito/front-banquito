import React, { useState } from "react";
import { Box, Container, FormLabel, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../atoms/Spinner";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import { SizeButton } from "../../atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";

const CreateHolidayYear: React.FC = () => {
  const [date, setDate] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [activateSpinner, setActivateSpinner] = useState(false);
  const handleSubmit = async () => {
    // if (!date) return alert("Todos los campos son obligatorios");
    /* setIsLoading(true);
    try {
      setActivateSpinner(true);
      const response = await fetch(
        `${EnvManager.SETTINGS_URL}/api/holiday/${date}`,
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
        setActivateSpinner(false);
        // alert("Fines de semana creados para el año " + date);
      } else {

        setIsLoading(false);
        setActivateSpinner(false);
        // alert("Ya existen los fines de semana para el año " + date);
      }
    } catch (error) {

      setIsLoading(false);
      setActivateSpinner(false);
      console.error(error);
    } */
  };

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          flex: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500
        }}>
        <Container sx={containertTitleStyles}>
          <Typography variant="h4" align="center">
            Fines de Semana
          </Typography>
        </Container>
        <TextFieldAtom
          label="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          required
          type='number' />
        <SizeButton
          submit
          text={"Crear"}
          style={ButtonStyle.BIG} palette={{
            backgroundColor: ColorPalette.PRIMARY,
          }} />
      </Box>
    </>
  );
};

export default CreateHolidayYear;

const containertTitleStyles = () => ({
  textAlign: "center",
  marginTop: "70px",
  marginBottom: "20px",
});