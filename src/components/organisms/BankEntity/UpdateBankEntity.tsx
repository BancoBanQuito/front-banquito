import * as React from 'react';
import { getBankEntity, updateBankEntity } from './FunctionsBank';
import { Box, Container, TextField } from '@mui/material';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { Content } from './BankEntity';
import { Spinner } from '../../atoms/Spinner';
import TextFieldAtom from '../../atoms/TextFieldAtom';


export const UpdateBankEntity = () => {
  const [activateSpinner, setActivateSpinner] = React.useState(false);
  const [nameBank, setnameBank] = React.useState('');
  const [codeBank, setcodeBank] = React.useState('');
  const updateBank = () => {
    updateBankEntity(codeBank, nameBank);
  };
  const getBank = async () => {
    setActivateSpinner(true);
    let listBank = await getBankEntity();
    setBank(listBank[0]);
    setnameBank(listBank[0].name);
    setcodeBank(listBank[0].internationalBankCode);
    setActivateSpinner(false);
  };
  React.useEffect(() => {
    getBank();
  }, []);
  const [bank, setBank] = React.useState<any>(null);

  return (
    <Container
      sx={{
        width: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',

      }}>
      {activateSpinner ? <Spinner /> : null}
      <h1>INFORMACION DEL {nameBank}</h1>
      <Box
        component='form'
        onSubmit={updateBank}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60%',
          
        }}>
        <TextFieldAtom
          id="internacionalBankCode"
          label=""
          color="secondary"
          type="text"
          placeholder="Código Internacional de la Entidad Bancaria"
          onChange={(e) => { setcodeBank(e.target.value); }}
          value={codeBank}
          required
          fullWidth
        />
        <TextFieldAtom
          id="name"
          label=""
          color="secondary"
          type="text"
          placeholder="Nombre de la Entidad Bancaria"
          onChange={(e) => { setnameBank(e.target.value); }}
          value={nameBank}
          required
          fullWidth
        />
      </Box>
      <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
        submit
        // onClick={() =>updateBank() }
        text='Actualizar'
        style={ButtonStyle.BIG}
      />
    </Container>
  );
};
