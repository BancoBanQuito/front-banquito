import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { SxProps, TextField } from '@mui/material';
import { ColorType } from '../../types/ColorType';

interface Props {
    name: string;
    id?: string;
    label?: string;
    placeholder?: string;
    color?: ColorType;
    rows?: number;
    fullwidth?: boolean;
    required?: boolean;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const TextAreaStyle: SxProps = {
    margin: 1,
}

const TextAreaAtom = (props: Props) => {
    return (
        <TextField
            sx={TextAreaStyle}
            id={props.id}
            name={props.name}
            multiline
            label={props.label}
            rows={props.rows || 1}
            placeholder={props.placeholder}
            color={props.color}
            fullWidth={props.fullwidth}
            variant='outlined'
            required={!!props.required}
            onChange={props.onChange}
            value={props.value}
        >
        </TextField>
    );
}

export default TextAreaAtom;