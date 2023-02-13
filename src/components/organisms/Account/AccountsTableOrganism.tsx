import React from 'react'
import TableMolecule from '../../molecules/TableMolecule';
import { Typography } from '@mui/material';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { ColorPalette } from '../../../style/ColorPalette';

interface AccountsTableOrganismProps {
  accounts: RSAccount[];
}

const headerMock = [
  <Typography>Cuenta</Typography>,
  <Typography>Saldo Disponible</Typography>,
  <Typography>Saldo Presente</Typography>
]

const AccountsTableOrganism = (props: AccountsTableOrganismProps) => {

  const getRows = (data: RSAccount) => {
    return [
      <Typography>{data.codeLocalAccount}</Typography>,
      <Typography>${data.availableBalance}</Typography>,
      <Typography>${data.presentBalance}</Typography>,
    ]
  }

  return (
    <TableMolecule
      headers={headerMock}
      rows={props.accounts.map(getRows)}
      color={ColorPalette.SECONDARY} />
  )
}

export default AccountsTableOrganism;