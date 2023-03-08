import { Typography, Fade, Card, CardContent, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import TableMolecule from '../../../components/molecules/TableMolecule';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '../../../components/atoms/ButtonIcon';
import { Close, Edit, KeyboardBackspace } from '@mui/icons-material';
import { Dropdown } from '../../../components/atoms/Dropdown';
import StatesType from '../../../services/.json/StateType.json';
import LoadSpinner from '../../../components/atoms/LoadSpinner';
import { Spinner } from '../../../components/atoms/Spinner';
import { ReturnButton } from '../../../components/organisms/interestrate/InteresRate';
import { AlertColor } from '@mui/material';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';

const headersMock = [
  <Typography>No Cuenta</Typography>,
  <Typography>Tipo de cuenta</Typography>,
  <Typography>Estado</Typography>,
  <Typography>Saldo contable</Typography>,
  <Typography>Saldo disponible</Typography>,
  <Typography></Typography>
]

const AccountConsolidatedPositionUser = () => {

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [showErrorModal, setshowErrorModal] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");

  const [consolidatedPosition, setConsolidatedPosition] = useState<RSAccount[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);

  const [selectedIndex, setselectedIndex] = useState<number | undefined>();
  const [loadIndex, setloadIndex] = useState<number | undefined>();
  const [activateSpinner, setActivateSpinner] = useState(false);

  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

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
      settitleSnack("Cuentas");
      setmessageSnack("Cuentas encontradas");
      setcolorSnack("success");
      setopenSnack(true);

    } catch (error: any) {
      seterrorMessage(error.message);
      setshowErrorModal(true);
      settitleSnack("Cuentas");
      setmessageSnack("No se encontraron cuentas");
      setcolorSnack("error");
      setopenSnack(true);

    } finally {
      setisLoading(false);
    }
  }

  const handleSearch = (data: string) => {
    searchAccountStatement("DNI", data);
  }

  const handleEdition = (codeLocalAccount: string, status: string) => {
    updateAccount(codeLocalAccount, status);
  }

  const updateAccount = async (codeLocalAccount: string, status: string) => {
    setloadIndex(selectedIndex);
    try {
      if (!selectedIndex) {
        seterrorMessage("Seleccione una cuenta");
        setshowErrorModal(true);
        return;
      }
      setActivateSpinner(true);
      await AccountService.putAccountStatus(codeLocalAccount, { status: status });
      consolidatedPosition[selectedIndex].status = status;
      setselectedIndex(undefined);
      setActivateSpinner(false);
      settitleSnack("Cuentas");
      setmessageSnack("Cuenta actualizada");
      setcolorSnack("success");
      setopenSnack(true);
    } catch (error: any) {
      setActivateSpinner(false);
      seterrorMessage(error.message);
      setshowErrorModal(true);
      settitleSnack("Cuentas");
      setmessageSnack("No se pudo actualizar la cuenta");
      setcolorSnack("error");
      setopenSnack(true);
    } finally {
      setActivateSpinner(false);
      setloadIndex(undefined);
    }
  }

  const getRow = (data: RSAccount, index: number) => {
    return [
      <Typography>{data.codeLocalAccount}</Typography>,
      <Typography>{data.product}</Typography>,
      <>
        {
          loadIndex == index ?
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <LoadSpinner />
            </div> :
            selectedIndex === index ?
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Dropdown
                  label={'Estado'}
                  items={StatesType}
                  width={'auto'}
                  height={'auto'}
                  onChange={(value) => { handleEdition(data.codeLocalAccount, value) }} />
              </div>
              : <Typography>{data.status}</Typography>
        }
      </>
      ,
      <Typography>{data.presentBalance}</Typography>,
      <Typography>{data.availableBalance}</Typography>,
      <>
        {selectedIndex === index ? <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<Close />}
          onClick={() => setselectedIndex(undefined)} />
          : <ButtonIcon
            color={ColorPalette.PRIMARY}
            icon={<Edit />}
            onClick={() => setselectedIndex(index)} />}
      </>
    ]
  }

  return (
    <>
    <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
      {activateSpinner ? <Spinner /> : null}
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
        <Box sx={{height:30}}></Box>
        <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspace />} onClick={() => navigate('../inicio')} top={true} />
                </ReturnButton>
          <Typography variant='h4' align='center'>Posicion Consolidada</Typography>
          <br></br>
          <TableMolecule
            headers={headersMock}
            rows={consolidatedPosition.map((consolidatedPosition: RSAccount, index: number) => getRow(consolidatedPosition, index))} />
        </>
      }

      <LoadOrganism
        active={isLoading} />
      <ErrorModalOrganism
        active={showErrorModal}
        onDeactive={() => { }}
        enableButtonBox
        onReject={() => navigate('../inicio')}
        text={errorMessage} />
    </>
  );

};

export default AccountConsolidatedPositionUser;
