import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism';
import { AlertColor } from '@mui/material';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';

const WithdrawBank = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [loadMessage, setloadMessage] = useState<string>();
    const [showInfoModal, setshowInfoModal] = useState<boolean>(false);
    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
    const navigate = useNavigate();

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Retiro",
        description: "",
        movement: "NOTA DEBITO",
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: "",
        type: "RETIRO",
        value: 0
    });

    const handleAccept = async () => {
        setisLoading(true);
        try {
            setloadMessage("Validando Cuenta...");
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.codeLocalAccount)).data.data;
            if (!accountSimple) {
                console.log("Ha ocurrido un error");
                return;
            }
            const depositAccount = {
                ...value,
                codeInternationalAccount: accountSimple.codeInternationalAccount
            }
            setloadMessage("Contando su dinero...");
            await TransactionService.postTransaction(depositAccount);
            setshowInfoModal(true);
            settitleSnack("Retiro Exitoso");
            setmessageSnack("Puede retirar su dinero");
            setcolorSnack('success');
            setopenSnack(true);
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
            settitleSnack("Error");
            setmessageSnack(error.message);
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleDecline = () => {
        navigate('/usuario');
    }

    return (
        <>
        <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ marginBottom: 50 }}>
                    <ProgressButtonMolecule
                        color={ColorPalette.PRIMARY}
                        itemsCount={4}
                        current={indexForm}
                        onUpdate={(value) => setindexForm(value)}
                    />
                </div>
                <Box sx={{
                    width: 500,
                }}>
                    {indexForm === 0 ?
                        <TransferDataForm
                            key={0}
                            showAccountCode
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    codeLocalAccount: data.accountNumber
                                });
                            }}
                            title='Cuenta Retiro' /> :
                        indexForm === 1 ?
                            <TransferAmountForm
                                onSubmit={(data: any) => {
                                    setindexForm(3);
                                    setvalue({
                                        ...value,
                                        value: data.amount
                                    })
                                }} />
                            :
                            <ConfirmTransferUserForm
                                title='Retirar'
                                showField
                                onAccept={() => handleAccept()}
                                onDecline={() => handleDecline()}
                                data={value} />}
                </Box>
            </div>
            <InfoModalOrganism
                active={showInfoModal}
                onDeactive={() => { }}
                title='Retiro Completo'
                text={'Puede retirar su dinero'}
                buttonText='Ok'
                onClick={() => navigate('/usuario')} />
            <LoadOrganism
                active={isLoading}
                text={loadMessage} />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} />
        </>
    )
}

export default WithdrawBank