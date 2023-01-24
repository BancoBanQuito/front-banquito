import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCellAtom from '../atoms/TableCellAtom';

/*
Example of use:

  const headersMock = [
    <Typography>Header 1</Typography>,
    <Typography>Header 2</Typography>,
    <Typography>Header 3</Typography>,
    <Typography>Header 4</Typography>,
  ]

  const rowsMock = [
    [
      <Typography>Cell 1</Typography>,
      <Typography>Cell 2</Typography>,
      <Typography>Cell 3</Typography>,
      <Dropdown label='Cell 4' items={['Cell 1']} width={200} height={50} />
    ],
    [
      <Typography>Cell 5</Typography>,
      <Typography>Cell 6</Typography>,
      <Typography>Cell 7</Typography>,
      <Button variant='contained'>Cell 8</Button>
    ]
  ]

  <TableMolecule headers={headersMock} rows={rowsMock} />

*/

interface TableProps {
  headers: JSX.Element[],
  rows: JSX.Element[][],
  color?: string
}

const TableStyle = {
  borderRadius: '10px'
}

const TableMolecule = ({ headers, rows, color }: TableProps) => {
  return (
    <TableContainer sx={TableStyle}>
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
