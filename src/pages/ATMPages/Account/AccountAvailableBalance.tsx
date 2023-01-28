import { Paid, PrintRounded, Close, ChevronLeft } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SizeButton } from '../../../components/atoms/SizeButton'
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { AccountService } from '../../../services/account/accountService'
import { RSAccount } from '../../../services/account/dto/RSAccount'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'

const tempUser = {
  codeLocalAccount: 'a3998d173acbf0c893db'
}

const buttonSize = {
  height: 75,
  width: 200
}

const AccountAvailableBalance = () => {

  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [account, setaccount] = useState<RSAccount>({
    codeLocalAccount: '',
    codeInternationalAccount: '',
    status: '',
    product: '',
    presentBalance: 0,
    availableBalance: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAccount();
    return () => { }
  }, []);

  const getAccount = async () => {
    setisLoading(true);
    try {
      const auxAccount: RSAccount | undefined = (await AccountService.getAccountByCode(tempUser.codeLocalAccount)).data.data;
      if (auxAccount) {
        setaccount(auxAccount);
      } else {
        seterrorMessage('No se han encontrado datos');
        setactiveErrorModal(true);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setactiveErrorModal(true);
    } finally {
      setisLoading(false);
    }
  }


  const handleClose = () => {
    navigate('/atm');
  }

  return (
    <>
      <div
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
              text={'Retirar'}
              icon={<Paid />}
              style={ButtonStyle.BIG}
              size={buttonSize}
              onClick={handleClose}
              palette={{
                backgroundColor: ColorPalette.PRIMARY,
              }} />
          </div>
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
      <LoadOrganism active={isLoading} />
      <ErrorModalOrganism
        active={activeErrorModal}
        onDeactive={() => { setactiveErrorModal(false); navigate('/cliente') }}
        text={`${errorMessage}. ¿Desea volver a intentar?`}
        enableButtonBox
        onConfirm={() => getAccount()}
        onReject={() => navigate('/cliente')}
      />
    </>
  )
}

export default AccountAvailableBalance