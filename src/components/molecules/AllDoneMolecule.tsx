import { Check } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { ColorPalette } from '../../style/ColorPalette'

interface AllDoneMoleculeProps {
    message: string
}

const AllDoneMolecule = (props: AllDoneMoleculeProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div
                style={{
                    padding: '1rem',
                    border: '3px solid',
                    borderRadius: '100%',
                    borderColor: ColorPalette.SECONDARY,
                    margin: '1rem'
                }}>
                <Check sx={{ fontSize: '5rem' }} color='secondary' />
            </div>
            <Typography variant='h6' color='secondary'>{props.message}</Typography>
        </Box>

    )
}

export default AllDoneMolecule