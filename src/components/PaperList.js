import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
  fab: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const PaperList = ({
  listName,
  items,
  primary,
  secondary,
  navigate,
  action,
  hover,
  actionPossibility,
  tooltip,
  addButton,
  ...props
}) => {
  const classes = useStyles();

  const iconButton = item => (
    <IconButton edge='end' onClick={() => action && action(item)}>
      {props.icon ? <props.icon /> : <KeyboardArrowRightIcon />}
    </IconButton>
  );

  return (
    <Paper className={`${classes.paper} ${props.className}`}>
      <div className={classes.root}>
        <div className={classes.fab}>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            {listName}
          </Typography>
          {addButton && (
            <Fab
              color='primary'
              aria-label='add'
              size='small'
              onClick={addButton}
              style={{
                marginRight: '8px',
                boxShadow: 'none',
              }}
            >
              <AddIcon />
            </Fab>
          )}
        </div>
        <List>
          {items
            .sort((a, b) => a[primary].localeCompare(b[primary]))
            .map((item, index) => {
              let isActionAvailable = true;
              if (actionPossibility) {
                isActionAvailable = actionPossibility(item);
              }
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate && navigate(item)}
                  onMouseEnter={() => hover && hover(item)}
                  onMouseLeave={() => hover && hover(null)}
                  disabled={!navigate}
                >
                  <ListItemText
                    primary={item[primary]}
                    secondary={item[secondary]}
                  />

                  {action && isActionAvailable && (
                    <ListItemSecondaryAction
                      style={{
                        pointerEvents: props.icon ? 'all' : 'none',
                      }}
                    >
                      {tooltip ? (
                        <Tooltip title={tooltip} placement='top' arrow>
                          {iconButton(item)}
                        </Tooltip>
                      ) : (
                        iconButton(item)
                      )}
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })}
        </List>
      </div>
    </Paper>
  );
};

export default PaperList;
