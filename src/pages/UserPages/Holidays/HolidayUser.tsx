import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import CreateHoliday from "../../../components/organisms/Holiday/CreateHoliday";
import Holiday from "../../ClientPages/Holiday/Holiday";
import CreateHolidayD from "../../../components/organisms/Holiday/CreateHoliday";
import CreateHolidayY from "../../../components/organisms/Holiday/CreateHolidayYear";
import DeleteHoliday from "../../../components/organisms/Holiday/DeleteHoliday";
import UpdateHoliday from "../../../components/organisms/Holiday/UpdateHoliday";
import TabsMolecule from "../../../components/molecules/TabsMolecule";

const HolidayUser: React.FC = () => {
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
          items={[
            { label: "Ver", value: "Ver" },
            { label: "Fines de Semana", value: "CrearA" },
            { label: "Feriados", value: "CrearD" },
            { label: "Actualizar Informacion", value: "Actualizar" },
            { label: "Eliminar", value: "Eliminar" },
          ]}
          onChange={handleChange} />
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
        {tabValue === "Ver" && <Holiday />}
        {tabValue === "CrearA" && <CreateHolidayY />}
        {tabValue === "CrearD" && <CreateHolidayD />}
        {tabValue === "Actualizar" && <UpdateHoliday />}
        {tabValue === "Eliminar" && <DeleteHoliday />}
      </Box>
    </Box>
  );
};

export default HolidayUser;
