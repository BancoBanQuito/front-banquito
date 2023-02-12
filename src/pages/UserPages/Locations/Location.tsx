import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { CreateLocation } from "../../../components/organisms/Location/CreateLocation";
import { DeleteLocation } from "../../../components/organisms/Location/DeleteLocation";
import { UpdateLocation } from "../../../components/organisms/Location/UpdateLocation";
import { ViewLocations } from "../../../components/organisms/Location/ViewLocations";
import TabsMolecule from "../../../components/molecules/TabsMolecule";


export const Location = () => {
  const [tabValue, setTabValue] = useState("Ver");

  const handleChange = (value: any) => {
    setTabValue(value);
  };

  return (
    <Box>
      <div style={{
        marginRight: '1rem',
        position: "absolute",
        top: 0,
        left: 0,
        width: "20%"
      }}>
        <TabsMolecule
          defaultValue={tabValue}
          onChange={handleChange}
          items={[
            { label: 'Ver', value: "Ver" },
            { label: 'Crear', value: "Crear" },
            { label: 'Actualizar', value: "Actualizar" },
            { label: 'Eliminar', value: "Eliminar" }
          ]} />
      </div>
      <Box sx={{
        width: "80%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '2rem',
        top: 0,
        right: 0,
      }}>
        {tabValue === "Ver" && <ViewLocations />}
        {tabValue === "Crear" && <CreateLocation />}
        {tabValue === "Actualizar" && <UpdateLocation />}
        {tabValue === "Eliminar" && <DeleteLocation />}
      </Box>
    </Box>
  );
};
