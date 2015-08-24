import {LEFT_SCORED, RIGHT_SCORED} from '../lib/actionTypes.js';

const initialState = {
  left: 0
, right: 0
};

export default function score(state=initialState, action) {
  switch(action.type) {
  case RIGHT_SCORED:
    console.log('right scored');
    return Object.assign({}, {...state}, {right: state.right + 1})
    break;
  case LEFT_SCORED:
    console.log('left scored');
    return Object.assign({}, {...state}, {left: state.right + 1})
    break;
  default:
    return state;
  }
}
