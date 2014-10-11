module.exports = function (bookshelf) {
  var Player = require('./player')(bookshelf)
    , Group = require('./group')(bookshelf);

  return bookshelf.Model.extend({
    tableName: 'games',
    hasTimestamps: true,

    players: function (params) {
      return this.belongsToMany(Player, 'games_players', 'game_id', 'player_id').query(
        {where: params}
      );
    },

    groups: function (params) {
      return this.hasMany(Group, 'games_groups').query(
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

    winner: function () {
      return this.side({winner: true});
    }
  });
};
