module.exports = function (app) {

  var Promise = app.get('promise')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  app.get('/games/queue', function (req, res) {
    Game
    .where('status', 'scheduled')
    .fetchAll()
    .then(function (models) {
      res.json(models);
    });
  });

  app.get('/games/history', function (req, res) {
    Game
    .query(function (qb) {
      qb.whereNotIn('status', ['scheduled', 'playing']);
    })
    .fetchAll()
    .then(function (models) {
      res.json(models);
    });
  });

};
