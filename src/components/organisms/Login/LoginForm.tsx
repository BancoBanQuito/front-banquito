import React, { useState, useEffect, FormEvent } from 'react'
import { Box, Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import LoadOrganism from '../LoadOrganism';
import { Spinner } from '../../atoms/Spinner';
import { useUser } from '../../../context/UserContext';
import { login } from '../../../utils/LoginUtils';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';

interface userProps {
  username: string,
  password: string,
  identification: string,
  typeIdentification: string
}

interface LoginFormProps {
  redirect?: string;
  onSubmit?: (user: { username: string, password: string }) => void;
  commonSubmit?: boolean;
  title?: string;
}

const LoginForm = (props: LoginFormProps) => {

  const user = useUser();
  const navigate = useNavigate();

  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [activateSpinner, setActivateSpinner] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!props.commonSubmit) {
      props.onSubmit?.({
        username: userName,
        password: password
      });
      return;
    }
    setActivateSpinner(true);
    try {
      const data = await login(userName, password);
      user.identification = data.identification;
      user.identificationType = data.identificationType;
      user.username = data.email;
      user.isLogged = true;
      navigate(props.redirect || '');
    } catch (error) {
      console.error(error)
    } finally {
      setActivateSpinner(false);
    }
  }

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: 300
        }}>
        <Container sx={containertTitleStyles}>
          <Typography variant="h6" align="center">
            {props.title || 'Iniciar Sesion'}
          </Typography>
        </Container>
        <Container sx={containerStyles}>
        </Container >
        <TextFieldAtom
          fullWidth
          label='Correo electronico'
          required
          value={userName}
          type="email"
          onChange={(event) => setUsername(event.target.value)} />
        <TextFieldAtom
          fullWidth
          label='Contraseña'
          required
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div style={{ margin: '1rem' }} />
        <SizeButton
          submit
          text={'Ingresar'}
          style={ButtonStyle.BIG}
          size={{
            height: 'auto',
            width: '100%'
          }}
          palette={{
            backgroundColor: ColorPalette.PRIMARY
          }} />
      </Box>
    </>
  )
}

export default LoginForm;

const containerStyles = () => ({
  display: 'flex',
  justifyContent: 'flex-start',
});

const containertTitleStyles = () => ({
  textAlign: 'center',
  marginBottom: '5rem',
});