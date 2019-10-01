/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from './style.js';


class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {(this.props.color=="default")?(<input type="button" value={this.props.value} style={Styles.buttonDefault} disabled={this.props.disabled}/>):(<input type="button" disabled={this.props.disabled} value={this.props.value} style={Styles.buttonPrimary} />)}
      </>
    );
  }
}

Button.defaultProps = {
  color: "default",
  disabled: false,
  style: {},
  value: "",
};

export default Button;
