import React from 'react';
import { TextField } from '@mui/material';

interface Props{
    className: string;
    id: string;
    label: string;
    rows: number;
    placeholder: string;
    color: any;
    type: string;
    variant: any;
}

const TextAreaAtom = (props: Props) =>{
    return (
        <TextField
            className='TextAreaAtom'
            id={props.id}
            label={props.label}
            multiline
            rows={4}
            placeholder={props.placeholder}
            variant={props.variant}
            type={props.type}
            color={props.color}>
        </TextField>
    );
}

export default TextAreaAtom;