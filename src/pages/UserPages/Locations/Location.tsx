import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { CreateLocation } from "@/components/organisms/Location/CreateLocation";
import { LocationTabs } from "@/components/organisms/Location/LocationTabs";
import { UpdateLocation } from "@/components/organisms/Location/UpdateLocation";
import { DeleteLocation } from "@/components/organisms/Location/DeleteLocation";
import { ViewLocations } from "@/components/organisms/Location/ViewLocations";

export const Location = () => {
  const [tabValue, setTabValue] = useState("Ver");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={boxStyles}>
      <LocationTabs tabValue={tabValue} handleChange={handleChange} />
      <Box sx={{ width: "80%" }}>
        <Container sx={childStyles}>
          {tabValue === "Ver" && <ViewLocations />}
        </Container>
        <Container sx={{ marginTop: "70px" }}>
          {tabValue === "Crear" && <CreateLocation />}
          {tabValue === "Actualizar" && <UpdateLocation />}
          {tabValue === "Eliminar" && <DeleteLocation />}
        </Container>
      </Box>
    </Box>
  );
};

const childStyles = () => ({
  position: "relative",
  width: "100%",
  height: "100%",
  marginTop: "-190px",
});

const boxStyles = () => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginTop: "200px",
});
