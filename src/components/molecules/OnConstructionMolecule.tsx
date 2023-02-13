import { Box, Typography } from '@mui/material'
import React from 'react'

const OnConstructionMolecule = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Typography color='secondary' variant='h6'>EN CONSTRUCCION</Typography>
            <Typography variant='body1'>Estamos trabajando para mejorar tu experiencia</Typography>
        </Box>
    )
}

export default OnConstructionMolecule