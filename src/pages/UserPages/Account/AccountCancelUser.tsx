import { Box, Typography, Modal, Card, CardContent, Fade } from "@mui/material";
import React, { useState } from "react";
import { Spinner } from "../../../components/atoms/Spinner";
import AccountConfigurationEditForm from "../../../components/organisms/Account/AccountConfigurationEditForm";
import AccountConfigurationTableOranism from "../../../components/organisms/Account/AccountConfigurationTableOranism";
import SearchAccount from "../../../components/organisms/Account/SearchAccount";
import { AccountService } from "../../../services/account/AccountService";
import { RSAccount } from "../../../services/account/dto/RSAccount";
import { RSProductTypeAndClientName } from "../../../services/account/dto/RSProductTypeAndClientName";
import { ColorPalette } from "../../../style/ColorPalette";

const accountsExample = [
  {
    NoCuenta: "2345663",
    tipoCuenta: "Corriente",
    status: "Active",
    saldoContable: "1,000.00",
    saldoDisponible: "1,000.00"
  },
  {
    NoCuenta: "2345663",
    tipoCuenta: "Ahorros",
    status: "Active",
    saldoContable: "1,000.00",
    saldoDisponible: "1,000.00"
  },
  {
    NoCuenta: "2345663",
    tipoCuenta: "Ahorros",
    status: "Active",
    saldoContable: "1,000.00",
    saldoDisponible: "1,000.00"
  }
]

const AccountCancelUser = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
  const [accountProduct, setAccountsProduct] = useState<RSProductTypeAndClientName>();
  const [activateSpinner, setActivateSpinner] = useState(false);
  /*const getProductTypeAndClientName = async (accountNumber: string) => {
    try{
      //obtenemos este objeto ya que necesitamos el nombre del due;o de la cuenta
      const AccountProduct: RSProductTypeAndClientName | undefined = (await AccountService.getAccountProductByCode(accountNumber)).data?.data;
      if (!AccountProduct) {
        console.log("No se han encontrado datos");
        return;
      }else{
        setAccountsProduct(AccountProduct);
      }
    }catch(error){
      console.log(error);
    }
  }*/

  const getAccount = async (accountNumber: string) => {
    //Tomo este porque necesito los valores de saldo de la cuenta
    setActivateSpinner(true);
    const Account: RSAccount | undefined = (await AccountService.getAccountByCode(accountNumber)).data?.data;
    if (!Account) {
      console.log("No se han encontrado datos");
      return;
    } else {
      // setselectAccount(Account);
      // setactiveSearchBox(false);
    }
    setActivateSpinner(false);
  }

  const handleSearch = (accountNumer: string) => {
    //getProductTypeAndClientName(accountNumer);
    getAccount(accountNumer);
  }

  /*const setAccount = () => {
    setDataTable({
      ...dataTable,
      codeLocalAccount: selectAccount?.codeLocalAccount || '',
      productType: accountProduct?.productType  || '',
      product: accountProduct?.product  || '',
      name: accountProduct?.name  || '',
      status: selectAccount?.status  || '',
      presentBalance: selectAccount?.presentBalance || 0.00,
      availableBalance: selectAccount?.availableBalance  || 0.00
    });
  }*/


  return (
    <div>
      {activateSpinner ? <Spinner /> : null}
      {
        activeSearchBox && <div style={{
          position: 'absolute',
          width: '100%',
          height: '80vh',
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Fade in={activeSearchBox}>
            <Card sx={{ minWidth: '450px', maxWidth: '750px' }}>
              <CardContent>
                <SearchAccount
                  color={ColorPalette.SECONDARY}
                  title='Numero de Cuenta'
                  label="Ingrese numero de cuenta"
                  onSubmit={handleSearch} />
              </CardContent>
            </Card>
          </Fade>
        </div>
      }
      {
        !activeSearchBox && <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
          }}>
          <div style={{ margin: "2rem" }}>
            <Typography variant="h4">Configuración de Cuenta</Typography>
          </div>

          {/* <CancelAccountTableOranism
          account={dataTable}
          onClick={() => setAccount()} />
 */}
          <div>
            <Modal open={open} onClose={handleClose}>
              <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                padding: 2,
                borderRadius: '10px'
              }}>
                {/* <div style={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h6">Modificar firma</Typography>
                <AccountSignatureEditForm
                  signature={selectSignature}
                  onSubmit={handleSubmit} />
              </div> */}
              </Box>
            </Modal>
          </div>
        </Box>
      }
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}>
        <div style={{ margin: "2rem" }}>
          <Typography variant="h4">Configuración Cuenta</Typography>
        </div>

        <AccountConfigurationTableOranism
          accountConfiguration={accountsExample}
          onClick={handleOpen} />

        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              padding: 2,
              borderRadius: '10px'
            }}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h6">Cancelación/Suspensión de cuenta</Typography>
                <AccountConfigurationEditForm identification={""} status={""} />
              </div>
            </Box>
          </Modal>
        </div>
      </Box>
    </div>
  );
};

export default AccountCancelUser;
