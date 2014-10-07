module.exports = function (bookshelf) {
  var Player = require('./player')(bookshelf);

  return bookshelf.Model.extend({
    tableName: 'groups',

    players: function () {
      return this.belongsToMany(Player, 'groups_players');
    }
  });
};
