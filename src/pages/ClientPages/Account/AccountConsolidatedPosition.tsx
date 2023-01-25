import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Fade, Typography } from '@mui/material';
import TableMolecule from '/src/components/molecules/TableMolecule';
import SearchAccount from '/src/components/organisms/Account/SearchAccount';
import { AccountService } from '/src/services/account/AccountService';
import { RSAccount } from '/src/services/account/dto/RSAccount';
import { ColorPalette } from '/src/style/ColorPalette';

const headersMock = [
  <Typography>No Cuenta</Typography>,
  <Typography>Tipo de cuenta</Typography>,
  <Typography>Estado</Typography>,
  <Typography>Saldo contable</Typography>,
  <Typography>Saldo disponible</Typography>
]

const AccountConsolidatedPosition = () => {

  const [consolidatedPosition, setConsolidatedPosition] = useState<RSAccount[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);

  const searchAccountStatement = async (typeIdentification: string, identification: string) => {
    try {
      const data: RSAccount[] | undefined = (await AccountService.getAccountsById(typeIdentification, identification)).data.data;
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
    setactiveSearch(false);
  }

  const getRow = (data: RSAccount) => {
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
        !activeSearch && 
        <Box sx={{ p: 20 }} justifyContent="center">
          <Typography variant="h4" sx={{ mb: 2}} align='center'>Posición consolidada</Typography>
            <TableMolecule
              headers={headersMock}
              rows={consolidatedPosition.map(consolidatedPosition => getRow(consolidatedPosition))} />
        </Box>
          
        
      }
    </>
  );

};

export default AccountConsolidatedPosition;
