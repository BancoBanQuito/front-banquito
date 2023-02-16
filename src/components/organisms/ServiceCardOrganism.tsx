import React from 'react'
import CardMolecule from '../molecules/CardMolecule'
import { Box, Grid, Typography } from '@mui/material'
import { AssociatedServiceRSRQ } from '../../services/product/dto/AssociatedServiceRSRQ'
import { SizeButton } from '../atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'

interface ServiceCardOrganismProps {
    service: AssociatedServiceRSRQ;
    onClick?: (item: AssociatedServiceRSRQ) => void;
}

const ServiceCardOrganism = (props: ServiceCardOrganismProps) => {

    const handleClick = () => {
        props.onClick?.(props.service);
    }

    return (
        <CardMolecule
            maxWidth={300}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Grid container spacing={5}>
                    <Grid item sm={6}>
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                            <Typography fontSize='0.9rem' variant='h6' color='secondary'>{props.service.name}</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={6}>
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                            <Typography fontSize='0.75rem' variant='body1' alignSelf='flex-end'>${props.service.fee}</Typography>
                        </div>
                    </Grid>
                </Grid>
                <hr style={{ width: '100%' }} />
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <SizeButton
                        text={'Solicitar'}
                        style={ButtonStyle.MEDIUM}
                        onClick={handleClick}
                        palette={{
                            backgroundColor: ColorPalette.SECONDARY
                        }} />
                </div>
            </Box>
        </CardMolecule>
    )
}

export default ServiceCardOrganism