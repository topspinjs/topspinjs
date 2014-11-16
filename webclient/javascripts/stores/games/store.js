var AppDispatcher = require('../../dispatcher.js');
var GamesConstants = require('../../constants/GamesConstants');
var EventEmitter = require('events').EventEmitter;
var Backbone = require('backbone');
var GameModel = require('./model.js');

// Games store is just a backbone collection
var Collection = Backbone.Collection.extend({
  url: '/api/games/history'
, model: GameModel
});

var GamesStore = new Collection();

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case GamesConstants.LOAD_GAMES:
      GamesStore.fetch();
      break;

    default:
      GamesStore.trigger('change');
      return true;
  }
});

GamesStore.fetch();

module.exports = GamesStore;
