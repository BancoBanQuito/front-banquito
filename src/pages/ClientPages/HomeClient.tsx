import React, { useEffect, useState } from 'react'
import { AlertColor, Avatar, Backdrop, Box, Button, Card, CardContent, Container, Fade, Grid, Modal } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Navigate, useNavigate } from 'react-router-dom'
import { SizeButton } from '../../components/atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { display } from '@mui/system'
import ActionCard from '../../components/organisms/ActionCard'
import { Assessment, CalendarMonth, Facebook, Instagram, Money, Person, Savings, Send, SettingsVoiceRounded, Twitter, YouTube } from '@mui/icons-material'
import BanQuitoIcon from '../../assets/BanQuito-Logo.svg';
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'

import slideOne from '../../assets/slide1.jpg';
import slideTwo from '../../assets/slide2.jpg';
import slideThree from '../../assets/slide3.jpg';
import slideFourth from '../../assets/slide4.jpg';
import '@coreui/coreui/dist/css/coreui.min.css'
import { useUser } from '../../context/UserContext'
import SnackBarMolecule from '../../components/molecules/SnackBarMolecule'
import TabsMolecule from '../../components/molecules/TabsMolecule';
import AccountsTableOrganism from '../../components/organisms/Account/AccountsTableOrganism'
import { RSAccount } from '../../services/account/dto/RSAccount'
import { AccountService } from '../../services/account/AccountService'
import LoadOrganism from '../../components/organisms/LoadOrganism'
import AccountResumePage from './Account/AccountResumePage'
import OnConstructionMolecule from '../../components/molecules/OnConstructionMolecule'
import TransactionPage from '../UserPages/Transaction/TransactionPage'
import AccountServicesPage from './Account/AccountServicesPage'
import ClockMolecule from '../../components/molecules/ClockMolecule'

const tabData: { label: string, value: any }[] = [
  {
    label: 'Resumen',
    value: 0
  }, {
    label: 'Transferencia',
    value: 1
  }, {
    label: 'Servicios',
    value: 2
  }, {
    label: 'Solicitudes',
    value: 3
  }
]

const HomeClient = () => {
  const [openSnack, setopenSnack] = useState<boolean>(false);
  const [messageSnack, setmessageSnack] = useState<string>("");
  const [titleSnack, settitleSnack] = useState<string>("");
  const [colorSnack, setcolorSnack] = useState<AlertColor>('info');
  const [currentIndex, setcurrentIndex] = useState<number>(0);

  const [isLoading, setisLoading] = useState(false);
  const [messageLoading, setmessageLoading] = useState<string | undefined>();

  const [userAccounts, setuserAccounts] = useState<RSAccount[]>([]);

  const user = useUser();

  useEffect(() => {
    if (user.isLogged && user.username) {
      settitleSnack('Bienvenido');
      setmessageSnack(user.username?.split('@')[0]);
      setcolorSnack('info');
      setopenSnack(true);
    }
    return () => { }
  }, []);

  useEffect(() => {
    if (user.identification && user.identificationType) {
      retriveAllAccounts(user.identificationType, user.identification);
    }
    return () => { }
  }, [user.identification, user.identificationType]);

  const retriveAllAccounts = async (identificationType: string, identification: string) => {
    setisLoading(true);
    try {
      const data: RSAccount[] = (await AccountService.getAccountsById(identificationType, identification)).data.data || [];
      setuserAccounts(data);
    } catch (error: any) {
      settitleSnack('Error');
      setmessageSnack('Se ha producido un error');
      setcolorSnack('error');
      setopenSnack(true);
    } finally {
      setisLoading(false);
    }
  }

  const handleCompleteTransaction = () => {
    setcurrentIndex(0);
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflowY: 'auto'
        }}
        bgcolor='#f5f6f7'>
        <TabsMolecule
          items={tabData}
          orientation='horizontal'
          defaultValue={currentIndex}
          onChange={(value) => setcurrentIndex(value)} />
        <Grid container spacing={5}>
          <Grid item xs={9}>
            <Box
              sx={{
                padding: '3.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {currentIndex === 0 && <AccountResumePage accounts={userAccounts} />}
              {currentIndex === 1 && <TransactionPage onComplete={handleCompleteTransaction} accounts={userAccounts} />}
              {currentIndex === 2 && <AccountServicesPage accounts={userAccounts} />}
              {currentIndex === 3 && <OnConstructionMolecule />}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
              <Card sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem'
              }}
                variant='outlined'>
                <CardContent>
                  <ClockMolecule />
                </CardContent>
              </Card>
              <Card sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem'
              }}
                variant='outlined'>
                <div style={{ margin: '1rem' }}>
                  <Twitter color='secondary' />
                </div>
                <div style={{ margin: '1rem' }}>
                  <Instagram color='secondary' />
                </div>
                <div style={{ margin: '1rem' }}>
                  <Facebook color='secondary' />
                </div>
              </Card>
            </Box>
          </Grid>
        </Grid>

      </Box>
      <SnackBarMolecule
        open={openSnack}
        message={messageSnack}
        title={titleSnack}
        severity={colorSnack}
        autoHideDuration={3000}
        onClose={() => setopenSnack(false)} />
      <LoadOrganism
        active={isLoading}
        text={messageLoading} />
      {/* <div style={{ marginTop: '1rem' }}>
        <Box sx={{
          width: '100%',
          height: '100vh'
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
              <ActionCard icon={<Person />} title={'Crear Cuenta'} description={'Creemos tu nueva cuenta bancaria'} link={user.isLogged ? '/cliente/cuenta/crear' : '/cliente/login'} linkText='Crear' />
              <ActionCard icon={<Assessment />} title={'Estado de Cuenta'} description={'Veamos tu estado de cuenta'} link={user.isLogged ? '/cliente/cuenta/estado' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<Send />} title={'Transferencia'} description={'¿Quieres transferir? Hagamoslo'} link={user.isLogged ? '/cliente/cuenta/transaccion' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<CalendarMonth />} title={'Historial de Transacciones'} description={'¿Que has realizado?'} link={user.isLogged ? '/cliente/cuenta/transaccion/dias' : '/cliente/login'} linkText='Ver' />
              <ActionCard icon={<Savings />} title={'Ahorros'} description={'El interes ganado con tu ahorros, en un solo lugar'} link={user.isLogged ? '/cliente/interes/cuenta/ahorros' : '/cliente/login'} linkText='Ver' />
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
        user.isLogged && <Button sx={{ position: 'fixed', bottom: 5, left: 5, borderRadius: '100px', width: '50px', height: '60px' }}>
          <Avatar sx={{ backgroundColor: 'transparent', color: ColorPalette.PRIMARY }}>
            <Person />
          </Avatar>
        </Button>
      }
      <Modal
        open={welcomeModal}
        onClose={() => { }}
        closeAfterTransition>
        <Fade in={welcomeModal}>
          <Box sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <Typography variant="h3" component="h1" sx={{ color: ColorPalette.SECONDARY }}>
              Bienvenido
            </Typography>
            <Typography variant="h6" component="h6" sx={{ color: ColorPalette.BLACK }}>
              {`${user.username?.split('@')[0]}`}
            </Typography>
          </Box>
        </Fade>
      </Modal> */}
    </>
  )
}

export default HomeClient
