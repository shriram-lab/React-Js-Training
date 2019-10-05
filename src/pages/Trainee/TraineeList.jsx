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
import TablePagination from "@material-ui/core/TablePagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextField } from "formik-material-ui";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const TranieeSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required("Name is required field."),
  email: yup
    .string()
    .email("Email should be valid.")
    .required("Email is required field")
});

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
      trainees: trainees,
      editOpen: false,
      deleteOpen: false,
      page:0,
      id: ""
    };
  }
  handleClickOpen = event => {
    this.setState({
      open: true
    });
  };

  handleClose = event => {
    this.setState({
      open: false,
      deleteOpen: false,
      editOpen: false,
      id: ""
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

  handleEdit = event => {
    const editData = trainees.filter(person => person.id == event);
    this.setState({
      editOpen: true,
      id: editData
    });
  };
  handleDelete = event => {
    this.setState({
      deleteOpen: true,
      id: event
    });
  };

  deleteRecord = event => {
    const delData = trainees.filter(person => person.id == event);
    console.log("Deleted item", delData[0]);
    this.setState({
      deleteOpen: false,
      id: ""
    });
  };
  handleChangePage = (event,nextPage) =>{
    console.log(event,nextPage);
    this.setState({
      page:nextPage
    })
  }
  onSubmit = event => {
    const editdata = trainees.filter(person => {
      if (person.id == event.id) {
        person.name = event.name;
        person.email = event.email;
        return person;
      }
    });
    console.log("Trainee edited succesfully.", editdata[0]);
    this.setState({
      editOpen: false,
      id: ""
    });
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
          <DeleteDialog
            open={this.state.deleteOpen}
            handleClose={this.handleClose}
            id={this.state.id}
            deleteRecord={this.deleteRecord}
          />
          <EditDialog
            open={this.state.editOpen}
            handleClose={this.handleClose}
            id={this.state.id}
            deleteRecord={this.deleteRecord}
            onSubmit={this.onSubmit}
          />
          <br />
          <TableData
            id="name"
            data={this.state.trainees}
            orderBy={this.state.orderBy}
            order={this.state.order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            handleChangePage={this.handleChangePage}
            rowPerPage = {10}
            count = {100}
            page={this.state.page}
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
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEdit
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDelete
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
  const { orderBy, order, onSort, onSelect,handleChangePage,rowPerPage,page,count } = props;
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
              className={index % 2 === 0 ? classes.stripped : null}
            >
              {props.columns.map(column => (
                <TableCell
                  component="th"
                  scope="row"
                  align={column.align}
                  onClick={() => onSelect(row.id)}
                >
                  {column.format
                    ? column.format(row[column.field])
                    : row[column.field]}
                </TableCell>
              ))}
              {props.actions.map(action => (
                <>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => action.handler(row.id)}
                  >
                    {action.icon}
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={rowPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}

function EditDialog(props) {
  let name = "";
  let email = "";
  let id = "";
  if (props.id) {
    name = props.id[0].name;
    email = props.id[0].email;
    id = props.id[0].id;
  }
  return (
    <>
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter Trainee Details</DialogContentText>
            <Formik
              initialValues={{
                name: name,
                email: email,
                id: id
              }}
              validationSchema={TranieeSchema}
              onSubmit={values => props.onSubmit(values)}
            >
              {({ errors, touched, isValid, values, handleChange }) => (
                <Form>
                  <Field
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    required
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                  ></Field>
                  <Field
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    required
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  ></Field>
                  <DialogActions>
                    <Button
                      onClick={props.handleClose}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={props.handleClose}
                      variant="contained"
                      color="secondary"
                      disabled={!isValid}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

function DeleteDialog(props) {
  return (
    <>
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Remove Trainee"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you really want to delete this traniee ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={props.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => props.deleteRecord(props.id)}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default TranieeList;
