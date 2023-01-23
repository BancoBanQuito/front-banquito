import React from 'react'

interface StripeAtomProps {
    x: number | string,
    y: number | string,
    color: string,
    width?: number | string,
    height?: number | string,
    angle?: number | string,
}

const StripeAtom = (props: StripeAtomProps) => {
    return (
        <div style={{
            width: props.width ? props.width : '1000px',
            height: props.height ? props.height : '1000px',
            left: props.x,
            bottom: props.y,
            backgroundColor: props.color,
            transform: `rotate(${props.angle || '0'}deg)`,
            zIndex: -1,
            position: 'absolute'
        }} />
    )
}

export default StripeAtom