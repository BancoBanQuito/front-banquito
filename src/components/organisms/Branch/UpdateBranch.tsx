import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

import { Canton, Province } from '../Location/types';
import Button from '@mui/material/Button';
import { IBranch } from './Types';
import EnvManager from '../../../config/EnvManager';
import { Spinner } from '../../atoms/Spinner';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Dropdown } from '../../atoms/Dropdown';
import axios from 'axios';


const UpdateBranch: React.FC = () => {

    const [branchName, setBranchName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string | number>('');
    const [openingHoursMondayToFriday, setOpeningHoursMondayToFriday] = useState<Dayjs | null>(null);
    const [closingHoursMondayToFriday, setClosingHoursMondayToFriday] = useState<Dayjs | null>(null);
    const [openingHoursSaturday, setOpeningHoursSaturday] = useState<Dayjs | null>(null);
    const [closingHoursSaturday, setClosingHoursSaturday] = useState<Dayjs | null>(null);
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [provincesData, setProvincesData] = useState<Province[]>([])
    const [selectedProvince, setSelectedProvince] = useState<string>('')
    const onChangeProvince = (value: string) => {
        setSelectedProvince(value)
    }
    const optionsProvince = provincesData.map(({ provinceName }) => ({
        value: provinceName,
        name: provinceName
    }))
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setActivateSpinner(true)
                const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/provinces`)
                const data = await response.data
                setProvincesData(data)
                setActivateSpinner(false)
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchProvinces()
    }, [])

    const [cantonsData, setCantonsData] = useState<Province>()
    const [selectedCanton, setSelectedCanton] = useState<string>('')
    const onChangeCanton = (value: string) => {
        setSelectedCanton(value)
    }
    const optionsCanton = cantonsData ? cantonsData.cantons.map(({ cantonName }) => ({
        value: cantonName,
        name: cantonName
    })) : []
    useEffect(() => {
        const fetchCantons = async () => {
            try {
                if (selectedProvince) {
                    setActivateSpinner(true)
                    const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/province/${selectedProvince}`)
                    const data = await response.data
                    setCantonsData(data)
                    setActivateSpinner(false)
                }
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchCantons()
    }, [selectedProvince])

    const [parishesData, setParishesData] = useState<Canton>()
    const [selectedParish, setSelectedParish] = useState<string>('')
    const onChangeParish = (value: string) => {
        setSelectedParish(value)
    }
    const optionsParish = parishesData ? parishesData.parishes.map(({ parishName }) => ({
        value: parishName,
        name: parishName
    })) : []
    useEffect(() => {
        const fetchParishes = async () => {
            try {
                if (selectedCanton) {
                    setActivateSpinner(true)
                    const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/canton/${selectedCanton}`)
                    const data = await response.data
                    setParishesData(data)
                    setActivateSpinner(false)
                }
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchParishes()
    }, [selectedCanton])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {

            const stringOpeningMondayToFriday = openingHoursMondayToFriday?.format('HH:mm')
            const stringClosingMondayToFriday = closingHoursMondayToFriday?.format('HH:mm')
            const stringOpeningHoursSaturday = openingHoursSaturday ? openingHoursSaturday.format('HH:mm') : ""
            const stringClosingTimeSaturday = closingHoursSaturday ? closingHoursSaturday.format('HH:mm') : ""
            setActivateSpinner(true)
            const response = await axios(`${EnvManager.SETTINGS_URL}/api/branch/name/${selectedBranch}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                data: JSON.stringify({
                    name: branchName,
                    phoneNumber: phoneNumber,
                    address: address,
                    branchOfficeHours: {
                        openingTimeMondayFriday: stringOpeningMondayToFriday,
                        closingTimeMondayFriday: stringClosingMondayToFriday,
                        openingTimeSaturday: stringOpeningHoursSaturday,
                        closingTimeSaturday: stringClosingTimeSaturday,
                    },
                    location: {
                        provinceName: selectedProvince,
                        cantonName: selectedCanton,
                        parishName: selectedParish,
                    }
                })
            })
            if (response.status !== 200) {
                setActivateSpinner(false)
                throw new Error(response.statusText)
            }
            setActivateSpinner(false)
            alert("Actualizada con éxito")
        } catch (error) {
            setActivateSpinner(false)
            console.error(error)
        }
    }

    const [branchData, setBranchData] = useState<IBranch>()
    const [branchesData, setBranchesData] = useState<IBranch[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string>('')
    const optionsBranch = branchesData.map(({ name }) => ({
        value: name,
        name: name
    }))
    const onChangeBranch = (value: string) => {
        setSelectedBranch(value)
    }
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setActivateSpinner(true)
                const response = await axios(`${EnvManager.SETTINGS_URL}/api/branch`)
                const data = await response.data
                setBranchesData(data)
                setActivateSpinner(false)
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                setActivateSpinner(true)
                const response = await axios(`${EnvManager.SETTINGS_URL}/api/branch/name/${selectedBranch}`)
                const data = await response.data
                setBranchData(data)
                setActivateSpinner(false)
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchBranch()
    }, [selectedBranch])

    useEffect(() => {
        const selectBranch = async () => {
            try {
                setSelectedProvince(branchData ? branchData.location.provinceName : "")
                setSelectedCanton(branchData ? branchData.location.cantonName : "")
                setSelectedParish(branchData ? branchData.location.parishName : "")
                setBranchName(branchData ? branchData.name : "")
                setAddress(branchData ? branchData.address : "")
                setPhoneNumber(branchData ? branchData.phoneNumber : "")
            } catch (error) {
                console.error(error)
            }
        }
        selectBranch()
    }, [branchData])

    return (
        <>
            {activateSpinner ? <Spinner /> : null}
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Actualizar Sucursal
                </Typography>
            </Container>
            <Container sx={containerSelectStyles}>
                <Dropdown
                    label="Selecciona la sucursal a actualizar:"
                    value={selectedBranch}
                    items={optionsBranch}
                    onChange={onChangeBranch}
                    width={'100%'}
                    height={'auto'} />
            </Container>
            {
                selectedBranch != ""
                    ? <>
                        <Container sx={containerStyles}>
                            <div style={{ marginRight: '10px' }}>
                                <Dropdown
                                    label="Selecciona la provincia:"
                                    value={selectedProvince}
                                    items={optionsProvince}
                                    onChange={onChangeProvince}
                                    width={'100%'}
                                    height={'auto'} />
                            </div>
                            <div style={{ marginRight: '10px' }}>
                                <Dropdown
                                    label="Selecciona el cantón:"
                                    value={selectedCanton}
                                    items={optionsCanton}
                                    onChange={onChangeCanton}
                                    width={'100%'}
                                    height={'auto'} />
                            </div>
                            <div>
                                <Dropdown
                                    label="Selecciona la parroquia:"
                                    value={selectedParish}
                                    items={optionsParish}
                                    onChange={onChangeParish}
                                    width={'100%'}
                                    height={'auto'} />
                            </div>
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
                            <TextFieldAtom
                                value={branchName}
                                onChange={(event) => setBranchName(event.target.value)}
                                type='text' />
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Dirección:</FormLabel>
                            <TextFieldAtom
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                type='text' />
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Teléfono:</FormLabel>
                            <TextFieldAtom
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                type='text' />
                        </Container><Container sx={containerFormLabelStyles}>
                            <FormLabel sx={formLabelStyles}>Horario de atención:</FormLabel>
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Lunes - Viernes:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Abierto"
                                    value={openingHoursMondayToFriday}
                                    onChange={(time) => {
                                        setOpeningHoursMondayToFriday(time);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" sx={formLabelStyles} />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Cerrado"
                                    value={closingHoursMondayToFriday}
                                    onChange={(time) => {
                                        setClosingHoursMondayToFriday(time);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />} />
                            </LocalizationProvider>
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Sábado:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Abierto"
                                    value={openingHoursSaturday}
                                    onChange={(time) => {
                                        setOpeningHoursSaturday(time);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" sx={formLabelStyles} />} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Cerrado"
                                    value={closingHoursSaturday}
                                    onChange={(time) => {
                                        setClosingHoursSaturday(time);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />} />
                            </LocalizationProvider>
                        </Container>
                        <Container sx={containerTextFieldStyles}>
                            <Button onClick={handleSubmit} sx={buttonStyles}>Actualizar sucursal</Button>
                        </Container>
                    </>
                    : <></>
            }
        </>
    )
}

export default UpdateBranch;

const containerStyles = () => ({
    display: 'flex',
    justifyContent: 'flex-start',
});

const containertTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
});

const containerSelectStyles = () => ({
    marginBottom: '10px',
});

const containerTextFieldStyles = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '50px',
});

const containerFormLabelStyles = () => ({
    marginTop: '50px',
    marginLeft: '280px'
});

const formLabelStyles = () => ({
    marginRight: '10px',
});

const buttonStyles = () => ({
    background: '#1D3557',
    color: 'white',
    ':hover': {
        background: '#1D3557',
        color: 'white'
    }
});
