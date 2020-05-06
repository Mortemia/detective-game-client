export const fastTravelLocations = game =>
  game.paths.reduce((result, { location1, location2, cost }) => {
    let location = getDestination(game.location, location1, location2);
    return location &&
      game.locations.length &&
      game.locations.find(x => x.name === location).revealed
      ? result.concat({
          name: location,
          cost,
          costMP: `${cost} PR`,
        })
      : result;
  }, []);

const getDestination = (start, a, b) =>
  a === start ? b : b === start ? a : '';

export const getPossibleActions = game =>
  game.actions.filter(action => action.revealed && !action.done);

export const getDoneActions = game =>
  game.actions.filter(action => action.done);

export const getRevealedPeople = game =>
  game.people.filter(person => person.revealed);

export const getRevealedItems = game =>
  game.items.filter(item => item.revealed);

export const getRevealedLocations = game =>
  game.locations.filter(location => location.revealed);

export const getActionById = (game, id) =>
  game.actions.find(action => action.id == id);

export const getLocationByName = (game, name) =>
  game.locations.find(location => location.name === name);

export const getPathToLocation = (game, source, target) => {
  let foundPath = null;
  game.paths.forEach(path => {
    if (
      (path.location1 === source && path.location2 === target) ||
      (path.location1 === target && path.location2 === source)
    )
      foundPath = path;
  });
  return foundPath;
};
