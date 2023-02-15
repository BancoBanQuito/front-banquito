import React from 'react'
import { RSAccountStatementList } from '../../services/account/dto/RSAccountStatementList';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Article } from '@mui/icons-material';

interface AccountStatementItemMoleculeProps {
    accountStatementList: RSAccountStatementList;
    onClick?: (id: string) => void;
}

const AccountStatementItemMolecule = (props: AccountStatementItemMoleculeProps) => {
    return (
        <>
            <Grid container spacing={5}>
                <Grid item sm={9} onClick={() => props.onClick?.(props.accountStatementList.code)}>
                    <Typography variant='h6' fontSize='1rem' color='secondary'>{`${props.accountStatementList.currentCutOffDate}`}</Typography>
                    <Typography variant='body1' fontSize='1rem'>${props.accountStatementList.balance}</Typography>
                </Grid>
                <Grid item sm={3}>
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => props.onClick?.(props.accountStatementList.code)}>
                            <Article />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <hr />
        </>
    )
}

export default AccountStatementItemMolecule