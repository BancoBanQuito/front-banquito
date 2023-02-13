import React from 'react'
import { RSAccount } from '../../../services/account/dto/RSAccount';
import AccountsTableOrganism from '../../../components/organisms/Account/AccountsTableOrganism';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';

interface AccountResumePageProps {
    accounts: RSAccount[];
}

const AccountResumePage = (props: AccountResumePageProps) => {
    return (
        <Grid container spacing={5}>
            <Grid item xs={9}>
                <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <Typography variant='h5' fontWeight='bold' textTransform='uppercase' color='secondary'>Cuentas</Typography>
                    <AccountsTableOrganism accounts={props.accounts} />
                </div>
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
                            <OnConstructionMolecule />
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
    )
}

export default AccountResumePage