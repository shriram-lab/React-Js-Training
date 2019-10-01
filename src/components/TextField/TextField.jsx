/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line import/extensions
import Styles from "./style.js";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prefer-stateless-function
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prefer-stateless-function
// eslint-disable-next-line no-unused-vars
class TextField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          {this.props.value === "101" ? (
            <input
              style={Styles.errorStyle}
              type="text"
              disabled={this.props.disable}
              error={this.props.error}
              value={this.props.value}
            />
          ) : (
            <input
              style={Styles.InputStyle}
              onChange={e => this.props.handleChangeInput(e, "input")}
              type="text"
              disabled={this.props.disable}
              onBlur={this.props.isTouched}
            />
          )}
        </div>
      </>
    );
  }
}
TextField.defaultProps = {
  error: "",
  value: "",
  onChange: ""
};

TextField.propsTypes = {
  error: PropTypes.string.required,
  value: PropTypes.string.required,
  onChange: PropTypes.func
};

export default TextField;
