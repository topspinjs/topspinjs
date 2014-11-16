var AppDispatcher = require('../lib/AppDispatcher.js');
var PlayerStoreConstants = require('../constants/PlayerStoreConstants.js');

var PlayerStoreActions = {

  loadPlayers: function(data) {
    AppDispatcher.handleAction({
      actionType: PlayerStoreConstants.LOAD_PLAYERS,
      data: data
    });
  }

};

module.exports = PlayerStoreActions;
