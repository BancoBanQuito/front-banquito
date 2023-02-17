import { Card, CardContent } from '@mui/material'
import React, { ReactNode } from 'react'

interface CardMoleculeProps {
    children: ReactNode,
    width?: number | string,
    maxWidth?: number | string,
    height?: number | string;
}

const CardMolecule = (props: CardMoleculeProps) => {
    return (
        <Card
            sx={{
                width: props.width || '100%',
                height: props.height || 'auto',
                background: 'white',
                maxWidth: props.maxWidth,
                margin: '0.5rem 1rem'
            }}
            variant='outlined'>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}>
                {props.children}
            </CardContent>
        </Card>
    )
}

export default CardMolecule