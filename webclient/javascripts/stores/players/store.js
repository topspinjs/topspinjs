var AppDispatcher = require('../../dispatcher.js');
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
AppDispatcher.register(function(action) {
  var result = {
    'players:load': ()=> PlayersStore.fetch()
  }[action.actionType];
});

PlayersStore.fetch();

module.exports = PlayersStore;
