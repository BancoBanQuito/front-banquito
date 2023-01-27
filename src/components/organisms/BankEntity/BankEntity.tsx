import { TextField } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { saveBankEntity } from './FunctionsBank';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 3rem;
`;
export const Content = styled.div`
  widht= 600px;
  margin-bottom: 2rem;
  `;
export const BankEntity = () => {
  const [nameBank, setnameBank] = React.useState('');
  const [codeBank, setcodeBank] = React.useState('');
  const saveBank = () => { 
    if (codeBank === '' || nameBank === '') {
      alert('Debe llenar todos los campos');
      return;
    }
    saveBankEntity (codeBank, nameBank);
  };
  return (
    <Container>
      <h1>Bienvenido</h1>
      <Content>
      <TextField
        id="internacionalBankCode"
        label=""
        color="primary"
        type="text"
        placeholder="Código Internacional de la Entidad Bancaria"
        variant="standard"
        onChange={(e) => { setcodeBank(e.target.value); } }
        fullWidth
      />
      <TextField
        id="name"
        label=""
        color="primary"
        type="text"
        placeholder="Nombre de la Entidad Bancaria"
        variant="standard"
        onChange={(e) => { setnameBank(e.target.value); } }
        fullWidth

      />
      </Content>
    <br></br>
    <SizeButton palette={{ backgroundColor: ColorPalette.BLACK }}
        onClick={() => saveBank()}
        text='Crear'
        style={ButtonStyle.BIG}
    />
    </Container>
  );
};
