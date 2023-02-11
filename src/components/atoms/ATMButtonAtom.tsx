import { Cancel } from '@mui/icons-material'
import React from 'react'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { SizeButton } from './SizeButton'

interface ATMButtonAtomProps {
    icon: any;
    text: string;
    palette: {
        backgroundColor: string;
        accent?: string;
    };
    onClick?: () => void;
    submit?: boolean;
}

const buttonATMSize = {
    height: 75,
    width: 200
}

const ATMButtonAtom = (props: ATMButtonAtomProps) => {
    return (
        <div
            style={{ margin: '1rem 0' }}>
            <SizeButton
                submit={props.submit}
                text={props.text}
                icon={props.icon}
                style={ButtonStyle.BIG}
                size={buttonATMSize}
                onClick={props.onClick}
                palette={props.palette} />
        </div>
    )
}

export default ATMButtonAtom