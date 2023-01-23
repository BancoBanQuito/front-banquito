import * as React from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
export const UpdateBankEntity = () => {
  const [nameBank, setnameBank] = React.useState('BANCO BANQUITO');
    return (
    <div>
        <h1>INFORMACION DEL {nameBank}</h1>
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
    <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
        onClick={() => console.log('Actualizar')}
        text='Actualizar'
        style={ButtonStyle.BIG}
    />
    </div>
  );
};