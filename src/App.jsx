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
import TextFieldDemo from './pages/TextFieldDemo';
import InputDemo from './pages/InputDemo';
import Login from './pages/Login';
import NotFound from './pages/NotFound'
import theme from './theme.js';
import MathDemo from './components/MathDemo';
import ChildrenDemo from './components/ChildrenDemo';
import Trainee from './pages/Trainee';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes'
// eslint-disable-next-line react/prefer-stateless-function
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
            <PrivateRoute exact path="/Login" component={Login}>
            </PrivateRoute>
            <AuthRoute path="/Trainee" component={Trainee}></AuthRoute>
            <AuthRoute exact path="/" component={Trainee}></AuthRoute>
            <AuthRoute path="/TextFieldDemo" component={TextFieldDemo}></AuthRoute>
            <AuthRoute path="/InputDemo" component={InputDemo}></AuthRoute>
            <AuthRoute path="/MathDemo" component={MathDemo}></AuthRoute>
            <AuthRoute component={NotFound}></AuthRoute>
          </Switch>
        </Router>


      </>
    );
  }

  // eslint-disable-next-line padded-blocks
}

export default App;
