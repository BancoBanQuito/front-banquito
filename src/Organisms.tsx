import React from 'react'
import CreateUser from './components/organisms/Login/CreateUser'
import LoginForm from './components/organisms/Login/LoginForm'
import TransferAmountForm from './components/organisms/Transaction/TransferAmountForm'
import TransferBankForm from './components/organisms/Transaction/TransferBankForm'
import TransferDataForm from './components/organisms/Transaction/TransferDataForm'
import TransferUserForm from './components/organisms/Transaction/TransferUserForm'
import AtmLoginForm from './components/organisms/AtmLoginForm'
import FormClientData from './components/organisms/FormClientData'


const Organisms = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <FormClientData />
        </div>
    )
}

export default Organisms