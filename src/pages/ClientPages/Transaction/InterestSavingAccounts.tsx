import { Typography, Fade, Card, CardContent, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import DatePickerAtom from '../../../components/atoms/DatePicker';
import TableMolecule from '../../../components/molecules/TableMolecule';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RSTransaction } from '../../../services/transaction/dto/RSTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import { InterestService } from '../../../services/transaction/InterestService';
import { RSSavingsAccountInterest } from '../../../services/transaction/dto/RSSavingsAccountInterest';
import moment from 'moment';

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Interes</Typography>,
  <Typography>Saldo</Typography>,
]



const InterestSavingAccounts = () => {

  const [interestSavingAccounts, setInterestSavingAccounts] = useState<RSSavingsAccountInterest[]>([]);
  const [activeSearch, setactiveSearch] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);

  const searchInterestSavingAccounts = async (codeLocalAccount: string, from: string, to: string) => {

    try {
      const data: RSSavingsAccountInterest[] | undefined = (await InterestService.getInterest(codeLocalAccount, from, to)).data.data;
      const regex = /Calculo interes/;
      if (data) {
        console.log(data);
        // const result = data.filter((item: RSSavingsAccountInterest) => regex.test(item.concept));
        setInterestSavingAccounts(data);
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

  const getRow = (data: RSSavingsAccountInterest) => {
    return [
      <Typography>{moment(data.executeDate).format('YYYY-MM-DD')}</Typography>,
      <Typography>{data.value}</Typography>,
      <Typography>{data.availableBalance}</Typography>,
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
