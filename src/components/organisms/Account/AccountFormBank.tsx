import { Theme } from "@emotion/react";
import { SxProps, Box, Typography, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { CIUtils } from "../../../utils/CIUtils";
import { Dropdown } from "../../atoms/Dropdown";
import { SizeButton } from "../../atoms/SizeButton";
import IdentificationTypes from '../../../services/.json/IdentificationType.json'
import TextFieldAtom from "../../atoms/TextFieldAtom";


const mainBoxStyle = (): SxProps<Theme> => {
    return {
        marginTop: 4,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5
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
    identification?: string;
    identificationType?: string;
}

const AccountFormBank = (props: AccountFormProps) => {

    const [showIdentificationError, setshowIdentificationError] = useState<boolean>(false)
    const [errorMessage, seterrorMessage] = useState("La identificacion no es correcta");

    const [account, setaccount] = useState<FormAccountInterface>({
        identification: props.identification || "",
        identificationType: props.identificationType || "",
        codeProduct: "",
        codeBranch: "123",
        entityBankCode: "12345",
        internationalBankCode: "12345",
    });

    useEffect(() => {
        console.log(props);
        return () => { }
    }, [])


    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (account.identificationType === "PAS") {
            props.onSubmit(account);
            return;
        }
        if (CIUtils.checkIdentification(account.identification)) {
            props.onSubmit(account);
        } else {
            setshowIdentificationError(true);
        }
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setshowIdentificationError(false);
        const name = event.target.name;
        const value = event.target.value;
        setaccount({ ...account, [name]: value });
    }

    const getDropdownData = (): { name: string, value: any }[] => {
        return props.products.map(product => {
            return {
                name: product.name,
                value: product.codeProduct
            }
        })
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
                    <div style={{
                        width: '100%',
                        height: 'auto',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <Dropdown
                            required
                            width={"100%"}
                            height={"auto"}
                            label="Tipo de Cuenta"
                            items={getDropdownData()}
                            backgroundColor={ColorPalette.SECONDARY}
                            onChange={(value: string) =>
                                setaccount({ ...account, codeProduct: value })}
                        />
                    </div>
                    <div style={{
                        width: '100%',
                        height: 'auto',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <Dropdown
                            required
                            defaultValue={props.identificationType}
                            width={"100%"}
                            height={"auto"}
                            label={textHelpers.typeIdentification}
                            items={IdentificationTypes}
                            backgroundColor={ColorPalette.SECONDARY}
                            onChange={(value: string) =>
                                setaccount({ ...account, identificationType: value })}
                        />
                    </div>
                    <TextFieldAtom
                        id="identification"
                        name="identification"
                        fullWidth
                        type="text"
                        onChange={handleFormChange}
                        label={textHelpers.identificationPlaceholder}
                        error={showIdentificationError}
                        helperText={showIdentificationError ? errorMessage : ""}
                        value={account.identification}
                        disable={!!props.identification}
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