import React from 'react';
import { TextField } from '@mui/material';

interface Props{
    id: string;
    label: string;
    color: any;
    type: string;
    value: string;
    variant: any;
}

const ConfirmTextFieldAtom = (props: Props) =>{
    return (
        <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            value={props.value}
            variant={props.variant}
            color={props.color}>
            
        </TextField>

    );
}


export default ConfirmTextFieldAtom;