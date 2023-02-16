import React, { useState } from 'react'
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { Grid, Typography } from '@mui/material';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';
import AccountCard from '../../../components/molecules/AccountCard';
import AccountStatementOrganism from '../../../components/organisms/Account/AccountStatementOrganism';
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
import TabsMolecule from '../../../components/molecules/TabsMolecule';
import { AccountAssociatedService } from '../../../services/account/AccountAssociatedService';

interface AccountResumePageProps {
    accounts: RSAccount[];
}

const accountToDropdown = (accounts: RSAccount[]) => {
    return accounts.map(account => {
        return {
            name: account.codeLocalAccount,
            value: account.codeLocalAccount,
        }
    })
}

const tabData: { label: string, value: any }[] = [
    {
        label: 'Movimiento',
        value: 0
    }, {
        label: 'Estado de cuenta',
        value: 1
    }, {
        label: 'Servicios',
        value: 2
    }
];

const AccountResumePage = (props: AccountResumePageProps) => {


    const [codeLocalAccountSelected, setaccountSelected] = useState<string | undefined>();
    const [accountStaments, setaccountStaments] = useState<RSAccountStatementList[]>([]);

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [openAccountStatementModal, setopenAccountStatementModal] = useState<boolean>(false);

    const [currentIndex, setcurrentIndex] = useState<number>(0);

    const user = useUser();

    const handleAccountSelection = (codeLocalAccount: string) => {
        setaccountSelected(codeLocalAccount);
        retriveAccountStatementList(codeLocalAccount);
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

    const retriveAccountServices = async (id: string) => {
        setisLoading(true);
        try {
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
            <>
                <Typography variant='h5' fontWeight='bold' textTransform='uppercase' color='secondary' marginBottom={5}>Cuentas</Typography>
                {!codeLocalAccountSelected && <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <Grid container spacing={5}>
                        {
                            props.accounts.map(account => {
                                return <Grid item sm={6}>
                                    <AccountCard
                                        username={user.username?.split("@")[0] || ''}
                                        account={account}
                                        onClick={(account) => handleAccountSelection(account.codeLocalAccount)} />
                                </Grid>
                            })
                        }
                    </Grid>
                </div>}
                {
                    !!codeLocalAccountSelected &&
                    <>
                        <Dropdown
                            backgroundColor='white'
                            label={''}
                            defaultValue={codeLocalAccountSelected}
                            items={accountToDropdown(props.accounts)}
                            width={'100%'}
                            onChange={handleAccountSelection}
                            height={'auto'} />
                        <TabsMolecule
                            items={tabData}
                            orientation='horizontal'
                            defaultValue={currentIndex}
                            onChange={(value) => setcurrentIndex(value)} />
                        {currentIndex === 0 && <OnConstructionMolecule />}
                        {currentIndex === 1 && <AccountStatementOrganism
                            onSelect={(id) => openInNewTab(id)}
                            onClick={() => openInNewTab(`1-${codeLocalAccountSelected}`)}
                            accountStatements={accountStaments} />}
                        {currentIndex === 2 && <OnConstructionMolecule />}
                    </>
                }
            </>
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