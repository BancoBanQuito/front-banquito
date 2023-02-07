import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import { Spinner } from '../../atoms/Spinner';
import { useUser } from '../../../context/UserContext';
import { login } from '../../../utils/LoginUtils';

interface userProps {
  username: string,
  password: string,
  identification: string,
  typeIdentification: string
}

const Login = ({ redirect }: any) => {

  const user = useUser();
  const navigate = useNavigate();

  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [activateSpinner, setActivateSpinner] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setActivateSpinner(true);
    try {
      const data = await login(userName, password);
      user.identification = data.identification;
      user.identificationType = data.identificationType;
      user.username = data.email;
      user.isLogged = true;
      navigate(redirect)
    } catch (error) {
      console.error(error)
    } finally {
      setActivateSpinner(false);
    }
  }

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Iniciar Sesion
        </Typography>
      </Container>
      <Container sx={containerStyles}>
      </Container >
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Email:</FormLabel>
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
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>Ingresar</Button>
      </Container>
    </>
  )
}

export default Login;

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
