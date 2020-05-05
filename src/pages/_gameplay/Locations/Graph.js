import React from 'react';
import { Graph } from 'react-d3-graph';
import { GameContext } from '../../../context/gameContext';

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

const LocationGraph = ({ hoveredLocation }) => {
  const { game } = React.useContext(GameContext);

  const getNodeColor = nodeId => {
    if (hoveredLocation && nodeId === hoveredLocation.name) return 'blue';
    if (nodeId === game.location) return 'red';
  };

  let data = {
    nodes: game.locations.map(a => {
      return { id: a.name, color: getNodeColor(a.name) };
    }),
    links: game.paths.map((a, index) => {
      return {
        source: a.location1,
        target: a.location2,
        label: `${a.cost} PR`,
      };
    }),
  };

  return (
    <Graph
      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
      data={data}
      config={myConfig}
    />
  );
};

export default LocationGraph;
