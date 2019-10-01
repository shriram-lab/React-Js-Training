import React, { Component } from "react";
import TextField from "../../components/TextField";
import RadioGroup from "../../components/RadioGroup";
import SelectField from "../../components/SelectField";
import Button from "../../components/Button";
import { SportTypes, PlayerSkills } from "../../configs/constants.js";
import * as yup from "yup";

var validadSchema = yup.object().shape({
  name:  yup.string().min(3).required("Name is required field")
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sport: "",
      cricket: "",
      football: "",
      skill:"",
      errors:[]
    };
  }

  handleChangeInput(e, val) {
    this.setState({
      name: e.target.value
    });
  }

  isTouched = event => {

      this.isValidate(event);
      return true;
    
  };

  hasErrors = event => {};

  getError = event => {};

  isValidate = event => {
    var state = this.state;
    var value = event.target.value;
    var name = event.target.name;
    console.log(event.target.value)
    validadSchema.validate({name:value}).catch(function(err) {
      console.log(err)
    });
  };

  componentDidUpdate() {
    console.log(this.state);
    // validadSchema
    //   .isValid(function(valid) {
    //     console.log(valid);
    //   })
    //   .then(function(err) {
    //     console.log(err);
    //   });
  }

  changeSelect = event => {
    event.preventDefault();
    this.setState({
      sport: event.target.value
    });
  };

  changeOption = event => {
    event.preventDefault();
    if (event.target.name === SportTypes[0].toLowerCase()) {
      this.setState({
        cricket: event.target.value,
        football: "",
        skill:true
      });
    } else {
      this.setState({
        cricket: "",
        football: event.target.value,
        skill:true
      });
    }
  };

  render() {
    const games = ["Cricket", "Football"];

    return (
      <>
        <div>
          <form>
            <h2>Name</h2>
            <TextField
              value={this.state.name}
              handleChangeInput={(e, val) => this.handleChangeInput(e, val)}
              isTouched={this.isTouched}
              name="name"
            />
            {}
            <h2>Select the game you play ?</h2>
            <SelectField options={games} onChange={this.changeSelect} isTouched={this.isTouched} />
            <div>
              {this.state.sport === SportTypes[0].toString() ? (
                <div>
                  <h1>What to do ?</h1>
                  <RadioGroup
                    onChange={this.changeOption}
                    name="cricket"
                    options={PlayerSkills[0].Cricket}
                    isTouched={this.isTouched}
                  ></RadioGroup>
                </div>
              ) : this.state.sport === SportTypes[1].toString() ? (
                <div>
                  <h1>What you do ?</h1>
                  <RadioGroup
                    onChange={this.changeOption}
                    name="football"
                    options={PlayerSkills[0].Football}
                    isTouched={this.isTouched}
                  ></RadioGroup>
                </div>
              ) : (
                false
              )}

              <div style={{ float: "right" }}>
                <Button value="Cancel" />
                <Button value="Submit" color="primary" disabled="true" />
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default InputDemo;
