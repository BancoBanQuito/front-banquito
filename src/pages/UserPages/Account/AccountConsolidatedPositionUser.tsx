import { Typography, Fade, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import TableMolecule from '../../../components/molecules/TableMolecule';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import { useNavigate } from 'react-router-dom';

const headersMock = [
  <Typography>No Cuenta</Typography>,
  <Typography>Tipo de cuenta</Typography>,
  <Typography>Estado</Typography>,
  <Typography>Saldo contable</Typography>,
  <Typography>Saldo disponible</Typography>
]

const AccountConsolidatedPositionUser = () => {

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [showErrorModal, setshowErrorModal] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");

  const [consolidatedPosition, setConsolidatedPosition] = useState<RSAccount[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);

  const navigate = useNavigate();

  const searchAccountStatement = async (typeIdentification: string, identification: string) => {
    setisLoading(true);
    try {
      const data: RSAccount[] | undefined = (await AccountService.getAccountsById(typeIdentification, identification)).data.data;
      if (data) {
        setConsolidatedPosition(data);
        setactiveSearch(false);
      } else {
        seterrorMessage("No hay datos disponibles");
        setshowErrorModal(true);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setshowErrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

  const handleSearch = (data: string) => {
    searchAccountStatement("DNI", data);
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
        !activeSearch && <>
          <Typography variant='h4' align='center'>Posicion Consolidada</Typography>
          <br></br>
          <TableMolecule
            headers={headersMock}
            rows={consolidatedPosition.map(consolidatedPosition => getRow(consolidatedPosition))} />
        </>
      }

      <LoadOrganism
        active={isLoading} />
      <ErrorModalOrganism
        active={showErrorModal}
        onDeactive={() => { }}
        enableButtonBox
        onReject={() => navigate('../..')}
        text={errorMessage} />
    </>
  );

};

export default AccountConsolidatedPositionUser;
