import React from 'react'
import CardMolecule from '../molecules/CardMolecule'
import { ProductRS } from '../../services/product/dto/ProductRS'
import { Box, Typography } from '@mui/material'

interface ApplicationCardOrganismProps {
    product: {
        id: string,
        name: string
    };
    onClick?: () => void;
}

const ApplicationCardOrganism = (props: ApplicationCardOrganismProps) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            cursor: !!props.onClick ? 'pointer' : 'auto'
        }}
            onClick={props.onClick}>
            <CardMolecule
                width='100%'
                height='100%'>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Typography
                        variant='h6'
                        fontSize={'0.9rem'}
                        align='center'
                        color='secondary' textTransform='uppercase'>{props.product.name}</Typography>
                </Box>
            </CardMolecule>
        </div>
    )
}

export default ApplicationCardOrganism