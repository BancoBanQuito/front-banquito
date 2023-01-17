import React from 'react'
import { IconButton, styled } from '@mui/material';

interface Props {
    color: string,
    icon: any,
    onClick: () => void,
    float?: boolean,
    top?: boolean,
    bottom?: boolean,
    left?: boolean,
    right?: boolean,
    size?: number | string
}

const CustomButton = styled(IconButton)`
&{
    padding: 0.5rem;
    margin: 0.5rem;
}
&.float{
    padding: 0.5rem;
}
& > svg{
    width: 100%;
    height: 100%;
}
`;

const ButtonIcon = (props: Props) => {

    return (
        <>
            <CustomButton
                sx={{
                    position: props.float ? 'absolute' : 'relative',
                    top: props.top ? 0 : 'auto',
                    bottom: props.bottom ? 0 : 'auto',
                    left: props.left ? 0 : 'auto',
                    right: props.right ? 0 : 'auto',
                    color: props.color,
                    width: props.size ? props.size : '50px',
                    height: props.size ? props.size : '50px',
                }}>
                {props.icon}
            </CustomButton>
        </>
    )
}

export default ButtonIcon