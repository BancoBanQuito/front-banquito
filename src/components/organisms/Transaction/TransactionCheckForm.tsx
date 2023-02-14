import { Straight } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { SizeButton } from '../../atoms/SizeButton'

interface TransactionCheckForm {
    accountOrigin: string,
    username: string,
    amount: number,
    accountReceipt: string,
    onEdit?: () => void;
    onCancel?: () => void;
    onTransfer?: () => void;
}

const TransactionCheckForm = (props: TransactionCheckForm) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem'
            }}>
            <Card
                sx={{ width: '100%' }}
                variant='outlined'>
                <CardContent>
                    <Typography color='secondary' variant='h6'>{props.username}</Typography>
                    <Typography variant='body1'>{props.accountOrigin}</Typography>
                </CardContent>
            </Card>
            <div style={{ margin: '1rem', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                {/* <Straight /> */}
                <Straight sx={{ transform: 'rotateZ(180deg)' }} />
                <Typography color='secondary' variant='body1'>${(Math.round(props.amount * 100) / 100).toFixed(2)}</Typography>
            </div>
            <Card
                sx={{ width: '100%' }}
                variant='outlined'>
                <CardContent>
                    <Typography color='secondary' variant='h6'>{props.accountReceipt}</Typography>
                </CardContent>
            </Card>
            <div style={{ margin: '1rem', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <SizeButton
                    text={'Cancelar'}
                    onClick={props.onCancel}
                    style={ButtonStyle.MEDIUM} palette={{
                        backgroundColor: ColorPalette.SECONDARY,
                    }} />
                <div style={{ margin: '0.5rem' }} />
                <SizeButton
                    text={'Transferir'}
                    onClick={props.onTransfer}
                    style={ButtonStyle.MEDIUM} palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </div>
        </Box>
    )
}

export default TransactionCheckForm