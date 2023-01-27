import React, { LegacyRef } from 'react';
import { RSAccountStatement } from '../../../services/account/dto/RSAccountStatement';
import { Typography, Container, Grid, Box } from '@mui/material';
import { ColorPalette } from '../../../style/ColorPalette';
import TableMolecule from '../../molecules/TableMolecule';

interface AccountStatementProps {
    accountStatement: RSAccountStatement | undefined
}

const AccountStatementBody = React.forwardRef((props: AccountStatementProps, ref) => {
    const getRow = (data: any) => {
        return [
            <Typography></Typography>,
            <Typography>{data.movement}</Typography>,
            <Typography>{data.description}</Typography>,
            <Typography>{data.amount}</Typography>,
            <Typography>{data.balance}</Typography>
        ]
    }

    return (
        <>
            {/* <div ref={ref as LegacyRef<HTMLDivElement> | undefined}>
                {
                    !!props.accountStatement ?
                        <Container sx={{ width: '100%' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                                color: ColorPalette.SECONDARY,
                                textTransform: 'uppercase'
                            }}>
                                <Typography variant='h4'>
                                    Estado de Cuenta
                                </Typography>
                            </div>
                            <Grid container spacing={2} p={2}>
                                <Grid item xs={6} p={5}>
                                    <Box sx={{
                                        backgroundColor: ColorPalette.SECONDARY,
                                        color: ColorPalette.ACCENT,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 110,
                                        borderRadius: '5px',
                                        padding: 1
                                    }}>
                                        <div style={{ height: '80%', width: '100%' }}>
                                            <Typography variant='h6'>
                                                Juanito Perez
                                            </Typography>
                                            <Typography variant='body1'>
                                                Cuenta: {props.accountStatement?.localCodeAccount}
                                            </Typography>
                                        </div>
                                        <div style={{ height: '20%', width: '100%' }}>
                                            <Typography variant='body1'>
                                                XXXXXXXXXX
                                            </Typography>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} p={5}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 110,
                                        padding: 1,
                                        textTransform: 'uppercase'
                                    }}>
                                        <Box mb={1} sx={{
                                            border: '1px solid',
                                            borderColor: ColorPalette.SECONDARY,
                                            color: ColorPalette.SECONDARY,
                                            height: '50%',
                                            borderRadius: '5px',
                                            padding: 1
                                        }}>
                                            <Typography variant='body1'>
                                                Fecha ultimo corte: {props.accountStatement?.lastCutOffDate.toUTCString()}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            border: '1px solid',
                                            borderColor: ColorPalette.SECONDARY,
                                            color: ColorPalette.SECONDARY,
                                            height: '50%',
                                            borderRadius: '5px',
                                            padding: 1
                                        }}>
                                            <Typography variant='body1'>
                                                Fecha corte actual: {props.accountStatement?.currentCutOffDate.toString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} p={5}>
                                </Grid>
                                <Grid item xs={6} p={5}>
                                    <Box sx={{
                                        border: '1px solid',
                                        borderColor: ColorPalette.SECONDARY,
                                        height: 'auto',
                                        borderRadius: '5px'
                                    }}>
                                        <Box sx={{
                                            backgroundColor: ColorPalette.SECONDARY,
                                            color: ColorPalette.ACCENT,
                                            padding: 1,
                                            textTransform: 'uppercase'
                                        }}>
                                            <Typography variant='body1'>Conciliacion</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Fecha Ultimo Corte</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.lastCutOffDate.toUTCString()}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Fecha este Corte</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.currentCutOffDate.toString()}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Saldo Anterior</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.previousBalance}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Deposito/Créditos   ({props.accountStatement?.creditMovements})</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.transactions.map(transaction => {
                                                if (transaction.movement === "CRE") {
                                                    return transaction.amount;
                                                }
                                            }).reduce((prev, curr) => (prev || 0) + (curr || 0))}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Retiros/Debitos     ({props.accountStatement.debitMovements})</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.transactions.map(transaction => {
                                                if (transaction.movement === "DEB") {
                                                    return transaction.amount;
                                                }
                                            }).reduce((prev, curr) => (prev || 0) + (curr || 0))}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Interes</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.interest}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Saldo Actual</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.currentBalance}</Typography>
                                        </Box>
                                        <Box sx={{ textTransform: 'uppercase', color: ColorPalette.SECONDARY, padding: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Typography sx={{ width: '50%' }} variant='body1'>Saldo Promedio Efectivo</Typography>
                                            <Typography sx={{ width: '50%' }} variant='body1'>{props.accountStatement?.averageBalance}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} p={5}>
                                    <Box sx={{
                                        backgroundColor: ColorPalette.SECONDARY,
                                        color: ColorPalette.ACCENT,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        height: 'auto',
                                        borderRadius: '5px',
                                        padding: 1
                                    }}>
                                        <Typography sx={{ width: '50%' }} variant='h6'>
                                            Juanito Perez
                                        </Typography>
                                        <Typography sx={{ width: '50%', textAlign: 'end' }} variant='body1'>
                                             XXXXXXXXXX
                                        </Typography>
                                        <Typography variant='body1'>
                                            Cuenta: {props.accountStatement?.localCodeAccount}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} p={5}>
                                    <TableMolecule headers={[
                                        <Typography sx={{ textTransform: 'uppercase' }}>Fecha</Typography>,
                                        <Typography sx={{ textTransform: 'uppercase' }}>Movimiento</Typography>,
                                        <Typography sx={{ textTransform: 'uppercase' }}>Concepto</Typography>,
                                        <Typography sx={{ textTransform: 'uppercase' }}>Monto</Typography>,
                                        <Typography sx={{ textTransform: 'uppercase' }}>Saldo</Typography>,]}
                                        rows={props.accountStatement.transactions.map(transaction => {
                                            return getRow(transaction);
                                        })}
                                        color={ColorPalette.SECONDARY} />
                                </Grid>
                            </Grid>
                        </Container>
                        : null}
            </div> */}
        </>
    )
});

export default AccountStatementBody