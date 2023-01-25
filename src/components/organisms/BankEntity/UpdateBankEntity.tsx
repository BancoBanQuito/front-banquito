import * as React from 'react';
import { SetMeal } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { Container, Content } from './BankEntity';
import { getBankEntity, updateBankEntity } from './FunctionsBank';
import { SizeButton } from 'src/components/atoms/SizeButton';
import { ButtonStyle } from 'src/style/ButtonStyle';
import { ColorPalette } from 'src/style/ColorPalette';
export const UpdateBankEntity = () => {
  const [nameBank, setnameBank] = React.useState('');
  const [codeBank, setcodeBank] = React.useState('');
  const updateBank = () => {
    updateBankEntity(codeBank, nameBank);
  };
  const getBank = async () => {
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
    <Container>
      <h1>INFORMACION DEL {nameBank}</h1>
      <Content>
        <TextField
          id="internacionalBankCode"
          label=""
          color="secondary"
          type="text"
          placeholder="Código Internacional de la Entidad Bancaria"
          variant="standard"
          onChange={(e) => { setcodeBank(e.target.value); }}
          value={codeBank}
          fullWidth
        />
        <TextField
          id="name"
          label=""
          color="secondary"
          type="text"
          placeholder="Nombre de la Entidad Bancaria"
          variant="standard"
          onChange={(e) => { setnameBank(e.target.value); }}
          value={nameBank}
          fullWidth
        />
      </Content>
      <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
        onClick={() => updateBank()}
        text='Actualizar'
        style={ButtonStyle.BIG}
      />
    </Container>
  );
};
