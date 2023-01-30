import { Container, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableMolecule from '../../../components/molecules/TableMolecule';
import { IBranch } from '../../../components/organisms/Branch/Types';
import EnvManager from '../../../config/EnvManager';


const Branch: React.FC = () => {

    const [branches, setBranches] = useState<IBranch[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBranches = branches.filter((branch) =>
        branch.location.provinceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch(`${EnvManager.SETTINGS_URL}/api/branch`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => setBranches(data))
            .catch((error) => console.log(error));
    }, []);

    const headers = [
        <>Provincia</>,
        <>Cantón</>,
        <>Parroquia</>,
        <>Nombre de la Sucursal</>,
        <>Dirección</>,
        <>Teléfono</>,
        <>Lunes - Viernes</>,
        <>Sábados</>,
    ];

    const rows = filteredBranches.map((branch) => [
        <>{branch.location.provinceName}</>,
        <>{branch.location.cantonName}</>,
        <>{branch.location.parishName}</>,
        <>{branch.name}</>,
        <>{branch.address}</>,
        <>{branch.phoneNumber}</>,
        <>{branch.mondayToFriday}</>,
        <>{branch.saturday}</>,
    ]);

    return (
        <Container style={containerStyle}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant="h4" align="center">
                    Sucursales
                </Typography>
            </Container>
            <Container style={searchBarStyle}>
                <TextField
                    label="Buscar por provincia"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Container>
            <Container style={containerTableStyle}>
                <TableMolecule headers={headers} rows={rows} />
            </Container>
        </Container>
    );
};

export default Branch;

const containerStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    marginTop: '70px'
};

const containerTableStyle = {
    marginTop: '10px'
};

const searchBarStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-end'
};
