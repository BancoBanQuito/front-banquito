import { AlertColor, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BanQuitoIcon from '../../components/atoms/BanQuitoIcon';
import { SizeButton } from '../../components/atoms/SizeButton';
import LoginForm from '../../components/organisms/Login/LoginForm';
import { ButtonStyle } from '../../style/ButtonStyle';
import { ColorPalette } from '../../style/ColorPalette';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { login } from '../../utils/LoginUtils';
import SnackBarMolecule from '../../components/molecules/SnackBarMolecule';
import InfoModalOrganism from '../../components/organisms/InfoModalOrganism';
import LoadOrganism from '../../components/organisms/LoadOrganism';

const LoginUser = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [openSnack, setopenSnack] = useState<boolean>(false)
    const [snackMessage, setsnackMessage] = useState<string>("");
    const [snackTitle, setsnackTitle] = useState<string>("");
    const [snackColor, setsnackColor] = useState<AlertColor>('error');
    const [openInfoModal, setopenInfoModal] = useState<boolean>(false);
    const [infoMessage, setinfoMessage] = useState<string>("");
    const [titleInfoModal, settitleInfoModal] = useState<string>("")
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLogged) {
            navigate('/banca/inicio');
        }
        return () => { }
    }, []);


    const handleSubmit = async (submitUser: { username: string, password: string }) => {
        setisLoading(true);
        try {
            const data = await login(submitUser.username, submitUser.password);
            user.identification = data.identification;
            user.identificationType = data.identificationType;
            user.username = data.email;
            user.isLogged = true;
            navigate('/banca/inicio');
        } catch (error: any) {
            setsnackMessage(error.message);
            setsnackTitle("Error");
            setsnackColor('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <>
            <Paper
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column'
                }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    margin: '1rem',
                    display: 'flex',
                    fontWeight: 'bold'
                }}>
                    <BanQuitoIcon />
                    <div style={{ width: '5px' }} />
                    <Typography variant='body1' >Banco BanQuito</Typography>
                </div>
                <LoginForm
                    onSubmit={handleSubmit}
                    title='Ingrese a su Banca Virtual' />

            </Paper>
            <InfoModalOrganism
                active={openInfoModal}
                onDeactive={() => setopenInfoModal(false)}
                text={infoMessage}
                onClick={() => setopenInfoModal(false)}
                title={titleInfoModal}
                buttonText='Cerrar'
            />
            <SnackBarMolecule
                open={openSnack}
                message={snackMessage}
                onClose={() => { setopenSnack(false) }}
                autoHideDuration={3000}
                title={snackTitle}
                severity={snackColor} />
            <LoadOrganism
                active={isLoading} />
        </>
    )
}

export default LoginUser