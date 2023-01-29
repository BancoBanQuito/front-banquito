import { Box, Card, CardContent, Fade, Modal, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { AccountSignatureService } from "../../../services/account/AccountSignatureService";
import ErrorModalOrganism from "../../../components/organisms/ErrorModalOrganism";
import { useNavigate } from "react-router-dom";
import AccountSignatureForm from "../../../components/organisms/Account/AccountSignatureForm";
import { RQSignature } from "../../../services/account/dto/RQSignature";
import { RSSignature } from "../../../services/account/dto/RSSignature";
import LoadOrganism from "../../../components/organisms/LoadOrganism";
import SearchAccount from "../../../components/organisms/Account/SearchAccount";
import { ColorPalette } from "../../../style/ColorPalette";
import AccountSignatureTableOranism from "../../../components/organisms/Account/AccountSignatureTableOranism";
import AccountSignatureEditForm from "../../../components/organisms/Account/AccountSignatureEditForm";
import { RQSignatureRoleStatus } from "../../../services/account/dto/RQSignatureRoleStatus";
import ButtonIcon from "../../../components/atoms/ButtonIcon";
import { Add } from "@mui/icons-material";

const AccountCreateSignatureUser = () => {

  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
  const [activeEditModal, setactiveEditModal] = useState<boolean>(false);
  const [activeCreateModal, setactiveCreateModal] = useState<boolean>(false);

  const [signatures, setsignatures] = useState<RSSignature[]>([]);
  const [selectedSignature, setselectedSignature] = useState<RSSignature | undefined>();
  const [codeLocalAccount, setcodeLocalAccount] = useState<string>();

  const navigate = useNavigate();

  const handleSubmitCreateSignature = async (signature: RQSignature) => {
    createSignature(signature);
  };

  const createSignature = async (signature: RQSignature) => {
    setisLoading(true);
    try {
      const auxSignature: RQSignature = {
        ...signature,
        codeLocalAccount: codeLocalAccount || ""
      }
      await AccountSignatureService.postAccountSignature(auxSignature);
      setactiveCreateModal(false);
    } catch (error: any) {
      seterrorMessage(error.message);
      setactiveErrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

  const handleSubmitEditSignature = async (signature: RQSignatureRoleStatus) => {
    editSignature(signature);
  };

  const editSignature = async (signature: RQSignatureRoleStatus) => {
    setisLoading(true);
    try {
      if (selectedSignature) {
        await AccountSignatureService.putAccountSignature(selectedSignature.identificationType, selectedSignature.identification, codeLocalAccount || "", signature);
        setactiveEditModal(false);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setactiveErrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

  const handleSearch = (data: string) => {
    getAccountSignatures(data);
  }

  const getAccountSignatures = async (data: string) => {
    setisLoading(true);
    try {
      const signaturesData: RSSignature[] | undefined = (await AccountSignatureService.getAccountSignatureByCode(data)).data.data;
      if (signaturesData) {
        setsignatures(signaturesData);
        setcodeLocalAccount(data);
        setactiveSearchBox(false);
      }
    } catch (error: any) {
      seterrorMessage(error.message);
      setactiveErrorModal(true);
    } finally {
      setisLoading(false);
    }
  }

  const handleOpenEditModal = (data: RSSignature) => {
    setselectedSignature(data);
    setactiveEditModal(true);
  }

  const handleCloseEditModal = () => {
    setselectedSignature(undefined);
    setactiveEditModal(false);
  }

  return (
    <>
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
            marginTop: '2rem',
            height: '90vh',
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            alignText: "center",
            top: 0
          }}>
          <div style={{ margin: "2rem" }}>
            <Typography variant="h4">Configuración Firma Autorizada</Typography>
          </div>
          <ButtonIcon
            float
            left
            bottom
            color={ColorPalette.PRIMARY}
            icon={<Add />}
            onClick={() => setactiveCreateModal(true)} />
          <AccountSignatureTableOranism
            accountSignature={signatures}
            onClick={handleOpenEditModal} />
        </Box>
      }
      <Modal
        open={activeCreateModal}
        onClose={() => setactiveCreateModal(false)}>
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          padding: 2,
          borderRadius: '10px'
        }}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h6">Modificar firma</Typography>
            <AccountSignatureForm
              onSubmit={handleSubmitCreateSignature}
              restore={activeCreateModal} />
          </div>
        </Box>
      </Modal>
      <Modal
        open={activeEditModal}
        onClose={handleCloseEditModal}>
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
            {selectedSignature
              ? <AccountSignatureEditForm
                signature={selectedSignature || null}
                onSubmit={handleSubmitEditSignature} />
              : null}
          </div>
        </Box>
      </Modal>
      <LoadOrganism active={isLoading} />
      <ErrorModalOrganism
        active={activeErrorModal}
        onDeactive={() => setactiveErrorModal(false)}
        text={errorMessage}
      />
    </>

  );
};

export default AccountCreateSignatureUser;
