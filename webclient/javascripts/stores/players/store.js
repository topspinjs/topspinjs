var AppDispatcher = require('../../dispatcher.js');
var PlayersConstants = require('../../constants/PlayersConstants');
var EventEmitter = require('events').EventEmitter;
var Backbone = require('backbone');
var PlayerModel = require('./model.js');

// Players store is just a backbone collection
var Collection = Backbone.Collection.extend({
  url: '/api/players'
, model: PlayerModel
});

var PlayersStore = new Collection();

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case PlayersConstants.LOAD_PLAYERS:
      PlayersStore.fetch();
      break;

    default:
      PlayersStore.trigger('change');
      return true;
  }
});

PlayersStore.fetch();

module.exports = PlayersStore;
