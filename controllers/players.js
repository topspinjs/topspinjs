module.exports = function (app) {

  var bookshelf = app.get('bookshelf')
    , Player = require('../models/player')(bookshelf);

  app.get('/players', function (req, res) {
    Player
    .fetchAll()
    .then(function (players) {
      res.json(players);
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

  app.get('/players/:user_id', function (req, res) {
    res.json(req.player);
  });

  app.get('/players/:user_id/stats', function (req, res) {
    res.json({
      played_games: req.player.get('played_games')
    , won_games: 1001
    , lost_games: 22
    , humiliations: 121
    , humiliated: 1
    });
  });

};
