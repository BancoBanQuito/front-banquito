import React, { useState, useEffect } from 'react'
import { Box, Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import { set } from 'date-fns';
import { Spinner } from '../../atoms/Spinner';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Dropdown } from '../../atoms/Dropdown';
import IdentificationTypes from '../../../services/.json/IdentificationType.json'
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import axios from 'axios';


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
            const response = await axios(`${EnvManager.CLIENT_URL}/api/client/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                data: JSON.stringify({
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
            if (response.status !== 200) {
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
            <Box
                component="form"
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 500
                }}>
                <Container sx={containertTitleStyles}>
                    <Typography variant="h4" align="center">
                        Crear Usuario
                    </Typography>
                </Container>
                <TextFieldAtom
                    label='Identificacion'
                    fullWidth
                    required
                    value={identification}
                    onChange={(event) => setIdentification(event.target.value)}
                    type='text' />
                <Dropdown
                    label={'Tipo de Identificacion'}
                    backgroundColor={ColorPalette.SECONDARY}
                    items={IdentificationTypes}
                    width={'100%'}
                    height={'auto'} />
                <TextFieldAtom
                    label='Correo Electronico'
                    fullWidth
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type='email' />
                <TextFieldAtom
                    label='Usuario'
                    fullWidth
                    required
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                    type='text' />
                <TextFieldAtom
                    label='Contraseña'
                    fullWidth
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type='password' />
                <SizeButton
                    text={'Crear'}
                    style={ButtonStyle.BIG} palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </Box>
        </>
    )
}

export default CreateUser;

const containertTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
});