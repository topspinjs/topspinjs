/** @jsx React.DOM */

var React = require('react');
var PlayersStore = require('../../stores/players/store.js');

/**
 * Games controller view.
 */
var Games = React.createClass({
  render: function () {
    return (
      <li className={'game-item' + ' stripe-' + this.props.index}>
        <span className='game-player-name game-player--left'>
        	{PlayersStore.get(this.props.game.left).get('name')}
        </span>
        <span className="vs">VS</span>
        <span className='game-player-name game-player--right'>
        	{PlayersStore.get(this.props.game.right).get('name')}
        </span>
      </li>
    );
  }
});

module.exports = Games;
