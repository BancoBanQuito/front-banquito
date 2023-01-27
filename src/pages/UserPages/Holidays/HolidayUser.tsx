import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import CreateHoliday from "../../../components/organisms/Holiday/CreateHoliday";
import { HolidayTabs } from "../../../components/organisms/Holiday/HolidayTabs";
import Holiday from "../../ClientPages/Holiday/Holiday";

const HolidayUser: React.FC = () => {
  const [tabValue, setTabValue] = useState("Ver");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={boxStyles}>
      <HolidayTabs tabValue={tabValue} handleChange={handleChange} />
      <Box sx={{ width: "80%" }}>
        <Container sx={childStyles}>
          {tabValue === "Ver" && <Holiday />}
        </Container>
        {tabValue === "CrearA" && <CreateHoliday key={0} />}
        {tabValue === "CrearD" && <CreateHoliday key={1} />}
      </Box>
    </Box>
  );
};

export default HolidayUser;

const boxStyles = () => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginTop: "200px",
});

const childStyles = () => ({
  position: "relative",
  width: "100%",
  height: "100%",
  marginTop: "-190px",
});
