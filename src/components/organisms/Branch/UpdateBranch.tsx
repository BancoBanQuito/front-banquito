import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

import { Canton, Province } from '../Location/types';
import BranchBox from './BranchBox';
import Button from '@mui/material/Button';
import { IBranch } from './Types';


const UpdateBranch: React.FC = () => {

    const [branchName, setBranchName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string | Number>('');
    const [openingHoursMondayToFriday, setOpeningHoursMondayToFriday] = useState<Dayjs | null>(null);
    const [closingHoursMondayToFriday, setClosingHoursMondayToFriday] = useState<Dayjs | null>(null);
    const [openingHoursSaturday, setOpeningHoursSaturday] = useState<Dayjs | null>(null);
    const [closingHoursSaturday, setClosingHoursSaturday] = useState<Dayjs | null>(null);

    const [provincesData, setProvincesData] = useState<Province[]>([])
    const [selectedProvince, setSelectedProvince] = useState<string>('')
    const onChangeProvince = (value: string) => {
        setSelectedProvince(value)
    }
    const optionsProvince = provincesData.map(({ provinceName }) => ({
        value: provinceName,
        label: provinceName
    }))
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/location/provinces')
                const data = await response.json()
                setProvincesData(data)
            } catch (error) {
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
        label: cantonName
    })) : []
    useEffect(() => {
        const fetchCantons = async () => {
            try {
                if (selectedProvince) {
                    const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/location/province/${selectedProvince}`)
                    const data = await response.json()
                    setCantonsData(data)
                }
            } catch (error) {
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
        label: parishName
    })) : []
    useEffect(() => {
        const fetchParishes = async () => {
            try {
                if (selectedCanton) {
                    const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/location/canton/${selectedCanton}`)
                    const data = await response.json()
                    setParishesData(data)
                }
            } catch (error) {
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

            const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch/name/${selectedBranch}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
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
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            alert("Actualizada con éxito")
        } catch (error) {
            console.error(error)
        }
    }

    const [branchData, setBranchData] = useState<IBranch>()
    const [branchesData, setBranchesData] = useState<IBranch[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string>('')
    const optionsBranch = branchesData.map(({ name }) => ({
        value: name,
        label: name
    }))
    const onChangeBranch = (value: string) => {
        setSelectedBranch(value)
    }
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch')
                const data = await response.json()
                setBranchesData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchBranch= async () => {
            try {
                const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch/name/${selectedBranch}`)
                const data = await response.json()
                setBranchData(data)
            } catch (error) {
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
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Actualizar Sucursal
                </Typography>
            </Container>
            <Container sx={containerSelectStyles}>
            <BranchBox
                label="Selecciona la sucursal a actualizar:"
                value={selectedBranch}
                options={optionsBranch}
                onChange={onChangeBranch}
            />
            </Container>
            {
                selectedBranch != ""
                    ? <>
                        <Container sx={containerStyles}>
                            <div style={{ marginRight: '10px' }}>
                                <BranchBox
                                    label="Selecciona la provincia:"
                                    value={selectedProvince}
                                    options={optionsProvince}
                                    onChange={onChangeProvince} />
                            </div>
                            <div style={{ marginRight: '10px' }}>
                                <BranchBox
                                    label="Selecciona el cantón:"
                                    value={selectedCanton}
                                    options={optionsCanton}
                                    onChange={onChangeCanton} />
                            </div>
                            <div>
                                <BranchBox
                                    label="Selecciona la parroquia:"
                                    value={selectedParish}
                                    options={optionsParish}
                                    onChange={onChangeParish} />
                            </div>
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
                            <TextField
                                value={branchName}
                                onChange={(event) => setBranchName(event.target.value)}
                                variant="standard" />
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Dirección:</FormLabel>
                            <TextField
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                variant="standard" />
                        </Container><Container sx={containerTextFieldStyles}>
                            <FormLabel sx={formLabelStyles}>Teléfono:</FormLabel>
                            <TextField
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                variant="standard" />
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
