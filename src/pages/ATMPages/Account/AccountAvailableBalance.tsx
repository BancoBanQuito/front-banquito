import { Paid, PrintRounded, Close, ChevronLeft } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

interface ATMLoginForm {
  codeLocalAccount: string,
  password: string,
}

const buttonSize = {
  height: 75,
  width: 200
}

const AccountAvailableBalance = () => {

  const [loadingMessage, setloadingMessage] = useState<string | undefined>();
  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [indexForm, setindexForm] = useState<number>(0);
  const [login, setlogin] = useState<ATMLoginForm>({
    codeLocalAccount: "",
    password: ""
  });
  const [activateSpinner, setActivateSpinner] = useState(false);
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

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/atm');
  }

  const handleLogin = async (password: string) => {
    setisLoading(true);
    try {
      setloadingMessage("Validando cuenta...")
      setActivateSpinner(true);
      const account: RSAccount | undefined = (await AccountService.getAccountByCode(login.codeLocalAccount)).data.data;
      setActivateSpinner(false);
      if (account) {
        setloadingMessage("Validando contraseña...")
        setActivateSpinner(true);
        const user: RSAtmLogin | undefined = (await (AtmLoginService.getLoginCredentials(account.identification))).data;
        setActivateSpinner(false);
        if (user) {
          if (user.user.password === password) {
            setaccount(account);
            setindexForm(2);
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
      setActivateSpinner(false);
      seterrorMessage(error.message);
      setactiveErrorModal(true);
    } finally {
      setActivateSpinner(false);
      setisLoading(false);
    }
  }

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      {
        indexForm === 0 ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '6rem'
          }}>
            <Box sx={{
              width: 500,
            }}>
              <AtmLoginForm
                atm
                codeLocalAccount
                onSubmit={(data: any) => {
                  setindexForm(1);
                  setlogin({
                    ...login,
                    codeLocalAccount: data.codeLocalAccount
                  });
                }} />
            </Box>
          </div>
          : indexForm === 1 ?
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '6rem'
            }}>
              <Box sx={{
                width: 500,
              }}>

                <AtmLoginForm
                  atm
                  password
                  title="Contraseña"
                  onSubmit={(data: any) => {
                    setlogin({
                      ...login,
                      password: data.password
                    });
                    handleLogin(data.password);
                  }} />
              </Box>
            </div>
            : <div
              style={{
                position: 'relative',
                width: '100%',
                height: '97vh',
                overflowY: 'hidden',
                overflowX: 'hidden'
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
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: -30,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center'
              }}>
                <div style={{ margin: '1rem 0' }}>
                  <SizeButton
                    text={'Imprimir'}
                    icon={<PrintRounded />}
                    style={ButtonStyle.BIG}
                    size={buttonSize}
                    onClick={handleClose}
                    palette={{
                      backgroundColor: ColorPalette.PRIMARY,
                    }} />
                </div>
                <div style={{ margin: '1rem 0' }}>
                  <SizeButton
                    text={'Salir'}
                    icon={<Close />}
                    style={ButtonStyle.BIG}
                    size={buttonSize}
                    onClick={handleClose}
                    palette={{
                      backgroundColor: ColorPalette.PRIMARY,
                    }} />
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: -30
              }}>
                <div style={{ margin: '1rem 0' }}>
                  <SizeButton
                    text={'Volver'}
                    icon={<ChevronLeft />}
                    style={ButtonStyle.BIG}
                    size={buttonSize}
                    onClick={handleClose}
                    palette={{
                      backgroundColor: ColorPalette.PRIMARY,
                    }} />
                </div>
              </div>
            </div>
      }
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