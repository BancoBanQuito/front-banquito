import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { RSAccount } from '../../services/account/dto/RSAccount'
import { ColorPalette } from '../../style/ColorPalette';

interface AccountCardProps {
    account: RSAccount;
    onClick?: (account: RSAccount) => void;
}

const AccountCard = (props: AccountCardProps) => {
    return (
        <Card sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        }}
            variant='outlined'
            onClick={() => props.onClick?.(props.account)}>
            <CardContent sx={{ width: '100%' }} >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', color: ColorPalette.SECONDARY }}>
                    <Typography variant='h6'>Sample</Typography>
                    <Typography fontSize='1rem' variant='body1'>{props.account.codeLocalAccount}</Typography>
                </div>
                <hr />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>Saldo Disponible</Typography>
                    <Typography variant='body1'>${props.account.availableBalance}</Typography>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>Saldo Contable</Typography>
                    <Typography variant='body1'>${props.account.presentBalance}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default AccountCard