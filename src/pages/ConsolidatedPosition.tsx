import { useEffect, useState } from 'react';
import TableMolecule from '../components/molecules/TableMolecule';
import { Button, Typography } from '@mui/material';
import { Dropdown } from '../components/atoms/Dropdown';
import { ConsolidatedPositionGet } from '../services/account/model/ConsolidatedPositionGet';
import { ConsolidatedPositionService } from '../services/account/consolidatedPositionService';

interface ConsolidatedPositionTableProps {
  data: ConsolidatedPositionGet[],
}

const ConsolidatedPositionAccount = (props: ConsolidatedPositionTableProps) => {

  const [consolidatedPosition, setConsolidatedPosition] = useState<ConsolidatedPositionGet[]>([]);
  const searchAccountStatement = async (typeIdentification: string, identification: string) => {
    try {
      const data: ConsolidatedPositionGet[] = (await ConsolidatedPositionService.getConsolidatedPosition(typeIdentification, identification)).data.data || [];
      console.log(data);
      setConsolidatedPosition(data);
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    searchAccountStatement('DNI', '1234567890');
  }, []);

  const headersMock = [
    <Typography>No Cuenta</Typography>,
    <Typography>Tipo de cuenta</Typography>,
    <Typography>Estado</Typography>,
    <Typography>Saldo contable</Typography>,
    <Typography>Saldo disponible</Typography>
  ]
  const getRow = (data: ConsolidatedPositionGet) => {
    return [
      <Typography>{data.accountNumber}</Typography>,
      <Typography>{data.accountType}</Typography>,
      <Typography>{data.state}</Typography>,
      <Typography>{data.presentBalance}</Typography>,
      <Typography>{data.availableBalance}</Typography>
    ]
  }

  /*const rowsMock = [
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
  ]*/
  return (
    <>

      <Typography variant='h4' align='center'>Posicion Consolidada</Typography>
      <br></br>
      <TableMolecule headers={headersMock} rows={consolidatedPosition.map(consolidatedPosition => getRow(consolidatedPosition))} />
    </>
  );

};

export default ConsolidatedPositionAccount;
