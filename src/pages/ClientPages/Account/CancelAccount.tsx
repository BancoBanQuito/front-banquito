import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import TableMolecule from "../../../components/molecules/TableMolecule";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ButtonIcon from "../../../components/atoms/ButtonIcon";
import { ColorPalette } from "../../../style/ColorPalette";
import TextFieldAtom from "../../../components/atoms/TextFieldAtom";
import { SizeButton } from "../../../components/atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import AccountConfigurationTableOranism from "../../../components/organisms/AccountConfiguration/AccountConfigurationTableOranism";
import AccountConfigurationEditForm from "../../../components/organisms/AccountConfiguration/AccountConfigurationEditForm";

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

const CancelAccount = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
export default CancelAccount;
