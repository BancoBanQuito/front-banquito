import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from 'dayjs';


import Button from '@mui/material/Button';


const CreateHolidayYear: React.FC = () => {



    const [date, setDate] = useState<Dayjs | null>(null);





    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {

            const stringDate = date?.format('yyyy-MM-dd')


            const response = await fetch('http://localhost:8081/api/holiday', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({

                    date: date,



                })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            alert("Creada con éxito")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Crear Feriado
                </Typography>
            </Container>

            
            
            
            <Container sx={containerFormLabelStyles}>

            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Fecha:</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker

                        value={date}
                        onChange={(time) => {
                            setDate(time);
                        }}
                        renderInput={(params) => <TextField {...params} variant="standard" sx={formLabelStyles} />}
                    />
                </LocalizationProvider>

            </Container>

            <Container sx={containerTextFieldStyles}>
                <Button onClick={handleSubmit} sx={buttonStyles}>Crear</Button>
            </Container>
        </>
    )
}

export default CreateHolidayYear;

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
