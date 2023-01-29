import { Avatar, Box, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Navigate, useNavigate } from 'react-router-dom'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { display } from '@mui/system'
import ActionCard from '../../components/organisms/ActionCard'
import { Money } from '@mui/icons-material'
import React from 'react'
import BanQuitoIcon from '../../assets/BanQuito-Logo.svg';

interface userProps {
  username: string,
  password: string
}

interface Props {
  user: userProps | null,
  isLogged: boolean,
}

const sectionStyle: any = {
  margin: '1rem',
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column'
};

const HomeClient = ({ user, isLogged }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Box
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
    </Box> */}
      <Box sx={{
        width: '100%',
        height: '97vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflowX: 'hidden',
        overflowY: 'auto'
      }}>
        {/* Carousel */}<section>
          {/* <Carousel
            activeSelect>
            <
          </Carousel> */}
        </section>
        <section style={sectionStyle}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Typography component='h5' variant='h5' sx={{ margin: '2rem' }}>Nuestras Soluciones en Linea</Typography>
            <Typography component='p' variant='body1'>Lo que necesitas desde tu web</Typography>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <ActionCard icon={<Money />} title={'Sample 1'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
              <ActionCard icon={<Money />} title={'Sample 2'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
              <ActionCard icon={<Money />} title={'Sample 3'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
              <ActionCard icon={<Money />} title={'Sample 4'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
              <ActionCard icon={<Money />} title={'Sample 5'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
              <ActionCard icon={<Money />} title={'Sample 6'} description={'Solicita tu nueva tarjeta en pocos pasos'} link='/cliente' linkText='Ver' />
            </Box>
          </div>
        </section>
        <section style={sectionStyle}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Typography component='h5' variant='h5' sx={{ margin: '2rem', color: ColorPalette.SECONDARY }}>Nosotros</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.SECONDARY }}>
              <Avatar src={BanQuitoIcon} variant='square' />
              <Typography component='h5' variant='h6' sx={{ margin: '0.5rem' }}>BanQuito</Typography>
            </div>
            <Typography sx={{ color: ColorPalette.TERNARY }} component='p' variant='body1'>Un sistema de Core pasivo de un sistema bancario se refiere a la parte del sistema responsable de mantener el registro de transacciones y saldos, y de realizar funciones bancarias básicas como procesar depósitos y retiros. Se denomina "pasivo" porque no participa activamente en actividades comerciales o de inversión directa para el banco, sino que sirve de base sobre la que se construyen otras partes de las operaciones del banco. El núcleo pasivo suele incluir los sistemas bancarios centrales, que gestionan las operaciones cotidianas del banco, y el libro mayor, que es el registro central de las transacciones financieras del banco. </Typography>
          </div>
        </section>
        {/* Footer */}<footer>

        </footer>
      </Box>
    </>
  )
}

export default HomeClient
