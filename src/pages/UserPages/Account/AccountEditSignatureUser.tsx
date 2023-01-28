import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Fade, Modal, Typography } from "@mui/material";
import AccountSignatureEditForm from "../../../components/organisms/Account/AccountSignatureEditForm";
import AccountSignatureTableOranism from "../../../components/organisms/Account/AccountSignatureTableOranism";
import SearchAccount from "../../../components/organisms/Account/SearchAccount";
import { AccountService } from "../../../services/account/AccountService";
import { AccountSignatureService } from "../../../services/account/AccountSignatureService";
import { RSAccount } from "../../../services/account/dto/RSAccount";
import { RSSignature } from "../../../services/account/dto/RSSignature";
import { ColorPalette } from "../../../style/ColorPalette";

const AccountEditSignatureUser = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
  const [signatures, setsignatures] = useState<RSSignature[]>([]);
  const [selectSignature, setselectSignature] = useState<RSSignature>({
    identification: "",
    identificationType: "",
    name: "",
    role: "",
    status: "",
    signature: ""
  });
  const [accountID, setaccountID] = useState<{
    codeLocalAccount: string
  }>()

  const getAccountSignatures = async (data: string) => {
    try {
      const signaturesData: RSSignature[] | undefined = (await AccountSignatureService.getAccountSignatureByCode(data)).data.data;
      signaturesData?.forEach((signature) => {{
        console.log("ENTRO FOR EACH")
        console.log(signature);
      }})
      if (signaturesData) {
        setsignatures(signaturesData);
        setaccountID({
          codeLocalAccount: data
        })
        setactiveSearchBox(false);
      } else {
        console.log("No se han encontrado datos");
      }

      /* const account: RSAccount | undefined = (await AccountService.getAccountsById("DNI", data)).data?.data?.at(0);
      console.log("account");
      console.log(account);
      if (!account) {
        console.log("No se han encontrado datos");
        return;
      }
      setaccountID({
        codeInternationalAccount: account.codeInternationalAccount,
        codeLocalAccount: account.codeLocalAccount
      }) */
      
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleSubmit = async (data: RSSignature) => {
    try {
      console.log(data);
      await AccountSignatureService.putAccountSignature(data.identificationType, data.identification, accountID?.codeLocalAccount || "", data)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handleSearch = (data: string) => {
    getAccountSignatures(data);
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
                  title='Número de Cuenta'
                  label="Numero de cuenta"
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
            <Typography variant="h4">Configuración Firma Autorizada</Typography>
          </div>

          <AccountSignatureTableOranism
            accountSignature={signatures}
            onClick={(data: any) => {setselectSignature(data);setOpen(true)}} />

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
    </div>
  );
};

export default AccountEditSignatureUser;
