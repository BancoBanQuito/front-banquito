import * as React from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
export const BankEntity = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <TextFieldAtom 
        id="internacionalBankCode"
        label=""
        color="primary"
        type="text"
        placeholder="Código Internacional de la Entidad Bancaria"
        variant="standard"
      />
      <br></br>
      <TextFieldAtom 
        id="name"
        label=""
        color="primary"
        type="text"
        placeholder="Nombre de la Entidad Bancaria"
        variant="standard"
      />
    <br></br>
    <SizeButton palette={{ backgroundColor: ColorPalette.BLACK }}
        onClick={() => console.log('Crear')}
        text='Crear'
        style={ButtonStyle.BIG}
    />
    </div>
  );
};