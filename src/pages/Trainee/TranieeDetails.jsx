import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import trainees from "./data/traniee";
import NotFound from "../NotFound";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { getDateFormatted } from "../../configs/constants.js";
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    background: "#5c5a61",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff"
  },
  emailColor: {
    color: "black"
  }
}));

function TranieeDetail(props) {
  const classes = useStyles();
  const theme = useTheme();
  console.log(props);
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.dated}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.emailColor}
          >
            {props.email}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.cover}>Thumbnail</div>
    </Card>
  );
}

class TraineeDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tranieeid = trainees.find(item => {
      if (item.id === this.props.match.params.id) {
        return true;
      } else {
        return null;
      }
    });
    return (
      <>
        {tranieeid ? (
          <div>
            <TranieeDetail
              name={tranieeid.name}
              email={tranieeid.email}
              dated={getDateFormatted(tranieeid.createdAt)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              <Button variant="contained">
                <Link
                  to="/Trainee"
                  style={{ textDecoration: "none" }}
                >
                  Back
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </>
    );
  }
}

export default TraineeDetails;
