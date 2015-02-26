/** @jsx React.DOM */

var React = require('react');

var AppDispatcher = require('../dispatcher.js');
var GamesActions = require('../actions/GamesActions.js');

var PlayerPickerItem = React.createClass({
  render: function () {
    return (
      <li>
        <input type="checkbox" onChange={this.props.onChange}/>
        -
        {this.props.player.name}
      </li>
    );
  }
});

/**
 * Games controller view.
 */
var PlayerPicker = React.createClass({
  getInitialState: function () {
    return {
      players: this.props.players
    , selected: []
    };
  },
  onPlayerSelect: function (player, event) {
    var selected = this.state.selected
      , isChecked = $(event.currentTarget).is(':checked');

    if (this.state.selected.length >= 2 && isChecked) {
      event.preventDefault();
      return;
    }

    if (isChecked) {
      selected.push(player.id);
    } else {
      selected = _.without(selected, player.id);
    }

    this.setState({selected: selected});
  },
  onSchedule: function () {
    var [left, right] = this.state.selected;

    GamesActions.schedule(left, right);
  },
  render: function () {
    var self = this;

    return (
      <div>
        <button onClick={this.onSchedule}>Schedule!</button>
        <ul>
        {this.state.players.map(function (player) {
          return <PlayerPickerItem player={player} onChange={_.partial(self.onPlayerSelect, player)}/>;
        })}
        </ul>
      </div>
    );
  },
});

module.exports = PlayerPicker;
