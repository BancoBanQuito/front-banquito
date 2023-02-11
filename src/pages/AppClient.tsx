import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { Outlet, useNavigate } from 'react-router-dom';
import { SessionVariable, getSession } from '../utils/SessionUtils';
import { Box } from '@mui/material';
import { isLogged } from '../utils/LoginUtils';
import Topnav from '../components/molecules/Topnav';

const AppClient = () => {
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
        if (user.role !== 'client' && role !== 'client') {
            navigate('../');
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
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {
                user.isLogged && <Topnav to='/client/home' />
            }
            <Outlet />
        </Box>
    )
}

export default AppClient