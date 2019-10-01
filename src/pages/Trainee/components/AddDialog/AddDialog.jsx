import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { TextField } from "formik-material-ui";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "too short")
    .max(10, "too long")
    .required("Name is required field"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required field"),
  password: yup.string()
  .matches(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$/,"Must contain 8 characters 1 uppercase 1 lowercase 1 numeric").required("Password is required field"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm-Password is required field")
});

export class AddDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      
    const { open, onClose,onSubmit} = this.props;

    return (
      <div>
        
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            <h3 style={{color:"#676262"}}>Enter your Trainee Details</h3>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                cpassword: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={values =>onSubmit(values)}
            >
              {({ errors, isValid, touched, values,handleChange }) => (
                <Form>
                  <Field
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    required
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                         <AccountCircle /> 
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.name && touched.name ? null : null}

                  <Field
                    name="email"
                    type="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                         <EmailIcon /> 
                        </InputAdornment>
                      )
                    }}
                  />
                  {errors.email && touched.email ? null : null}
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Field
                      name="password"
                      type={values.showPassword ? "text" : "password"}
                      label="Password"
                      component={TextField}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      style={{ marginRight: "5px" }}
                      InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                         <VisibilityOffIcon /> 
                        </InputAdornment>
                      )
                    }}
                    />
                    {errors.password && touched.password ? null : null}

                    <Field
                      name="cpassword"
                      type={values.showPassword ? "text" : "password"}
                      label="Confirm-Password"
                      component={TextField}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      style={{ marginLeft: "5px" }}
                      InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                         <VisibilityOffIcon /> 
                        </InputAdornment>
                      )
                    }}
                    />
                    {errors.cpassword && touched.cpassword ? null : null}
                  </div>
                  <div style={{ float: "right", margin: "10px" }}>
                    <Button color="primary" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid}
                      color="secondary"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AddDialog.defaultProps = {
  open: false,
  onClose:"",
  onSubmit:""
};

export default AddDialog;
