import {
  SYNC_GAMES
, ADD_GAME_FULFILLED
, UPDATE_GAME
} from '../lib/actionTypes.js';

import _ from 'underscore';

const initialState = {
  entities: []
, byId: {}
};

export default function score(state=initialState, action) {
  let entities;

  switch(action.type) {
  case SYNC_GAMES:
    entities = action.games;
    return {entities, byId: _.indexBy(entities, 'id')};
  case ADD_GAME_FULFILLED:
    entities = [...state.entities, action.game];
    return {entities, byId: _.indexBy(entities, 'id')};
  case UPDATE_GAME:
    const index = state.entities.findIndex((game) => game.id === action.game.id)
    return {
      entities: [
        ...state.entities.slice(0, index)
      , action.game
      , ...state.entities.slice(index + 1)
      ]
    }
  default:
    return state;
  }
}

