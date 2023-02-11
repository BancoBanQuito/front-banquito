import React from 'react'
import ATMButtonContainerMolecule from './components/molecules/ATMButtonContainerMolecule'
import ATMButtonAtom from './components/atoms/ATMButtonAtom'
import { Code } from '@mui/icons-material'
import { ColorPalette } from './style/ColorPalette'

const Molecules = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <ATMButtonContainerMolecule position='right'>
                <ATMButtonAtom
                    icon={<Code />}
                    text={'Sample'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
                <ATMButtonAtom
                    icon={<Code />}
                    text={'Sample'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </ATMButtonContainerMolecule>
            <ATMButtonContainerMolecule position='left'>
                <ATMButtonAtom
                    icon={<Code />}
                    text={'Sample'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
                <ATMButtonAtom
                    icon={<Code />}
                    text={'Sample'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY,
                    }} />
            </ATMButtonContainerMolecule>
        </div>
    )
}

export default Molecules