import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AlertColor, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { ExpandMore, Facebook, Instagram, Twitter } from '@mui/icons-material'
import '@coreui/coreui/dist/css/coreui.min.css'
import { useUser } from '../../context/UserContext'
import SnackBarMolecule from '../../components/molecules/SnackBarMolecule'
import TabsMolecule from '../../components/molecules/TabsMolecule';
import { RSAccount } from '../../services/account/dto/RSAccount'
import { AccountService } from '../../services/account/AccountService'
import LoadOrganism from '../../components/organisms/LoadOrganism'
import AccountResumePage from './Account/AccountResumePage'
import OnConstructionMolecule from '../../components/molecules/OnConstructionMolecule'
import TransactionPage from '../UserPages/Transaction/TransactionPage'
import AccountServicesPage from './Account/AccountServicesPage'
import ClockMolecule from '../../components/molecules/ClockMolecule'
import AccountApplicationPage from './Account/AccountApplicationPage'
import CardMolecule from '../../components/molecules/CardMolecule'
import CalculateInterestFormOrganism from '../../components/organisms/CalculateInterestFormOrganism'

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
    value: 4
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
              {currentIndex === 3 && <AccountApplicationPage accounts={userAccounts} />}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 350
              }}>
              <CardMolecule
                margin='0.5rem 0'>
                <div>
                  <ClockMolecule />
                </div>
              </CardMolecule>
              <Accordion
                variant='outlined'
                sx={{ margin: '0.5rem 0' }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}>
                  <Typography variant='h6' fontSize='0.95rem' color='secondary'>Calculo de Intereses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CalculateInterestFormOrganism
                    accounts={userAccounts} />
                </AccordionDetails>
              </Accordion>
              <CardMolecule
                margin='0.5rem 0'>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                  }}>
                  <Twitter color='secondary' />
                  <Instagram color='secondary' />
                  <Facebook color='secondary' />
                </div>
              </CardMolecule>
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
    </>
  )
}

export default HomeClient
