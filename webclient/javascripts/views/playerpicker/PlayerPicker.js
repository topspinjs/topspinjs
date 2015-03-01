/** @jsx React.DOM */

var React = require('react');

var GamesActions = require('../../actions/GamesActions.js');

var PlayerPickerItem = React.createClass({
  render: function () {
    var styles = {
      backgroundImage: 'url(' + this.props.player.avatar + ')'
    };

    return (
      <li onClick={this.props.onClick} className={"playerpicker__item " + (this.props.selected ? 'playerpicker__selected' : '')} style={styles}></li>
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
    var selected = this.state.selected;

    if (_.contains(selected, player)) {
      selected = _.without(selected, player);
    } else {
      selected.push(player);
    }

    this.setState({selected: selected});
  },
  onAddTeam: function () {
    this.props.addTeam(this.state.selected);
  },
  render: function () {
    var self = this;

    return (
      <div>
        <button className="addteam" onClick={this.onAddTeam}>Add Team!</button>
        <ul className="playerpicker">
        {this.state.players.map(function (player) {
          return <PlayerPickerItem player={player} selected={_.contains(self.state.selected, player)} onClick={_.partial(self.onPlayerSelect, player)}/>;
        })}
        </ul>
      </div>
    );
  },
});

module.exports = PlayerPicker;
