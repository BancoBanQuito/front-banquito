import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import Topnav from '../components/molecules/Topnav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { isLogged } from '../utils/LoginUtils'
import { getSession, SessionVariable } from '../utils/SessionUtils'

const AppUser = () => {

    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged()) {
            user.identification = getSession(SessionVariable.IDENTIFICATION) != null ? getSession(SessionVariable.IDENTIFICATION) as string | undefined : undefined;
            user.identificationType = getSession(SessionVariable.IDENTIFICATION_TYPE) != null ? getSession(SessionVariable.IDENTIFICATION_TYPE) as string | undefined : undefined;
            user.username = !!getSession(SessionVariable.USERNAME) != null ? getSession(SessionVariable.USERNAME) as string | undefined : undefined;
            user.isLogged = true;
        }
        return () => { }
    }, []);

    useEffect(() => {
        const role = getSession(SessionVariable.ROLE);
        if (user.role !== 'user' && role !== 'user') {
            navigate('/');
        } else if (user.isLogged && isLogged()) {
            navigate('inicio');
        }
        return () => { }
    }, [])

    return (
        <Box
            sx={{
                height: '100vh',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflowX: 'hidden',
                overflowY: 'auto',
                position: 'absolute',
                top: 0,
            }}>
            {
                user.isLogged && <Topnav to='banca/inicio' />
            }
            <Outlet />
        </Box>
    )
}

export default AppUser