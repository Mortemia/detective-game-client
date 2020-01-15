import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import GamesProgress from "./GamesProgress";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4)
    //display: 'flex'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <GamesProgress />
        </Paper>
        <Paper className={classes.paper}>
          <GamesProgress />
        </Paper>
      </Container>
  );
};

export default Dashboard;
