import React from 'react';
import { useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import { actionByType } from '../../../context/actions';
import ComponentCard from '../../../components/ComponentCard';

const ActionCard = ({ action }) => {
  const { appDispatch } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const components = [
    { name: 'locations', revealedText: 'Odkryte miejsca' },
    { name: 'actions', revealedText: 'Nowe akcje' },
    { name: 'items', revealedText: 'Nowe przedmioty' },
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

  const reveleadComponentsContent = (component, index) => {
    const { revealedText, revealed, name } = component;
    return (
      !!revealed.length && (
        <CardContent key={index}>
          <Typography variant='body2' component='p'>
            {revealedText}
            {revealed.map((x, index) => (
              <li key={index}>
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
      <ComponentCard
        component={action}
        title='name'
        subheader='location'
        additionalInfo={`Koszt akcji:  ${action.time}`}
      >
        {components.map((component, index) =>
          reveleadComponentsContent(component, index)
        )}
      </ComponentCard>
    )
  );
};

export default ActionCard;
