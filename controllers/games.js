module.exports = function (app) {

  var bookshelf = app.get('bookshelf')
    , Game = require('../models/game');

  function getCurrent() {
    return Game(bookshelf)
    .where('status', 'playing')
    .fetch();
  }

  app.post('/games', function (req, res) {
    res.json({});
  });

  app.get('/games/current', function (req, res) {
    getCurrent()
    .then(function (model) {
      res.json(model);
    });
  });

  app.post('/games/current/left', function (req, res) {
    getCurrent()
    .then(function (model) {
      model.set('score0', model.get('score0') + 1).save();
    })
    .then(function (model) {
      res.json(model);
    });
  });

  app.post('/games/current/right', function (req, res) {
    getCurrent()
    .then(function (model) {
      model.set('score1', model.get('score1') + 1).save();
    })
    .then(function (model) {
      res.json(model);
    });
  });

};
