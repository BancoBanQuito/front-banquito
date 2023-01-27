import React, { useState } from "react";
import { Box, Card, CardContent, Fade, Modal, Typography } from "@mui/material";
import AccountConfigurationTableOranism from "/src/components/organisms/Account/AccountConfigurationTableOranism";
import AccountConfigurationEditForm from "/src/components/organisms/Account/AccountConfigurationEditForm";
import { RSProductTypeAndClientName } from "/src/services/account/dto/RSProductTypeAndClientName";
import SearchAccount from "/src/components/organisms/Account/SearchAccount";
import { ColorPalette } from "/src/style/ColorPalette";
import { AccountService } from "/src/services/account/AccountService";
import { RSAccount } from "/src/services/account/dto/RSAccount";
import { RSAccountCancelTable } from "/src/services/account/dto/RSAccountCancelTable";

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

const AccountCancel = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
  const [accountProduct, setAccountsProduct] = useState<RSProductTypeAndClientName>();
  const [selectAccount, setselectAccount] = useState<RSAccount>();  
  const [dataTable, setDataTable] = useState<RSAccountCancelTable>();

  const getProductTypeAndClientName = async (accountNumber: string) => {
    try{
      //obtenemos este objeto ya que necesitamos el nombre del due;o de la cuenta
      const AccountProduct: RSProductTypeAndClientName | undefined = (await AccountService.getAccountProductByCode(accountNumber)).data?.data;
      if (!AccountProduct) {
        console.log("No se han encontrado datos");
        return;
      }else{
        setAccountsProduct(AccountProduct);
      }
    }
  }

  const getAccount = async (accountNumber: string) => {
      //Tomo este porque necesito los valores de saldo de la cuenta
      const Account: RSAccount | undefined = (await AccountService.getAccountByCode(accountNumber)).data?.data;
      if (!Account) {
        console.log("No se han encontrado datos");
        return;
      }else{
        setselectAccount(Account);
        setactiveSearchBox(false);
      }
  }

  const handleSearch = (accountNumer: string) => {
    getProductTypeAndClientName(accountNumer);
    getAccount(accountNumer);
    setDataTable({
      ...dataTable,
      codeLocalAccount: selectAccount.codeLocalAccount,
      productType: accountProduct.productType,
      product: accountProduct.product,
      name: accountProduct.name,
      status: selectAccount.status,
      presentBalance: selectAccount.presentBalance,
      availableBalance: selectAccount.availableBalance
    });
  }

  return (
    <div>
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

        <AccountSignatureTableOranism
          accountSignature={signatures}
          onClick={(data: any) => setselectSignature(data)} />

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
                <Typography variant="h6">Modificar firma</Typography>
                <AccountSignatureEditForm
                  signature={selectSignature}
                  onSubmit={handleSubmit} />
              </div>
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
                <AccountConfigurationEditForm />
              </div>
            </Box>
          </Modal>
        </div>
      </Box>


    </div>
  );
};
export default AccountCancel;
