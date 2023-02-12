import { Computer } from '@mui/icons-material'
import { Avatar, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import BgImage from '../../assets/wood.jpg'
import { useNavigate } from 'react-router-dom'
import BgAtom from '../../components/atoms/BgAtom'
import { useUser } from '../../context/UserContext'
import InfoModalOrganism from '../../components/organisms/InfoModalOrganism'

const SelectAccountClientType = () => {

  const [infoMessage, setinfoMessage] = useState<string>("");
  const [titleInfoModal, settitleInfoModal] = useState<string>("");
  const [openInfoModal, setopenInfoModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user.isLogged) {
      navigate('/cliente/inicio');
    }
    return () => { }
  }, []);

  return (
    <>
      <BgAtom />
      <Card
        sx={{ maxWidth: 500 }}
        elevation={5}>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto'
        }}>
          <Typography variant='h6' color='primary'>¡Bienvenido!</Typography>
          <Avatar
            sx={{ width: 150, height: 150, bgcolor: 'transparent' }} variant='square'>
            <Computer color='primary' sx={{ fontSize: 100 }} />
          </Avatar>
          <Typography variant='body1'>Para comenzar, seleccione una opción</Typography>
          <div style={{ margin: '0.5rem 1rem' }}>
            <SizeButton
              text={'Banca Virtual Personas'}
              style={ButtonStyle.MEDIUM}
              palette={{ backgroundColor: ColorPalette.PRIMARY }}
              onClick={() => navigate('login')}
              size={{
                width: 300,
                height: 'auto'
              }} />
          </div>
          <div style={{ margin: '0.5rem 1rem' }}>
            <SizeButton
              text={'Banca Virtual Empresas'}
              style={ButtonStyle.MEDIUM}
              onClick={() => {
                setopenInfoModal(true);
                setinfoMessage('Lamentamos los inconvenientes, esta area aun esta en construccion');
                settitleInfoModal('Estamos Trabajando')
              }}
              palette={{ backgroundColor: ColorPalette.PRIMARY }}
              size={{
                width: 300,
                height: 'auto'
              }} />
          </div>
        </CardContent>
      </Card>
      <InfoModalOrganism
        active={openInfoModal}
        onDeactive={() => setopenInfoModal(false)}
        text={infoMessage}
        onClick={() => setopenInfoModal(false)}
        title={titleInfoModal}
        buttonText='Cerrar'
      />
    </>
  )
}

export default SelectAccountClientType