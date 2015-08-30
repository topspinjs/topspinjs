import store from 'store';
import {syncPlayers} from 'actions/players';
import {updateGame, syncGames} from 'actions/games';
import {syncGroups} from 'actions/groups';

const process = (res) => (new Promise((resolve, reject) =>
                           res.ok ?
                             resolve(res.json()) :
                             reject([res.status, res.statusText])
                         ))

function fetchPlayers () {
  return fetch('/api/players')
          .then(process)
          .then(syncPlayers);
}

function fetchGames() {
  return Promise.all([
    fetch('api/games/current').then(process)
  , fetch('api/games/queue').then(process)
  ]).then(function ([current, queue]) {
    syncGames([current, ...queue]);
  }).catch(function () {
    syncGames([]);
  });
}

function fetchGroups () {
  return fetch('/api/groups')
          .then(process)
          .then(syncGroups);
}

function setupSockets () {
  const socket = io.connect();
  socket.on('point', (data) => updateGame(data));
}


export default function () {
  setupSockets();

  return Promise.all([
    fetchGames()
  , fetchPlayers()
  , fetchGroups()
  ]);
}
