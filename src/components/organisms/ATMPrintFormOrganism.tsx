import { Close, Print, ChevronRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { FormEvent, MutableRefObject, ReactInstance, useState } from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import ATMButtonAtom from '../atoms/ATMButtonAtom';
import ATMButtonContainerMolecule from '../molecules/ATMButtonContainerMolecule';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

interface ATMPrintOrganismProps {
  type: 'deposit' | 'withdraw' | 'info';
  printRef: MutableRefObject<undefined>;
  fileValue: number;
  onAccept?: () => void;
  onReject?: () => void;
}

const ATMPrintOrganism = (props: ATMPrintOrganismProps) => {

  const [printed, setprinted] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onAccept?.();
  }

  const handlePrint = useReactToPrint({
    content: () => props.printRef.current as unknown as ReactInstance | null
  });

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Typography variant='h5' color='secondary' mb={4}>{`Se imprimira tu comprobante de ${props.type === 'deposit' ? 'Deposito' : 'Retiro'}`}</Typography>
      <Typography variant='body1' mb={4}>{`Esta accion tiene un valor de $${(Math.round(100 * props.fileValue) / 100).toFixed(2)}`}</Typography>
      <Typography variant='body1' mb={4}>{`Esta seguro/a?`}</Typography>
      <ATMButtonContainerMolecule
        position={'right'}>
        <ATMButtonAtom
          icon={<Close />}
          text={'Cancelar'}
          onClick={props.onReject}
          palette={{
            backgroundColor: ColorPalette.SECONDARY
          }} />
        <ATMButtonAtom
          icon={<ChevronRight />}
          text={'Aceptar'}
          onClick={() => {
            handlePrint();
            props.onAccept?.();
          }}
          palette={{
            backgroundColor: ColorPalette.PRIMARY
          }} />
      </ATMButtonContainerMolecule>
    </Box>
  )
}

export default ATMPrintOrganism