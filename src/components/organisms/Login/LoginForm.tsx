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

interface LoginFormProps {
  onSubmit?: (user: { username: string, password: string }) => void;
  title?: string;
}

const LoginForm = (props: LoginFormProps) => {

  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit?.({
      username: userName,
      password: password
    });
  }

  return (
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
        label='Usuario'
        required
        value={userName}
        type="text"
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