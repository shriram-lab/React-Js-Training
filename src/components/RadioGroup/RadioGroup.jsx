import React, { Component } from "react";
import PropTypes from "prop-types";

class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <OptionList
            options={this.props.options}
            name={this.props.name}
            Change={this.props.onChange}
            Blur={this.props.isTouched}
          ></OptionList>
        </div>
      </>
    );
  }
}

function OptionList(props) {
  const options = props.options;
  const name = props.name;
  const Change = props.Change;
  const Blur = props.Blur;
  const listItems = options.map(options => (
    <div>
      <input type="radio" onChange={Change} onBlur={Blur} name={name} value={options} />
      {options}
    </div>
  ));
  return <div>{listItems}</div>;
}

RadioGroup.defaultProps = {
  error: "",
  value: "",
  options: []
};

RadioGroup.propsTypes = {
  error: PropTypes.string.required,
  value: PropTypes.string.required,
  options: PropTypes.array.required
};

export default RadioGroup;
