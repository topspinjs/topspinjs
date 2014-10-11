module.exports = function (app) {

  var Promise = app.get('promise')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game')(bookshelf);

  app.all('/games/current*', function (req, res, next) {
    Game
    .where('status', 'playing')
    .fetch()
    .then(function (current) {
      var left
        , right;

      left = current.left().fetchOne().then(function (model) {
        return model;
      });

      right = current.right().fetchOne().then(function (model) {
        return model;
      });

      return Promise.all([left, right]).then(function (results) {
        current.left = results[0];
        current.right = results[1];
        req.current = current;

        next();

        // Output allways the current game
        res.json(app.libs._.extend({}, current.attributes, {
          left: current.left.attributes
        , right: current.right.attributes
        }));
      });
    });
  });

  app.get('/games/current', function (req, res) {
  });

  app.post('/games/current/left', function (req, res) {
    req.current.increment('score_left').save();
  });

  app.post('/games/current/right', function (req, res) {
    req.current.increment('score_right').save();
  });

};
