module.exports = function (app, io) {

  var connections = []
    , events = app.get('events')
    ,  _ = require('underscore')
    , uaparse = require('user-agent-parser')
    , chalk = require('chalk');


  io.on('connection', function (socket) {
    console.log(chalk.green('New connection'));

    events.emit('connections.new', {
      ip: socket.handshake.address
    , agent: uaparse(socket.handshake.headers['user-agent'])
    });

    connections.push(socket);

    socket.on('disconnect', function () {
      connections = _.without(connections, socket);

      io.sockets.emit('user disconnected');
    });
  });

  events.on('point', function (game) {
    console.log(chalk.green('New point'));
    io.emit('point', game);
  });

  events.on('players.new', function (player) {
    console.log(chalk.green('Emit new player'));
    io.emit('players.new', player.toJSON());
  });

  events.on('games.new', function (game) {
    console.log(chalk.green('Emit new game'));
    io.emit('games.new', game.toJSON());
  });

  events.on('connections.new', function (connection) {
    console.log(chalk.green('Emit new connection'));
    io.emit('connections.new', connection);
  });

};
