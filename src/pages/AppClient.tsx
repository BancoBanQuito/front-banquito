import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { Outlet, useNavigate } from 'react-router-dom';
import { SessionVariable, getSession } from '../utils/SessionUtils';
import { Box } from '@mui/material';

const AppClient = () => {
    const user = useUser();
    const navigate = useNavigate();

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
            <Outlet />
        </Box>
    )
}

export default AppClient