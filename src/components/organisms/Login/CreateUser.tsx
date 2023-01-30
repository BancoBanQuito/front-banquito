import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import { set } from 'date-fns';
import { Spinner } from '../../atoms/Spinner';


interface Props {
    redirect: string,
}


const CreateUser = ({ redirect }: Props) => {

    const [identification, setIdentification] = useState<string>('');
    const [identificationType, setIdentificationType] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [activateSpinner, setActivateSpinner] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setActivateSpinner(true)
            const response = await fetch(`${EnvManager.CLIENT_URL}/api/client/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    "identificationType": identificationType,
                    "identification": identification,
                    "email": email,
                    "user": {
                        "userName": userName,
                        "password": password,
                        "type": "client",
                        "status": "INA",
                        "creationDate": "2023-01-30T02:44:20.618Z",
                        "lastLoginDate": "2023-01-30T02:44:20.618Z"
                    }
                })
            })
            if (!response.ok) {
                setActivateSpinner(false)
                throw new Error(response.statusText)
            }
            setActivateSpinner(false)
            alert("Ingresa con éxito");
            navigate(redirect)

        } catch (error) {
            setActivateSpinner(false)
            console.error(error)
        }
    }

    return (
        <>
            {activateSpinner ? <Spinner /> : null}
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Crear Usuario
                </Typography>
            </Container>
            <Container sx={containerStyles}>
            </Container >
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Número de identificación:</FormLabel>
                <TextField
                    value={identification}
                    onChange={(event) => setIdentification(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Tipo de identificación:</FormLabel>
                <TextField
                    value={identificationType}
                    onChange={(event) => setIdentificationType(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Email:</FormLabel>
                <TextField
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Email de usuario:</FormLabel>
                <TextField
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Contraseña:</FormLabel>
                <TextField
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <Button onClick={handleSubmit} sx={buttonStyles}>Crear usuario</Button>
            </Container>
        </>
    )
}

export default CreateUser;

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
