import store from 'store';
import {
  SYNC_GAMES
, UPDATE_GAME
, ADD_GAME_PENDING
, ADD_GAME_FULFILLED
, ADD_GAME_REJECTED
} from 'lib/actionTypes';
import gameCreator from 'lib/gameCreator';

export function syncGames(payload) {
  store.dispatch({
    type: SYNC_GAMES
  , games: payload
  });
}

export function updateGame(payload) {
  store.dispatch({
    type: UPDATE_GAME
  , game: payload
  });
}

export function createGame(payload) {
  store.dispatch({
    type: ADD_GAME_PENDING
  , game: payload
  });

  gameCreator(payload)
    .then((response)=> store.dispatch({type: ADD_GAME_FULFILLED, game: response}))
    .catch((response)=> store.dispatch({type: ADD_GAME_REJECTED}))
}
