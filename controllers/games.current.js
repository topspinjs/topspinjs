module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  app.all('/api/games/current*', function (req, res, next) {
    Game
    .query(function (qb) {
      qb
      .where('status', 'playing')
      .limit(1);
    })
    .fetch({require: true})
    .then(function (current) {
      var left
        , right;

      req.current = current;

      next();

      left = current.left().fetchOne().then(function (model) {
        return model;
      });

      right = current.right().fetchOne().then(function (model) {
        return model;
      });

      return Promise.all([left, right]).then(function (results) {
        var config = app.get('config')
          , winner
          , played
          , queued
          , max_points
          , left_won
          , right_won
          , left_update
          , right_update
          , score_left
          , score_right;

        current.left = results[0];
        current.right = results[1];

        score_left = current.get('score_left');
        score_right = current.get('score_right');

        if (current.is_singles()) {
          max_points = config.singles_max_points;
        } else {
          max_points = config.groups_max_points;
        }

        left_won = score_left >= max_points;
        right_won = score_right >= max_points;

        if (left_won || right_won) {
          played = current.set({
            end: new Date()
          , status: 'played'
          }).save();

          left_update = current.left.pivot.set({
            winner: left_won
          });

          right_update = current.right.pivot.set({
            winner: right_won
          });

          queued = Game
          .where('status', 'scheduled')
          .fetch()
          .then(function (model) {
              if (!model) {
                return;
              }

              return model.set({
                start: new Date()
              , status: 'playing'
              }).save();
            });
        }

        return Promise.all([left_update, right_update, played, queued]).then(function (results) {
          // Output allways the current game
          res.json(_.extend({}, current.attributes, {
            left: current.left.id
          , right: current.right.id
          }));
        });
      });
    })
    .catch(Game.NotFoundError, function () {
      debugger

      res.status(404).send('Not found');
      next();
    });
  });

  app.get('/api/games/current', function (req, res) {
  });

  app.post('/api/games/current/left', function (req, res) {
    if (!req.current) {
      return;
    }

    return req.current.increment('score_left').save();
  });

  app.post('/api/games/current/right', function (req, res) {
    if (!req.current) {
      return;
    }

    return req.current.increment('score_right').save();
  });

};
