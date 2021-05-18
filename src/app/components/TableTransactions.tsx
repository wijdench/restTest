import { useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import Transaction from '../models/Transaction';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: "#098B8C",
      fontWeight: 600,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        color: "#098B8C !important",
      },
      '&:nth-child(n)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  }),
);

export interface TableTransactionProps {
  transactions: Transaction[],
}

const TableTransaction: React.FC<TableTransactionProps> = ({ transactions }: TableTransactionProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });

  const totalAmount = transactions.reduce(function(prev, cur) {
    return prev + cur.Amount;
  }, 0);

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Account</StyledTableCell>
              <StyledTableCell align="right">{formatter.format(totalAmount)}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.Date}
                </StyledTableCell>
                <StyledTableCell>{row.Company}</StyledTableCell>
                <StyledTableCell>{row.Account}</StyledTableCell>
                <StyledTableCell align="right">{formatter.format(row.Amount)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableTransaction;