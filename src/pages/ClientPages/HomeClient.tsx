import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Navigate, useNavigate } from 'react-router-dom'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'

interface userProps {
  username: string,
  password: string
}

interface Props {
  user: userProps | null,
  isLogged: boolean,
}

const HomeClient = ({ user, isLogged }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      sx={{
        width: '100%',
        height: '90vh',
        flexDirection: 'column',
      }}
    >
      <Box
        marginTop='60px'
      >
        {
          isLogged
            ? <Box>
              <Typography variant='h2'>Bienvenido Cliente {user?.username}</Typography>
              <Box
                display='flex'
                gap={5}
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SizeButton text='Crear Cuenta'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/cliente/cuenta/crear")}
                />
                <SizeButton text='Ver estado de cuenta'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/cliente/cuenta/estado")}
                />
                <SizeButton text='Transferencias'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/cliente/transaccion")}
                />
                <SizeButton text='Ver Sucursales'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/cliente/sucursales")}
                />
              </Box>
            </Box>
            : <Box
              display='flex'
              sx={{
                direction: 'column',
                height: '90vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SizeButton text='Iniciar Sesion'
                style={ButtonStyle.MEDIUM}
                palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                onClick={() => navigate("/cliente/login")}
              />
              <SizeButton text='Unirse'
                style={ButtonStyle.MEDIUM}
                palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                onClick={() => navigate("/cliente/signup")}
              />
            </Box>
        }
      </Box>
    </Box>
  )
}

export default HomeClient
