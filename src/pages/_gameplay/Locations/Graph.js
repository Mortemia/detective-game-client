import React from 'react';
import { Graph } from 'react-d3-graph';
import { GameContext } from '../../../context/gameContext';
import { getRevealedLocations } from '../../../utils/gameUtils';
import { getOptimalPathToLocation } from '../../../utils/gameUtils';

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

const LocationGraph = ({ hoveredLocation, chosenLocation, init, ...props }) => {
  const { game } = React.useContext(GameContext);
  const [higlightedLinks, setHiglightedLinks] = React.useState([]);

  React.useEffect(() => {
    if (init !== 1) {
      const path = getOptimalPathToLocation(
        game,
        game.location,
        chosenLocation
      );
      setHiglightedLinks(path ? path.links : []);
    }
  }, [chosenLocation, game.location]);

  const createLinks = () => {
    const links = [];
    const revealedLocations = getRevealedLocations(game).map(
      location => location.name
    );

    game.paths.forEach((path, index) => {
      if (
        revealedLocations.includes(path.location1) &&
        revealedLocations.includes(path.location2)
      )
        links.push({
          source: path.location1,
          target: path.location2,
          label: `${path.cost} PR`,
          color: higlightedLinks.includes(index) && 'blue',
        });
    });
    return links;
  };

  let data = {
    nodes: getRevealedLocations(game).map(a => {
      return {
        id: a.name,
        color:
          (a.name === game.location && 'red') ||
          (a.name === chosenLocation && 'blue'),
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
