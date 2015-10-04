module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , bookshelf = app.get('bookshelf')
    , events = app.get('events')
    , Game = require('../models/game')(bookshelf);

  function searchGames(res, filter) {
    return Game
    .query(filter)
    .fetchAll({withRelated: ['left', 'right']})
    .then(function (results) {
      var output = results.map(function (game) {
        return (_.extend({}, game.attributes, {
        //  left: game.sides.left.id
        //  , right: game.sides.right.id
        }));
      });

      return output;
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
      qb.whereNotIn('status', ['scheduled', 'playing', 'warmup']);
    }).then(function (output) {
      res.json(output);
    });
  });

  //app.get('/api/games/:id', function (req, res) {
    //searchGames(res, function (qb) {
      //qb.where('id', req.params.id);
    //}).then(function (output) {
      //res.json(output[0]);
    //});
  //});

  app.post('/api/games', function (req, res) {
    //TODO validate params
    var newGame
      , type
      , sides
      , params = req.body;

    type = {singles: 'player', doubles: 'group'}[params.type];

    sides = _.map([params.left, params.right], function (side, index) {
      var result = {};

      result[type + '_id'] = side;
      result.left = !index;

      return result;
    });

    params = _.omit(params, 'left', 'right');

    params = _.extend(params, {
      status: 'warmup'
    });

    newGame = Game.forge(params);

    newGame
      .save()
      .tap(function () {
        return newGame.related(type + 's').attach(sides);
      }).then(function () {
        events.emit('games.new', newGame);
        res.json(newGame.attributes);
      });
  });
};
