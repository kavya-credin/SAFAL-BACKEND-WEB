
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// eslint-disable-next-line
const TableComponent = ({ rows, headers }) => {
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#b9d8f7',
            color: "#061e35"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow >
                        {/* eslint-disable-next-line */}
                        {headers.map((header) => (
                            <StyledTableCell align="left" key={header}>{header}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* eslint-disable-next-line */}
                    {rows.map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                            {/* eslint-disable-next-line */}
                            {headers.map((header, colIndex) => (
                                <StyledTableCell align="left" key={colIndex}>
                                    {/* If the header is 'Action', create buttons */}
                                    {header.toLowerCase() === 'action' && Array.isArray(row.action) ? (
                                        row.action.map((action, actionIndex) => (
                                            <button key={actionIndex} onClick={action.onClick}>
                                                {action.label}
                                            </button>
                                        ))
                                    ) : (
                                        row[header.toLowerCase()]
                                    )}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;