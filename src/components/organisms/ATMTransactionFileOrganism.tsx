import { Box, Grid, Typography } from '@mui/material'
import React, { LegacyRef, useState } from 'react'
import CardMolecule from '../molecules/CardMolecule'
import BanQuitoIcon from '../atoms/BanQuitoIcon'
import moment from 'moment'

interface ATMTransactionFileOrganismProps {
    type: 'deposit' | 'withdraw' | 'info',
    value: number,
    account: string,
    fileValue: number
}

const ATMTransactionFileOrganism = React.forwardRef((props: ATMTransactionFileOrganismProps, ref) => {

    const [transactionDate, settransactionDate] = useState<Date>(new Date());

    return (
        <div
            ref={ref as LegacyRef<HTMLDivElement> | undefined}
            style={{
                width: 500,
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '3rem'
            }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '7rem'
                }}>
                <BanQuitoIcon />
                <div style={{ margin: '0.25rem' }} />
                <Typography variant='body1' >Banco BanQuito</Typography>
            </div>
            <Typography variant='body1' mb={5}>{`En la fecha ${moment(transactionDate).format('YYYY-MM-DD')} se realizo ${props.type === 'deposit' ? 'un deposito a la cuenta' : props.type === 'withdraw' ? 'un retiro de la' : 'una consulta de la'} cuenta ${props.account} a las ${moment(transactionDate).format('hh:mm:ss')}`}</Typography>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '7rem',
                    marginTop: '5rem'
                }}>
                <Typography variant='body1' alignSelf='center'>{`${props.type === 'deposit' ? 'Deposito' : props.type === 'withdraw' ? 'Retiro..' : 'Tu saldo actual es'}............................................$${(Math.round(100 * props.value) / 100).toFixed(2)}`}</Typography>
                <Typography variant='body1' alignSelf='center'>{`Valor del comprobante.....................$${(Math.round(100 * props.fileValue) / 100).toFixed(2)}`}</Typography>
            </div>
        </div>
    )
});

export default ATMTransactionFileOrganism