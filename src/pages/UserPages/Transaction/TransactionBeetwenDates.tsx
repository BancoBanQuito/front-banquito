import react, { FormEvent, useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import DatePickerAtom from "../../../components/atoms/DatePicker";
import { SizeButton } from "../../../components/atoms/SizeButton";
import TableMolecule from "../../../components/molecules/TableMolecule";
import { TransactionService } from "../../../services/transaction/TransactionService";
import { RSTransaction } from "../../../services/transaction/dto/RSTransaction";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import ErrorModalOrganism from "../../../components/organisms/ErrorModalOrganism";
import LoadOrganism from "../../../components/organisms/LoadOrganism";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/atoms/Dropdown";
import { useUser } from "../../../context/UserContext";
import { AccountService } from "../../../services/account/AccountService";
import { RSAccount } from "../../../services/account/dto/RSAccount";

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo disponible</Typography>
]

interface TransactionBeetwenDatesProps {
  client?: boolean;
}

const TransactionBeetwenDates = (props: TransactionBeetwenDatesProps) => {
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [numAccount, setNumAccount] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<RSTransaction[]>();
  const [accounts, setaccounts] = useState<{ name: string, value: string }[]>([]);

  const [showInfoModal, setshowInfoModal] = useState<boolean>(false);
  const [infoMessage, setinfoMessage] = useState<string>('');
  const [showerrorModal, setshowerrorModal] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!!props.client) {
      retriveAllAccounts(user.identification || '', user.identificationType || '');
    }
    return () => { }
  }, []);

  const retriveAllAccounts = async (id: string, idType: string) => {
    setisLoading(true);
    try {
      const rsAccounts: RSAccount[] | undefined = (await AccountService.getAccountsById(idType, id)).data.data;
      if (!rsAccounts || rsAccounts.length <= 0) {
        setinfoMessage("No se han encontrado cuentas asociadas");
        setshowInfoModal(true);
        return;
      }
      const dropAccounts = rsAccounts.map(account => {
        return {
          name: account.codeLocalAccount,
          value: account.codeLocalAccount
        }
      });
      setaccounts(dropAccounts);
    } catch (error: any) {
      seterrorMessage(error.message);
      setshowerrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

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
    setisLoading(true);
    try {
      const transaction = (await TransactionService.getTransaction(numAccount, dateFrom!.format("YYYY-MM-DDTHH:mm:ss"), dateTo!.format("YYYY-MM-DDTHH:mm:ss"))).data.data;
      if (transaction) {
        setTableData(transaction);
        setShowTable(true);
      } else {
        seterrorMessage("No se han encontrado datos");
        setshowerrorModal(true);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setshowerrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
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
            {!!props.client &&
              <Card sx={{ minWidth: '450px', maxWidth: '750px' }}>
                <CardContent>
                  {accounts.length <= 0 ? <Typography variant='h6'>Es necesario crear una cuenta</Typography> :
                    <>
                      <Box mb={2} sx={{ fontStyle: 'italic', color: ColorPalette.SECONDARY }}>
                        <Typography variant='h4' component='h6'>
                          Selector de cuentas
                        </Typography>
                        <Typography variant='body1' component='h6'>
                          Buscador
                        </Typography>
                      </Box>
                      <Dropdown
                        label={'Cuentas'}
                        items={accounts}
                        onChange={(event) => setNumAccount(event)}
                        width={'100%'}
                        height={'auto'} />
                    </>}
                </CardContent>
              </Card>}
            {!props.client && <TextField
              label="Número de cuenta"
              value={numAccount}
              onChange={(event) => setNumAccount(event.target.value)}
            />}
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
      </div>
      <LoadOrganism
        active={isLoading} />
      <ErrorModalOrganism
        active={showerrorModal}
        onDeactive={() => { }}
        text={errorMessage}
        enableButtonBox
        onReject={() => navigate("/usuario")} />
    </>
  );
};
export default TransactionBeetwenDates;
