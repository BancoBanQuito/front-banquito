import { Fade, Typography } from '@mui/material'
import React from 'react'
import LoadSpinner from '../atoms/LoadSpinner'

interface LoaderProps {
    loadText?: string,
    color?: string
}

const Loader = (props: LoaderProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ margin: 5 }}>
                <LoadSpinner color={props.color} />
            </div>
            <div style={{ margin: 5, fontStyle: 'italic', color: props.color || "#000" }}>
                <Typography variant='body1'>
                    {props.loadText || 'Cargando'}
                </Typography>
            </div>
        </div>
    )
}

export default Loader