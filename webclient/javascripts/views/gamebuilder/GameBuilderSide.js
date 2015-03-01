/** @jsx React.DOM */

var React = require('react');
var GamesStore = require('../../stores/games/store.js');
var PlayersStore = require('../../stores/players/store.js');
var PlayerPicker = require('../../views/playerpicker/PlayerPicker.js');

var GameBuilderSide = React.createClass({
  _getAppState: function () {
    return {
      player: {}
    };
  },
  getInitialState: function () {
    return _.extend({
      openMenu: false
    }, this._getAppState());
  },
  openMenu: function () {
    this.setState({openMenu: true});
  },
  addTeam: function (selected) {
    this.setState({
      player: selected[0] // TODO
    , openMenu: false
    });
  },
  render: function () {
    var styles = {
      backgroundImage: 'url(' + this.state.player.avatar + ')'
    };

    return (
      <div className="scoreboard__item">
        <div className="scoreboard__player">
          <div className="scoreboard__select" onClick={this.openMenu}>+</div>
          <div className="scoreboard__avatar" style={styles}></div>
          <div className="scoreboard__name">
            {this.state.player.name || "Add Team"}
          </div>
        </div>
        <div className={'playerpicker offscreen-menu slide-from-bottom ' + (this.state.openMenu ? 'show' : 'hide')}>
          <PlayerPicker addTeam={this.addTeam}/>
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState(this._getAppState());
  },
  componentDidMount: function () {
    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = GameBuilderSide;
