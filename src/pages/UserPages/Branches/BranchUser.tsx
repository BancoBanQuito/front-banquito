import React from 'react';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import CreateBranch from '../../../components/organisms/Branch/CreateBranch';
import DeleteBranch from '../../../components/organisms/Branch/DeleteBranch';
import UpdateBranch from '../../../components/organisms/Branch/UpdateBranch';
import Branch from '../../ClientPages/Branches/Branch';
import TabsMolecule from '../../../components/molecules/TabsMolecule';


const BranchUser: React.FC = () => {

    const [tabValue, setTabValue] = useState("Ver");

    const handleChange = (value: any) => {
        setTabValue(value);
    };

    return (
        <Box sx={boxStyles}>
            <TabsMolecule
                defaultValue={tabValue}
                onChange={handleChange}
                items={[
                    { label: 'Ver', value: "Ver" },
                    { label: 'Crear', value: "Crear" },
                    { label: 'Actualizar', value: "Actualizar" },
                    { label: 'Eliminar', value: "Eliminar" }
                ]} />
            <Box sx={{ width: "80%" }}>
                <Container sx={childStyles}>
                    {tabValue === "Ver" && <Branch />}
                </Container>
                {tabValue === "Crear" && <CreateBranch />}
                {tabValue === "Actualizar" && <UpdateBranch />}
                {tabValue === "Eliminar" && <DeleteBranch />}
            </Box>
        </Box>
    );
};

export default BranchUser;

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
