import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import Logo from '../../assets/BanQuito-Logo.svg'
import ATMButtonContainerMolecule from '../../components/molecules/ATMButtonContainerMolecule';
import ATMButtonAtom from '../../components/atoms/ATMButtonAtom';
import { ColorPalette } from '../../style/ColorPalette';
import { AccountBalance, Balance, Money, Savings } from '@mui/icons-material';

const ATMHome: React.FC = () => {
    const handleWithdrawalsClick = () => {
        window.location.href = '/atm/cuenta/retiro';
    };

    const handleDepositsClick = () => {
        window.location.href = '/atm/cuenta/deposito';
    };

    const handleAccountAvailableBalanceClick = () => {
        window.location.href = '/atm/cuenta/saldo';
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh',
                    overflowX: 'hidden'
                }}>
                <Typography sx={welcomeStyles}>Bienvenido</Typography>
                <img src={Logo} alt="ATM Machine" />
                <ATMButtonContainerMolecule position='left'>
                    <ATMButtonAtom
                        icon={<Money />}
                        text={'Retiros'}
                        onClick={handleWithdrawalsClick}
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }} />
                </ATMButtonContainerMolecule>
                <ATMButtonContainerMolecule position='right'>
                    <ATMButtonAtom
                        icon={<AccountBalance />}
                        text={'Depositos'}
                        onClick={handleDepositsClick}
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }} />
                    <ATMButtonAtom
                        icon={<Savings />}
                        text={'Saldo'}
                        onClick={handleAccountAvailableBalanceClick}
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }} />
                </ATMButtonContainerMolecule>
            </div>
        </>
    );
};

export default ATMHome;

const welcomeStyles = () => ({
    marginTop: '100px',
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
});