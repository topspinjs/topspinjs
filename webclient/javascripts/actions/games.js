import store from 'store';
import {SYNC_GAMES, UPDATE_GAME} from 'lib/actionTypes';

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
