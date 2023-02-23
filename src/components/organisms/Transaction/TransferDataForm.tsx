import { Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { SizeButton } from "../../atoms/SizeButton";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ATMButtonContainerMolecule from "../../molecules/ATMButtonContainerMolecule";
import ATMButtonAtom from "../../atoms/ATMButtonAtom";
import TextFieldAtom from "../../atoms/TextFieldAtom";


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
                    overflowY: 'hidden',
                    width: '100%',
                    height: '100%'
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
                    {!!props.showAccountCode && <TextFieldAtom
                        id="accountNumber"
                        name="accountNumber"
                        type="text"
                        onChange={handleFormChange}
                        label='Numero de Cuenta'
                        fullWidth
                        required
                    />}
                    {
                        !!props.showConcept && <TextFieldAtom
                            id="concept"
                            name="concept"
                            type="text"
                            onChange={handleFormChange}
                            label='Concepto'
                            fullWidth
                            required
                        />
                    }
                    {
                        !!props.showDescription && <TextFieldAtom
                            id="description"
                            name="description"
                            type="text"
                            onChange={handleFormChange}
                            label='Descripción'
                            fullWidth
                            required
                        />
                    }
                </Box>
                {!!props.atm ?
                    
                    <ATMButtonContainerMolecule position="left">

                        <ATMButtonAtom
                            submit
                            icon={<ChevronRight />}
                            text={"Siguiente"}
                            palette={{
                                backgroundColor: ColorPalette.PRIMARY
                            }} />
                    </ATMButtonContainerMolecule>
                    : <Box>
                        <SizeButton
                            palette={{
                                backgroundColor: ColorPalette.SECONDARY
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