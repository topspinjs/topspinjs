var Dispatcher = require('flux').Dispatcher
  , dispatcher = new Dispatcher();

/**
 * handleAction
 */
dispatcher.handleAction = function (action) {
  this.dispatch({
    actionType: action.actionType
  , data: action.data
  });
};

module.exports = dispatcher;
