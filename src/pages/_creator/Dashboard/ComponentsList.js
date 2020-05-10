import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ComponentsList = ({ data }) => {
  const classes = useStyles();
  const [openComponents, setOpenComponents] = React.useState({
    actions: true,
    locations: false,
    people: false,
    items: false,
  });

  const handleClick = type => _ => {
    const state = openComponents[type];
    setOpenComponents({
      ...openComponents,
      [type]: !state,
    });
  };

  return (
    <Paper>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            Lista komponentów
          </Typography>
        }
        className={classes.root}
      >
        <ListItem button onClick={handleClick('actions')}>
          <ListItemText primary='Akcje' />
          {openComponents.actions ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComponents.actions} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data?.actions.map((action, index) => (
              <ListItem key={index} button className={classes.nested}>
                <ListItemText primary={action.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleClick('locations')}>
          <ListItemText primary='Miejsca' />
          {openComponents.locations ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComponents.locations} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data?.locations.map((location, index) => (
              <ListItem key={index} button className={classes.nested}>
                <ListItemText primary={location.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleClick('people')}>
          <ListItemText primary='Osoby' />
          {openComponents.people ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComponents.people} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data?.people.map((person, index) => (
              <ListItem key={index} button className={classes.nested}>
                <ListItemText primary={person.fullname} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={handleClick('items')}>
          <ListItemText primary='Przdmioty' />
          {openComponents.items ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openComponents.items} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {data?.items.map((item, index) => (
              <ListItem key={index} button className={classes.nested}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Paper>
  );
};

export default ComponentsList;
