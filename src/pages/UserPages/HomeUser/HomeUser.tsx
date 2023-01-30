import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { SizeButton } from "../../../components/atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { HomeUserCard } from "./HomeUserCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import accountCardJson from "./json/accountCardData.json";
import clientCardJson from "./json/clientCardData.json";
import generalCardJson from "./json/generalCardData.json";
import productCardJson from "./json/productCardData.json";

import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

interface userProps {
  username: string;
  password: string;
}

interface Props {
  user: userProps | null;
  isLogged: boolean;
}

const HomeUser = ({ user, isLogged }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      sx={{
        width: "100%",
        height: "90vh",
        flexDirection: "column",
      }}
    >
      <Box marginTop="60px">
        {isLogged ? (
          <>
            <Typography variant="h4" textAlign="center" p={4}>
              Bienvenido Usuario {user?.username}
            </Typography>
            <>
              <AccordionComponent
                title="Cuentas"
                description="Use este panel para gestionar cuentas de clientes"
                jsonData={accountCardJson}
              />
              <AccordionComponent
                title="Clientes"
                description="Use este panel para gestionar clientes"
                jsonData={clientCardJson}
              />
              <AccordionComponent
                title="Productos"
                description="Use este panel para gestionar productos"
                jsonData={productCardJson}
              />
              <AccordionComponent
                title="General"
                description="Use este panel para gestionar informacion general"
                jsonData={generalCardJson}
              />
            </>
          </>
        ) : (
          <Box
            display="flex"
            sx={{
              direction: "column",
              height: "90vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SizeButton
              text="Iniciar Sesion"
              style={ButtonStyle.MEDIUM}
              palette={{
                backgroundColor: ColorPalette.PRIMARY,
                accent: ColorPalette.ACCENT,
              }}
              onClick={() => navigate("/usuario/login")}
            />
            <SizeButton
              text="Unirse"
              style={ButtonStyle.MEDIUM}
              palette={{
                backgroundColor: ColorPalette.PRIMARY,
                accent: ColorPalette.ACCENT,
              }}
              onClick={() => navigate("/usuario/signup")}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface AccordionComponentProps {
  title: string;
  description: string;
  jsonData: any;
}

const AccordionComponent = (props: AccordionComponentProps) => {
  const { title, description, jsonData } = props;

  const [isClicked, setisClicked] = useState(false);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        onClick={() => setisClicked(!isClicked)}
        sx={{ backgroundColor: isClicked ? ColorPalette.FOURTH : "none" }}
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{description}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: ColorPalette.ACCENT }}>
        <Grid container spacing={2} width="100%" justifyContent="center">
          {jsonData.map((card: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <HomeUserCard
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                url={card.url}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default HomeUser;
