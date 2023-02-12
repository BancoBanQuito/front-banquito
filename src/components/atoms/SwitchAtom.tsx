import { Stack, Switch, Typography, styled } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { ColorType } from '../../types/ColorType';


interface Props {
    name: string;
    labelOn: string;
    labelOff: string;
    color?: ColorType;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const SwitchAtom = (props: Props) => {

    const [checked, setchecked] = useState(!!props.checked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setchecked(checked);
        props.onChange && props.onChange(checked);
    }

    return (
        <Stack direction="row" spacing={0} alignItems="center">
            {
                checked && <Typography>{props.labelOff}</Typography>
            }
            <Switch name={props.name}
                onChange={handleChange}
                defaultChecked={checked}
                color={props.color} />
            {
                !checked && <Typography>{props.labelOn}</Typography>
            }
        </Stack>
    );
}

export default SwitchAtom;
