import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCellAtom from '../atoms/TableCellAtom';

/*
Example of use:

  const headersMock = [
    'header 1',
    'header 2',
    'header 3',
    'header 4'
  ]

  const rowsMock = [
    [
      'row 1',
      'row 2',
      'row 3',
      'row 4'
    ],
    [
      'row 5',
      'row 6',
      'row 7',
      'row 8'
    ]
  ]

  <TableMolecule headers={headersMock} rows={rowsMock} />

*/

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
