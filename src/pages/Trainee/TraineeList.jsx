/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import trainees from "./data/traniee";
import Button from "@material-ui/core/Button";
import AddDialog from "./components/AddDialog";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getDateFormatted, ascSort, descSort } from "../../configs/constants";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  stripped: {
    background: "whitesmoke"
  }
}));

class TranieeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: "asc",
      orderBy: "",
      trainees: trainees
    };
  }
  handleClickOpen = event => {
    this.setState({
      open: true
    });
  };

  handleClose = event => {
    this.setState({
      open: false
    });
  };

  handleSubmit = event => {
    this.setState({
      open: false
    });
    console.log(event);
  };
  handleSort = (event, order) => {
    var sortData = "";
    if (order == "asc") {
      sortData = this.state.trainees.sort(ascSort(event));
      this.setState({
        order: "desc",
        trainees: trainees
      });
    } else {
      sortData = this.state.trainees.sort(descSort(event));
      this.setState({
        order: "asc",
        trainees: trainees
      });
    }
  };
  handleSelect = event => {
    this.props.history.push(`/Trainee/${event}`);
  };
  render() {
    const listtrainee = trainees.map(items => (
      <li>
        <Link to={`/Trainee/${items.id}`}>{items.name}</Link>
      </li>
    ));
    return (
      <>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Add Traineelist
            </Button>
          </div>
          <AddDialog
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.handleSubmit}
          />
          <br />
          <TableData
            id="name"
            data={this.state.trainees}
            orderBy={this.state.orderBy}
            order={this.state.order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            columns={[
              { field: "name", label: "Name" },
              {
                field: "email",
                label: "Email Address",
                format: value => value && value.toUpperCase()
              },
              {
                field: "createdAt",
                label: "Date",
                align: "right",
                format: getDateFormatted
              }
            ]}
          />
          {/* <ul>{listtrainee}</ul> */}
        </div>
      </>
    );
  }
}

function TableData(props) {
  const classes = useStyles();
  const { orderBy, order, onSort, onSelect } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.columns.map(row => (
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
          {props.data.map((row, index) => (
            <TableRow
              key={row.name}
              hover
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(row.id)}
              className={index % 2 === 0 ? classes.stripped : null}
            >
              {props.columns.map(column => (
                <TableCell component="th" scope="row" align={column.align}>
                  {column.format
                    ? column.format(row[column.field])
                    : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TranieeList;
