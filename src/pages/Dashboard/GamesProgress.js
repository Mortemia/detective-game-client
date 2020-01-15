import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { gamesInProgress } from "../Dashboard/fakedata";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const GamesProgress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Sprawy w toku
      </Typography>
      <List>
        {gamesInProgress.map(item => (
          <ListItem button>
            <ListItemText primary={item.caseName} secondary={item.date} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="play">
              <KeyboardArrowRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GamesProgress;
