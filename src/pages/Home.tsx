import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SizeButton } from '../components/atoms/SizeButton';
import { ButtonStyle } from '../style/ButtonStyle';
import { ColorPalette } from '../style/ColorPalette';

import BackgoundImage from '../assets/cover.mp4'

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgoundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      >
        <source src={BackgoundImage} type='video/mp4' />
      </video>
      <Box
        display='flex'
        flexDirection={{
          md: 'column',
          sm: 'row',
          xs: 'row'
        }}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '90vh',
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
