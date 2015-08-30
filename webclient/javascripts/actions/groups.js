import store from 'store';
import {SYNC_GROUPS, UPDATE_GROUP} from 'lib/actionTypes';

export function syncGroups(payload) {
  store.dispatch({
    type: SYNC_GROUPS
  , groups: payload
  });
}

export function updateGroup(payload) {
  store.dispatch({
    type: UPDATE_GROUP
  , group: payload
  });
}

