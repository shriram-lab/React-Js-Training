import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./style.js";

class SelectField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <SelectList
            options={this.props.options}
            Change={this.props.onChange}
            Blur={this.props.isTouched}
          />
        </div>
      </>
    );
  }
}

function SelectList(props) {
  const options = props.options;
  const listItems = options.map(options => (
    <option value={options}>{options}</option>
  ));
  return (
    <select onChange={props.Change} onBlur={props.Blur} style={Styles.InputStyle}>
      <option value="">Select</option>
      {listItems}
    </select>
  );
}

SelectField.defaultProps = {
  error: "",
  value: "",
  options: [],
  defaultText: ""
};

SelectField.propsTypes = {
  error: PropTypes.string.required,
  value: PropTypes.string.required,
  options: PropTypes.array.required
};

export default SelectField;
