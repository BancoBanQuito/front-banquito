import { Box, Typography, Modal } from "@mui/material";
import React, { useState } from "react";
import AccountConfigurationEditForm from "../../../components/organisms/Account/AccountConfigurationEditForm";
import AccountConfigurationTableOranism from "../../../components/organisms/Account/AccountConfigurationTableOranism";

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

export default AccountCancelUser;
