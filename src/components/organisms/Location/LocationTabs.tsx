import React from "react";
import { styled, Tab, Tabs } from "@mui/material";

interface LocationTabsProps {
  tabValue: string;
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
}

export const LocationTabs = (props: LocationTabsProps) => {
  const { tabValue, handleChange } = props;

  const StyledTabs = styled(Tabs)(() => ({
    "& .MuiTab-root": {
      backgroundColor: "#1D3557",
      color: "white !important",
    },
    "& .Mui-selected": {
      backgroundColor: "#457B9D",
      color: "white !important",
    },
  }));

  return (
    <StyledTabs
      indicatorColor="primary"
      textColor="primary"
      centered
      value={tabValue}
      onChange={handleChange}
      orientation="vertical"
      sx={{ width: "15rem" }}
    >
      <Tab label="Ver" value="Ver" />
      <Tab label="Crear" value="Crear" />
      <Tab label="Actualizar" value="Actualizar" />
      <Tab label="Eliminar" value="Eliminar" />
    </StyledTabs>
  );
};
