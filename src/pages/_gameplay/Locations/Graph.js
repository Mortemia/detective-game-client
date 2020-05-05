import React from 'react';
import { Graph } from 'react-d3-graph';
import { GameContext } from '../../../context/gameContext';

const myConfig = {
  nodeHighlightBehavior: true,
  height: window.screen.availHeight - 500,
  width: window.screen.availWidth - 200,
  node: {
    color: 'lightgreen',
    size: 300,
    fontSize: 15,
    highlightFontSize: 15,
  },
  link: {
    renderLabel: true,
    fontSize: 13,
  },
};

const LocationGraph = ({ hoveredLocation, ...props }) => {
  const { game } = React.useContext(GameContext);

  let data = {
    nodes: game.locations.map(a => {
      return {
        id: a.name,
        color: a.name === game.location && 'red',
        strokeColor:
          hoveredLocation && a.name === hoveredLocation.name && 'blue',
      };
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
    <div className={props.className}>
      <Graph
        id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
      />
    </div>
  );
};

export default LocationGraph;
