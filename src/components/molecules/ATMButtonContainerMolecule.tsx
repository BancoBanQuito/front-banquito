import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import ATMButtonAtom from '../atoms/ATMButtonAtom';

interface ATMButtonContainerMoleculeProps {
    position: 'right' | 'left';
    children: ReactNode;
}

const ATMButtonContainerMolecule = (props: ATMButtonContainerMoleculeProps) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            right: props.position === 'right' ? -30 : 'auto',
            left: props.position === 'left' ? -30 : 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            {props.children}
        </div>
    )
}

export default ATMButtonContainerMolecule