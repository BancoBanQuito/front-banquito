import { TextField } from '@mui/material';
import * as React from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { saveBankEntity } from './FunctionsBank';
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
    <div>
      <h1>Bienvenido</h1>
      <TextField
        id="internacionalBankCode"
        label=""
        color="primary"
        type="text"
        placeholder="Código Internacional de la Entidad Bancaria"
        variant="standard"
        onChange={(e) => { setcodeBank(e.target.value); } }
      />
      <br></br>
      <TextField
        id="name"
        label=""
        color="primary"
        type="text"
        placeholder="Nombre de la Entidad Bancaria"
        variant="standard"
        onChange={(e) => { setnameBank(e.target.value); } }

      />
    <br></br>
    <SizeButton palette={{ backgroundColor: ColorPalette.BLACK }}
        onClick={() => saveBank()}
        text='Crear'
        style={ButtonStyle.BIG}
    />
    </div>
  );
};
