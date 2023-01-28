import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism';

const DepositAtm = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
    const [showInfoModal, setshowInfoModal] = useState<boolean>(false)
    const [isLoading, setisLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Deposito",
        description: "",
        movement: "NOTA CREDITO",
        recipientAccountNumber: "",
        recipientBank: "BANQUITO",
        recipientType: "",
        type: "DEPOSITO",
        value: 0
    });

    const handleAccept = async () => {
        setisLoading(true);
        try {
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.codeLocalAccount)).data.data;
            if (!accountSimple) {
                seterrorMessage('Cuenta no encontrada');
                return;
            }
            const depositAccount = {
                ...value,
                codeInternationalAccount: accountSimple.codeInternationalAccount
            }
            await TransactionService.postTransaction(depositAccount);
            setshowInfoModal(true);
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
    }

    const handleDecline = () => {
        navigate('/usuario');
    }

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'hidden',
                overflowY: 'hidden'
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
                            atm
                            key={0}
                            showAccountCode
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    codeLocalAccount: data.accountNumber
                                });
                            }}
                            title='Cuenta Depósito' /> :
                        indexForm === 1 ?
                            <TransferAmountForm
                                atm
                                onSubmit={(data: any) => {
                                    setindexForm(3);
                                    setvalue({
                                        ...value,
                                        value: data.amount
                                    })
                                }} />
                            :
                            <ConfirmTransferUserForm
                                atm
                                title="Depositar"
                                showField
                                onAccept={() => handleAccept()}
                                onDecline={() => handleDecline()}
                                data={value} />}
                </Box>
            </div>
            <InfoModalOrganism
                active={showInfoModal}
                text='La transferencia ha sido completada'
                title='Transfercia Completa'
                onDeactive={() => { }}
                buttonText='Ok'
                onClick={() => navigate('/atm')} />
            <LoadOrganism
                active={isLoading}
                text='Depositando...' />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                enableButtonBox
                onReject={() => navigate('/atm')}
                text={errorMessage} />
        </>
    )
}

export default DepositAtm