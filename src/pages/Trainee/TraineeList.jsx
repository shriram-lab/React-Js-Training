/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
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

class TranieeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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
  render() {
    const listtrainee = trainees.map(items => (
      <li>
        <Link to={`/Trainee/${items.id}`}>{items.name}</Link>
      </li>
    ));
    return (
      <>
        <div>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
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
            id="id"
            data={trainees}
            columns={[
              { field: "name", label: "Name", align: "center" },
              { field: "email", label: "Email Address" }
            ]}
          />
          <ul>{listtrainee}</ul>
        </div>
      </>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function TableData(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.columns.map(row => (
              <TableCell
                component="th"
                scope="row"
                field={row.field}
                align={row.align}
              >
                {row.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        
          {(props.data).map((row) => (
            
            <TableRow key={row.name}>
            
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TranieeList;
