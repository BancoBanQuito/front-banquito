import { Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { SizeButton } from "../../atoms/SizeButton";


interface FormTransferInterface {
    bank: string,
    accountNumber: string,
    concept: string,
    description: string,
    movement: string,
    type: string
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
        bank: "aef0fadf647c8d6f",
        accountNumber: "",
        concept: "",
        description: "",
        movement: "",
        type: ""
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(transfer);
        settransfer({
            bank: "",
            accountNumber: "",
            concept: "",
            description: "",
            movement: "",
            type: ""
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