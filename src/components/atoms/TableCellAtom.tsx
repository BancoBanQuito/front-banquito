import { TableCell } from '@mui/material';

interface TableCellProps {
  type: 'header' | 'simple',
  children: JSX.Element,
}

const TableCellStyle = (type: string) => ({
  borderBottom: 1.5,
  backgroundColor: `${type === 'header' && '#1D3557'}`,
  color: `${type === 'header' && 'white'}`,
  fontWeight: `${type === 'header' && 'bold'}`
});

const TableCellAtom = ({ type, children }: TableCellProps) => {
  return (
    <TableCell
      align='center'
      sx={TableCellStyle(type)}
    >{children}</TableCell>
  )
}

export default TableCellAtom;
