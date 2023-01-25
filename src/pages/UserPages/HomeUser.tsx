import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Navigate, useNavigate } from 'react-router-dom'
import { SizeButton } from 'src/components/atoms/SizeButton'
import { ButtonStyle } from 'src/style/ButtonStyle'
import { ColorPalette } from 'src/style/ColorPalette'

interface userProps {
  username: string,
  password: string
}

interface Props {
  user: userProps | null,
  isLogged: boolean,
}

const HomeUser = ({ user, isLogged }: Props) => {
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
              <Typography variant='h2'>Bienvenido Usuario {user?.username}</Typography>
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
                  onClick={() => navigate("/usuario/cuenta/crear")}
                />
                <SizeButton text='Ver estado de cuenta'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/cuenta/estado")}
                />
                <SizeButton text='Transacciones'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/transaccion")}
                />
                <SizeButton text='Ubicaciones'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/ubicaciones")}
                />
                <SizeButton text='Ver banco'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/entidad")}
                />
                <SizeButton text='Editar banco'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/actualizar/entidad")}
                />
                <SizeButton text='Ver Sucursales'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/sucursales")}
                />
                <SizeButton text='Ver Feriados'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/feriados")}
                />
                <SizeButton text='Crear firma asociada'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/accout/signature")}
                />
                <SizeButton text='Editar firma asociada'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/edit/accout/signature")}
                />
                <SizeButton text='Cancelar cuenta'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/accout/cancel")}
                />
                <SizeButton text='Ver transacciones entre fechas'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/transaccion/dates")}
                />
                <SizeButton text='Ver tasas de interes'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/interes")}
                />
                <SizeButton text='Agregar tipo de producto'
                  style={ButtonStyle.MEDIUM}
                  palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                  onClick={() => navigate("/usuario/agregar/tipo-de-producto")}
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
                onClick={() => navigate("/usuario/login")}
              />
              <SizeButton text='Unirse'
                style={ButtonStyle.MEDIUM}
                palette={{ backgroundColor: ColorPalette.PRIMARY, accent: ColorPalette.ACCENT }}
                onClick={() => navigate("/usuario/signup")}
              />
            </Box>
        }
      </Box>
    </Box>
  )
}

export default HomeUser
