import { Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../style/ButtonStyle";
import { ColorPalette } from "../../style/ColorPalette";
import { SizeButton } from "../atoms/SizeButton";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ATMButtonContainerMolecule from "../molecules/ATMButtonContainerMolecule";
import ATMButtonAtom from "../atoms/ATMButtonAtom";
import TextFieldAtom from "../atoms/TextFieldAtom";


interface AtmLoginFormProps {
    title?: string,
    codeLocalAccount?: boolean;
    password?: boolean;
    atm?: boolean
    onSubmit?: (data: any) => void,
}

interface ATMLoginForm {
    codeLocalAccount: string,
    password: string,
}

const AtmLoginForm = (props: AtmLoginFormProps) => {
    const [login, setlogin] = useState<ATMLoginForm>({
        codeLocalAccount: "",
        password: ""
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(login);
        setlogin({
            codeLocalAccount: "",
            password: ""
        });
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setlogin({ ...login, [name]: value });
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={submitHandler}
                sx={{
                    width: '100%',
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
                    {!!props.codeLocalAccount && <TextFieldAtom
                        id="codeLocalAccount"
                        name="codeLocalAccount"
                        type="text"
                        onChange={handleFormChange}
                        label='Numero de Cuenta'
                        fullWidth
                        required
                    />}
                    {
                        !!props.password && <TextFieldAtom
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleFormChange}
                            label='Contraseña'
                            fullWidth
                            required
                        />
                    }
                </Box>
                {!!props.atm ?
                    <ATMButtonContainerMolecule position='right'>
                        <ATMButtonAtom
                            text={'Siguiente'}
                            icon={<ChevronRight />}
                            submit palette={{
                                backgroundColor: ColorPalette.PRIMARY
                            }} />
                    </ATMButtonContainerMolecule>
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

export default AtmLoginForm;