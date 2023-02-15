import { AlertColor, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule'
import { ColorPalette } from '../../../style/ColorPalette'
import TransactionForm from '../../../components/organisms/Transaction/TransactionForm'
import TransactionCheckForm from '../../../components/organisms/Transaction/TransactionCheckForm'
import { RSAccount } from '../../../services/account/dto/RSAccount'
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction'
import { useUser } from '../../../context/UserContext'
import { AccountService } from '../../../services/account/AccountService'
import { TransactionService } from '../../../services/transaction/TransactionService'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule'
import ModalOrganism from '../../../components/organisms/ModalOrganism'
import AllDoneMolecule from '../../../components/molecules/AllDoneMolecule'

interface TransactionPageProps {
    accounts: RSAccount[];
    onComplete?: () => void;
}

const accountToDropdown = (accounts: RSAccount[]) => {
    return accounts.map(account => {
        return {
            name: account.codeLocalAccount,
            value: account.codeLocalAccount,
        }
    })
}

const TransactionPage = (props: TransactionPageProps) => {

    const user = useUser();

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [colorSnack, setcolorSnack] = useState<AlertColor>('info');

    const [openSuccessModal, setopenSuccessModal] = useState<boolean>(false);

    const [currentIndicator, setcurrentIndicator] = useState<number>(0)
    const [transactionReceipt, settransactionReceipt] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "TRANSFERENCIA DIRECTA",
        description: "",
        movement: "NOTA CREDITO",
        type: "TRANSFERENCIA",
        value: 0,
        recipientAccountNumber: "",
        recipientBank: "BANQUITO",
        recipientType: ""
    });
    const [transactionOrigin, settransactionOrigin] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "TRANSFERENCIA DIRECTA",
        description: "",
        movement: "NOTA DEBITO",
        type: "TRANSFERENCIA",
        value: 0,
        recipientAccountNumber: "",
        recipientBank: "BANQUITO",
        recipientType: "ORDENANTE",
    });

    const handleSubmit = (data: any) => {
        settransactionOrigin({
            ...transactionOrigin,
            codeLocalAccount: data.currentAccount,
            value: data.amount,
            description: data.description,
            recipientAccountNumber: data.recipientAccount
        })
        settransactionReceipt({
            ...transactionReceipt,
            codeLocalAccount: data.recipientAccount,
            value: data.amount,
            description: data.description,
            recipientAccountNumber: data.currentAccount
        })
        setcurrentIndicator(1);
    }
    const handleAccept = async () => {
        setisLoading(true);
        try {
            setmessageLoading("Validando...");
            const accountOwner: RSAccount | undefined = (await AccountService.getAccountByCode(transactionOrigin.codeLocalAccount)).data.data;
            const accountRecipient: RSAccount | undefined = (await AccountService.getAccountByCode(transactionOrigin.recipientAccountNumber)).data.data;
            if (!accountOwner || !accountRecipient) {
                console.log("Ha ocurrido un error");
                return;
            }
            setmessageLoading("Realizando Transaccion");
            settransactionOrigin({
                ...transactionOrigin,
                codeInternationalAccount: accountOwner.codeInternationalAccount
            })
            settransactionReceipt({
                ...transactionReceipt,
                codeInternationalAccount: accountRecipient.codeInternationalAccount
            });

            await TransactionService.postTransaction(transactionOrigin);
            await TransactionService.postTransaction(transactionReceipt);
            handleSucced();
        } catch (error: any) {
            settitleSnack('Error');
            setcolorSnack('error');
            setmessageSnack('Se ha producido un error en la transeferencia');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleSucced = () => {
        setopenSuccessModal(true);
        const interval = setInterval(() => {
            setopenSuccessModal(false);
            props.onComplete?.();
            clearInterval(interval);
        }, 1000);
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 600
                    }}
                    variant='outlined'>
                    <CardContent>
                        <Typography variant='h6' color='secondary'>Transferencia</Typography>
                        <hr />
                        <ProgressButtonMolecule
                            spotSize={10}
                            color={ColorPalette.PRIMARY}
                            itemsCount={2}
                            current={currentIndicator}
                            onUpdate={setcurrentIndicator} />
                        <Box
                            sx={{
                                width: '100%'
                            }}>
                            {currentIndicator === 0 && <TransactionForm onSubmit={handleSubmit} items={accountToDropdown(props.accounts)} />}
                            {currentIndicator === 1 && <TransactionCheckForm
                                accountOrigin={transactionOrigin.codeLocalAccount}
                                accountReceipt={transactionOrigin.recipientAccountNumber}
                                amount={transactionOrigin.value}
                                username={user.username?.split("@")[0] || ''}
                                onEdit={() => setcurrentIndicator(0)}
                                onCancel={() => setcurrentIndicator(0)}
                                onTransfer={() => handleAccept()} />}
                        </Box>
                    </CardContent>
                </Card>
            </div>
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                autoHideDuration={3000}
                onClose={() => setopenSnack(false)} />
            <ModalOrganism
                open={openSuccessModal}>
                <AllDoneMolecule message={'Transferencia Exitosa'} />
            </ModalOrganism>
        </>
    )
}

export default TransactionPage