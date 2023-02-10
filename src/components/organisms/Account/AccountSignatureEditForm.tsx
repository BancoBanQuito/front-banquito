import { Box } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { RSSignature } from "../../../services/account/dto/RSSignature";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { Dropdown } from "../../atoms/Dropdown";
import { SizeButton } from "../../atoms/SizeButton";
import TextFieldAtom from "../../atoms/TextFieldAtom";


const statusItems = [
    {
        name: 'ACTIVO',
        value: 'ACT'
    },
    {
        name: 'SUSPENDIDO',
        value: 'SUS'
    },
    {
        name: 'BLOQUEADO',
        value: 'BLO'
    }
]

const rolItem = [
    {
        name: 'SAMPLE',
        value: 'SAM'
    }
]

interface AccountSignatureEditFormProps {
    signature: RSSignature;
    onSubmit?: (data: RSSignature) => void;
}

const AccountSignatureEditForm = (props: AccountSignatureEditFormProps) => {

    const [signature, setsignature] = useState<RSSignature>(props.signature);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
        console.log(signature);
        props.onSubmit && props.onSubmit(signature);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setsignature({
            ...signature,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <TextFieldAtom
                    id="outlined-basic"
                    name="identification"
                    label="Numero de identificacion"
                    color="primary"
                    type="text"
                    onChange={handleChange}
                    value={signature.identification}
                    placeholder="Ingrese el numero de cedula"
                />
            </div>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <Dropdown
                    backgroundColor={ColorPalette.TERNARY}
                    height='auto'
                    width='100%'
                    label='Estado'
                    items={statusItems}
                    onChange={(value) => setsignature({ ...signature, status: value })}
                />
            </div>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                {/* <Dropdown
                    backgroundColor={ColorPalette.TERNARY}
                    height='auto'
                    width='100%'
                    label='Rol'
                    items={rolItem}
                    onChange={(value) => setsignature({ ...signature, role: value })}
                /> */}
                <TextFieldAtom
                    id="outlined-basic"
                    name="role"
                    label="Rol"
                    color="primary"
                    type="text"
                    onChange={handleChange}
                    value={signature.role}
                    placeholder="Ingrese el numero de cedula"
                />
            </div>
            <SizeButton
                palette={{ backgroundColor: ColorPalette.PRIMARY }}
                style={ButtonStyle.MEDIUM}
                text='Editar'
                submit />
        </Box>
    )
}

export default AccountSignatureEditForm
