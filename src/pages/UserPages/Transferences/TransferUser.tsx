import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ColorPalette } from '../../../style/ColorPalette';
import { Box } from '@mui/material';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import TransferDataForm from '../../../components/organisms/TransferDataForm';
import TransferAmountForm from '../../../components/organisms/TransferAmountForm';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import { TransactionService } from '../../../services/account/transactionService';
import { TransactionPost } from '../../../services/account/model/TransactionPost';

const TransferUser = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<TransactionPost>({
        codeInternationalAccount: "123456",
        codeLocalAccount: "123456",
        concept: "Nota Debito",
        description: "Nota Debito",
        movement: "Nota Debito",
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: "",
        type: "",
        value: 0
    });

    const handleAccept = async () => {
        try {
            await TransactionService.postTransaction(value);
            navigate('/cliente');
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
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
                            key={0}
                            showConcept
                            showDescription
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    concept: data.concept,
                                    description: data.description,
                                    type: data.type
                                });
                            }}
                            title='Cuenta(Receptor)' /> : indexForm === 1 ?
                            <TransferDataForm
                                key={1}
                                showAccountCode
                                onSubmit={(data: any) => {
                                    setindexForm(2);
                                    setvalue({
                                        ...value,
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
                                        setvalue({
                                            ...value,
                                            value: data.amount
                                        })
                                    }} />
                                :
                                <ConfirmTransferUserForm
                                    onAccept={() => handleAccept()}
                                    onDecline={() => handleDecline()}
                                    data={value} />}
                </Box>
            </div>
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} />
        </>
    )
}

export default TransferUser