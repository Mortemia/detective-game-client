import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { GameContext } from '../../../context/gameContext';
import PaperList from '../../../components/PaperList';
import PersonCard from './PersonCard';
import { getRevealedPeople } from '../../../utils/gameUtils';

const People = _ => {
  const { game } = React.useContext(GameContext);
  const { id } = useParams();

  const [person, setPerson] = React.useState(
    game.people.find(x => x.id === parseInt(id) && x.revealed) || null
  );
  const history = useHistory();

  const handleClick = person => {
    setPerson(person);
    let path = `/play/people/${person.id}`;
    history.push(path);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <PaperList
          listName='Ludzie'
          primary='fullname'
          items={getRevealedPeople(game)}
          navigate={handleClick}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <PersonCard person={person} />
      </Grid>
    </Grid>
  );
};

export default People;
