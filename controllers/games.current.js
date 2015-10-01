module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , crypto = require('crypto')
    , bookshelf = app.get('bookshelf')
    , events = app.get('events')
    , Workflow = require('../lib/workflow')
    , Game = require('../models/game')(bookshelf);

  function currentGame (game, workflow) {
    var output = _.extend({}, game.attributes, {
      left: game.left.id
    , right: game.right.id
    });

    if (game.get('status') === 'playing') {
      output.serve_player_id = game.serve(workflow.maxPoints());
    }

    return output;
  }

  app.all('/api/games/current/*', function (req, res, next) {
    var config = app.get('config')
      , phrase
      , header
      , signature;

    if (config.token) {
      phrase = config.token + req.url;
      header = req.header('Authorization');
      signature = crypto.createHash('sha1').update(phrase).digest('hex');

      console.log('Checking signature', signature);

      if (header !== signature) {
        res.status(409).send('Invalid request signature');
      }
    }

    next();
  });

  app.all('/api/games/current*', function (req, res, next) {
    Game
    .query(function (qb) {
      qb
      .whereIn('status', ['playing', 'warmup'])
      .limit(1);
    })
    .fetch({require: true})
    .then(function (current) {
      req.current = current;
      req.workflow = new Workflow(current, app.get('config'), app.get('bookshelf'));

      req.workflow
        .load()
        .then(function(){
          next();
        });
    })
    .catch(Game.NotFoundError, function () {
      res.status(404).send('Not found');
      next();
    });
  });

  app.get('/api/games/current', function (req, res) {
    // Do nothing, just the middleware stuff
    var output = currentGame(req.current, req.workflow);

    res.json(output);
  });

  app.post('/api/games/current/left', function (req, res) {
    if (!req.workflow) {
      return;
    }

    req.workflow.left().then(function () {
      var output = currentGame(req.current, req.workflow);

      events.emit('point', output);

      res.json(output);
    });
  });

  app.post('/api/games/current/right', function (req, res) {
    if (!req.workflow) {
      return;
    }

    req.workflow.right().then(function () {
      var output = currentGame(req.current, req.workflow);

      events.emit('point', output);

      res.json(output);
    });
  });

};
