import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCellAtom from '../atoms/TableCellAtom';


interface TableProps {
  headers: string[],
  rows: string[][],
}

const TableStyle = {
  borderRadius: '10px'
}

const TableMolecule = ({ headers, rows }: TableProps) => {
  return (
    <TableContainer sx={TableStyle}>
      <Table >
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCellAtom
                key={index}
                text={header}
                type="header"
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((data, index) => (
                <TableCellAtom
                  key={index}
                  text={data}
                  type="simple"
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
