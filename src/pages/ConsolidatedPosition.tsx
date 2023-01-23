import { useEffect, useState } from 'react';
import TableMolecule from '../components/molecules/TableMolecule';
import { Box, Button, Card, CardContent, Fade, Modal, Typography } from '@mui/material';
import { Dropdown } from '../components/atoms/Dropdown';
import { ConsolidatedPositionGet } from '../services/account/model/ConsolidatedPositionGet';
import { ConsolidatedPositionService } from '../services/account/consolidatedPositionService';
import { AccountResponse } from '../services/account/model/AccountResponse';
import { AccountService } from '../services/account/accountService';
import AccountSignatureEditForm from '../components/organisms/AccountSignature/AccountSignatureEditForm';
import SearchAccount from '../components/organisms/SearchAccount';
import { ColorPalette } from '../style/ColorPalette';

const headersMock = [
  <Typography>No Cuenta</Typography>,
  <Typography>Tipo de cuenta</Typography>,
  <Typography>Estado</Typography>,
  <Typography>Saldo contable</Typography>,
  <Typography>Saldo disponible</Typography>
]

const ConsolidatedPositionAccount = () => {

  const [consolidatedPosition, setConsolidatedPosition] = useState<AccountResponse[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);

  const searchAccountStatement = async (typeIdentification: string, identification: string) => {
    try {
      const data: AccountResponse[] | undefined = (await AccountService.getAccountsById(typeIdentification, identification)).data.data;
      if (data) {
        setConsolidatedPosition(data);
      } else {
        console.log("No hay datos disponibles");
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleSearch = (data: string) => {
    searchAccountStatement("DNI", data);
  }

  const getRow = (data: AccountResponse) => {
    return [
      <Typography>{data.codeLocalAccount}</Typography>,
      <Typography>{data.product}</Typography>,
      <Typography>{data.status}</Typography>,
      <Typography>{data.presentBalance}</Typography>,
      <Typography>{data.availableBalance}</Typography>
    ]
  }

  return (
    <>
      {
        activeSearch && <div style={{
          position: 'absolute',
          width: '100%',
          height: '80vh',
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Fade in={activeSearch}>
            <Card sx={{ minWidth: '450px', maxWidth: '750px' }}>
              <CardContent>
                <SearchAccount
                  color={ColorPalette.SECONDARY}
                  title='Identificacion'
                  label="Numero de identificación"
                  onSubmit={handleSearch} />
              </CardContent>
            </Card>
          </Fade>
        </div>
      }
      {
        !activeSearch && <>
          <Typography variant='h4' align='center'>Posicion Consolidada</Typography>
          <br></br>
          <TableMolecule
            headers={headersMock}
            rows={consolidatedPosition.map(consolidatedPosition => getRow(consolidatedPosition))} />
        </>
      }
    </>
  );

};

export default ConsolidatedPositionAccount;
