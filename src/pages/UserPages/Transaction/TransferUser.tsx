import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Fade, Grid, Typography } from '@mui/material';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism';
import { Dropdown } from '../../../components/atoms/Dropdown';
import { useUser } from '../../../context/UserContext';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import ClockMolecule from '../../../components/molecules/ClockMolecule';

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

interface TransferUserProps {
    client?: boolean,
}

const TransferUser = (props: TransferUserProps) => {

    const [showInfoModal, setshowInfoModal] = useState<boolean>(false);
    const [infoMessage, setinfoMessage] = useState<string>('');
    const [isLoading, setisLoading] = useState(false);
    const [loadMessage, setloadMessage] = useState<string | undefined>();
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
    const [accounts, setaccounts] = useState<{ name: string, value: string }[]>([]);

    const [transactionData, settransactionData] = useState<ITransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Transferencia Directa",
        description: "",
        movement: "",
        type: "",
        value: 0,
        bank: "BANQUITO"
    });

    const [recipient, setrecipient] = useState<IRecipient>({
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: ""
    });

    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        if (!!props.client) {
            retriveAllAccounts(user.identification || '', user.identificationType || '');
        }
        return () => { }
    }, []);

    const retriveAllAccounts = async (id: string, idType: string) => {
        setisLoading(true);
        try {
            const rsAccounts: RSAccount[] | undefined = (await AccountService.getAccountsById(idType, id)).data.data;
            if (!rsAccounts || rsAccounts.length <= 0) {
                setinfoMessage("No se han encontrado cuentas asociadas");
                setshowInfoModal(true);
                return;
            }
            const dropAccounts = rsAccounts.map(account => {
                return {
                    name: account.codeLocalAccount,
                    value: account.codeLocalAccount
                }
            });
            setaccounts(dropAccounts);
        } catch (error: any) {
            seterrorMessage(error.message);
            setactiveErrorModal(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleAccept = async () => {
        setisLoading(true);
        try {
            setloadMessage("Validando...")
            const accountOwner: RSAccount | undefined = (await AccountService.getAccountByCode(transactionData.codeLocalAccount)).data.data;
            const accountRecipient: RSAccount | undefined = (await AccountService.getAccountByCode(recipient.recipientAccountNumber)).data.data;
            if (!accountOwner || !accountRecipient) {
                //console.log("Ha ocurrido un error");
                return;
            }
            setloadMessage("Realizando Transaccion")
            console.log(getAccountOwner(accountOwner.codeInternationalAccount));
            await TransactionService.postTransaction(getAccountOwner(accountOwner.codeInternationalAccount));
            await TransactionService.postTransaction(getAccountRecipient(accountRecipient.codeInternationalAccount));
            setinfoMessage('La transferencia ha sido completada');
            setshowInfoModal(true);
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
            type: "TRANSFERENCIA",
            codeLocalAccount: transactionData.codeLocalAccount,
            codeInternationalAccount: codeInternationalAccount,
            concept: transactionData.concept,
            description: transactionData.description,
            value: transactionData.value,
            recipientAccountNumber: recipient.recipientAccountNumber,
            recipientBank: recipient.recipientBank,
            recipientType: "BENEFICIARIO",
        }
    }

    const getAccountRecipient = (codeInternationalAccount: string): RQTransaction => {
        return {
            movement: "NOTA CREDITO",
            type: "TRANSFERENCIA",
            codeLocalAccount: recipient.recipientAccountNumber,
            codeInternationalAccount: codeInternationalAccount,
            concept: transactionData.concept,
            description: transactionData.description,
            value: transactionData.value,
            recipientAccountNumber: transactionData.codeLocalAccount,
            recipientBank: transactionData.bank,
            recipientType: "ORDENANTE",
        }
    }

    const handleDecline = () => {
        navigate('/banca/inicio');
    }

    return (
        <>
            <Box sx={{ height: 15 }}>
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={9}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{ marginBottom: 10 }}>
                            <ProgressButtonMolecule
                                color={ColorPalette.SECONDARY}
                                itemsCount={4}
                                current={indexForm}
                                onUpdate={(value) => setindexForm(value)}
                            />
                        </div>
                        <Box sx={{
                            width: 500,
                        }}>
                            {indexForm === 0 ?
                                !!props.client ? < div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '80vh',
                                    top: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Card sx={{ minWidth: '450px', maxWidth: '750px' }}>
                                        <CardContent>
                                            {accounts.length <= 0 ? <Typography variant='h6'>Es necesario crear una cuenta</Typography> :
                                                <>
                                                    <Box mb={2} sx={{ fontStyle: 'italic', color: ColorPalette.SECONDARY }}>
                                                        <Typography variant='h4' component='h6'>
                                                            Selector de cuentas
                                                        </Typography>
                                                        <Typography variant='body1' component='h6'>
                                                            Buscador
                                                        </Typography>
                                                    </Box>
                                                    <Dropdown
                                                        label={'Cuentas'}
                                                        items={accounts}
                                                        onChange={(data: string) => {
                                                            setindexForm(1);
                                                            settransactionData({
                                                                ...transactionData,
                                                                concept: "",
                                                                description: "",
                                                                codeLocalAccount: data,
                                                                type: "",
                                                                bank: "BANQUITO"
                                                            });
                                                        }}
                                                        width={'100%'}
                                                        height={'auto'} />
                                                </>}
                                        </CardContent>
                                    </Card>
                                </div>
                                    :
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
                                        title='Cuenta Origen' /> :
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
                                        title='Cuenta Destino' /> :
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
                    </div >
                    <InfoModalOrganism
                        active={showInfoModal}
                        text={infoMessage}
                        onDeactive={() => { }}
                        buttonText='Ok'
                        onClick={() => navigate('/banca/inicio')} />
                    <LoadOrganism
                        active={isLoading}
                        text={loadMessage} />
                    <ErrorModalOrganism
                        active={activeErrorModal}
                        text={errorMessage}
                        enableButtonBox
                        onReject={() => navigate('/banca/inicio')}
                        onDeactive={() => { }} />
                </Grid>

                <Grid item xs={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Card sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                            variant='outlined'>
                            <CardContent>
                                <ClockMolecule />
                            </CardContent>
                        </Card>
                        <Card sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}
                            variant='outlined'>
                            <div style={{ margin: '1rem' }}>
                                <Twitter color='secondary' />
                            </div>
                            <div style={{ margin: '1rem' }}>
                                <Instagram color='secondary' />
                            </div>
                            <div style={{ margin: '1rem' }}>
                                <Facebook color='secondary' />
                            </div>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default TransferUser;