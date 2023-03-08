import { Typography, Fade, Card, CardContent, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import DatePickerAtom from '../../../components/atoms/DatePickerAtom';
import TableMolecule from '../../../components/molecules/TableMolecule';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RSTransaction } from '../../../services/transaction/dto/RSTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import { Spinner } from '../../../components/atoms/Spinner';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import { AlertColor } from '@mui/material';

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo</Typography>,
  <Typography>Beneficiario</Typography>,
]

const InterestInvestmentPolicies = () => {
  const headersMock = [
    <Typography>Fecha</Typography>,
    <Typography>Movimiento</Typography>,
    <Typography>Concepto</Typography>,
    <Typography>Monto</Typography>,
    <Typography>Saldo</Typography>,
    <Typography>Beneficiario</Typography>
  ]

  const [interestInvestmentPolicies, setInterestInvestmentPolicies] = useState<RSTransaction[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [activateSpinner, setActivateSpinner] = useState(false);
  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
  const searchInterestSavingAccounts = async (codeLocalAccount: string, from: string, to: string) => {

    try {
      setActivateSpinner(true);
      const data: RSTransaction[] | undefined = (await TransactionService.getTransaction(codeLocalAccount, from, to)).data.data;

      if (data) {
        const result = data.filter((item: RSTransaction) => {
          if (item.concept === 'Calculo interes, inversion estandar') {
            return item;
            settitleSnack("Busqueda exitosa");
            setmessageSnack("Se encontraron los datos");
            setcolorSnack("success");
            setopenSnack(true);
          }
        });
        setInterestInvestmentPolicies(result);
      } else {
        console.log("No hay datos disponibles");
        settitleSnack("Busqueda exitosa");
        setmessageSnack("No hay datos disponibles");
        setcolorSnack("error");
        setopenSnack(true);

      }
      setActivateSpinner(false);
      settitleSnack("Busqueda exitosa");
      setmessageSnack("Se encontraron los datos");
      setcolorSnack("success");
      setopenSnack(true);
    } catch (error: any) {
      setActivateSpinner(false);
      console.log(error);
      settitleSnack("Busqueda exitosa");
      setmessageSnack("No hay datos disponibles");
      setcolorSnack("error");
      setopenSnack(true);
      
    }
  }

  const handleSearch = (codeLocalAccount: string) => {
    searchInterestSavingAccounts(codeLocalAccount, dateFrom!.format("YYYY-MM-DDTHH:mm:ss"), dateTo!.format("YYYY-MM-DDTHH:mm:ss"));
    setactiveSearch(false);

  }

  const getRow = (data: RSTransaction) => {
    return [
      <Typography>{`${data.executeDate}`}</Typography>,
      <Typography>{data.movement}</Typography>,
      <Typography>{data.concept}</Typography>,
      <Typography>{data.value}</Typography>,
      <Typography>{data.presentBalance}</Typography>,
      <Typography></Typography>
    ]
  }


  return (
    <>
    <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
      {activateSpinner ? <Spinner /> : null}
      {
        activeSearch && <div style={{
          position: 'absolute',
          width: '100%',
          height: '80vh',
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Fade in={activeSearch}>
            <Card sx={{ minWidth: '650px', maxWidth: '750px' }}>
              <Typography variant="h6" sx={{ mb: 2 }} align='center'>Buscar interés generado por pólizas de inversión</Typography>
              <CardContent>
                <Box sx={{ display: 'flex', p: "1px", flexDirection: "row", justifyContent: 'space-evenly' }} >
                  <DatePickerAtom label="Desde que fecha" value={dateFrom} onChange={(dateAuxFrom: Dayjs | null) => { setDateFrom(dateAuxFrom) }} />
                  <DatePickerAtom label="Hasta que fecha" value={dateTo} onChange={(dateAuxTo: Dayjs | null) => { setDateTo(dateAuxTo) }} />
                </Box>
                <Box sx={{ display: 'flex', p: "1px", m: "2px" }}>

                </Box>
                <SearchAccount
                  color={ColorPalette.SECONDARY}
                  title=""
                  label="Número de Cuenta"
                  onSubmit={handleSearch} />
              </CardContent>
            </Card>
          </Fade>
        </div>
      }
      {
        !activeSearch && <>
          <Box sx={{ p: 20 }} justifyContent="center">
            <Typography variant="h4" sx={{ mb: 2 }} align='center'>Ganancias interés pólizas inversión</Typography>
            <br></br>
            <TableMolecule
              headers={headersMock}
              rows={interestInvestmentPolicies.map(interestInvestmentPolicies => getRow(interestInvestmentPolicies))} />
          </Box>
        </>
      }
    </>
  );

};

export default InterestInvestmentPolicies;
