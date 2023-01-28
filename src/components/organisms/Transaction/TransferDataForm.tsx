import { Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { SizeButton } from "../../atoms/SizeButton";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


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
    atm?: boolean
}

const buttonATMSize = {
    height: 75,
    width: 200
}

const TransferDataForm = (props: TransferFormProps) => {
    const [transfer, settransfer] = useState<FormTransferInterface>({
        bank: "BANQUITO",
        accountNumber: "",
        concept: "",
        description: "",
        movement: "",
        type: ""
    })

    const navigate = useNavigate();

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
                onSubmit={submitHandler}
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                }}>
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
                {!!props.atm ?
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -30,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                        <div style={{ margin: '1rem 0' }}>
                            <SizeButton
                                submit
                                text={'Siguiente'}
                                icon={<ChevronRight />}
                                style={ButtonStyle.BIG}
                                size={buttonATMSize}
                                palette={{
                                    backgroundColor: ColorPalette.PRIMARY,
                                }} />
                        </div>
                    </div>
                    : <Box>
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
                    </Box>}
            </Box>
        </>
    );
};

export default TransferDataForm;