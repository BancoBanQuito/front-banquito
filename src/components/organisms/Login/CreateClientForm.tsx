import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { NewClientRQ } from '../../../services/client/dto/NewClientRQ';
import IdentificationTypes from '../../../services/.json/IdentificationType.json';
import ProgressButtonMolecule from '../../molecules/ProgressButtonMolecule';
import DatePickerAtom from '../../atoms/DatePickerAtom';
import { Dayjs } from 'dayjs';
import moment from 'moment';
import InputFileAtom from '../../atoms/InputFileAtom';

interface CreateClientFormProps {
    title?: string,
    onSubmit?: (data: NewClientRQ) => void;
}

const formLength = 6;

const genderDropdown = [{
    name: 'Hombre',
    value: 'H'
},
{
    name: 'Mujer',
    value: 'M'
},
{
    name: 'Otro',
    value: 'O'
}]

const maritalStatusDropdown = [
    {
        name: 'Soltero',
        value: 'S'
    }, {
        name: 'Casado',
        value: 'C'
    },
    {
        name: 'Divorciado',
        value: 'D'
    }
]

const phoneTypeDropdown = [
    {
        name: 'Celular',
        value: 'Ce'
    }, {
        name: 'Convencional',
        value: 'Co'
    }
]

const referenceTypeDropdown = [
    {
        name: 'Pareja',
        value: 'P'
    }, {
        name: 'Familiar',
        value: 'F'
    }, {
        name: 'Hijo/A',
        value: 'H'
    }, {
        name: 'Otro',
        value: 'O'
    }
]

const CreateClientForm = (props: CreateClientFormProps) => {

    const [indexForm, setindexForm] = useState<number>(0);

    const [formData, setformData] = useState<NewClientRQ>({
        identificationType: "",
        identification: "",
        lastname: "",
        firstname: "",
        email: "",
        birthDate: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
        gender: genderDropdown[0].value,
        career: "",
        companyName: "a",
        companyType: "a",
        createDateCompany: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
        appLegalRepresent: "a",
        articlesAssociatedDoc: "a",
        basicServicesDocument: "a",
        fingerPrint: "a",
        incomeTaxDocument: "a",
        lastStatusDate: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
        maritalStatus: maritalStatusDropdown[0].value,
        monthlyAvgIncome: "0.00",
        nationality: "",
        signature: "a",
        taxPaymentPlace: "a",
        tinDocument: "a",
        workStatus: "a",
        address: {
            codeLocation: "a",
            lineOne: "",
            lineTwo: "",
            latitude: "a",
            longitude: "a"
        },
        phone: {
            phoneNumber: "",
            phoneType: phoneTypeDropdown[0].value
        },
        reference: {
            name: "",
            phone: "",
            related: referenceTypeDropdown[0].value
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

    const handleFormUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setindexForm(indexForm + 1);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Box
            component="form"
            onSubmit={indexForm === formLength - 1 ? handleSubmit : handleFormUpdate}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: 500,
                position: 'relative'
            }}>
            <div style={{
                position: 'absolute',
                top: 0,
                zIndex: 2
            }}>
                <ProgressButtonMolecule
                    color={ColorPalette.PRIMARY}
                    itemsCount={formLength}
                    spotSize={'0.5rem'}
                    current={indexForm} />
            </div>
            <div style={{ width: '100%', margin: '5rem 0 1rem', marginBottom: '1rem' }}>
                <Typography variant="h6" align='left' color='secondary'>{props.title || 'Crear Usuario'}</Typography>
            </div>
            <div style={{ width: '100%', padding: '1rem' }}>
                {indexForm === 0 ? <>
                    <TextFieldAtom
                        required
                        label='Identificacion'
                        fullWidth

                        value={formData.identification}
                        onChange={handleChange}
                        name="identification"
                        type='text' />
                    <Dropdown
                        required
                        key={0}
                        label={'Tipo de Identificacion'}
                        backgroundColor='white'
                        items={IdentificationTypes}
                        width={'100%'}
                        height={'auto'}

                        onChange={(value) => setformData({
                            ...formData,
                            identificationType: value
                        })} />
                    <TextFieldAtom
                        required
                        label='Correo Electronico'
                        fullWidth

                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        type='email' />
                    <TextFieldAtom
                        required
                        label='Nombre'
                        fullWidth

                        value={formData.firstname}
                        onChange={handleChange}
                        name='firstname'
                        type='text' />
                    <TextFieldAtom
                        required
                        label='Apellido'
                        fullWidth

                        value={formData.lastname}
                        onChange={handleChange}
                        name='lastname'
                        type='text' />
                </> : indexForm === 1 ? <>
                    <DatePickerAtom
                        label={'Fecha de nacimiento'}
                        value={formData.birthDate}
                        fullWidth

                        onChange={(value) => setformData({
                            ...formData,
                            birthDate: value?.format('YYYY-MM-DDThh:mm:ss') || ''
                        })} />
                    <Dropdown
                        required
                        key={1}
                        backgroundColor='white'
                        label={'Genero'}
                        items={genderDropdown}
                        defaultValue={formData.gender}
                        value={formData.gender}
                        width={'100%'}
                        height={'auto'}
                        onChange={(value) => setformData({
                            ...formData,
                            gender: value
                        })} />
                    <TextFieldAtom
                        required
                        label='Ocupacion'
                        fullWidth

                        value={formData.career}
                        onChange={handleChange}
                        name="career"
                        type='text' />
                    <Dropdown
                        required
                        key={2}
                        backgroundColor='white'
                        label={'Estado Civil'}
                        items={maritalStatusDropdown}
                        defaultValue={formData.maritalStatus}
                        value={formData.maritalStatus}
                        width={'100%'}
                        height={'auto'}
                        onChange={(value) => setformData({
                            ...formData,
                            maritalStatus: value
                        })} />
                </> : indexForm === 2 ? <>
                    <TextFieldAtom
                        required
                        label='Ingreso mensual promedio'
                        fullWidth
                        value={formData.monthlyAvgIncome}
                        onChange={handleChange}
                        name="monthlyAvgIncome"
                        type='number'
                        step='0.00' />
                    <TextFieldAtom
                        required
                        label='Nacionalidad'
                        fullWidth
                        value={formData.nationality}
                        onChange={handleChange}
                        name="nationality"
                        type='text' />
                    <InputFileAtom />
                </> : indexForm === 3 ? <>
                    <Typography variant='h6' fontSize={'0.75rem'} color='secondary' >Direccion</Typography>
                    <TextFieldAtom
                        required
                        label='Calle Principal'
                        fullWidth
                        value={formData.address.lineOne}
                        onChange={(event) => setformData({
                            ...formData,
                            address: {
                                ...formData.address,
                                lineOne: event.target.value
                            }
                        })}
                        name="lineOne"
                        type='text' />
                    <TextFieldAtom
                        required
                        label='Calle Transversal'
                        fullWidth
                        value={formData.address.lineTwo}
                        onChange={(event) => setformData({
                            ...formData,
                            address: {
                                ...formData.address,
                                lineTwo: event.target.value
                            }
                        })}
                        name="lineTwo"
                        type='text' />
                </> : indexForm === 4 ? <>
                    <Typography variant='h6' fontSize={'0.75rem'} color='secondary' >Telefono</Typography>
                    <Dropdown
                        required
                        key={3}
                        backgroundColor='white'
                        label={'Tipo de Telefono'}
                        items={phoneTypeDropdown}
                        defaultValue={formData.phone.phoneType}
                        value={formData.phone.phoneType}
                        width={'100%'}
                        height={'auto'}
                        onChange={(value) => setformData({
                            ...formData,
                            phone: {
                                ...formData.phone,
                                phoneType: value
                            }
                        })} />
                    <TextFieldAtom
                        required
                        label='Telefono'
                        fullWidth
                        value={formData.phone.phoneNumber}
                        onChange={(event) => setformData({
                            ...formData,
                            phone: {
                                ...formData.phone,
                                phoneNumber: event.target.value
                            }
                        })}
                        name="phone"
                        type='text' />
                </> : <>
                    <Typography variant='h6' fontSize={'0.75rem'} color='secondary' >Referencia</Typography>
                    <Dropdown
                        required
                        key={4}
                        backgroundColor='white'
                        label={'Tipo de Telefono'}
                        items={referenceTypeDropdown}
                        defaultValue={formData.reference.related}
                        value={formData.reference.related}
                        width={'100%'}
                        height={'auto'}
                        onChange={(value) => setformData({
                            ...formData,
                            reference: {
                                ...formData.reference,
                                related: value
                            }
                        })} />
                    <TextFieldAtom
                        required
                        label='Nombre'
                        fullWidth
                        value={formData.reference.name}
                        onChange={(event) => setformData({
                            ...formData,
                            reference: {
                                ...formData.reference,
                                name: event.target.value
                            }
                        })}
                        name="name"
                        type='text' />
                    <TextFieldAtom
                        required
                        label='Telefono'
                        fullWidth
                        value={formData.reference.phone}
                        onChange={(event) => setformData({
                            ...formData,
                            reference: {
                                ...formData.reference,
                                phone: event.target.value
                            }
                        })}
                        name="phont"
                        type='text' />
                </>
                }
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500,
                    position: 'relative'
                }}>
                {
                    indexForm === 0 ? null : <SizeButton
                        text='Atras'
                        onClick={() => setindexForm(indexForm - 1)}
                        style={ButtonStyle.BIG} palette={{
                            backgroundColor: ColorPalette.SECONDARY,
                        }} />
                }
                <SizeButton
                    submit
                    text={indexForm === formLength - 1 ? 'Crear' : 'Siguiente'}
                    style={ButtonStyle.BIG} palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </div>
        </Box>
    )
}

export default CreateClientForm