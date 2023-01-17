import { TableCell } from '@mui/material';

interface TableCellProps {
  type: 'header' | 'simple',
  text: string,
}

const TableCellStyle = (type: string) => ({
  borderBottom: 1.5,
  backgroundColor: `${type === 'header' && '#1D3557'}`,
  color: `${type === 'header' && 'white'}`,
  fontWeight: `${type === 'header' && 'bold'}`
});

const TableCellAtom = ({ type, text }: TableCellProps) => {
  return (
    <TableCell
      align='center'
      sx={TableCellStyle(type)}
    >{text}</TableCell>
  )
}

export default TableCellAtom;
