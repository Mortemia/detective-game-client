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
    height: '100%',
  },
}));

const PaperList = ({
  listName,
  items,
  primary,
  secondary,
  onClick,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          {listName}
        </Typography>
        <List>
          {items
            .sort((a, b) => a[primary].localeCompare(b[primary]))
            .map((item, index) => (
              <ListItem button key={index} onClick={() => onClick(item)}>
                <ListItemText
                  primary={item[primary]}
                  secondary={item[secondary]}
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' onClick={() => onClick(item)}>
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
