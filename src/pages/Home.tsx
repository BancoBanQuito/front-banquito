import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SizeButton } from '../components/atoms/SizeButton';
import { ButtonStyle } from '../style/ButtonStyle';
import { ColorPalette } from '../style/ColorPalette';

import BackgoundImage from '../assets/background.gif'

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgoundImage})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%'
      }}
    >
      <Box
        display='flex'
        marginTop={{
          md: 0,
          sm: 10,
          xs: 10
        }}
        sx={{
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h2'>Banco BanQuito DEMO</Typography>
        <Typography variant='h6'>El presente, es un DEMO de las diferentes pantallas que posee el sistema de pasivos del Banco BanQuito</Typography>
        <br />
        <Typography variant='h5'>Seleccione el tipo de front:</Typography>
        <br />
        <Box
          display='flex'
          gap={2}
          flexDirection={{
            md: 'row',
            sm: 'column',
            xs: 'column'
          }}
        >
          <SizeButton
            text='Clientes'
            style={ButtonStyle.BIG}
            palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
            onClick={() => navigate("/cliente")}
            size={{ width: '200px', height: '75px' }}
          />
          <SizeButton
            text='Usuarios'
            style={ButtonStyle.BIG}
            palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
            onClick={() => navigate("/usuario")}
            size={{ width: '200px', height: '75px' }}
          />
          <SizeButton
            text='Cajero'
            style={ButtonStyle.BIG}
            palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
            onClick={() => navigate("/atm")}
            size={{ width: '200px', height: '75px' }}
          />
        </Box>
      </Box>
    </Box >
  )
}

export default Home
