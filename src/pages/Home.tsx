import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SizeButton } from '../components/atoms/SizeButton';
import { ButtonStyle } from '../style/ButtonStyle';
import { ColorPalette } from '../style/ColorPalette';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      sx={{
        width: '100%',
        height: '90vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2'>Banco BanQuito DEMO</Typography>
      <Typography variant='h6'>Seleccione el tipo de front:</Typography>
      <br />
      <Box
        display='flex'
        gap={5}
      >
        <SizeButton
          text='Clientes'
          style={ButtonStyle.BIG}
          palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
          onClick={() => navigate("/cliente")}
        />
        <SizeButton
          text='Usuarios'
          style={ButtonStyle.BIG}
          palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
          onClick={() => navigate("/usuario")}
        />
      </Box>
    </Box>
  )
}

export default Home
