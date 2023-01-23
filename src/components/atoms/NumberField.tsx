import React from 'react';
// material number field
import TextField from '@mui/material/TextField';


interface NumberFieldProps {
    label: string;
    value: number;
    action: (value: any) => void;
    type?: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium';
    variant?: 'standard' | 'filled' | 'outlined';
}

export const NumberField: React.FC<NumberFieldProps> = ({ label, value, action,
    type = 'number',
    color = 'primary',
    size = 'small',
    variant = 'outlined',
},) => {
    return (
        <TextField
            label={label}
            value={value===0?'':value}
            onChange={(e) => {
                action(e.target.value);
            }}
            type={type}
            color={color}
            size={size}
            variant={variant}
        />
    );
};






