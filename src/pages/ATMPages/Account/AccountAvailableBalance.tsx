import { Paid, PrintRounded, Close, ChevronLeft } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SizeButton } from '../../../components/atoms/SizeButton'
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { AccountService } from '../../../services/account/AccountService'
import { RSAccount } from '../../../services/account/dto/RSAccount'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import AtmLoginForm from '../../../components/organisms/AtmLoginForm'
import { AtmLoginService } from '../../../services/login/AtmLoginService'
import { RSAtmLogin } from '../../../services/login/dto/RSAtmLogin'
import { Spinner } from '../../../components/atoms/Spinner'
import ATMButtonAtom from '../../../components/atoms/ATMButtonAtom'
import ATMButtonContainerMolecule from '../../../components/molecules/ATMButtonContainerMolecule'
import ATMFormOrganism from '../../../components/organisms/ATMFormOrganism'
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule'
import ATMTransactionFileOrganism from '../../../components/organisms/ATMTransactionFileOrganism'
import ATMPrintOrganism from '../../../components/organisms/ATMPrintFormOrganism'
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction'
import { TransactionService } from '../../../services/transaction/TransactionService'
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism'
import { AlertColor } from '@mui/material'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule'

interface ATMLoginForm {
  codeLocalAccount: string,
  password: string,
}

const fileValue = 0.5;

const AccountAvailableBalance = () => {

  const [loadingMessage, setloadingMessage] = useState<string | undefined>();
  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");

  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
  const [showInfoModal, setshowInfoModal] = useState<boolean>(false);

  const [canPrint, setcanPrint] = useState<boolean>(false);

  const [indexForm, setindexForm] = useState<number>(0);

  const [login, setlogin] = useState<ATMLoginForm>({
    codeLocalAccount: "",
    password: ""
  });

  const [account, setaccount] = useState<RSAccount>({
    codeLocalAccount: '',
    codeInternationalAccount: '',
    identification: '',
    identificationType: '',
    status: '',
    product: '',
    presentBalance: 0,
    availableBalance: 0,
  });

  const printRef = useRef();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/atm');
  }

  const handleLogin = async (password: string) => {
    setisLoading(true);
    try {
      setloadingMessage("Validando cuenta...")
      const account: RSAccount | undefined = (await AccountService.getAccountByCode(login.codeLocalAccount)).data.data;
      if (account) {
        setloadingMessage("Validando contraseña...")
        const user: RSAtmLogin | undefined = (await (AtmLoginService.getLoginCredentials(account.identification))).data;
        
        if (user) {
          if (user.user.password === password) {
            setaccount(account);
            setindexForm(3);
          } else {
            seterrorMessage("Contraseña invalida");
            setactiveErrorModal(true);
          }
        } else {
          seterrorMessage("Cuenta no encontrada");
          setactiveErrorModal(true);
        }
      } else {
        seterrorMessage("Cuenta no encontrada");
        setactiveErrorModal(true);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setactiveErrorModal(true);
      settitleSnack("Error");
      setmessageSnack(error.message);
      
    } finally {
      setisLoading(false);
    }
  }

  const handlePrint = () => {
    const data: RQTransaction = {
      codeInternationalAccount: account.codeInternationalAccount,
      codeLocalAccount: account.codeLocalAccount,
      concept: "Retiro cajero",
      description: "",
      movement: "NOTA DEBITO",
      recipientAccountNumber: "",
      recipientBank: "",
      recipientType: "",
      type: "RETIRO",
      value: fileValue
    };
    handleAccept(data);
  }

  const handleAccept = async (data: RQTransaction) => {
    setisLoading(true);
    try {
      setloadingMessage("Validando pago...");
      await TransactionService.postTransaction(data);
      setshowInfoModal(true);
    } catch (error: any) {
      setactiveErrorModal(true);
      seterrorMessage(error.message);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
    <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', bottom: 0 }}>
          <ProgressButtonMolecule
            color={ColorPalette.PRIMARY}
            itemsCount={3}
            current={indexForm}
            onUpdate={(value) => setindexForm(value)}
          />
        </div>
        {
          !canPrint ? <Box sx={{
            width: 500,
          }}>
            {indexForm === 0 ?
              <ATMFormOrganism
                key={0}
                title={"Ingresa tu cuenta"}
                type={"text"}
                label="Cuenta"
                onSubmit={(data: any) => {
                  setindexForm(1);
                  setlogin({
                    ...login,
                    codeLocalAccount: data
                  });
                }} />
              : indexForm === 1 ?
                <ATMFormOrganism
                  key={1}
                  title={"Contraseña"}
                  type={"password"}
                  label="Contraseña"
                  onSubmit={(data: any) => {
                    setlogin({
                      ...login,
                      password: data
                    });
                    handleLogin(data);
                  }} /> :
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Box
                    component="div"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                      textAlign: 'center',
                      width: '100%'
                    }}>
                    <Typography
                      sx={{
                        fontSize: '1.5rem'
                      }}>Tu saldo disponible es</Typography>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '3rem'
                      }}
                    >$ {(Math.round(account.availableBalance * 100) / 100).toFixed(2)}</Typography>
                  </Box>
                  <ATMButtonContainerMolecule position='right'>
                    <ATMButtonAtom
                      icon={<PrintRounded />}
                      text={'Imprimir'}
                      onClick={() => {
                        setcanPrint(true);
                      }}
                      palette={{
                        backgroundColor: ColorPalette.SECONDARY
                      }} />
                    <ATMButtonAtom
                      icon={<Close />}
                      text={'Salir'}
                      onClick={handleClose}
                      palette={{
                        backgroundColor: ColorPalette.PRIMARY
                      }} />
                  </ATMButtonContainerMolecule>
                </div>}
          </Box> :
            <ATMPrintOrganism
              fileValue={fileValue}
              printRef={printRef}
              onAccept={handlePrint}
              onReject={() => setcanPrint(false)}
              type={'info'} />}
      </div>
      <div style={{ display: 'none' }}>
        <ATMTransactionFileOrganism
          ref={printRef}
          type='info'
          account={login.codeLocalAccount}
          value={account.availableBalance}
          fileValue={fileValue} />
      </div>
      <InfoModalOrganism
        active={showInfoModal}
        onDeactive={() => { }}
        title='Pago Completo'
        text={''}
        buttonText='Ok'
        onClick={() => navigate('/atm')} />
      <LoadOrganism
        active={isLoading}
        text={loadingMessage} />
      <ErrorModalOrganism
        active={activeErrorModal}
        onDeactive={() => { setactiveErrorModal(false); navigate('/cliente') }}
        text={`${errorMessage}. ¿Desea volver a intentar?`}
        enableButtonBox
        onConfirm={() => navigate('/')}
        onReject={() => navigate('/atm')}
      />
    </>
  )
}

export default AccountAvailableBalance