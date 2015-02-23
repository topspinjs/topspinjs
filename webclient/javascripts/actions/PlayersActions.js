var AppDispatcher = require('../lib/AppDispatcher.js');

module.exports = {
  load: function(data) {
    AppDispatcher.handleAction({
      actionType: 'players:load'
    });
  }
};
