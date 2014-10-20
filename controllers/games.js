module.exports = function (app) {

  var Promise = require('bluebird')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  app.get('/api/games/queue', function (req, res) {
    Game
    .where('status', 'scheduled')
    .fetchAll()
    .then(function (models) {
      res.json(models);
    });
  });

  app.get('/api/games/history', function (req, res) {
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
