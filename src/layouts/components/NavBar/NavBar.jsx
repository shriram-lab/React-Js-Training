import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router,Link,Route,Switch,NavLink } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Protal
          </Typography>
          
          <Button color="inherit"><Link style={{textDecoration:"none",color:"#fff"}} to="/Trainee">TRAINEE</Link></Button>
          <Button color="inherit"><Link style={{textDecoration:"none",color:"#fff"}} to="/TextFieldDemo">TEXTFIELD DEMO</Link></Button>
          <Button color="inherit"><Link style={{textDecoration:"none",color:"#fff"}} to="/InputDemo">INPUT DEMO</Link></Button>
          <Button color="inherit"><Link style={{textDecoration:"none",color:"#fff"}} to="/MathDemo">CHILDREN DEMO</Link></Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
