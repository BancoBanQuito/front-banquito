import { Box, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import DatePickerAtom from '../../atoms/DatePicker';
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
            onSubmit={handleSubmit}>
            <div style={{ width: '100%', margin: '0.5rem 0' }}>
                <TextFieldAtom
                    fullWidth
                    id={''}
                    name="identification"
                    label="Ingrese la identificación"
                    variant="standard"
                    color="primary"
                    type="text"
                    value={signature.identification}
                    action={handleChange}
                />
            </div>
            <div style={{ width: '100%', margin: '0.5rem 0' }}>
                <Dropdown
                    label="Tipo de identificación"
                    items={IdentificationType}
                    width='100%'
                    height={'auto'}
                    backgroundColor={ColorPalette.SECONDARY}
                    onChange={(value) => setsignature({ ...signature, identificationType: value })}
                />
            </div>
            <div style={{ width: '100%', margin: '0.5rem 0' }}>
                <TextFieldAtom
                    fullWidth
                    id={''}
                    label="Ingrese el rol"
                    name="role"
                    variant="standard"
                    color="primary"
                    type="text"
                    value={signature.role}
                    action={handleChange}
                    placeholder="Ingreso número de cuenta"
                />
            </div>
            <div style={{ width: '100%', margin: '0.5rem 0' }}>
                <DatePickerAtom
                    fullWidth
                    label="Fecha de activación"
                    value={date}
                    onChange={setdate}
                />
            </div>

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alingItems: "center",
                verticalAlign: "middle",
                alignText: "center",
            }}>
                <div style={{ margin: "2rem" }}>
                    <SizeButton
                        submit
                        text={"Agregar"}
                        style={ButtonStyle.BIG}
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY,
                        }}
                    />
                </div>
            </Box>
        </Box>
    )
}

export default AccountSignatureForm