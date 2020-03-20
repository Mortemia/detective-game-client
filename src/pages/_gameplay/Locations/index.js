import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Graph } from 'react-d3-graph';
import Grid from '@material-ui/core/Grid';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { GameContext } from '../../../context/gameContext';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue',
  },
  link: {
    highlightColor: 'lightblue',
    renderLabel: true,
  },
};

const Locations = _ => {
  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const history = useHistory();
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  const data = {
    nodes: game.locations.map(a => {
      return { id: a.name };
    }),
    links: game.paths.map(a => {
      return {
        source: a.location1,
        target: a.location2,
        label: `${a.cost} PR`,
      };
    }),
  };

  const { id } = useParams();
  let Location = game.locations.find(x => x.id === parseInt(id)) || null;

  const handleNavigate = newLocation => {
    Location = newLocation;
    let path = `/play/locations/${newLocation.id}`;
    history.push(path);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} md={4}>
        <PaperList
          listName='Lokacje'
          primary='name'
          items={game.locations}
          navigate={handleNavigate}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Graph
          id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
          data={data}
          config={myConfig}
        />
      </Grid>
    </Grid>
  );
};

export default Locations;
