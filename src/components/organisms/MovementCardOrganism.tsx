import React from 'react'
import { RSTransaction } from '../../services/transaction/dto/RSTransaction'
import CardMolecule from '../molecules/CardMolecule'
import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'

interface MovementCardOrganismProps {
  transaction: RSTransaction,
  onClick?: () => void;
}

const MovementCardOrganism = (props: MovementCardOrganismProps) => {
  return (
    <>
      <div
        style={{
          width: '100%',
          cursor: !!props.onClick ? 'pointer' : 'auto'
        }}
        onClick={props.onClick}>
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
                <Typography fontSize={'0.9rem'} variant='h6' color='secondary'>{props.transaction.movement}</Typography>
                <Typography fontSize={'0.75rem'} variant='body1'>{`${moment(props.transaction.executeDate).format('YYYY-MM-DD hh:mm:ss')}`}</Typography>
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
                <Typography fontSize={'0.85rem'} variant='h6'>${props.transaction.value}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardMolecule>
      </div>
    </>
  )
}

export default MovementCardOrganism