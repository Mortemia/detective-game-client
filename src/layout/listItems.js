import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import MapIcon from '@material-ui/icons/Map';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/play'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem button component={Link} to='/play/actions'>
      <ListItemIcon>
        <WatchLaterIcon />
      </ListItemIcon>
      <ListItemText primary='Akcje' />
    </ListItem>
    <ListItem button component={Link} to='/play/locations'>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary='Lokacje' />
    </ListItem>
    <ListItem button component={Link} to='/play/people'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Osoby' />
    </ListItem>
    <ListItem button component={Link} to='/play/items'>
      <ListItemIcon>
        <FingerprintIcon />
      </ListItemIcon>
      <ListItemText primary='Przedmioty' />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Twoje notatki</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Kowalski' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='O Abackim' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Ogólne' />
    </ListItem>
  </div>
);
