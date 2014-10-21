module.exports = function (app) {

  var Promise = require('bluebird')
    , _ = require('underscore')
    , bookshelf = app.get('bookshelf')
    , Group = require('../models/group')(bookshelf);

  app.get('/api/groups', function (req, res) {
    Group
    .fetchAll({
      withRelated: ['players']
    }).then(function (results) {
      var output = results.map(function (group) {
        return (_.extend({}, group.attributes, {
          members: group.related('players').map(function (player) {
            return player.id;
          })
        }));
      });
      res.json(output);
    });
  });
};
