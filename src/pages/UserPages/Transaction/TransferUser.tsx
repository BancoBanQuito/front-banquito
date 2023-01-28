import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import { AccountService } from '../../../services/account/accountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import LoadOrganism from '../../../components/organisms/LoadOrganism';

interface ITransaction {
    codeInternationalAccount: string,
    codeLocalAccount: string,
    concept: string,
    description: string,
    movement: string,
    type: string,
    bank: string,
    value: number,
}

interface IRecipient {
    recipientAccountNumber: string,
    recipientBank: string,
    recipientType: string
}

const userLocalAccount = "a3998d173acbf0c893db";

interface TransferUserProps {
    client?: boolean
}

const TransferUser = (props: TransferUserProps) => {
    const [isLoading, setisLoading] = useState(false);
    const [loadMessage, setloadMessage] = useState<string | undefined>();
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const [transactionData, settransactionData] = useState<ITransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "NOTA DEBITO",
        description: "Nota Debito",
        movement: "Nota Debito",
        type: "",
        value: 0,
        bank: ""
    });

    const [recipient, setrecipient] = useState<IRecipient>({
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!!props.client) {
            setindexForm(1);
            settransactionData({
                ...transactionData,
                codeLocalAccount: userLocalAccount,
            });
        }
        return () => { }
    }, [])

    const handleAccept = async () => {
        setisLoading(true);
        try {
            setloadMessage("Validando...")
            const accountOwner: RSAccount | undefined = (await AccountService.getAccountByCode(transactionData.codeLocalAccount)).data.data;
            const accountRecipient: RSAccount | undefined = (await AccountService.getAccountByCode(recipient.recipientAccountNumber)).data.data;
            if (!accountOwner || !accountRecipient) {
                console.log("Ha ocurrido un error");
                return;
            }
            setloadMessage("Realizando Transaccion")
            await TransactionService.postTransaction(getAccountOwner(accountOwner.codeInternationalAccount));
            await TransactionService.postTransaction(getAccountRecipient(accountRecipient.codeInternationalAccount));
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
    }

    const getAccountOwner = (codeInternationalAccount: string): RQTransaction => {
        return {
            movement: "NOTA DEBITO",
            type: "DEBITO",
            recipientType: "CREDITO",
            codeLocalAccount: transactionData.codeLocalAccount,
            codeInternationalAccount: codeInternationalAccount,
            concept: transactionData.concept,
            description: transactionData.movement,
            recipientAccountNumber: recipient.recipientAccountNumber,
            recipientBank: recipient.recipientBank,
            value: transactionData.value,
        }
    }

    const getAccountRecipient = (codeInternationalAccount: string): RQTransaction => {
        return {
            movement: "NOTA CREDITO",
            type: "CREDITO",
            recipientType: "DEBITO",
            codeLocalAccount: recipient.recipientAccountNumber,
            codeInternationalAccount: codeInternationalAccount,
            concept: transactionData.concept,
            description: transactionData.movement,
            recipientAccountNumber: transactionData.codeLocalAccount,
            recipientBank: transactionData.bank,
            value: transactionData.value,
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
                            key={1}
                            showAccountCode
                            showConcept
                            showDescription
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                settransactionData({
                                    ...transactionData,
                                    concept: data.concept,
                                    description: data.description,
                                    codeLocalAccount: data.accountNumber,
                                    type: data.type,
                                    bank: data.bank,
                                });
                            }}
                            title='Cuenta(Emisor)' /> :
                        indexForm === 1 ?
                            <TransferDataForm
                                key={2}
                                showAccountCode
                                onSubmit={(data: any) => {
                                    setindexForm(2);
                                    setrecipient({
                                        ...recipient,
                                        recipientBank: data.bank,
                                        recipientAccountNumber: data.accountNumber,
                                        recipientType: data.type
                                    });
                                }}
                                title='Cuenta(Receptor)' /> :
                            indexForm === 2 ?
                                <TransferAmountForm
                                    onSubmit={(data: any) => {
                                        setindexForm(3);
                                        settransactionData({
                                            ...transactionData,
                                            value: data.amount
                                        })
                                    }} />
                                :
                                <ConfirmTransferUserForm
                                    title='Transferir'
                                    showField
                                    showAccountReceptor
                                    onAccept={() => handleAccept()}
                                    onDecline={() => handleDecline()}
                                    data={{
                                        value: transactionData.value,
                                        codeLocalAccount: transactionData.codeLocalAccount,
                                        recipientAccountNumber: recipient.recipientAccountNumber
                                    }} />}
                </Box>
            </div>
            <LoadOrganism
                active={isLoading}
                text={loadMessage} />
            <ErrorModalOrganism
                active={activeErrorModal}
                text={errorMessage}
                enableButtonBox
                onReject={() => navigate('/usuario')}
                onDeactive={() => { }} />
        </>
    )
}

export default TransferUser;