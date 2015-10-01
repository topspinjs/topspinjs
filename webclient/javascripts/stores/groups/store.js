var AppDispatcher = require('../../dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var Backbone = require('backbone');
var GroupModel = require('./model.js');

// Players store is just a backbone collection
var Collection = Backbone.Collection.extend({
  url: '/api/groups'
, model: GroupModel
});


var GroupsStore = new Collection();

// Register dispatcher callback
AppDispatcher.register(function(action) {
  var result = {
    'groups:load': ()=> GroupsStore.fetch()
  }[action.actionType];
});

GroupsStore.fetch();

module.exports = GroupsStore;
