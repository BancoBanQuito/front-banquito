import { AlertColor } from '@mui/lab';
import { Alert, Snackbar, SnackbarOrigin, Typography } from '@mui/material';
import Fade from '@mui/material/Fade/Fade';
import React, { useEffect, useState } from 'react'

interface SnackBarMoleculeProps {
    open: boolean;
    message: string;
    title?: string;
    onClose: () => void;
    anchor?: SnackbarOrigin;
    severity?: AlertColor;
    autoHideDuration?: number;
}

const SnackBarMolecule = (props: SnackBarMoleculeProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onClose();
    }

    return (
        <Snackbar
            anchorOrigin={props.anchor}
            TransitionComponent={Fade}
            open={props.open}
            autoHideDuration={props.autoHideDuration || 1000}
            onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={props.severity}
                sx={{ width: '100%', }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    {!!props.title && <><Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{props.title}</Typography><div style={{ width: '5px' }} ></div></>}
                    <Typography variant='body1'>{props.message}</Typography>
                </div>
            </Alert>
        </Snackbar>
    )
}

export default SnackBarMolecule