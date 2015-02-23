var AppDispatcher = require('../../dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var Backbone = require('backbone');
var GameModel = require('./model.js');
var GamesActions = require('../../actions/GamesActions.js');

// Games store is just a backbone collection
var Collection = Backbone.Collection.extend({
  url: '/api/games/queue'
, model: GameModel
});

var GamesStore = new Collection();

/**
 *
 */
function scheduleGame(data) {
  var game = new GameModel({
    left: data.left
  , right: data.right
  });

  game.save().then(GamesActions.load);
}

// Register dispatcher callback
AppDispatcher.register(function(action) {
  console.log('action.actionType', action.actionType);

  _.result({
    "games:load": ()=> GamesStore.fetch()
  , "games:schedule": ()=> scheduleGame(action.data)
  }, action.actionType);
});

GamesActions.load();

module.exports = GamesStore;
