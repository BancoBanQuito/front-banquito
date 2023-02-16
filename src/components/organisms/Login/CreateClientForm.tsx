import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { NewClientRQ } from '../../../services/client/dto/NewClientRQ';
import IdentificationTypes from '../../../services/.json/IdentificationType.json';

interface CreateClientFormProps {
    title?: string,
    onSubmit?: (data: NewClientRQ) => void;
}

const CreateClientForm = (props: CreateClientFormProps) => {

    const [formData, setformData] = useState<NewClientRQ>({
        identificationType: "",
        identification: "",
        lastname: "",
        firstname: "",
        email: "",
        birthDate: "2000-06-16T00:00:00",
        gender: "a",
        career: "a",
        companyName: "a",
        companyType: "a",
        createDateCompany: "2000-06-16T00:00:00",
        appLegalRepresent: "a",
        articlesAssociatedDoc: "a",
        basicServicesDocument: "a",
        fingerPrint: "a",
        incomeTaxDocument: "a",
        lastStatusDate: "2000-06-16T00:00:00",
        maritalStatus: "a",
        monthlyAvgIncome: "a",
        nationality: "a",
        signature: "a",
        taxPaymentPlace: "a",
        tinDocument: "a",
        workStatus: "a",
        address: {
            codeLocation: "a",
            lineOne: "a",
            lineTwo: "a",
            latitude: "a",
            longitude: "a"
        },
        phone: {
            phoneNumber: "0999999999",
            phoneType: "a"
        },
        reference: {
            name: "a",
            phone: "a",
            related: "a"
        },
        relationship: {
            name: "a",
            startDate: "2000-06-16T00:00:00",
            endDate: "2000-06-16T00:00:00"
        },
        segment: {
            code: "a",
            name: "a",
            status: "a"
        }
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.(formData);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: 500
            }}>
            <div style={{ width: '100%', margin: '1rem 0', marginBottom: '1rem' }}>
                <Typography variant="h6" align='left' color='secondary'>{props.title || 'Crear Usuario'}</Typography>
            </div>
            <div style={{ width: '100%', padding: '1rem' }}>
                <TextFieldAtom
                    label='Identificacion'
                    fullWidth
                    required
                    value={formData.identification}
                    onChange={handleChange}
                    name="identification"
                    type='text' />
                <Dropdown
                    label={'Tipo de Identificacion'}
                    backgroundColor='white'
                    items={IdentificationTypes}
                    width={'100%'}
                    height={'auto'}
                    required
                    onChange={(value) => setformData({
                        ...formData,
                        identificationType: value
                    })} />
                <TextFieldAtom
                    label='Correo Electronico'
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    type='email' />
                <TextFieldAtom
                    label='Nombre'
                    fullWidth
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    name='firstname'
                    type='text' />
                <TextFieldAtom
                    label='Apellido'
                    fullWidth
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                    name='lastname'
                    type='text' />
            </div>
            <SizeButton
                text={'Crear'}
                submit
                style={ButtonStyle.BIG} palette={{
                    backgroundColor: ColorPalette.PRIMARY,
                }} />
        </Box>
    )
}

export default CreateClientForm