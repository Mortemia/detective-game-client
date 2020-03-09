import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { GameContext } from '../../../context/gameContext';
import PaperList from '../../../components/PaperList';
import ItemCard from './ItemCard';

const Items = _ => {
  const { game } = React.useContext(GameContext);
  const { id } = useParams();

  const [item, setItem] = React.useState(
    game.items.find(x => x.id === parseInt(id)) || null
  );
  const history = useHistory();

  const handleClick = item => {
    setItem(item);
    let path = `/play/items/${item.id}`;
    history.push(path);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <PaperList
          listName='Przedmioty'
          primary='name'
          items={game.items}
          navigate={handleClick}
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
