import React, { useState } from 'react'
import { RSAccount } from '../../../services/account/dto/RSAccount';
import AccountsTableOrganism from '../../../components/organisms/Account/AccountsTableOrganism';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';
import AccountCard from '../../../components/molecules/AccountCard';
import AccountStatmentOrganism from '../../../components/organisms/Account/AccountStatementOrganism';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList';
import { AlertColor } from '@mui/lab';
import { AccountStatementService } from '../../../services/account/AccountStatementService';
import { Dropdown } from '../../../components/atoms/Dropdown';
import ModalOrganism from '../../../components/organisms/ModalOrganism';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RSTransaction } from '../../../services/transaction/dto/RSTransaction';
import { useUser } from '../../../context/UserContext';
import ClockMolecule from '../../../components/molecules/ClockMolecule';

interface AccountResumePageProps {
    accounts: RSAccount[];
}

const accountToDropdown = (accounts: RSAccount[]) => {
    return accounts.map(account => {
        return {
            name: account.codeLocalAccount,
            value: account,
        }
    })
}

const AccountResumePage = (props: AccountResumePageProps) => {


    const [accountSelected, setaccountSelected] = useState<RSAccount | undefined>();
    const [accountStaments, setaccountStaments] = useState<RSAccountStatementList[]>([]);

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [openAccountStatementModal, setopenAccountStatementModal] = useState<boolean>(false);

    const user = useUser();

    const handleAccountSelection = (account: RSAccount) => {
        setaccountSelected(account);
        retriveAccountStatementList(account.codeLocalAccount);
    }

    const retriveAccountMovements = async (id: string) => {
        setisLoading(true);
        try {
            const data: RSTransaction[] = (await TransactionService.getTransaction(id, "", "")).data.data || [];
            // setaccountStaments(data);
        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const retriveAccountStatementList = async (id: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatementList[] = (await AccountStatementService.getStatementList(id)).data.data || [];
            setaccountStaments(data);
        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const openInNewTab = (id: string) => {
        window.open(`/cliente/cuenta/estado/${id}`, '_blank');
    }

    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={9}>
                    <Typography variant='h5' fontWeight='bold' textTransform='uppercase' color='secondary' marginBottom={5}>Cuentas</Typography>
                    {!accountSelected && <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                        <Grid container spacing={5}>
                            {
                                props.accounts.map(account => {
                                    return <Grid item sm={6}><AccountCard username={user.username?.split("@")[0] || ''} account={account} onClick={handleAccountSelection} /></Grid>
                                })
                            }
                        </Grid>
                    </div>}
                    {
                        !!accountSelected &&
                        <>
                            <Dropdown
                                backgroundColor='white'
                                label={''}
                                defaultValue={accountSelected.codeLocalAccount}
                                items={accountToDropdown(props.accounts)}
                                width={'100%'}
                                onChange={handleAccountSelection}
                                height={'auto'} />
                            <AccountStatmentOrganism
                                onSelect={(id) => openInNewTab(id)}
                                onClick={() => openInNewTab(`1-${accountSelected.codeLocalAccount}`)}
                                accountStatements={accountStaments} />
                        </>
                    }
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
            <ModalOrganism
                open={openAccountStatementModal}
                onClose={() => setopenAccountStatementModal(false)}>
                <OnConstructionMolecule />
            </ModalOrganism>
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
        </>
    )
}

export default AccountResumePage