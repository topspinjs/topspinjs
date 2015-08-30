import {
  SYNC_GROUPS
, ADD_GROUP
, UPDATE_GROUP
} from '../lib/actionTypes.js';

import _ from 'underscore';

const initialState = {
  entities: []
, byId: {}
};

export default function score(state=initialState, action) {
  let entities;

  switch(action.type) {
  case SYNC_GROUPS:
    entities = action.groups;
    return {entities, byId: _.indexBy(entities, 'id')};
  case ADD_GROUP:
    entities = [...state.entities, action.group];
    return {entities, byId: _.indexBy(entities, 'id')};
  case UPDATE_GROUP:
    const index = state.entities.findIndex((group) => group.id === action.group.id)
    return {
      entities: [
        ...state.entities.slice(0, index)
      , action.group
      , ...state.entities.slice(index + 1)
      ]
    }
  default:
    return state;
  }
}


