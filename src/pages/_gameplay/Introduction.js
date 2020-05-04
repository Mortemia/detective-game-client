import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { GameContext } from '../../context/gameContext';
import Button from '@material-ui/core/Button';
import ComponentCard from '../../components/ComponentCard';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
  },
}));

const Introduction = _ => {
  const classes = useStyles();
  const { game } = React.useContext(GameContext);

  return (
    <ComponentCard component={game.actions[0]} title='Wstęp'>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        component={Link}
        to='/play/'
      >
        Rozwiąż zagadkę!
      </Button>
    </ComponentCard>
  );
};

export default Introduction;
