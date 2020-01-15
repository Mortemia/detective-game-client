import React from "react";
import Carousel from './Carousel'
import Button from "@material-ui/core/Button";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Carousel/>
      <Button
        variant="outlined"
        className={classes.button}
        startIcon={<EmojiObjectsOutlinedIcon/>}
        component={Link}
        to="/howtoplay"
      >
        Dowiedz się więcej
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        component={Link}
        to="/dashboard"
      >
        Rozpocznij
      </Button>
    </div>
  );
};

export default Banner;
