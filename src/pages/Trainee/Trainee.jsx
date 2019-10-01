import React, { Component } from "react";
import AddDialog from "./components/AddDialog/";
import NavBar from "../components/NavBar";
import Login from "../Login";
import Button from "@material-ui/core/Button";

export class Trainee extends Component {
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

  handleSubmit = event =>{
      this.setState({
      open: false
    });
      console.log(event)
  }

  render() {
    return (
      <div>
      <NavBar />
      <br/>
      <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add Trainee
        </Button>
        <AddDialog open={this.state.open} onClose={this.handleClose} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default Trainee;
