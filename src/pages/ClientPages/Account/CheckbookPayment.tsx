import React from 'react';
import { Typography } from '@mui/material';
import { SizeButton } from '@/components/atoms/SizeButton';
import TableMolecule from '@/components/molecules/TableMolecule';
import { ButtonStyle } from '@/style/ButtonStyle';
import { ColorPalette } from '@/style/ColorPalette';

const headersMock = [
  <Typography>Fecha</Typography>,
  <Typography>Movimiento</Typography>,
  <Typography>Concepto</Typography>,
  <Typography>Monto</Typography>,
  <Typography>Saldo</Typography>,
  <Typography>Beneficiario</Typography>,
  <Typography>Detalle</Typography>
]

const rowsMock = [
  [
    <Typography>Cell 1</Typography>,
    <Typography>Cell 2</Typography>,
    <Typography>Cell 3</Typography>,
    <Typography>Cell 4</Typography>,
    <Typography>Cell 5</Typography>,
    <Typography>Cell 6</Typography>,
    <SizeButton
      palette={{
        backgroundColor: ColorPalette.SECONDARY
      }}
      size={{
        height: 'auto',
        width: '100%'
      }}
      style={ButtonStyle.SMALL}
      submit
      text={"Ver"} />
    //<Dropdown label='Cell 4' items={['Cell 1']} width={200} height={50} />
  ],
  [
    <Typography>Cell 8</Typography>,
    <Typography>Cell 9</Typography>,
    <Typography>Cell 10</Typography>,
    <Typography>Cell 11</Typography>,
    <Typography>Cell 12</Typography>,
    <Typography>Cell 13</Typography>,
    <SizeButton
      palette={{
        backgroundColor: ColorPalette.SECONDARY
      }}
      size={{
        height: 'auto',
        width: '100%'
      }}
      style={ButtonStyle.SMALL}
      submit
      text={"Ver"} />
  ]
]

const PaymentCheckbook = () => {
  return (
    <>
      <Typography variant='h4' align='center'>Pago Chequera</Typography>
      <br></br>
      <TableMolecule headers={headersMock} rows={rowsMock} />
    </>
  );

};

export default PaymentCheckbook;
