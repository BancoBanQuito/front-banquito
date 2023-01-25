import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { SizeButton } from 'src/components/atoms/SizeButton'
import { ButtonStyle } from 'src/style/ButtonStyle'
import { ColorPalette } from 'src/style/ColorPalette'

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
