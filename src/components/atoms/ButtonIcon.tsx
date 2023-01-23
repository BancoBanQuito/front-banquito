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
                position: props.float ? 'fixed' : 'relative',
                top: props.float && props.top ? 5 : 'auto',
                bottom: props.float && props.bottom ? 5 : 'auto',
                left: props.float && props.left ? 5 : 'auto',
                right: props.float && props.right ? 5 : 'auto',
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
