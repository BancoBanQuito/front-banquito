import { Typography, Fade, Card, CardContent, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import DatePickerAtom from '../../../components/atoms/DatePicker';
import TableMolecule from '../../../components/molecules/TableMolecule';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RSTransaction } from '../../../services/transaction/dto/RSTransaction';
import { ColorPalette } from '../../../style/ColorPalette';

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo</Typography>,
  <Typography>Beneficiario</Typography>,
]



const PaymentDebitCard = () => {

  const [debitCardPayment, setDebitCardPayment] = useState<RSTransaction[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);

  const searchInterestSavingAccounts = async (codeLocalAccount: string, from: string, to: string) => {

    try {
      const data: RSTransaction[] | undefined = (await TransactionService.getTransaction(codeLocalAccount, from, to)).data.data;
      if (data) {
        const result = data.filter((item: RSTransaction) => {
          if (item.concept === 'Consumo Tarjeta' && item.movement === 'NOTA DEBITO') {
            return item;
          }
        });
        setDebitCardPayment(result);
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
              <Typography variant="h6" sx={{ mb: 2 }} align='center'>Buscar pagos realizados por tarjeta de débito</Typography>
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
            <Typography variant="h4" sx={{ mb: 2 }} align='center'>Pagos tarjeta de débito</Typography>
            <br></br>
            <TableMolecule
              headers={headersMock}
              rows={debitCardPayment.map(debitCardPayment => getRow(debitCardPayment))} />
          </Box>
        </>
      }
    </>

  )
};


export default PaymentDebitCard;
