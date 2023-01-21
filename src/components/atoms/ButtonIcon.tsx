import React from 'react'
import { Avatar, Button } from '@mui/material';

interface Props {
    color: string,
    backgroundColor?: string | 'transparent',
    icon: any,
    disabled?: boolean,
    onClick?: () => void,
    float?: boolean,
    top?: boolean,
    bottom?: boolean,
    left?: boolean,
    right?: boolean,
    size?: number | string
}

const ButtonIcon = (props: Props) => {

    const handleClick = () => {
        props.onClick && props.onClick();
    }

    return (
        <Button
            sx={{
                borderRadius: '100%',
                position: props.float ? 'absolute' : 'relative',
                top: props.top ? 0 : 'auto',
                bottom: props.bottom ? 0 : 'auto',
                left: props.left ? 0 : 'auto',
                right: props.right ? 0 : 'auto',
                width: props.size ? props.size : '60px',
                height: props.size ? props.size : '60px'
            }}
            disabled={!!props.disabled}
            onClick={handleClick}>
            <Avatar sx={{ color: props.color, bgcolor: 'transparent', padding: 0 }}>
                {props.icon}
            </Avatar>
        </Button>
    )
}

export default ButtonIcon
