module.exports = function (bookshelf) {
  var Game
    , Player = require('./player')(bookshelf)
    , Group = require('./group')(bookshelf)
    , Serve = require('./mixins/serve')
    , _ = require('underscore');

  Game = {
    tableName: 'games',
    hasTimestamps: true,

    defaults: {
      'status': 'scheduled'
    },

    players: function (params) {
      return this.belongsToMany(Player).query(
        {where: params}
      );
    },

    groups: function (params) {
      return this.belongsToMany(Group).query(
        {where: params}
      );
    },

    is_singles: function () {
      return this.get('type') === 'singles';
    },

    side: function (params) {
      if (this.is_singles()) {
        return this.players(params);
      } else {
        return this.groups(params);
      }
    },

    left: function () {
      return this.side({left: true});
    },

    right: function () {
      return this.side({left: false});
    },

    load: function () {
      var self = this
        , left
        , right;

      left = this.left().fetchOne().then(function (model) {
        return model;
      });

      right = this.right().fetchOne().then(function (model) {
        return model;
      });



      return Promise.all([left, right]).then(function (results) {
        self.sides = {
          left: results[0]
        , right: results[1]
        };
      }).then(function(){
        var left_players
          , right_players;

        if (!self.is_singles()) {
          left_players = self.sides.left.related('players').fetch()
          right_players = self.sides.right.related('players').fetch()
        }

        return Promise.all([left_players, right_players]);
      }).then(function(results){
        if (results) {
          self.sides.left_players = results[0];
          self.sides.right_players = results[1];
        }
      });
    },

    winner: function () {
      return this.side({winner: true});
    },

    increment: function (field) {
      return this.set(field, this.get(field) + 1);
    },

    warmup: function (side) {
      if (side === 'left' || side === 'right') {
        return this[side]().fetchOne().then(function (model) {
          return model.pivot.set({
            serve: true
          }).save();
        });
      }
    },
  };

  _.extend(Game, Serve);

  return bookshelf.Model.extend(Game);
};
