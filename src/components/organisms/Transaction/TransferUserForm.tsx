import { Box, SxProps, Theme } from '@mui/system'
import { Typography, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import { SizeButton } from '/src/components/atoms/SizeButton';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';

const mainBoxStyle = (): SxProps<Theme> => {
    return {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
}

const subtitleBoxStyle = (): SxProps<Theme> => {
    return {
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
}

const fieldBoxStyle = (): SxProps<Theme> => {
    return {
        m: 1,
        p: 2,
    };
}

const elementText = {
    title: 'Cliente',
    subtitle: 'Información Beneficiario',
    amount: "Monto a transferir",
    numAccount: "Número de Cuenta",
    email: "Email (Opcional)",
    buttonText: 'Transferir',
}

interface FormTransferUserInterface {
    amount: number,
    originAccount: number,
    recipeAccount: number
}

interface TransferFormProps{
    onSubmit: (data: any) => void,
}

const TransferUserForm = (props: TransferFormProps) => {

    const [transfer, settransfer] = useState<FormTransferUserInterface>({
        amount: 12.3,
        originAccount: 123456789,
        recipeAccount: 987654321,
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
                    {elementText.title}
                </Typography>
                <Box
                    component="form"
                    onSubmit={submitHandler}
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
                    component="form"
                    onSubmit={submitHandler}
                    sx={
                        fieldBoxStyle()
                    }>
                        <Typography
                    sx={
                        subtitleBoxStyle()
                    }>
                    {elementText.subtitle}
                </Typography>
                    <TextField
                        id="cuenta"
                        name="cuenta"
                        margin="normal"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={elementText.numAccount}
                        required
                    />
                    <TextField
                        id="correo"
                        name="correo"
                        margin="normal"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={elementText.email}
                    />
                </Box>
                <Box
                    sx={fieldBoxStyle()}>
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
                        text={elementText.buttonText} 
                        />
                </Box>
            </Box>
        </>
    )
}

export default TransferUserForm