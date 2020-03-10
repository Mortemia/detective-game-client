import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import ItemCard from './ItemCard';
import { examineItem } from '../../../context/actions';

const Items = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const { id } = useParams();
  let item = game.items.find(x => x.id === parseInt(id)) || null;

  const handleNavigate = newItem => {
    item = newItem;
    let path = `/play/items/${newItem.id}`;
    history.push(path);
  };

  const handleAction = item => {
    examineItem(dispatchers, item);
    handleNavigate(item);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <PaperList
          listName='Przedmioty'
          primary='name'
          items={game.items}
          navigate={handleNavigate}
          action={handleAction}
          icon={ZoomInIcon}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <ItemCard item={item} />
      </Grid>
    </Grid>
  );
};

export default Items;
