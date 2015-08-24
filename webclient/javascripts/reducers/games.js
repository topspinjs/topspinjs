import {
  SYNC_GAMES
, ADD_GAME
, UPDATE_GAME
} from '../lib/actionTypes.js';

const initialState = {
  entities: []
};

export default function score(state=initialState, action) {
  switch(action.type) {
  case SYNC_GAMES:
    return {entities: action.games};
  case ADD_GAME:
    return {entities: [...state.entities, action.game]}
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

