import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ClockMolecule = () => {

    const [date, setdate] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return () => { clearInterval(timerId); }
    }, [])


    const refreshClock = () => {
        setdate(new Date());
    }

    return (
        <Grid container spacing={1}>
            <Grid item sm={6} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography fontSize={'3rem'} variant='h6' color='secondary'>
                    {date.getHours()}
                </Typography>
            </Grid>
            <Grid item sm={6} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Typography fontSize={'1rem'} variant='h6' alignSelf='flex-start'>
                    {date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`}:{date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`}
                </Typography>

                <Typography fontSize={'0.75rem'} variant='body1' alignSelf='flex-start'>
                    {date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}/{date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`}/{date.getFullYear()}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ClockMolecule