import React from 'react'
import { RSSavingsAccountInterest } from '../../services/transaction/dto/RSSavingsAccountInterest'
import { Grid, Box, Typography } from '@mui/material';
import moment from 'moment';
import CardMolecule from '../molecules/CardMolecule';

interface InterestCardOrganismProps {
    interest: RSSavingsAccountInterest;
}

const InterestCardOrganism = (props: InterestCardOrganismProps) => {
    return (
        <>
            <div
                style={{
                    width: '100%',
                    // cursor: !!props.onClick ? 'pointer' : 'auto'
                }}
                /* onClick={props.onClick} */>
                <CardMolecule>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Typography fontSize={'0.9rem'} variant='h6' color='secondary'>${props.interest.value}</Typography>
                                <Typography fontSize={'0.75rem'} variant='body1'>{`${moment(props.interest.executeDate).format('YYYY-MM-DD hh:mm:ss')}`}</Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Typography fontSize={'0.85rem'} variant='h6'>{props.interest.ear}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardMolecule>
            </div>
        </>
    )
}

export default InterestCardOrganism