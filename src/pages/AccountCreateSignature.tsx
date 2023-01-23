import React from "react";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import TextAreaAtom from "../components/atoms/TextAreaAtom";
import ButtonIcon from "../components/atoms/ButtonIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, Typography } from "@mui/material";
import { ColorPalette } from "../style/ColorPalette";
import { SizeButton } from "../components/atoms/SizeButton";
import { ButtonStyle } from "../style/ButtonStyle";

const CreateSignature = () => {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "2rem",
          }}
        >
          <Typography variant="h4">Agregar firma autorizada</Typography>
        </div>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Número de cuenta:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Ingrese el número de cuenta:"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Identificación:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Ingrese la identificación"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
        />
        <ButtonIcon color={ColorPalette.PRIMARY} icon={<SearchRoundedIcon />} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Tipo Identificación:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Tipo Identificación"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Rol:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Ingrese el rol"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alingItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "2rem",
          }}
        >
          <SizeButton
            text={"Agregar"}
            style={ButtonStyle.MEDIUM}
            palette={{
              backgroundColor: ColorPalette.PRIMARY,
            }}
          ></SizeButton>
        </div>
      </Box>
    </div>
  );
};

export default CreateSignature;
