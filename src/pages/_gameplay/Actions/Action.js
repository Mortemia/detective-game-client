import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import { actionByType } from '../../../context/actions';

const useStyles = makeStyles(theme => ({
  root: {
    //maxWidth: 345,
  },
}));

const Action = props => {
  const classes = useStyles();
  const { appDispatch } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);
  const history = useHistory();
  const { id } = useParams();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  let action = game.actions.find(x => x.id === parseInt(id) && x.done) || null;

  const components = [
    { name: 'locations', revealedText: 'Odkryte miejsca' },
    { name: 'actions', revealedText: 'Nowe akcje' },
    { name: 'items', revealedText: 'Znalezione przedmioty' },
    { name: 'people', revealedText: 'Poznane osoby' },
  ];

  const revealedComponents =
    action &&
    components.reduce(
      (result, component) =>
        result.concat([
          action.successors.filter(
            successor => successor.type === component.name
          ),
        ]),
      []
    );

  const getMoreInfo = components =>
    components.map(x => game[x.type].find(y => y.id === x.id));

  action &&
    components.forEach(
      (component, index) =>
        (component.revealed = getMoreInfo(revealedComponents[index]))
    );

  const handleSuccessorClick = (component, type) => {
    let path = `/play/${type}/${component.id}`;
    history.push(path);
    actionByType(dispatchers, game, component, type);
  };

  const reveleadComponentsContent = component => {
    const { revealedText, revealed, name } = component;
    return (
      !!revealed.length && (
        <CardContent>
          <Typography variant='body2' component='p'>
            {revealedText}
            {revealed.map(x => (
              <li>
                {x.name || x.fullname}
                {((name === 'actions' && !x.done) || name === 'items') && (
                  <IconButton
                    color='secondary'
                    size='small'
                    onClick={_ => handleSuccessorClick(x, name)}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                )}
              </li>
            ))}
          </Typography>
        </CardContent>
      )
    );
  };

  return (
    action && (
      <Card className={classes.root}>
        <CardHeader title={action.name} subheader={action.location} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {action.description}
          </Typography>
        </CardContent>

        {components.map(component => reveleadComponentsContent(component))}
      </Card>
    )
  );
};

export default Action;
