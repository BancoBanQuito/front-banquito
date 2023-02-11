import { Computer } from '@mui/icons-material'
import { Avatar, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import BgImage from '../../assets/wood.jpg'
import { useNavigate } from 'react-router-dom'
import BgAtom from '../../components/atoms/BgAtom'

const SelectAccountClientType = () => {

  const navigate = useNavigate();

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
              palette={{ backgroundColor: ColorPalette.PRIMARY }}
              size={{
                width: 300,
                height: 'auto'
              }} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SelectAccountClientType