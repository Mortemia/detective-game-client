import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white',
    outline: 'none'
  }
}));

const SimpleBar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to="/" >
            Gra detektywistyczna
          </Typography>
          <Button color="inherit">Zaloguj się</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SimpleBar;
