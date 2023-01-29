import React from 'react';
import { TextField } from '@mui/material';

interface Props {
    id: string;
    name?: string
    label: string;
    color: any;
    type: string;
    variant: any;
    placeholder?: string;
    action?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    disable?: boolean;
    fullWidth?: boolean;
}

const TextFieldAtom = (props: Props) => {
    return (
        <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            name={props.name || ""}
            placeholder={props.placeholder || ""}
            variant={props.variant}
            color={props.color}
            onChange={props.action}
            value={props.value}
            disabled={!!props.disable}
            fullWidth={!!props.fullWidth}
        >
        </TextField>

    );
}


export default TextFieldAtom;