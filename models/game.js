module.exports = function (bookshelf) {
  var Player = require('./player')(bookshelf)
    , Group = require('./group')(bookshelf);

  return bookshelf.Model.extend({
    tableName: 'games',

    players: function (params) {
      return this.belongsToMany(Player, 'games_players').query(
        {where: params}
      );
    },

    groups: function (params) {
      return this.belongsToMany(Group, 'games_groups').query(
        {where: params}
      );
    },

    singles: function () {
      return this.get('type') !== 'singles';
    },

    side: function (params) {
      if (this.singles()) {
        return this.players(params);
      } else {
        return this.groups(params);
      }
    },

    left: function () {
      this.side({left: true});
    },

    right: function () {
      this.side({left: false});
    },

    winner: function () {
      this.side({winner: true});
    }
  });
};
