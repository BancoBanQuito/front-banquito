import React, { useState } from 'react'
import ATMButtonContainerMolecule from './components/molecules/ATMButtonContainerMolecule'
import ATMButtonAtom from './components/atoms/ATMButtonAtom'
import { Code } from '@mui/icons-material'
import { ColorPalette } from './style/ColorPalette'
import ATMHome from './pages/ATMPages/ATMHome'
import ATMReturnHome from './pages/ATMPages/ATMReturnHome'
import AccountAvailableBalance from './pages/ATMPages/Account/AccountAvailableBalance'
import DepositAtm from './pages/ATMPages/Transaction/DepositAtm'
import WithdrawAtm from './pages/ATMPages/Transaction/WithdrawAtm'
import SnackBarMolecule from './components/molecules/SnackBarMolecule'
import Button from '@mui/material/Button/Button'

const Molecules = () => {

    const [open, setopen] = useState(false)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <Button onClick={() => setopen(true)}>Click me</Button>
            <SnackBarMolecule
            severity='warning'
                open={open}
                onClose={() => setopen(false)}
                message={'Sample'}
                title='Info' />
        </div>
    )
}

export default Molecules