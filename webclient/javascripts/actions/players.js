import store from 'store';
import {SYNC_PLAYERS} from 'lib/actionTypes.js';

export function syncPlayers(payload) {
  store.dispatch({
    type: SYNC_PLAYERS
  , players: payload
  });
}
