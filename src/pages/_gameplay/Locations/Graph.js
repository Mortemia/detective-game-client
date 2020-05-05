import React from 'react';
import { Graph } from 'react-d3-graph';
import { GameContext } from '../../../context/gameContext';
import { getRevealedLocations } from '../../../utils/gameUtils';

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

  const createLinks = () => {
    const links = [];
    const revealedLocations = getRevealedLocations(game).map(
      location => location.name
    );

    game.paths.forEach(path => {
      if (
        revealedLocations.includes(path.location1) &&
        revealedLocations.includes(path.location2)
      )
        links.push({
          source: path.location1,
          target: path.location2,
          label: `${path.cost} PR`,
        });
    });
    return links;
  };

  let data = {
    nodes: getRevealedLocations(game).map(a => {
      return {
        id: a.name,
        color: a.name === game.location && 'red',
        strokeColor:
          hoveredLocation && a.name === hoveredLocation.name && 'blue',
      };
    }),
    links: createLinks(),
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
