import * as React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import BanQuitoLogo from '../../assets/BanQuito-Logo.svg'

const BanQuitoIcon: React.FC<SvgIconProps> = (props) => (
    <SvgIcon {...props}>
        <BanQuitoLogo />
    </SvgIcon>);

export default BanQuitoIcon;