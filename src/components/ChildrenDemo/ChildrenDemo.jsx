/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "../../theme.js";

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = "";
    switch (this.props.operator) {
      case "+":
        result = (
          <div>
            Sum of {this.props.first} and {this.props.second} is{" "}
            {this.props.first + this.props.second}
          </div>
        );

        break;
      case "-":
        result = (
          <div>
            Substraction of {this.props.first} and {this.props.second} is{" "}
            {this.props.first - this.props.second}
          </div>
        );

        break;
      case "*":
        result = (
          <div>
            Multiplication of {this.props.first} and {this.props.second} is{" "}
            {this.props.first * this.props.second}
          </div>
        );

        break;

      case "/":
        result = (
          <div>
            Division of {this.props.first} and {this.props.second} is{" "}
            {this.props.first / this.props.second}
          </div>
        );

        break;

      default:
        result = <div>Invalid Operation</div>;

        break;
    }
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <h1>{result}</h1>
        </MuiThemeProvider>
      </>
    );
  }
}

export default ChildrenDemo;
