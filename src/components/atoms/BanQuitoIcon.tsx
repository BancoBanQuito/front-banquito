import React, { ReactComponentElement } from 'react'
import { Icon, IconProps, SvgIcon, SvgIconProps } from "@mui/material";
import BanQuitoLogo from '../../assets/BanQuito-Logo.svg'

const BanQuitoIcon = (props: IconProps) => {
    return (
        <>
            <Icon {...props}>
                <img src={BanQuitoLogo} style={{ height: '100%', display: 'flex' }} />
            </Icon>
        </>
    )
}

export default BanQuitoIcon;