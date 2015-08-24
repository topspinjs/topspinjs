const actionTypes = [
  'LEFT_SCORED'
, 'RIGHT_SCORED'
, 'UPDATE_GAME'
, 'SYNC_GAMES'
, 'ADD_GAME'
, 'SYNC_PLAYERS'
, 'ADD_PLAYER'
].reduce((acc, key) => (acc[key] = key, acc), {})

export default actionTypes;
