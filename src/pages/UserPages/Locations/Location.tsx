import { Box } from "@mui/material";
import React, { useState } from "react";
import { CreateLocation } from "../../../components/organisms/Location/CreateLocation";
import { LocationTabs } from "../../../components/organisms/Location/LocationTabs";
import { UpdateLocation } from "../../../components/organisms/Location/UpdateLocation";

const boxStyles = () => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "95vh",
});

export const Location = () => {
  const [tabValue, setTabValue] = useState("Ver");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={boxStyles}>
      <LocationTabs tabValue={tabValue} handleChange={handleChange} />
      <Box sx={{ width: "80%" }}>
        {tabValue === "Ver" && <div>Ver Componente</div>}
        {tabValue === "Crear" && <CreateLocation />}
        {tabValue === "Actualizar" && <UpdateLocation />}
        {tabValue === "Eliminar" && <div>Eliminar Componente</div>}
      </Box>
    </Box>
  );
};
