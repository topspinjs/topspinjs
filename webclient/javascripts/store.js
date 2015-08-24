var redux = require('redux');

var reducers = redux.combineReducers({
  score: require('reducers/score.js')
, players: require('reducers/players.js')
, games: require('reducers/games.js')
});

var store = redux.createStore(reducers);

window.store = store;

module.exports = store;
