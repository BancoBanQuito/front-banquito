import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { Outlet, useNavigate } from 'react-router-dom';
import { SessionVariable, getSession } from '../utils/SessionUtils';
import { Box } from '@mui/material';
import { isLogged } from '../utils/LoginUtils';
import Topnav from '../components/molecules/Topnav';
import LoadOrganism from '../components/organisms/LoadOrganism';

const AppClient = () => {
    const [openLoad, setopenLoad] = useState<boolean>(false);

    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        setopenLoad(true);
        const role = getSession(SessionVariable.ROLE);
        if (user.role !== 'client' && role !== 'client') {
            navigate('../');
        } else {
            !isLogged() && navigate('/cliente/login');
            isLogged() && navigate('/cliente/inicio');
        }
        setopenLoad(false);
        return () => { }
    }, [user.isLogged])


    return (
        <>
            <Box
                sx={{
                    width: '100%',
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
                    user.isLogged && <Topnav to='/client/home' />
                }
                <Outlet />
            </Box>
            <LoadOrganism active={openLoad} />
        </>
    )
}

export default AppClient