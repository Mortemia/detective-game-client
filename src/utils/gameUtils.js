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

export const getPossiblePeople = game =>
  game.people.filter(person => person.revealed);
