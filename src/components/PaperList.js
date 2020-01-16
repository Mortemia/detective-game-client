import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperDashboard: {
    height: theme.spacing(40),
  },
}));

const PaperList = props => {
  const classes = useStyles();
  const items = props.items;

  return (
    <Paper
      className={clsx(classes.paper, props.dashboard && classes.paperDashboard)}
    >
      <div className={classes.root}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          {props.listName}
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item.primary} secondary={item.secondary} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='play'>
                  {props.icon ? <props.icon /> : <KeyboardArrowRightIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default PaperList;
