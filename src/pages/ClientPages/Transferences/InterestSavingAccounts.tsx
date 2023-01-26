import React, { useState } from 'react';
import { Box, Card, CardContent, Fade, TextFieldProps, Typography } from '@mui/material';
import { SizeButton } from '/src/components/atoms/SizeButton';
import TableMolecule from '/src/components/molecules/TableMolecule';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';
import { RSSavingsAccountInterest } from '/src/services/transaction/dto/RSSavingsAccountInterest';
import { InterestService } from '/src/services/transaction/InterestService';
import SearchAccount from '/src/components/organisms/Account/SearchAccount';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerAtom from '/src/components/atoms/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TransactionService } from '/src/services/transaction/TransactionService';
import { RSTransaction } from '/src/services/transaction/dto/RSTransaction';
import Modal from '@mui/material/Modal/Modal';

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo</Typography>,
  <Typography>Beneficiario</Typography>,
]



const InterestSavingAccounts = () => {

  const [interestSavingAccounts, setInterestSavingAccounts] = useState<RSTransaction[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);

  const searchInterestSavingAccounts = async (codeLocalAccount: string, from: string, to: string) => {

    try {
      const data: RSTransaction[] | undefined = (await TransactionService.getTransaction(codeLocalAccount, from, to)).data.data;
      if (data) {
        const result = data.filter((item: RSTransaction) => {
          if (item.concept === 'Calculo interes, cuenta de ahorros GANA DIARIO' || item.concept === 'Calculo interes, cuenta de ahorros STANDARD') {
            return item;
          }
        });
        setInterestSavingAccounts(result);
      } else {
        console.log("No hay datos disponibles");

      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleSearch = (codeLocalAccount: string) => {
    searchInterestSavingAccounts(codeLocalAccount, dateFrom!.format("YYYY-MM-DDTHH:mm:ss"), dateTo!.format("YYYY-MM-DDTHH:mm:ss"));
    setactiveSearch(false);
    console.log(dateFrom!.format("YYYY-MM-DDTHH:mm:ss"));

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
              <Typography variant="h6" sx={{ mb: 2 }} align='center'>Buscar interés generado por las cuentas de ahorro</Typography>
              <CardContent>
                <Box sx={{ display: 'flex', p: "1px", flexDirection: "row", justifyContent: 'space-evenly'}} >
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
            <Typography variant="h4" sx={{ mb: 2 }} align='center'>Ganancias interés cuentas ahorro</Typography>
            <br></br>
            <TableMolecule
              headers={headersMock}
              rows={interestSavingAccounts.map(interestSavingAccounts => getRow(interestSavingAccounts))} />
          </Box>
        </>
      }
    </>
  );

};

export default InterestSavingAccounts;
