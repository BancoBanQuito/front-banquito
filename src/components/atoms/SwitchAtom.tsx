import { Stack, Switch, Typography, styled } from '@mui/material';
import React from 'react';


interface Props {
    name: string;
    checked: boolean;
    onChange: () => void;
    labelOn: string;
    labelOff: string;
    color: any;
}

const SwitchAtom = (props: Props) => {
    return (
        <Stack direction="row" spacing={0} alignItems="center">
            <Typography>{props.labelOff}</Typography>
            <Switch name={props.name}
                onChange={props.onChange}
                defaultChecked={props.checked}
                color={props.color} />
            <Typography>{props.labelOn}</Typography>
        </Stack>
    );
}

export default SwitchAtom;
