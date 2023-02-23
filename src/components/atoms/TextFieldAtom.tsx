import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { SxProps, TextField } from '@mui/material';
import { ColorType } from '../../types/ColorType';

interface Props {
    type: HTMLInputTypeAttribute;
    name?: string;
    id?: string;
    label?: string;
    color?: ColorType;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    disable?: boolean;
    fullWidth?: boolean;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    step?: string | number;
}

const TextFieldStyle: SxProps = {
    borderRadius: 5,
    margin: 1,
}

const TextFieldAtom = (props: Props) => {
    return (
        <TextField
            sx={TextFieldStyle}
            type={props.type}
            name={props.name}
            id={props.id || ""}
            label={props.label}
            placeholder={props.placeholder || ""}
            color={props.color}
            onChange={props.onChange}
            value={props.value}
            disabled={!!props.disable}
            fullWidth={!!props.fullWidth}
            required={props.required}
            error={props.error}
            helperText={props.helperText}
            variant='outlined'
            size='small'
            inputProps={{
                step: props.step
            }}
        />

    );
}


export default TextFieldAtom;