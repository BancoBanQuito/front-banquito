import react, { FormEvent, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import DatePickerAtom from "/src/components/atoms/DatePicker";
import { SizeButton } from "/src/components/atoms/SizeButton";
import TableMolecule from "/src/components/molecules/TableMolecule";
import { ButtonStyle } from "/src/style/ButtonStyle";
import { ColorPalette } from "/src/style/ColorPalette";
import { TransactionService } from "/src/services/transaction/TransactionService";
import { RSTransaction } from "/src/services/transaction/dto/RSTransaction";

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo disponible</Typography>
]

const TransactionBeetwenDates = () => {
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [numAccount, setNumAccount] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<RSTransaction[]>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchTransaction();
  }

  const getRow = (transaction: RSTransaction) => {
    return [
      <Typography>{`${transaction.executeDate}`}</Typography>,
      <Typography>{transaction.movement}</Typography>,
      <Typography>{transaction.concept}</Typography>,
      <Typography>{transaction.value}</Typography>,
      <Typography>{transaction.availableBalance}</Typography>
    ];
  }

  const searchTransaction = async () => {
    try {
      const transaction = (await TransactionService.getTransaction(numAccount, dateFrom!.format("YYYY-MM-DDTHH:mm:ss"), dateTo!.format("YYYY-MM-DDTHH:mm:ss"))).data.data;
      if (transaction) {
        setTableData(transaction);
        setShowTable(true);
      }

    } catch (error: any) {

    }
  }

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit} >
        <Box
          sx={{
            marginTop: "5rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}
        >
          <div
            style={{
              margin: "2rem",
            }}
          >

            <Typography variant="h4">
              Búsqueda de transacciones por fecha
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            margin: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}>
          <TextField
            label="Número de cuenta"
            value={numAccount}
            onChange={(event) => setNumAccount(event.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}
        >
          <div
            style={{
              margin: "1rem",
            }}
          >
            <Typography variant="h6"> Desde:</Typography>
          </div>

          <Box>
            <DatePickerAtom label="Date" value={dateFrom} onChange={setDateFrom} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}
        >
          <div
            style={{
              margin: "1rem",
            }}
          >
            <Typography variant="h6"> Hasta:</Typography>
          </div>

          <Box>
            <DatePickerAtom label="Date" value={dateTo} onChange={setDateTo} />
          </Box>

          <div>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alingItems: "center",
                verticalAlign: "middle",
                alignText: "center",
              }}
            >
              <div
                style={{
                  margin: "2rem",
                }}
              >
              </div>
            </Box>
          </div>
        </Box>
        <Box
          sx={{
            width: "100%",
            margin: "2rem",
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}
        >
          <SizeButton
            submit
            text={"Buscar"}
            style={ButtonStyle.MEDIUM}
            palette={{
              backgroundColor: ColorPalette.PRIMARY,
            }}
            onClick={() => {
              setShowTable(true);
            }}
          />
        </Box>

      </Box>
      {
        showTable ? <div><TableMolecule headers={headersMock} rows={tableData ? tableData.map(data => getRow(data)) : []} /></div> : null
      }
    </div >
  );
};
export default TransactionBeetwenDates;
