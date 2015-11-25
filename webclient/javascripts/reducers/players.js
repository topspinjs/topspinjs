import {SYNC_PLAYERS, ADD_PLAYER} from 'lib/actionTypes.js';

import _ from 'underscore';

const initialState = {
  entities: []
, byId: {}
};

export default function score(state=initialState, action) {
  let entities;

  switch(action.type) {
  case SYNC_PLAYERS:
    entities = action.players;
    return {entities, byId: _.indexBy(entities, 'id')};
  case ADD_PLAYER:
    entities = [...state.entities, action.player];
    return {entities, byId: _.indexBy(entities, 'id')};
  default:
    return state;
  }
}
