/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable space-before-blocks */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";

class MathDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = "";
    switch (this.props.operator) {
      case "+":
        result = this.props.first + this.props.second;
        break;
      case "-":
        result = this.props.first - this.props.second;
        break;
      case "*":
        result = this.props.first * this.props.second;
        break;
      case "/":
        result = this.props.first / this.props.second;
        break;

      default:
        result = "Invalid Operation";
        break;
    }
    
    return (
      <>
      {(this.props.children())?(this.props.children()):(<div>
          {this.props.first}
          {this.props.operator}
          {this.props.second} = {result};
        </div>)}
        
      </>
    );
  }
}

MathDemo.defaultProps = {
  first: 1,
  second: 4,
  operator: "+",
  children: (Children) => {
    return Children
  }
};

export default MathDemo;
