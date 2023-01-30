import { AccountBalance, Build } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { ColorPalette } from '../../style/ColorPalette'
import { useNavigate } from 'react-router-dom'
import LoadSpinner from '../../components/atoms/LoadSpinner'

const ATMReturnHome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            navigate('/atm');
        }, 3000)
        return () => {
            clearInterval(interval);
        }
    }, [])


    return (
        <>
            <Box sx={{
                width: '100%',
                height: '95vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
                <div style={{ width: 500, color: ColorPalette.SECONDARY, textAlign: 'center' }}>
                    <Typography component='h5' variant='h5'>Estamos volviendo a la pantalla de incio...</Typography>
                </div>
                <LoadSpinner />
                <AccountBalance sx={{ height: '250px', width: '250px', position: 'absolute', bottom: '0px', right: '0px', color: ColorPalette.SECONDARY }} />
            </Box>
        </>
    )
}

export default ATMReturnHome;