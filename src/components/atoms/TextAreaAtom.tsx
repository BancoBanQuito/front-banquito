import React, { HTMLInputTypeAttribute } from 'react';
import { SxProps, TextField } from '@mui/material';
import { ColorType } from '../../types/ColorType';

interface Props {
    name: string;
    id?: string;
    label?: string;
    placeholder?: string;
    color?: ColorType;
    rows?: number;
}

const TextAreaStyle: SxProps = {
    margin: 1,
}

const TextAreaAtom = (props: Props) => {
    return (
        <TextField
            sx={TextAreaStyle}
            id={props.id}
            multiline
            label={props.label}
            rows={props.rows || 1}
            placeholder={props.placeholder}
            color={props.color}
            variant='outlined'
        >
        </TextField>
    );
}

export default TextAreaAtom;