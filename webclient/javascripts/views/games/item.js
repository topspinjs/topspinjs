/** @jsx React.DOM */

var React = require('react');
var PlayersStore = require('../../stores/players/store.js');

/**
 * Games controller view.
 */
var Games = React.createClass({
  render: function () {
    return (
      <li>
        {PlayersStore.get(this.props.game.left).get('name')} VS {PlayersStore.get(this.props.game.right).get('name')}
        {this.props.game.score_left} - {this.props.game.score_right}
      </li>
    )
  }
});

module.exports = Games;
