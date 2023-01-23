import React from 'react';
import { Box, Container } from '@mui/material';
import { useState } from 'react';

import { HolidayTabs } from '../../../components/organisms/Holiday/HolidayTabs';
import Branch from '../../ClientPages/Branches/Branch';
import CreateBranch from '../../../components/organisms/Branch/CreateBranch';



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
                    {tabValue === "Ver" }
                </Container>
                {tabValue === "Crear por Año" }
                {tabValue === "Crear Por Dia" }
                
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
    marginTop: "200px"
});

const childStyles = () => ({
    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: "-190px"
});
