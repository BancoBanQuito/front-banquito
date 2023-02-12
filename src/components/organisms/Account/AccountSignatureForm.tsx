import { Box, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import DatePickerAtom from '../../atoms/DatePickerAtom';
import { Dropdown } from '../../atoms/Dropdown';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Dayjs } from 'dayjs';
import { RQSignature } from '../../../services/account/dto/RQSignature';
import IdentificationType from '../../../services/.json/IdentificationType.json';

interface AccountSignatureFormProps {
    onSubmit?: (data: RQSignature) => void;
    restore?: boolean
}

const AccountSignatureForm = (props: AccountSignatureFormProps) => {

    const [date, setdate] = useState<Dayjs | null>(null);
    const [signature, setsignature] = useState<RQSignature>({
        codeLocalAccount: "",
        identificationType: "",
        identification: "",
        role: "",
        startDate: new Date(),
    });

    useEffect(() => {

        return () => { }
    }, [props.restore]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit({
            ...signature,
            startDate: date?.format("YYYY-MM-DDTHH:mm:ss") || "",
        });
        setsignature({
            codeLocalAccount: "",
            identificationType: "",
            identification: "",
            role: "",
            startDate: new Date(),
        });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setsignature({
            ...signature,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <TextFieldAtom
                name="identification"
                label="Ingrese la identificación"
                color="primary"
                type="text"
                value={signature.identification}
                onChange={handleChange}
                fullWidth
                required

            />
            <Dropdown
                label="Tipo de identificación"
                items={IdentificationType}
                width='100%'
                height={'auto'}
                backgroundColor={ColorPalette.SECONDARY}
                onChange={(value) => setsignature({ ...signature, identificationType: value })}
                required
            />
            <TextFieldAtom
                label="Ingrese el rol"
                name="role"
                color="primary"
                type="text"
                value={signature.role}
                onChange={handleChange}
                placeholder="Ingreso número de cuenta"
                fullWidth
                required
            />
            <DatePickerAtom
                fullWidth
                label="Fecha de activación"
                value={date}
                onChange={setdate}
            />

            <SizeButton
                submit
                text={"Agregar"}
                style={ButtonStyle.BIG}
                palette={{
                    backgroundColor: ColorPalette.PRIMARY,
                }}
            />
        </Box>
    )
}

export default AccountSignatureForm