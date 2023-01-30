import { Avatar, Box, Button, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Navigate, useNavigate } from 'react-router-dom'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { display } from '@mui/system'
import ActionCard from '../../components/organisms/ActionCard'
import { Assessment, CalendarMonth, Facebook, Instagram, Money, Person, Savings, Send, Twitter, YouTube } from '@mui/icons-material'
import React from 'react'
import BanQuitoIcon from '../../assets/BanQuito-Logo.svg';
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'

import slideOne from '../../assets/slide1.jpg';
import slideTwo from '../../assets/slide2.jpg';
import slideThree from '../../assets/slide3.jpg';
import slideFourth from '../../assets/slide4.jpg';
import '@coreui/coreui/dist/css/coreui.min.css'
import ButtonIcon from '../../components/atoms/ButtonIcon'

interface userProps {
  username: string,
  password: string
}

interface Props {
  user: userProps | null,
  isLogged: boolean,
}

const sectionStyle: any = {
  margin: '2rem 0',
  padding: '1rem 0',
  height: 'auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column'
};

const HomeClient = ({ user, isLogged }: Props) => {

  const navigate = useNavigate();

  return (
    <>
      <div style={{ marginTop: '1rem' }}>
        <Box sx={{
          width: '100%',
          height: '97vh',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          <section style={{ height: ' 50vh' }}>
            <CCarousel style={{ height: '75vh' }} indicators controls transition="crossfade">
              <CCarouselItem style={{ height: '75vh', display: 'flex', alignContent: 'center' }}>
                <CImage className="d-block w-100" src={slideOne} alt="slide 1" />
                <CCarouselCaption className="d-none d-md-block">
                  <h5>¿Cracker?</h5>
                  <p> Protegemos tus intereses, tu futuro, y tu dinero</p>
                </CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem style={{ height: '75vh', display: 'flex', alignContent: 'center' }}>
                <CImage className="d-block w-100" src={slideTwo} alt="slide 2" />
                <CCarouselCaption className="d-none d-md-block">
                  <h5>Calidad</h5>
                  <p>Ofrecemos servicios de calidad a traves de la web</p>
                </CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem style={{ height: '75vh', display: 'flex', alignContent: 'center' }}>
                <CImage className="d-block w-100" src={slideThree} alt="slide 3" />
                <CCarouselCaption className="d-none d-md-block">
                  <h5>¿Problemas al ahorra?</h5>
                  <p>Te ayudamos a que tus ahorros crezcan</p>
                </CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem style={{ height: '75vh', display: 'flex', alignContent: 'center' }}>
                <CImage className="d-block w-100" src={slideFourth} alt="slide 4" />
                <CCarouselCaption className="d-none d-md-block">
                  <h5>Familia</h5>
                  <p>Como tu, somos parte de una gran familia bancaria</p>
                </CCarouselCaption>
              </CCarouselItem>
            </CCarousel>
          </section>
          <section style={sectionStyle}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Typography component='h5' variant='h5' sx={{ margin: '1rem' }}>Nuestras Soluciones en Linea</Typography>
              <Typography component='p' variant='body1'>Lo que necesitas desde tu web</Typography>
            </div>
            <div style={{
              marginTop: '2.5rem', width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}>
              <ActionCard icon={<Person />} title={'Crear Cuenta'} description={'Creemos tu nueva cuenta bancaria'} link={isLogged ? '/cliente/cuenta/crear' : '/cliente/login'} linkText='Crear' />
              <ActionCard icon={<Assessment />} title={'Estado de Cuenta'} description={'Veamos tu estado de cuenta'} link={isLogged ? '/cliente/cuenta/estado' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<Send />} title={'Transferencia'} description={'¿Quieres transferir? Hagamoslo'} link={isLogged ? '/cliente/cuenta/transaccion' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<CalendarMonth />} title={'Historial de Transacciones'} description={'¿Que has realizado?'} link={isLogged ? '/cliente/cuenta/transaccion/dia' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<Savings />} title={'Ahorros'} description={'El interes ganado con tu ahorros, en un solo lugar'} link={isLogged ? '/cliente/interes/cuenta/ahorros' : '/cliente/login'} linkText='Ver' />
            </div>
          </section>
          <section style={sectionStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '1rem' }}>
              <Typography component='h5' variant='h5' sx={{ margin: '2rem', color: ColorPalette.SECONDARY }}>Nosotros</Typography>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.SECONDARY }}>
                <Avatar src={BanQuitoIcon} variant='square' />
                <Typography component='h5' variant='h6' sx={{ margin: '0.5rem' }}>BanQuito</Typography>
              </div>
              <Typography sx={{ color: ColorPalette.TERNARY, maxWidth: 500 }} component='p' variant='body1'>Un sistema de Core pasivo de un sistema bancario se refiere a la parte del sistema responsable de mantener el registro de transacciones y saldos, y de realizar funciones bancarias básicas como procesar depósitos y retiros. Se denomina "pasivo" porque no participa activamente en actividades comerciales o de inversión directa para el banco, sino que sirve de base sobre la que se construyen otras partes de las operaciones del banco. El núcleo pasivo suele incluir los sistemas bancarios centrales, que gestionan las operaciones cotidianas del banco, y el libro mayor, que es el registro central de las transacciones financieras del banco. </Typography>
            </div>
          </section>
          <footer style={{ backgroundColor: ColorPalette.SECONDARY, paddingBottom: '3rem', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.ACCENT }}>
              <Avatar src={BanQuitoIcon} variant='square' />
              <Typography component='h5' variant='h6' sx={{ margin: '0.5rem' }}>BanQuito</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.ACCENT }}>
              <Instagram sx={{ cursor: 'pointer' }} />
              <Facebook sx={{ cursor: 'pointer' }} />
              <Twitter sx={{ cursor: 'pointer' }} />
              <YouTube sx={{ cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.ACCENT }}>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem' }}>Personas</Typography>
              <span>|</span>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem' }}>Empresas</Typography>
              <span>|</span>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem' }}>Pymes</Typography>
              <span>|</span>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem' }}>Microempresas</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: ColorPalette.ACCENT }}>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem', textDecoration: 'underline' }}>Informacion Legal</Typography>
              <Typography component='h5' variant='body1' sx={{ fontSize: '10px', margin: '0.5rem' }}>Banco BanQuito 2023 Todos los derechos reservados</Typography>
            </div>
          </footer>
        </Box>
      </div>
      {
        isLogged && <Button sx={{ position: 'fixed', bottom: 5, left: 5, borderRadius: '100px', width: '50px', height: '60px' }}>
          <Avatar sx={{ backgroundColor: 'transparent', color: ColorPalette.PRIMARY }}>
            <Person />
          </Avatar>
        </Button>
      }
    </>
  )
}

export default HomeClient
