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
import ButtonIcon from '../../../components/atoms/ButtonIcon';
import { Edit } from '@mui/icons-material';
import { Dropdown } from '../../../components/atoms/Dropdown';
import StatesType from '../../../services/.json/StateType.json';
import LoadSpinner from '../../../components/atoms/LoadSpinner';

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
      await AccountService.putAccountStatus(codeLocalAccount, { status: status });
      consolidatedPosition[selectedIndex].status = status;
      setselectedIndex(undefined);
    } catch (error: any) {
      seterrorMessage(error.message);
      setshowErrorModal(true);
    } finally {
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
      <Typography><ButtonIcon
        color={ColorPalette.PRIMARY}
        icon={<Edit />}
        onClick={() => { setselectedIndex(index); console.log(selectedIndex === index); }} /></Typography>
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
            rows={consolidatedPosition.map((consolidatedPosition: RSAccount, index: number) => getRow(consolidatedPosition, index))} />
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
