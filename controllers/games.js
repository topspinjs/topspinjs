module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  function searchGames(res, filter) {
    return Game
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

        return output;
      });
    });
  }

  app.get('/api/games/queue', function (req, res) {
    searchGames(res, function (qb) {
      qb.where('status', 'scheduled');
    }).then(function (output) {
      res.json(output);
    });
  });

  app.get('/api/games/history', function (req, res) {
    searchGames(res, function (qb) {
      qb.whereNotIn('status', ['scheduled', 'playing']);
    }).then(function (output) {
      res.json(output);
    });
  });

  app.get('/api/games/:id', function (req, res) {
    searchGames(res, function (qb) {
      qb.where('id', req.params.id);
    }).then(function (output) {
      res.json(output[0]);
    });
  });
};
