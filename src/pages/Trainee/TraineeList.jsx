/* eslint-disable no-undef */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import Moment from 'moment';
import trainees from './data/traniee';
import Hoc from '../../contexts/SnackBarProvider/SnackBarProvider';
import { getDateFormatted, ascSort, descSort } from '../../configs/constants';
import AddDialog from './components/AddDialog';
import withLoaderAndMessage from '../../components/HOC';
import {
  getTrainess, addTrainee, editTrainee, deleteTrainee,
} from '../../lib/utils/api';
import TableData from '../Trainee/components/TableData';

const TranieeSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required('Name is required field.'),
  email: yup
    .string()
    .email('Email should be valid.')
    .required('Email is required field'),
});

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
}));
const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
};

class TranieeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
      trainees: [],
      editOpen: false,
      deleteOpen: false,
      page: 0,
      id: '',
      skip: 0,
      limit: 10,
      openSnack: false,
      isDeletesubmit:false,
    };
    console.log(props);
  }


  handleClickOpen = (event) => {
    this.setState({
      open: true,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
      deleteOpen: false,
      editOpen: false,
      id: '',
    });
  };

  handleSubmit = (event,actions) => {
    
    
    addTrainee(event).then((data) => {
      if(data.status=="ok"){
        
        this.props.openSnackBar('Trainee Added Successfully !', 'success');
        this.setState({
          open: false,
        });
        
      }else if(data.isAxiosError){
        actions.setSubmitting(false);
        this.props.openSnackBar(`${data.response.data.message}`, 'error');
    
      }else{
        actions.setSubmitting(false);
        this.props.openSnackBar('Somthing went wrong please try again', 'error');
      }
    
    });
    
  };

  handleSort = (event, order) => {
    let sortData = '';
    if (order == 'asc') {
      sortData = this.state.trainees.sort(ascSort(event));
      this.setState({
        order: 'desc',
        trainees: sortData,
      });
    } else {
      sortData = this.state.trainees.sort(descSort(event));
      this.setState({
        order: 'asc',
        trainees: sortData,
      });
    }
  };

  handleSelect = (event) => {
    this.props.history.push(`/Trainee/${event}`);
  };

  handleEdit = (event) => {
    const editData = this.state.trainees.filter((person) => person._id == event);
    this.setState({
      editOpen: true,
      id: editData,
    });
  };

  handleDelete = (event) => {
    this.setState({
      deleteOpen: true,
      id: event,
    });
  };

  deleteRecord = (event) => {
    this.setState({
      isDeletesubmit:true
    });
    const delData = this.state.trainees.filter((person) => person._id == event);
    console.log('Deleted item', delData[0]);


    const compareDate = Moment('14-02-2019', 'DD-MM-YYYY').format('DD-MM-YYYY');
    const created = Moment(delData[0].createdAt).format('DD-MM-YYYY');
    if (created > compareDate) {
      deleteTrainee(delData[0]).then((data) => {

        if(data.status=="ok"){
          this.props.openSnackBar('Trainee Deleted Successfully !', 'success');
        console.log(data);
        this.setState({
          deleteOpen: false,
          isDeletesubmit:false,
          id: '',
        });
        }else if(data.isAxiosError){
          this.setState({
            deleteOpen: false,
            isDeletesubmit:false,
            id: '',
          });
          this.props.openSnackBar(`${data.response.data.message}`, 'error');
        }else{
          this.setState({
            deleteOpen: false,
            isDeletesubmit:false,
            id: '',
          });
          this.props.openSnackBar('Trainee Deleted Successfully !', 'success');
        }
        
      });
    } else {
      this.props.openSnackBar("Trainee could'nt Delete!", 'error');
      this.setState({
        deleteOpen: false,
        isDeletesubmit:false,
        id: '',
      });
    }
  };

  handleChangePage = (event, nextPage) => {
    console.log(event, nextPage);
    this.setState({
      page: nextPage,
      skip: this.state.limit * nextPage,
    });
    getTrainess(this.state.skip, this.state.limit).then((data) => {
      if (data.status === 'ok') {
        console.log(data);
        this.setState({
          trainees: data.data.records,
        });
      }
    });
  };

  onSubmit = (event,actions) => {
  
    const editdata = this.state.trainees.filter((person) => {
      if (person._id == event.id) {
        person.name = event.name;
        person.email = event.email;
        person.id = event.id;
        editTrainee(person).then((data) => {
          if(data.status=="ok"){
            this.props.openSnackBar('Trainee Edited Successfully !', 'success');
          console.log(data);
          console.log('Trainee edited succesfully.', person);
          this.setState({
            editOpen: false,
            id: '',
          });
          }else if(data.isAxiosError){
            actions.setSubmitting(false);
            this.props.openSnackBar(`${data.response.data.message}`, 'error');
          }else{
            actions.setSubmitting(false);
            this.props.openSnackBar('Somting went worng please try again !', 'error');
          }
          
        }).catch((error)=>{
          this.props.openSnackBar('Somting went worng please try again !', 'error');
          actions.setSubmitting(false);
        });
      }
    });
  };

  componentDidMount() {
    getTrainess(this.state.skip,this.state.limit).then((data) => {
      if (data.status === 'ok') {
        console.log(data);
        this.setState({
          trainees: data.data.records,
        });
      }else if(data.isAxiosError){
        this.props.openSnackBar(`${data.response.data.message}`, 'error');
      }else{
        this.props.openSnackBar('Somting went worng please try again !', 'error');
      }
    }).catch((error)=>{
      this.props.openSnackBar('Somting went worng please try again !', 'error');
    });
  }

  render() {
    // const listtrainee = trainees.map((items) => (
    //   <li>
    //     <Link to={`/Trainee/${items.id}`}>{items.name}</Link>
    //   </li>
    // ));
    return (
      <>
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Add Traineelist
            </Button>

          </div>
          {/* <SnackBarProvider>
          <ButtonA />
          </SnackBarProvider> */}
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
            isDeletesubmit={this.state.isDeletesubmit}
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
            rowPerPage={10}
            count={100}
            page={this.state.page}
            columns={[
              { field: 'name', label: 'Name' },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]}
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEdit,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDelete,
              },
            ]}
          />
          {/* <ul>{listtrainee}</ul> */}
        </div>
      </>
    );
  }
}

function EditDialog(props) {
  let name = '';
  let email = '';
  let id = '';
  if (props.id) {
    name = props.id[0].name;
    email = props.id[0].email;
    id = props.id[0]._id;
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
                id,
                name,
                email

              }}
              validationSchema={TranieeSchema}
              onSubmit={(values,actions) => props.onSubmit(values,actions)}
            >
              {({
                errors, touched, isValid,isSubmitting, values, handleChange,
              }) => (
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
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Field
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <DialogActions>
                    <Button
                      onClick={props.handleClose}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      Submit
                      {isSubmitting && (
                      <CircularProgress size={24} style={styles} />
                    )}
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
          <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
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
              disabled={props.isDeletesubmit}
              autoFocus
            >
              Delete
              {props.isDeletesubmit && (
                      <CircularProgress size={24} style={styles} />
                    )}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default Hoc(TranieeList);
