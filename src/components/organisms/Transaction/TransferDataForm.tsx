import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import IdentificationTypes from '/src/services/.json/IdentificationType.json'
import { SizeButton } from '/src/components/atoms/SizeButton';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';

interface FormTransferInterface {
    bank: string,
    accountNumber: string,
    concept: string,
    description: string,
    movement: string
}

interface TransferFormProps {
    title?: string,
    onSubmit?: (data: any) => void,
    showConcept?: boolean,
    showDescription?: boolean,
    showAccountCode?: boolean,
}

const TransferDataForm = (props: TransferFormProps) => {
    const [transfer, settransfer] = useState<FormTransferInterface>({
        bank: "",
        accountNumber: "",
        concept: "",
        description: "",
        movement: ""
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(transfer);
        settransfer({
            bank: "",
            accountNumber: "",
            concept: "",
            description: "",
            movement: ""
        });
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        settransfer({ ...transfer, [name]: value });
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={submitHandler}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {props.title || 'Cuenta'}
                    </Typography>
                </Box>
                <Box>
                    {!!props.showAccountCode && <TextField
                        id="accountNumber"
                        name="accountNumber"
                        margin="normal"
                        type="text"
                        onChange={handleFormChange}
                        label='Numero de Cuenta'
                        fullWidth
                        required
                    />}
                    {
                        !!props.showConcept && <TextField
                            id="concept"
                            name="concept"
                            margin="normal"
                            type="text"
                            onChange={handleFormChange}
                            label='Concepto'
                            fullWidth
                            required
                        />
                    }
                    {
                        !!props.showDescription && <TextField
                            id="description"
                            name="description"
                            margin="normal"
                            type="text"
                            onChange={handleFormChange}
                            label='Descripción'
                            fullWidth
                            required
                        />
                    }
                </Box>
                <Box>
                    <SizeButton
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }}
                        size={{
                            height: 'auto',
                            width: 'auto'
                        }}
                        style={ButtonStyle.BIG}
                        submit
                        text="Siguiente" />
                </Box>
            </Box>
        </>
    );
};

export default TransferDataForm;