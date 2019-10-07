/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';

import login from '../../lib/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Email is required field'),
  password: yup.string().required('Password is required field'),
});

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      loading: false,
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            maxWidth: '400px',
            marginTop: '50px',
          }}
        >
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <LockOutlinedIcon
                style={{
                  background: '#ee4641',
                  padding: '10px',
                  color: 'white',
                  borderRadius: '50%',
                }}
              />
            </div>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                setTimeout(() => {
                  login(values).then((data) => {
                    if (data.response.data.status === 200) {
                      actions.setSubmitting(true);
                      this.props.history.push('/Trainee');
                    } else {
                      actions.setSubmitting(false);
                    }
                  });
                }, 2000);
              }}
            >
              {({
                isSubmitting, errors, touched, isValid,
              }) => (
                <Form>
                  <Typography variant="h5" style={{ textAlign: 'center' }}>
                    LOGIN
                  </Typography>
                  <Field
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    component={TextField}
                    variant="outlined"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
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
                      shrink: true,
                    }}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    color="secondary"
                    fullWidth
                  >
                    Sign In
                    {isSubmitting && (
                      <CircularProgress size={24} style={styles} />
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
