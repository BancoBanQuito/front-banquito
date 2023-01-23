import React from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import TableMolecule from '../../components/molecules/TableMolecule';
import { Client } from '../../components/organisms/Login/Types';


const CreateUser: React.FC = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredClients = clients.filter((client) =>
        client.user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch('http://localhost:8081/api/branch')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => setClients(data))
            .catch((error) => console.log(error));
    }, []);

    const headers = [
        <>Identificación</>,
        <>Tipo de identificación</>,
        <>Email</>,
        <>Contraseña</>,
    ];

    const rows = filteredClients.map((client) => [
        <>{client.identification}</>,
        <>{client.identificationType}</>,
        <>{client.user.userName}</>,
        <>{client.user.password}</>,
    ]);

    return (
        <Container style={containerStyle}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant="h4" align="center">
                    Sucursales
                </Typography>
            </Container>
            <Container style={containerTableStyle}>
                <TableMolecule headers={headers} rows={rows} />
            </Container>
        </Container>
    );
};

export default Client;

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
