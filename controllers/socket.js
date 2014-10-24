module.exports = function (app, io) {

  var events = app.get('events')
    , chalk = require('chalk');

  io.on('connection', function (socket) {
    console.log(chalk.green('New connection'));

    socket.on('disconnect', function () {
      io.sockets.emit('user disconnected');
    });

  });

  events.on('point', function () {
    console.log(chalk.green('New point'));
    io.emit('point', {});
  });

};
