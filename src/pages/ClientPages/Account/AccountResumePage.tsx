import React, { useEffect, useState } from 'react'
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { Box, Grid, Typography } from '@mui/material';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';
import AccountCard from '../../../components/molecules/AccountCard';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList';
import { AlertColor } from '@mui/lab';
import { AccountStatementService } from '../../../services/account/AccountStatementService';
import { Dropdown } from '../../../components/atoms/Dropdown';
import ModalOrganism from '../../../components/organisms/ModalOrganism';
import { useUser } from '../../../context/UserContext';
import TabsMolecule from '../../../components/molecules/TabsMolecule';
import AccountMovementPage from './AccountMovementPage';
import AccountStatementPage from '../../../components/organisms/Account/AccountStatementPage';
import { DataToDropdownUtils } from '../../../utils/DataToDropdownUtils';
import AccountInterestPage from './AccountInterestPage';

interface AccountResumePageProps {
    accounts: RSAccount[];
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
    }, {
        label: 'Intereses',
        value: 3
    }
];

const AccountResumePage = (props: AccountResumePageProps) => {


    const [codeLocalAccountSelected, setaccountSelected] = useState<string | undefined>();

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

    return (
        <>
            <>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    textTransform='uppercase'
                    color='secondary'
                    marginBottom={5}>Cuentas</Typography>
                {!codeLocalAccountSelected &&
                    <div style={{
                        width: '100%',
                        marginLeft: '1rem',
                        marginRight: '1rem'
                    }}>
                        <Grid container spacing={5}>
                            {
                                props.accounts.map((account, key) => {
                                    if(account.status != null){
                                    return <Grid item sm={6} key={key}>
                                        <AccountCard
                                            username={user.username?.split("@")[0] || ''}
                                            account={account}
                                            onClick={(account) => handleAccountSelection(account.codeLocalAccount)} />
                                    </Grid>
                                    }
                                })
                            }
                        </Grid>
                    </div>}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 700
                    }}>
                    {
                        !!codeLocalAccountSelected &&
                        <>
                            <Dropdown
                                backgroundColor='white'
                                label={''}
                                defaultValue={codeLocalAccountSelected}
                                items={DataToDropdownUtils.accountToDropdown(props.accounts)}
                                width={'100%'}
                                onChange={handleAccountSelection}
                                height={'auto'} />
                            <TabsMolecule
                                items={tabData}
                                orientation='horizontal'
                                defaultValue={currentIndex}
                                onChange={(value) => setcurrentIndex(value)} />
                            {currentIndex === 0 && <AccountMovementPage
                                fromDate={(new Date()).setMonth((new Date()).getMonth() - 1)}
                                toDate={Date.now()}
                                codeLocalAccount={codeLocalAccountSelected} />}
                            {currentIndex === 1 && <AccountStatementPage
                                codeLocalAccount={codeLocalAccountSelected} />}
                            {currentIndex === 2 && <OnConstructionMolecule />}
                            {currentIndex === 3 && <AccountInterestPage
                                codeLocalAccount={codeLocalAccountSelected} />}
                        </>
                    }
                </Box>
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