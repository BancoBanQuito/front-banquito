import React from 'react';
import { TextField } from '@mui/material';

interface Props{
    id: string;
    label: string;
    multiline: boolean;
    rows: number;
    placeholder: string;
    variant: any;
}

const TextAreaAtom = (props: Props) =>{
    return (
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          placeholder="Default Value"
          variant="standard"
        />
    );
}

export default TextAreaAtom;