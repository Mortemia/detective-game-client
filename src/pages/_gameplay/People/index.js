import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import PaperList from '../../../components/PaperList';
import PersonCard from './PersonCard';

const People = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const [person, setPerson] = React.useState(null);

  const handleClick = person => {
    setPerson(person);

    console.log(person);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={6}>
        <PaperList
          listName='Ludzie'
          primary='fullname'
          items={game.people.filter(x => x.known)}
          onClick={handleClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PersonCard person={person} />
      </Grid>
    </Grid>
  );
};

export default People;
