module.exports = function (app) {

  var qr = require('qr-image')
    , config = app.get('config')
    , bookshelf = app.get('bookshelf')
    , Player = require('../models/player')(bookshelf);

  function mapPlayer(player) {
    if (player.get('secret')) {
      player.set('secret', true);
    }

    return player.omit('password');
  }

  app.get('/api/players', function (req, res) {
    Player
    .fetchAll()
    .then(function (players) {
      res.json(players.map(mapPlayer));
    });
  });

  app.param('user_id', function (req, res, next, id) {
    Player
    .where('id', id)
    .fetch()
    .then(function (player) {
      req.player = player;
      next();
    });
  });

  app.get('/api/players/:user_id', function (req, res) {
    res.json(mapPlayer(req.player));
  });

  app.get('/api/players/:user_id/stats', function (req, res) {
    res.json({
      played_games: req.player.get('played_games')
    , won_games: 1001
    , lost_games: 22
    , humiliations: 121
    , humiliated: 1
    });
  });

  app.get('/api/players/:user_id/twofactor.png', function (req, res) {
    // TODO: This endpoint must be available once
    var url
      , code;

    url = "otpauth://totp/" +
          req.player.get('login') + "@" + config.domain +
          "?secret=" + req.player.get('secret');

    code = qr.image(url, { type: 'svg' });
    res.type('svg');
    code.pipe(res);
  });

};
