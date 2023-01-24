import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, SxProps, TextField, Theme, Typography } from '@mui/material';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import { ColorPalette } from '../../../style/ColorPalette';
import { ButtonStyle } from '../../../style/ButtonStyle';
import IdentificationTypes from '../../../services/.json/IdentificationType.json'

const mainBoxStyle = (): SxProps<Theme> => {
    return {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
}

const formStyle = (): SxProps<Theme> => {
    return {
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 450,
        height: 330
    }
}

const elementText = {
    title: 'Usuario Banco',
    originAccount: 'Numero de cuenta Origen',
    amount: 'Monto a transferir',
    typeIdentification: 'Tipo Identificación',
    identification: 'Identificacion',
    buttonText: 'Siguiente',
}

interface FormTransferInterface {
    originAccount: number,
    amount: number,
    typeIdentification: string,
    identification: string,
}

interface TransferFormProps {
    onSubmit: (data: any) => void,
    products: any[],
}

const TransferBankForm = (props: TransferFormProps) => {
    const [transfer, settransfer] = useState<FormTransferInterface>({
        originAccount: 123456789,
        amount: 20.00,
        typeIdentification: "",
        identification: ""
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(transfer);
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        settransfer({ ...transfer, [name]: value });
    }

    const getDropdownData = (): { name: string, value: any }[] => {
        return props.products.map(product => {
            return {
                name: product.name,
                value: product.codeProduct
            }
        })
    }

    const mainBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        };
    }

    const formBoxStyle = (): SxProps<Theme> => {
        return {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        };
    }
    const fieldBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 1,
        };
    }
    const buttonBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 10,
            display: 'flex',
            justifyContent: 'center'
        };
    }

    return (
        <>
            <Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {elementText.title}
                </Typography>
            </Box>
            <Box
                sx={
                    formBoxStyle()
                }>
                <Box
                    sx={
                        mainBoxStyle()
                    }>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <TextField
                            id="tipoIdentificacion"
                            name="tipoIdentificacion"
                            margin="normal"
                            fullWidth
                            type="text"
                            onChange={handleFormChange}
                            label={elementText.identification}
                            required
                        />
                    </Box>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <Dropdown
                            width={"100%"}
                            height={"auto"}
                            label={elementText.typeIdentification}
                            items={IdentificationTypes}
                            backgroundColor={ColorPalette.SECONDARY}
                            onChange={(value: string) =>
                                settransfer({ ...transfer, typeIdentification: value })}
                        />
                    </Box>
                </Box>
                <Box
                    sx={
                        mainBoxStyle()
                    }>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <TextField
                            id="monto"
                            name="monto"
                            margin="normal"
                            fullWidth
                            type="text"
                            onChange={handleFormChange}
                            label={elementText.amount}
                            required
                        />
                    </Box>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <TextField
                            id="identificacion"
                            name="identificacion"
                            margin="normal"
                            fullWidth
                            type="text"
                            onChange={handleFormChange}
                            label={elementText.identification}
                            required
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={
                    buttonBoxStyle()
                }>
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
                    text={elementText.buttonText} />
            </Box>
        </>
    );
};

export default TransferBankForm;