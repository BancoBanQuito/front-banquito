import React from 'react'
import ATMButtonContainerMolecule from './components/molecules/ATMButtonContainerMolecule'
import ATMButtonAtom from './components/atoms/ATMButtonAtom'
import { Code } from '@mui/icons-material'
import { ColorPalette } from './style/ColorPalette'
import ATMHome from './pages/ATMPages/ATMHome'
import ATMReturnHome from './pages/ATMPages/ATMReturnHome'
import AccountAvailableBalance from './pages/ATMPages/Account/AccountAvailableBalance'
import DepositAtm from './pages/ATMPages/Transaction/DepositAtm'
import WithdrawAtm from './pages/ATMPages/Transaction/WithdrawAtm'

const Molecules = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <WithdrawAtm />
        </div>
    )
}

export default Molecules