var Serve = {}
  , _ = require('underscore');

Serve.serve = function (max_points) {
  var players = []
    , tie_break
    , current_point
    , turns
    , turn_size
    , left_players
    , right_players;

  if (this.is_singles()) {
    left_players = [this.sides.left.id];
    right_players = [this.sides.right.id];
  } else {
    left_players = this.sides.left_players.map('id');
    right_players = this.sides.right_players.map('id');
  }

  do {
    players = players.concat([left_players.pop(), right_players.pop()]);
  } while (left_players.length);

  tie_break = (this.get('score_left') > max_points - 1) &&
    (this.get('score_right') > max_points - 1);

  if (!tie_break) {
    turn_size = this.is_singles() ? 2 : 5;

    turns = players.reverse().reduce(function(memo, item){
      var player_turn;

      player_turn = _.range(0, turn_size).map(function () {
        return item;
      });

      return memo.concat(player_turn);
    }, []);
  }

  current_point = this.get('score_left') + this.get('score_right');

  return turns[current_point % turns.length];
};

module.exports = Serve;
