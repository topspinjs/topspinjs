module.exports = function (app) {

  var Promise = app.get('promise')
    , bookshelf = app.get('bookshelf')
    , Game = require('../models/game');

  function getCurrent() {
    return Game(bookshelf)
    .where('status', 'playing')
    .fetch();
  }

  function getCurrentWithRels(model) {
    var left
      , right;

    left = model.left().fetchOne().then(function (model) {
      return model;
    });

    right = model.right().fetchOne().then(function (model) {
      return model;
    });

    return Promise.all([left, right]).then(function (results) {
      return app.libs._.extend(model.attributes
      , {
        left:  results[0].attributes
      , right: results[1].attributes
      });
    });
  }

  app.post('/games', function (req, res) {
    res.json({});
  });

  app.get('/games/current', function (req, res) {
    getCurrent()
    .then(function (model) {
      return getCurrentWithRels(model);
    })
    .then(function (modelext) {
      res.json(modelext);
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
