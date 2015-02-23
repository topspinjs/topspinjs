var AppDispatcher = require('../dispatcher.js');

module.exports = {
  load: function() {
    AppDispatcher.handleAction({
      actionType: 'games:load'
    });
  },
  schedule: function(left, right, type='singles') {
    AppDispatcher.handleAction({
      actionType: 'games:schedule'
    , data: {left, right, type}
    });
  }
};
