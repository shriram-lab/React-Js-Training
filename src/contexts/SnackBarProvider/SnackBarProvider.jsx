import React, { Component } from 'react';
import { Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Consumer, Provider } from "../index";


// HOC Component

export default function Hoc(HocComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: false,
        message: '',
        variant:'success'
      };
    }

    openSnackBar = (message,variant) => {
      // console.log(message);
      this.setState({
        status: true,
        message:message,
        variant:variant
      });
    };

    // eslint-disable-next-line no-unused-vars
    closeSnackBar = (message) => {
      this.setState({
        status: false,
        message: '',
      });
    };

    render() {
      const { children } = this.props;
      const values = {
        openSnackbar: this.openSnackBar,
        closeSnackbar: this.closeSnackBar,
        snackbarIsOpen: this.state.status,
        message: this.state.message,
        variant:this.state.variant
      };
      return (
        <div>
          <HocComponent data={this.state} {...this.props} openSnackBar={this.openSnackBar} closeSnackBar={this.closeSnackBar} />
          <Provider value={values}>
            <SnackBars />
            {children}
          </Provider>
        </div>
      );
    }
  };
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const {
 className, message, onClose, variant, ...other 
} = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
<span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
)}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

class SnackBars extends Component {
  render() {
    return (
      <div className="Snackbars">
        <Consumer>
          {({ closeSnackbar, snackbarIsOpen, message,variant }) => (
            <>
              {/* {console.log(closeSnackbar)} */}
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={snackbarIsOpen}
                autoHideDuration={3000}
                onClose={closeSnackbar}
              >
                <MySnackbarContentWrapper
                  onClose={closeSnackbar}
                  variant={variant}
                  message={message}
                />
              </Snackbar>
            </>
          )}
        </Consumer>
      </div>
    );
  }
}

// export default hoc;
