import React, { Component } from "react";
import { TextField } from "formik-material-ui";
import { Formik, Field, Form } from "formik";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required field"),
  password: yup.string().required("Password is required field")
});

export class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <Card
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            maxWidth:"400px",
            marginTop:"50px"
          }}
        >
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <LockOutlinedIcon
                style={{
                  background: "#ee4641",
                  padding: "10px",
                  color: "white",
                  borderRadius: "50%"
                }}
              />
            </div>
            
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                  console.log(values)
              }}
            >
            
            {({errors,touched,isValid})=>(
            <Form>
                <Typography variant="h5" style={{textAlign:"center"}}>LOGIN</Typography>
                <Field
                    name="email"
                    label="Email Address"
                    type="email"
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
                         <EmailIcon /> 
                        </InputAdornment>
                      )
                    }}
                  />
                  <Field
                    name="password"
                    label="Password"
                    type="password"
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
                         <VisibilityOffIcon /> 
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid}
                      color="secondary"
                      fullWidth
                    >
                      Sign In
                    </Button>

            </Form>)}
            
            </Formik>
          </CardContent>
          
        </Card>
      </div>
    );
  }
}

export default Login;
