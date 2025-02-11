import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import { actionByType } from '../../../context/actions';
import ComponentCard from '../../../components/ComponentCard';

const useStyles = makeStyles(theme => ({
  revealedComponent: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
  actionIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const ActionCard = ({ action }) => {
  const classes = useStyles();

  const { appDispatch } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const components = [
    { type: 'locations', revealedText: 'Odkryte miejsca' },
    { type: 'actions', revealedText: 'Odkryte akcje' },
    { type: 'items', revealedText: 'Nowe przedmioty' },
    { type: 'people', revealedText: 'Poznane osoby' },
  ];

  const revealedComponents =
    action &&
    components.reduce(
      (result, component) =>
        result.concat([
          action.successors.filter(
            successor => successor.type === component.type
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

  const handleComponentClick = (component, type, quickAction = false) => {
    let navigate = true;
    if (
      (type === 'actions' && !component.done) ||
      (type === 'items' && quickAction)
    )
      navigate = actionByType(dispatchers, game, component, type);

    if (navigate) {
      let path = `/play/${type}/${component.id}`;
      history.push(path);
    }
  };

  const reveleadComponentsContent = (component, index) => {
    const { revealedText, revealed, type } = component;
    return (
      !!revealed.length && (
        <CardContent key={index}>
          <Typography variant='body2' component='p'>
            {revealedText}
            {revealed.map((x, index) => (
              <li key={index} className={classes.revealedComponent}>
                <Link
                  href='#'
                  onClick={e => {
                    e.preventDefault();
                    handleComponentClick(x, type);
                  }}
                  variant='body2'
                  color={x.done || type !== 'actions' ? 'primary' : 'secondary'}
                >
                  {x.name || x.fullname}
                </Link>

                {type === 'items' && (
                  <Tooltip
                    title='Zbadaj przedmiot kosztem PR'
                    placement='right'
                    arrow
                  >
                    <IconButton
                      color='primary'
                      size='small'
                      onClick={_ => handleComponentClick(x, type, true)}
                      className={classes.actionIcon}
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </Tooltip>
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
