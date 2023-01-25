import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import SegmentBox from './SegmentBox';
import Button from '@mui/material/Button';
import BranchBox from '../Branch/BranchBox';


const CreateSegment: React.FC = () => {

    const [idSegment, setIdSegment] = useState<string>('');
    const [nameSegment, setNameSegment] = useState<string>('');
    const [statustSegment, setStatusSegment] = useState<string>('');
    const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
    const onChangeStatus = (value: string) => {
        setStatusSegment(value)
        if (value !== '') {
            setIsStatusSelected(false);
        } else {
            setIsStatusSelected(true);
        }
    }
    
    useEffect(() => {
        const fetchSegment = async () => {
            try {
                const response = await fetch('http://localhost:8083/api/segments')
                const data = await response.json()
                setNameSegment(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSegment()
    }, [])

    const optionsStatus = [
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' }
    ]

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {

            const response = await fetch('http://localhost:8083/api/segments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    idSegment: idSegment,
                    name: nameSegment,
                    status: statustSegment
                })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            alert("Segmento creado con éxito")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Crear Segmento
                </Typography>
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
                <TextField
                    value={nameSegment}
                    onChange={(event) => setNameSegment(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerStyles}>
                <div style={{ marginRight: '10px' }}>
                    <BranchBox
                        label="Selecciona el estado:"
                        value={statustSegment}
                        options={optionsStatus}
                        onChange={onChangeStatus}
                    />
                </div>
            </Container >
            <Container sx={containerTextFieldStyles}>
                <Button onClick={handleSubmit} sx={buttonStyles}>Crear segmento</Button>
            </Container>
        </>
    )
}

export default CreateSegment;

const containerStyles = () => ({
    display: 'flex',
    justifyContent: 'flex-start',
});

const containertTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
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
