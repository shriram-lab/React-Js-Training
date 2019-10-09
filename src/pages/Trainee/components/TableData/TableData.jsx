/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  stripped: {
    background: 'whitesmoke',
  },
  progress: {
    margin: theme.spacing(2),
  },
  displayConet: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // console.log('table data props HOc', this.props);

    const {
      orderBy,
      order,
      onSort,
      onSelect,
      handleChangePage,
      rowPerPage,
      page,
      count,
      columns,
      data,
      actions,
      dataLen,
      loader,

    } = this.props;
    return (
    <Paper className={useStyles.root}>
      <Table className={useStyles.table}>
        <TableHead>
          <TableRow>
            {columns.map((row) => (
              <TableCell component="th" scope="row" align={row.align}>
                <TableSortLabel
                  direction={order}
                  onClick={() => onSort(row.field, order)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>

        {
            (dataLen > 0 && !loader) ? (data.map((row, index) => (

            <TableRow
              key={row.name}
              hover
              style={{ cursor: 'pointer' }}
              className={index % 2 === 0 ? useStyles.stripped : null}
            >

              {columns.map((column) => (
                <TableCell
                  component="th"
                  scope="row"
                  align={column.align}
                  onClick={() => onSelect(row._id)}
                >
                  {column.format
                    ? column.format(row[column.field])
                    : row[column.field]}
                </TableCell>
              ))}
              {actions.map((action) => (
                <>
                  {/* {console.log(row)} */}
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => action.handler(row._id)}
                  >
                    {action.icon}
                  </TableCell>
                </>
              ))}
            </TableRow>
            ))) : (<TableRow><TableCell colSpan={3} style={{ textAlign: 'center' }}>Loading.......</TableCell></TableRow>)
        }

          {}
        </TableBody>
      </Table>
      {
          (dataLen > 0 && !loader) ? (
<TablePagination
  rowsPerPageOptions={[]}
  component="div"
  count={count}
  rowsPerPage={rowPerPage}
  page={page}
  backIconButtonProps={{
    'aria-label': 'previous page',
  }}
  nextIconButtonProps={{
    'aria-label': 'next page',
  }}
  onChangePage={handleChangePage}
/>
          ) : (null)
      }

    </Paper>
    );
  }
}

export default TableData;
