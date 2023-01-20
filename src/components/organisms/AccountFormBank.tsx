import { Typography, TextField } from '@mui/material'
import { Box, SxProps, Theme } from '@mui/system'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { Dropdown } from '../atoms/Dropdown'
import { SizeButton } from '../atoms/SizeButton'
import IdentificationTypes from './IdentificationType.json'

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

const textHelpers = {
    title: 'Creemos tu cuenta',
    typeIdentification: 'Tipo de Identificación',
    identification: 'Identificacion',
    buttonText: 'Crear cuenta',
    identificationPlaceholder: 'Identifificación'
}

interface FormAccountInterface {
    identification: string,
    identificationType: string,
    codeProduct: string,
    codeBranch: string,
    entityBankCode: string,
    internationalBankCode: string,
}

interface AccountFormProps {
    onSubmit: (data: any) => void,
    products: any[],
}

const AccountFormBank = (props: AccountFormProps) => {

    const [account, setaccount] = useState<FormAccountInterface>({
        identification: "",
        identificationType: "",
        codeProduct: "",
        codeBranch: "12345",
        entityBankCode: "12345",
        internationalBankCode: "12345",
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(account);
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setaccount({ ...account, [name]: value });
    }

    return (
        <>
            <Box sx={mainBoxStyle()}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {textHelpers.title}
                </Typography>
                <Box
                    component="form"
                    onSubmit={submitHandler}
                    sx={formStyle()}>
                    <Dropdown
                        width={200}
                        height={100}
                        label="Tipo de Cuenta"
                        items={props.products}
                        backgroundColor={ColorPalette.SECONDARY}
                        onChange={(value: string) =>
                            setaccount({ ...account, codeProduct: value })}
                    />
                    <Dropdown
                        width={200}
                        height={100}
                        label={textHelpers.typeIdentification}
                        items={IdentificationTypes}
                        backgroundColor={ColorPalette.SECONDARY}
                        onChange={(value: string) =>
                            setaccount({ ...account, identificationType: value })}
                    />
                    <TextField
                        id="identification"
                        name="identification"
                        margin="normal"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={textHelpers.identificationPlaceholder}
                        required
                    />
                    <SizeButton
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }}
                        size={{
                            height: 'auto',
                            width: '100%'
                        }}
                        style={ButtonStyle.BIG}
                        submit
                        text={textHelpers.buttonText} />
                </Box>
            </Box>
        </>
    )
}

export default AccountFormBank