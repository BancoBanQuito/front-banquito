import { useEffect, useState } from 'react';
import TableMolecule from '../components/molecules/TableMolecule';
import { Button, Typography } from '@mui/material';
import { Dropdown } from '../components/atoms/Dropdown';


const AppConsolidatedPosition = () => {
    const headersMock = [
        <Typography>No Cuenta</Typography>,
        <Typography>Tipo de cuenta</Typography>,
        <Typography>Estado</Typography>,
        <Typography>Saldo contable</Typography>,
        <Typography>Saldo disponible</Typography>
      ]
    
      const rowsMock = [
        [
          <Typography>Cell 1</Typography>,
          <Typography>Cell 2</Typography>,
          <Typography>Cell 3</Typography>,
          <Typography>Cell 4</Typography>,
          <Typography>Cell 5</Typography>,
          //<Dropdown label='Cell 4' items={['Cell 1']} width={200} height={50} />
        ],
        [
          <Typography>Cell 5</Typography>,
          <Typography>Cell 6</Typography>,
          <Typography>Cell 7</Typography>,
          <Typography>Cell 7</Typography>,
          <Typography>Cell 7</Typography>,
          //<Button variant='contained'>Cell 8</Button>
        ]
      ]
    return (
        <>
        
            <Typography variant='h4' align='center'>Posicion Consolidada</Typography>
            <br></br>
            <TableMolecule headers={headersMock} rows={rowsMock} />
        </>
    );

};

export default AppConsolidatedPosition;
