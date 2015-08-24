import store from 'store';
import {syncPlayers} from 'actions/players';
import {updateGame, syncGames} from 'actions/games';

const process = (res) => (new Promise((resolve, reject) =>
                           res.ok ?
                             resolve(res.json()) :
                             reject([res.status, res.statusText])
                         ))

// fetch players
fetch('/api/players')
  .then(process)
  .then(syncPlayers);

// fetch games
Promise.all([
  fetch('api/games/current').then(process)
, fetch('api/games/queue').then(process)
]).then(function ([current, queue]) {
  console.log('sync games!', current, queue);
  syncGames([...current, ...queue]);
}).catch(function () {
  syncGames([]);
});

// listen to the sockets
const socket = io.connect();
socket.on('point', (data) => updateGame(data));
