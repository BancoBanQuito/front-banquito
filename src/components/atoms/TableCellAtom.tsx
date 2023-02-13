import { TableCell } from '@mui/material';

interface TableCellProps {
  type: 'header' | 'simple',
  children: JSX.Element,
  color?: string
}

const TableCellStyle = (type: string, color: string) => ({
  borderBottom: 1.5,
  backgroundColor: type === 'header' ? color : 'white',
  color: type === 'header' ? 'white' : color,
  fontWeight: `${type === 'header' && 'bold'}`
});

const TableCellAtom = ({ type, children, color }: TableCellProps) => {
  return (
    <TableCell
      align='center'
      sx={TableCellStyle(type, color ? color : '#1D3557')}
      size='small'
    >{children}</TableCell>
  )
}

export default TableCellAtom;
