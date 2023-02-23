import { AlertColor, Box, Container, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { Dropdown } from '../../atoms/Dropdown'
import { SizeButton } from '../../atoms/SizeButton'
import TextFieldAtom from '../../atoms/TextFieldAtom'
import IdentificationTypes from '../../../services/.json/IdentificationType.json';
import SnackBarMolecule from '../../molecules/SnackBarMolecule'

interface CreateUserFormProps {
    title?: string;
    username?: string;
    onSubmit?: (user: IUser) => void;
}

interface IUser {
    identification: string;
    identificationType: string;
    email: string;
    username: string;
    password: string;
}

const CreateUserForm = (props: CreateUserFormProps) => {

    const [openSnack, setopenSnack] = useState<boolean>(false)
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [checkPassword, setcheckPassword] = useState<string>("");

    const [user, setuser] = useState<IUser>({
        email: "",
        identification: "",
        identificationType: "",
        password: "",
        username: props.username?.split('@')[0] || ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setuser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (checkPassword !== user.password) {
            setmessageSnack("Las contraseñas no coinciden");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
            return;
        }
        props.onSubmit?.(user);
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500
                }}>
                <div style={{ width: '100%', margin: '1rem 0', marginBottom: '1rem' }}>
                    <Typography variant="h6" align='left' color='secondary'>{props.title || 'Crear Usuario'}</Typography>
                </div>
                <div style={{ width: '100%', padding: '1rem' }}>
                    <TextFieldAtom
                        label='Usuario'
                        fullWidth
                        required
                        value={user.username}
                        onChange={handleChange}
                        disable={!!props.username}
                        name='username'
                        type='text' />
                    <TextFieldAtom
                        label='Contraseña'
                        fullWidth
                        required
                        value={user.password}
                        onChange={handleChange}
                        name='password'
                        type='password' />
                    <TextFieldAtom
                        label='Confirme la Contraseña'
                        fullWidth
                        required
                        value={checkPassword}
                        onChange={(event) => setcheckPassword(event.target.value)}
                        name='check-password'
                        type='password' />
                </div>
                <SizeButton
                    text={'Crear'}
                    submit
                    style={ButtonStyle.BIG} palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </Box>
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                onClose={() => { setopenSnack(false) }}
                autoHideDuration={3000}
                title={titleSnack}
                severity={colorSnack} />
        </>
    )
}

export default CreateUserForm