import {SYNC_PLAYERS, ADD_PLAYER} from '../lib/actionTypes.js';

const initialState = {
  entities: []
};

export default function score(state=initialState, action) {
  switch(action.type) {
  case SYNC_PLAYERS:
    return {entities: action.players};
  case ADD_PLAYER:
    return {entities: [...state.players, action.player]}
  default:
    return state;
  }
}
