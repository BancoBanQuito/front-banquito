import { Box } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Dropdown } from '../../atoms/Dropdown';
import TextAreaAtom from '../../atoms/TextAreaAtom';

interface TransactionFormProps {
    items: { name: string; value: any; }[];
    onSubmit?: (data: TransferenceFormData) => void;
}

interface TransferenceFormData {
    currentAccount: string;
    amount: number;
    recipientAccount: string;
    description: string
}

const TransactionForm = (props: TransactionFormProps) => {

    const [formData, setformData] = useState<TransferenceFormData>({
        currentAccount: props.items[0].value,
        amount: 0,
        recipientAccount: "",
        description: "",
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.(formData);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleClean = () => {
        setformData({
            currentAccount: props.items[0].value,
            amount: 0,
            recipientAccount: "",
            description: "",
        });
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Dropdown
                label={'Cuenta de origen'}
                items={props.items}
                backgroundColor='white'
                width={'100%'}
                defaultValue={props.items[0].value}
                height={'auto'}
                required
                onChange={(value) => formData.currentAccount = value} />
            <TextFieldAtom
                label='Monto'
                name='amount'
                placeholder='0.00'
                fullWidth
                type={'number'}
                value={formData.amount}
                required
                onChange={handleChange} />
            <TextFieldAtom
                label='Cuenta de destino'
                name='recipientAccount'
                fullWidth
                type={'text'}
                value={formData.recipientAccount}
                required
                onChange={handleChange} />
            <TextAreaAtom
                name='description'
                label='Descripción'
                fullwidth
                value={formData.description}
                rows={2}
                required
                onChange={handleChange} />

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: '1.5rem'
            }}>
                <SizeButton
                    text={'Limpiar'}
                    onClick={handleClean}
                    style={ButtonStyle.MEDIUM} palette={{
                        backgroundColor: ColorPalette.SECONDARY,
                    }} />
                <div style={{ margin: '0.5rem' }} />
                <SizeButton
                    submit
                    text={'Siguiente'}
                    style={ButtonStyle.MEDIUM} palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </div>
        </Box>
    )
}

export default TransactionForm