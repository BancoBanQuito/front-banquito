import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { RSAccount } from '../../services/account/dto/RSAccount'
import { ColorPalette } from '../../style/ColorPalette';

interface AccountCardProps {
    account: RSAccount;
    username: string;
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
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
                        {/* <Typography variant='h6'>{props.username}</Typography> */}
                        <Typography variant='h6'> </Typography>
                        <Typography variant='body1' fontSize={'0.75rem'}>{props.account.status}</Typography>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
                        <Typography fontSize='1rem' variant='body1' alignSelf={'flex-end'}>{props.account.codeLocalAccount}</Typography>
                        <Typography variant='body1' fontSize={'0.75rem'} alignSelf={'flex-end'}>N. Cuenta</Typography>
                    </div>
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