import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ColorPalette } from 'src/style/ColorPalette';
import { Box } from '@mui/material';
import ConfirmTransferUserForm from 'src/components/organisms/ConfirmTransferUserForm';
import TransferDataForm from 'src/components/organisms/Transaction/TransferDataForm';
import TransferAmountForm from 'src/components/organisms/Transaction/TransferAmountForm';
import ProgressButtonMolecule from 'src/components/molecules/ProgressButtonMolecule';
import ErrorModalOrganism from 'src/components/organisms/ErrorModalOrganism';
import { TransactionService } from 'src/services/transaction/TransactionService';
import { AccountService } from 'src/services/account/AccountService';
import { RQTransaction } from 'src/services/transaction/dto/RQTransaction';
import { RSAccount } from 'src/services/account/dto/RSAccount';

const TransferUser = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "db6dae82faeff5f13d9d0ecb6e0b7d5f49",
        codeLocalAccount: "22cf89573e25a91bffbb",
        concept: "Transferencia directa",
        description: "Nota Debito",
        movement: "NOTA DEBITO",
        recipientAccountNumber: "61628076a76056a00aea",
        recipientBank: "BANQUITO",
        recipientType: "ORDENANTE",
        type: "TRANSFERENCIA",
        value: 0
    });

    const handleAccept = async () => {
        try {
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.recipientAccountNumber)).data.data;
            if (!accountSimple) {
                console.log("Ha ocurrido un error");
                return;
            }
            await TransactionService.postTransaction(value);
            const aux = value;
            aux.codeLocalAccount = accountSimple.codeLocalAccount;
            aux.codeInternationalAccount = accountSimple.codeInternationalAccount;
            aux.recipientAccountNumber = value.codeLocalAccount;
            aux.movement= 'NOTA CREDITO';
            aux.value= value.value;
            
            await TransactionService.postTransaction(aux);
            console.log(value);
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
                                    description: data.description
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
                                        recipientAccountNumber: data.accountNumber
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