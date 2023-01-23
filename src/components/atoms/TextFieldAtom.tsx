import React from 'react';
import { TextField } from '@mui/material';

interface Props{
    id: string;
    label: string;
    color: any;
    type: string;
    placeholder: string;
    variant: any;
    action: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const TextFieldAtom = (props: Props) =>{
    return (
        <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            placeholder={props.placeholder}
            variant={props.variant}
            color={props.color}
            onChange={props.action}
            value={props.value}
            >
        </TextField>

    );
}


export default TextFieldAtom;