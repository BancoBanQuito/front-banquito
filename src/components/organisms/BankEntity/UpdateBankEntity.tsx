import { SetMeal } from '@mui/icons-material';
import { TextField } from '@mui/material';
import * as React from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { getBankEntity, updateBankEntity } from './FunctionsBank';
export const UpdateBankEntity = () => {
  const [nameBank, setnameBank] = React.useState('');
  const [codeBank, setcodeBank] = React.useState('');
  const updateBank = () => { 
    updateBankEntity (codeBank, nameBank);
  };
  const getBank = async() => {
    let listBank = await getBankEntity();
    console.log(listBank);
    setBank(listBank[0]);
    setnameBank(listBank[0].name);
    setcodeBank(listBank[0].internationalBankCode);
  };
  React.useEffect(() => {
    getBank();
  }, []);
  const [bank, setBank] = React.useState<any>(null);

    return (
    <div>
        <h1>INFORMACION DEL {nameBank}</h1>
      <TextField
        id="internacionalBankCode"
        label=""
        color="primary"
        type="text"
        placeholder="Código Internacional de la Entidad Bancaria"
        variant="standard"
        onChange={(e) => { setcodeBank(e.target.value); } }
        value={codeBank}
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
        value={nameBank}
      />
    <br></br>
    <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
        onClick={() => updateBank()}
        text='Actualizar'
        style={ButtonStyle.BIG}
    />
    </div>
  );
};
