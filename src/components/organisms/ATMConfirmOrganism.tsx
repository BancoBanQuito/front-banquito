import { Box, Typography } from '@mui/material'
import React, { FormEvent } from 'react'
import TransactionCheckForm from './Transaction/TransactionCheckForm'
import { ChevronRight, Close, Print } from '@mui/icons-material';
import { ColorPalette } from '../../style/ColorPalette';
import ATMButtonAtom from '../atoms/ATMButtonAtom';
import ATMButtonContainerMolecule from '../molecules/ATMButtonContainerMolecule';

interface ATMConfirmOrganismProps {
    amount: number;
    title?: string;
    type?: 'deposit' | 'withdraw';
    label?: string;
    accountOrigin?: string;
    accountTarget?: string;
    onAccept?: () => void;
    onReject?: () => void;
    onPrint?: () => void;
}

const ATMConfirmOrganism = (props: ATMConfirmOrganismProps) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onAccept?.();
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Typography variant='h5' color='secondary' mb={5}>{props.title}</Typography>
            <TransactionCheckForm
                type={props.type}
                accountOrigin={props.accountOrigin || ''}
                username={props.label || ''}
                amount={props.amount}
                accountReceipt={props.accountTarget || ''} />
            <ATMButtonContainerMolecule
                position={'right'}>
                <ATMButtonAtom
                    icon={<Close />}
                    text={'Cancelar'}
                    onClick={props.onReject}
                    palette={{
                        backgroundColor: ColorPalette.SECONDARY
                    }} />
                {
                    props.onPrint && <ATMButtonAtom
                        icon={<Print />}
                        text={'Imprimir'}
                        onClick={props.onPrint}
                        palette={{
                            backgroundColor: ColorPalette.SECONDARY
                        }} />
                }
                <ATMButtonAtom
                    submit
                    icon={<ChevronRight />}
                    text={'Siguiente'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </ATMButtonContainerMolecule>
        </Box>
    )
}

export default ATMConfirmOrganism