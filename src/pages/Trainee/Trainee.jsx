import React, { Component } from "react";
import AddDialog from "./components/AddDialog/";
import NavBar from "../components/NavBar";
import Login from "../Login";
import Button from "@material-ui/core/Button";
import TranieeList from "./TraineeList.jsx";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch
} from "react-router-dom";
import trainees from './data/traniee.js';
import TraineeDetails from './TranieeDetails.jsx';
import NotFound from '../NotFound';

export class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  // handleClickOpen = event => {
  //   this.setState({
  //     open: true
  //   });
  // };

  // handleClose = event => {
  //   this.setState({
  //     open: false
  //   });
  // };

  // handleSubmit = event => {
  //   this.setState({
  //     open: false
  //   });
  //   console.log(event);
  // };

  render() {
    
    console.log("match",this.props.match.url); 

    const match  = this.props.match.path
  
    return (
      <div>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add Traineelist
        </Button>
        <AddDialog
          open={this.state.open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
        />
        <br /> */}
        <Switch>
        <Route exact path={match} component={TranieeList}></Route>
        <Route exact path={`${match}/:id`} component={TraineeDetails}></Route>
        </Switch>
      </div>
    );
  }
}

export default Trainee;
