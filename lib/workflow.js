var Promise = require('bluebird');

function Workflow (game, config, bookshelf) {
  this.game = game;
  this.config = config;
  this.bookshelf = bookshelf;
}

Workflow.prototype.load = function () {
  return this.game.load();
};

Workflow.prototype.maxPoints = function () {
 if (this.game.is_singles()) {
   return this.config.singles_max_points;
 } else {
   return this.config.groups_max_points;
 }
};

Workflow.prototype.left = function () {
  return this.score('left');
};

Workflow.prototype.right = function () {
  return this.score('right');
};

Workflow.prototype.score = function (side) {
  var self = this
    , warmup
    , warmup_set;

  if (this.game.get('status') === 'warmup') {
    //warmup_set = this.game.warmup(side);
    warmup = this.game.set({
      status: 'playing'
    }).save();

    return Promise.all([warmup_set, warmup]);
  } else {
    return this.game.increment('score_' + side)
      .save()
      .then(function () {
        return self.complete();
      });
  }
};

Workflow.prototype.complete = function () {
  var played
    , queued
    , max_points
    , left_won
    , right_won
    , left_update
    , right_update;

  max_points = this.maxPoints();

  left_won = this.game.get('score_left') >= max_points;
  right_won = this.game.get('score_right') >= max_points;

  if (left_won || right_won) {
    played = this.game.set({
      end: new Date()
    , status: 'played'
    }).save();

    left_update = this.game.sides.left.pivot.set({
      winner: left_won
    });

    right_update = this.game.sides.right.pivot.set({
      winner: right_won
    });

    queued = this.nextSchedulledGame();
  }

  return Promise.all([left_update, right_update, played, queued]);
};

Workflow.prototype.nextSchedulledGame = function () {
  var Game = require('../models/game')(this.bookshelf);

  return Game
  .where('status', 'scheduled')
  .fetch()
  .then(function (model) {
      if (!model) {
        return;
      }

      return model.set({
        start: new Date()
      , status: 'warmup'
      }).save();
    });
};

module.exports = Workflow;
