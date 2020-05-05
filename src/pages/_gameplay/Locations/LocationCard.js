import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CommuteIcon from '@material-ui/icons/Commute';
import IconButton from '@material-ui/core/IconButton';
import ComponentCard from '../../../components/ComponentCard';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(1),
  },
}));

const LocationCard = ({ location }) => {
  const classes = useStyles();

  return (
    location && (
      <ComponentCard component={location} title='name'>
        {/* <IconButton edge='end' onClick={() => {}} className={classes.icon}>
          <CommuteIcon />
        </IconButton> */}
      </ComponentCard>
    )
  );
};

export default LocationCard;
