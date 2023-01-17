import React from 'react'
import { IconButton, styled } from '@mui/material';

interface Props {
    color: string,
    icon: any,
    onClick: () => void,
    size?: number | string
}

const CustomButton = styled(IconButton)`
&{
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