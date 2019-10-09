/* eslint-disable no-undef */
/* eslint-disable react/no-children-prop */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable import/no-absolute-path */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// eslint-disable-next-line import/extensions
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/extensions
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import TextFieldDemo from './pages/TextFieldDemo';
import InputDemo from './pages/InputDemo';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import theme from './theme.js';
import MathDemo from './components/MathDemo';
import ChildrenDemo from './components/ChildrenDemo';
import Trainee from './pages/Trainee';
import TraineeDetails from './pages/Trainee/TranieeDetails.jsx';
import { AuthRoute, PrivateRoute } from './routes';
// eslint-disable-next-line react/prefer-stateless-function

import axios from 'axios';
import localStorageAuthHOC from "./configs/localStorage/localStorage";


class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  child(event) {
    return <ChildrenDemo first={2} operator="+" second={2} />;
    // return false;
  }

  render() {
    const {localStorageEvent} = this.props;
    
    if(localStorageEvent.getLocalItem('token')!=null){
      axios.defaults.headers.common['Authorization'] = localStorageEvent.getLocalItem('token');
    }else{
      localStorageEvent.setLocalItem('token',"null");
      axios.defaults.headers.common['Authorization'] = localStorageEvent.getLocalItem('token');
    }
    
    // eslint-disable-next-line keyword-spacing
    return (
      <>
        {/* <TextFieldDemo /> */}
        {/* <InputDemo /> */}
        {/* <MuiThemeProvider theme={theme}>
          <MathDemo first={2} operator="+" second={2} children={this.child} />
        </MuiThemeProvider> */}

        {/* <Trainee /> */}

        <Router>
          <Switch>
            <AuthRoute exact path="/" component={Trainee} />
            <AuthRoute path="/Trainee" component={Trainee} />
            <AuthRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <AuthRoute path="/InputDemo" component={InputDemo} />
            <AuthRoute path="/MathDemo" component={MathDemo} />
            <PrivateRoute path="/Login" component={Login} />
            <AuthRoute component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }

  // eslint-disable-next-line padded-blocks
}

export default localStorageAuthHOC(App);
