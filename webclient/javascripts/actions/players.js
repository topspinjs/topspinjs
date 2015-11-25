import store from 'store';
import {SYNC_PLAYERS, ADD_PLAYER} from 'lib/actionTypes.js';

export function syncPlayers(payload) {
  store.dispatch({
    type: SYNC_PLAYERS
  , players: payload
  });
}

export function addPlayer(player) {
  store.dispatch({
    type: ADD_PLAYER
  , player
  });
}
