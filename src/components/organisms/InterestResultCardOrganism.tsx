import React from 'react'
import { RSInvestmentInterest } from '../../services/transaction/dto/RSInvestmentInterest'
import { Box, Grid, Typography } from '@mui/material'

interface InterestResultCardOrganismProps {
    interest?: RSInvestmentInterest
}

const InterestResultCardOrganism = (props: InterestResultCardOrganismProps) => {
    return (

        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Typography variant="h6" color='secondary' fontSize='0.85rem'>Net Interest:</Typography>
                <Typography variant="body1" fontSize='0.85rem'>{` ${props.interest?.netInterest}`}</Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Typography variant="h6" color='secondary' fontSize='0.85rem'>Raw Interest:</Typography>
                <Typography variant="body1" fontSize='0.85rem'>{` ${props.interest?.rawInterest}`}</Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Typography variant="h6" color='secondary' fontSize='0.85rem'>Retención:</Typography>
                <Typography variant="body1" fontSize='0.85rem'>{` ${props.interest?.retention}`}</Typography>
            </div>
        </Box >
    )
}

export default InterestResultCardOrganism