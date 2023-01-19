import { Switch, Typography } from '@mui/material';
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
        <>
            <Typography>{props.labelOff}</Typography>
            <Switch name={props.name}
                onChange={props.onChange}
                defaultChecked={props.checked}
                color={props.color} />
            <Typography>{props.labelOn}</Typography>
        </>

    );
}


export default SwitchAtom;
