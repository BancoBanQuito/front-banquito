import { Theme } from "@emotion/react";
import { SxProps, Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { SizeButton } from "../../atoms/SizeButton";
import TextFieldAtom from "../../atoms/TextFieldAtom";

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

interface TransferFormProps {
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
            <Box sx={{
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
            }}>
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
                    sx={{

                    }}>
                    <TextFieldAtom
                        id="monto"
                        name="monto"
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
                    sx={{}}>
                    <Typography
                        sx={{}}>
                        {elementText.subtitle}
                    </Typography>
                    <TextFieldAtom
                        id="cuenta"
                        name="cuenta"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={elementText.numAccount}
                        required
                    />
                    <TextFieldAtom
                        id="correo"
                        name="correo"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={elementText.email}
                    />
                </Box>
                <Box
                    sx={{}}>
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