import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, FormControl, SxProps, TextField, Theme, Typography } from '@mui/material';
import TextFieldAtom from '../atoms/TextFieldAtom';
import { Dropdown } from '../atoms/Dropdown';
import { SizeButton } from '../atoms/SizeButton';
import { ColorPalette } from '../../style/ColorPalette';
import { ButtonStyle } from '../../style/ButtonStyle';
import IdentificationTypes from './IdentificationType.json'

interface FormTransferInterface {
    accountNumber: string,
    identification: string,
    identificationType: string,
}

interface TransferFormProps {
    title?: string,
    onSubmit?: (data: any) => void,
}

const TransferDataForm = (props: TransferFormProps) => {
    const [transfer, settransfer] = useState<FormTransferInterface>({
        accountNumber: "",
        identification: "",
        identificationType: "",
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(transfer);
        settransfer({
            accountNumber: "",
            identification: "",
            identificationType: "",
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
                    <TextField
                        id="accountNumber"
                        name="accountNumber"
                        margin="normal"
                        type="text"
                        onChange={handleFormChange}
                        label='Numero de Cuenta'
                        fullWidth
                        required
                    />
                    <Dropdown
                        width={"100%"}
                        height={"auto"}
                        label=''
                        items={IdentificationTypes}
                        backgroundColor={ColorPalette.SECONDARY}
                        onChange={(value: string) => settransfer({ ...transfer, identificationType: value })}
                    />
                    <TextField
                        id="identification"
                        name="identification"
                        label='Identificacion'
                        margin="normal"
                        type="text"
                        onChange={handleFormChange}
                        fullWidth
                        required
                    />
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