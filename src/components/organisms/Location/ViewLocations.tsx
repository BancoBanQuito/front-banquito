import { Typography } from '@mui/material';
import TableMolecule from '../../molecules/TableMolecule';
import * as React from 'react';
const headers = [
    <Typography>
        País
    </Typography>,
    <Typography>
        Provincia
    </Typography>,
    <Typography>
        Cantón
    </Typography>,
    <Typography>
        Parroquia
    </Typography>,
];

const rows = [[
    <Typography>
        1
    </Typography>,
    <Typography>
        Tasa de interes 1
    </Typography>,
    <Typography>
        Descripción de la tasa de interes 1
    </Typography>,
    <Typography>
        s
    </Typography>,
],
];
export const ViewLocations = () => {
    return (
        <div>
        <h1>Ver Ubicaciones</h1>
        <TableMolecule headers={headers} rows={rows} />
        </div>
    );
    };