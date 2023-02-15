import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCellAtom from '../atoms/TableCellAtom'

interface TableProps {
  headers: JSX.Element[],
  rows: JSX.Element[][],
  color?: string
}

const TableMolecule = ({ headers, rows, color }: TableProps) => {
  return (
    <TableContainer sx={{
      borderRadius: '10px',
      width: '100%'
    }}>
      <Table >
        <TableHead>
          <TableRow>
            {headers.map((component, index) => (
              <TableCellAtom
                key={index}
                children={component}
                type="header"
                color={color}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((component, index) => (
                <TableCellAtom
                  key={index}
                  children={component}
                  type="simple"
                  color={color}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableMolecule;
