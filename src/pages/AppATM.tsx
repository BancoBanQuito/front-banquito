import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { isLogged } from '../utils/LoginUtils'
import { getSession, SessionVariable } from '../utils/SessionUtils'

const AppATM = () => {

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
        if (user.role !== 'atm' && role !== 'atm') {
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
            <Outlet />
        </Box>
    )
}

export default AppATM