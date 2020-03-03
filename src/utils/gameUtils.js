export const fastTravelLocations = game =>
  game.paths.reduce((result, { location1, location2, cost }) => {
    let location = getDestination(game.location, location1, location2);
    return location
      ? result.concat({
          name: location,
          cost,
          costMP: `${cost} PR`,
        })
      : result;
  }, []);

const getDestination = (start, a, b) =>
  a === start ? b : b === start ? a : '';
