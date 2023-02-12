import { TextField } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { saveBankEntity } from './FunctionsBank';
import TextFieldAtom from '../../atoms/TextFieldAtom';

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
    saveBankEntity(codeBank, nameBank);
  };
  return (
    <Container>
      <h1>Bienvenido</h1>
      <Content>
        <TextFieldAtom
          id="internacionalBankCode"
          label=""
          color="primary"
          type="text"
          placeholder="Código Internacional de la Entidad Bancaria"
          onChange={(e) => { setcodeBank(e.target.value); }}
          fullWidth
          required
        />
        <TextFieldAtom
          id="name"
          label=""
          color="primary"
          type="text"
          placeholder="Nombre de la Entidad Bancaria"
          required
          onChange={(e) => { setnameBank(e.target.value); }}
          fullWidth

        />
      </Content>
      <SizeButton
        palette={{ backgroundColor: ColorPalette.PRIMARY }}
        onClick={() => saveBank()}
        text='Crear'
        style={ButtonStyle.BIG}
      />
    </Container>
  );
};
