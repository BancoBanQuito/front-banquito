import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import Logo from '../../assets/BanQuito-Logo.svg'

const ATMHomePage: React.FC = () => {
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
        <div style={{ backgroundColor: 'gray', width: '100vw', height: '100vh', marginLeft: '-20px', marginBottom: '-20px' }}>
            <Container sx={atmContainerStyles}>
                <Container sx={optionsContainerStyles}>
                    <Button sx={optionStyles} onClick={handleWithdrawalsClick}>Retiros</Button>
                    <Container>
                        <Typography sx={welcomeStyles}>Bienvenido</Typography>
                        <img src={Logo} alt="ATM Machine" />
                    </Container>
                    <div style={{flexDirection: 'column'}}>
                        <Button sx={optionStyles} onClick={handleDepositsClick}>Depósitos</Button>
                        <Button sx={optionStyles} onClick={handleAccountAvailableBalanceClick}>Saldo</Button>
                    </div>
                </Container>
                <Container sx={imageContainerStyles}>
                    <Typography sx={atmStyles}>ATM</Typography>
                    <img src={Logo} alt="ATM Machine" style={{ marginLeft: '70px' }} />
                    <Container sx={cardSlotStyles}></Container>
                </Container>
            </Container>
            <Container sx={receiveMoneyContainerStyles}>
                <Container sx={receiveMoneyStyles}></Container>
            </Container>
        </div>
    );
};

export default ATMHomePage;

const atmContainerStyles = () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '90vh',
    width: '100vw',
});

const optionsContainerStyles = () => ({
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    width: '75%',
    backgroundColor: '#1D3557',
    height: '75%',
    textAlign: 'center',
    border: "5px solid black",
    boxShadow: "0 0 0 5px lightgray, -10px -10px 20px 20px black",
    borderRadius: "10px",
});

const optionStyles = () => ({
    backgroundColor: 'lightblue',
    width: '200px',
    height: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '100px',
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderRight: '25px solid green',
    color: '#1D3557',
    ':hover': {
        background: 'white',
    }
});

const imageContainerStyles = () => ({
    width: '200px',
    height: '200px',
    textAlign: 'center',
});

const welcomeStyles = () => ({
    marginTop: '100px',
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
});

const atmStyles = () => ({
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '70px'
});

const receiveMoneyContainerStyles = () => ({
    width: '300px',
    height: '50px',
    border: '1px solid #333',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px #999',
    marginTop: '-50px',
    marginRight: '750px',
    backgroundColor: 'black',
});

const receiveMoneyStyles = () => ({
    width: '80%',
    height: '60%',
    background: 'linear-gradient(black, #bbb)',
    borderRadius: '10px',
    margin: '5% auto',
    lineHeight: '60px',
});

const cardSlotStyles = () => ({
    width: '250px',
    height: '10px',
    backgroundColor: 'black',
    border: '1px solid black',
    borderRadius: '10px 10px 0 0',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.2)',
    marginTop: '50px'
});
