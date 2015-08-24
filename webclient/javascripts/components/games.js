var React = require('react');

var GameItem = require('./games/item.js');
var PlayerPicker = require('./playerpicker/PlayerPicker.js');

/**
 * Games controller view.
 */
var Games = React.createClass({
  getInitialState: function () {
    return _.extend({
      stripeColors: _.shuffle(_.range(10))
    }, this._getAppState());
  },
  getStripeIndex: function (index) {
    var stripes = this.state.stripeColors;
    return stripes[stripes.length % index];
  },
  render: function () {
    var self = this;

    return (
      <div className='game-board full-expanded'>
        <div className='game-list-container'>
          <ul className='game-list'>
          {this.state.games.map(function (game, index) {
            return <GameItem game={game} index={self.getStripeIndex(index)}/>;
          })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Games;
