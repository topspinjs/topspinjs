module.exports = function (app) {

  var bookshelf = app.get('bookshelf')
    , Player = require('../models/player');

  app.get('/players', function (req, res) {

    Player(bookshelf)
    .fetchAll()
    .then(function (players) {
      res.json(players.toJSON());
    });
  });

};
