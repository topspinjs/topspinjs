module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  function searchGames(res, filter) {
    Game
    .query(filter)
    .fetchAll()
    .then(function (collection) {
      return collection.mapThen(function (game) {
        return Promise.all([game.left().fetchOne(), game.right().fetchOne()]).then(function (results) {
          game.left = results[0];
          game.right = results[1];
          return game;
        });
      }).then(function (results) {
        var output = results.map(function (game) {
          return (_.extend({}, game.attributes, {
            left: game.left.id
          , right: game.right.id
          }));
        });
        res.json(output);
      });
    });
  }

  app.get('/api/games/queue', function (req, res) {
    searchGames(res, function (qb) {
      qb.where('status', 'scheduled');
    });
  });

  app.get('/api/games/history', function (req, res) {
    searchGames(res, function (qb) {
      qb.whereNotIn('status', ['scheduled', 'playing']);
    });
  });
};
