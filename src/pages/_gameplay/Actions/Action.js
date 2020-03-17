import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../../../context/gameContext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    //maxWidth: 345,
  },
}));

const Action = props => {
  const classes = useStyles();
  const { game, dispatch } = React.useContext(GameContext);
  const { id } = useParams();

  let revealedLocations;
  let revealedActions;
  let revealedPeople;
  let revealedItems;

  let action = game.actions.find(x => x.id === parseInt(id) && x.done) || null;

  const components = [
    { s: 'locations', m: 'locations' },
    { s: 'actions', m: 'actions' },
    { s: 'items', m: 'items' },
    { s: 'people', m: 'people' },
  ];

  const revealedComponents = action
    ? components.reduce(
        (result, component) =>
          result.concat([
            action.successors.filter(
              successor => successor.type === component.s
            ),
          ]),
        []
      )
    : null;

  const getMoreInfo = components =>
    components.map(x => game[x.type].find(y => y.id === x.id));

  if (action) {
    revealedLocations = getMoreInfo(revealedComponents[0]);
    revealedActions = getMoreInfo(revealedComponents[1]);
    revealedPeople = getMoreInfo(revealedComponents[2]);
    revealedItems = getMoreInfo(revealedComponents[3]);
  }

  return (
    action && (
      <Card className={classes.root}>
        <CardHeader title={action.name} subheader={action.location} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {action.description}
          </Typography>
        </CardContent>
        {reveleadComponentsContent('Odkryte miejsca', revealedLocations)}
        {reveleadComponentsContent('Poznane osoby', revealedPeople)}
        {reveleadComponentsContent('Nowe akcje', revealedActions)}
        {reveleadComponentsContent('Poznane osoby', revealedItems)}
      </Card>
    )
  );
};

export default Action;

const reveleadComponentsContent = (text, components) =>
  !!components.length && (
    <CardContent>
      <Typography variant='body2' component='p'>
        {text}
        {components.map(x => (
          <li>{x.name || x.fullname}</li>
        ))}
      </Typography>
    </CardContent>
  );
