/** @jsx React.DOM */

var React = require('react');
var socket = io.connect();
var PlayersStore = require('../../stores/players/store.js');
var ScoreBoardSide = require('./ScoreBoardSide.js');

var ScoreBoard = React.createClass({
  getInitialState: function () {
    $.getJSON('/api/games/current', this.fetchState);

    return {
      score_left: 0
    , score_right: 0
    , left: {}
    , right: {}
    , players: PlayersStore
    };
  },
  fetchState: function (data) {
    if (!this.state.players) {
      return;
    }

    data.left = this.state.players.get(data.left).toJSON();
    data.right = this.state.players.get(data.right).toJSON();

    this.setState(data);
  },
  onDisconnect: function () {
    // # Blur grey...
    this.setState({
      connection: false
    });
  },
  render: function () {
    return (
      <div className="scoreboard full-expanded">
        <ScoreBoardSide score={this.state.score_left} player={this.state.left}/>
        <ScoreBoardSide score={this.state.score_right} player={this.state.right}/>
      </div>
    );
  },
  _onChange: function () {
    this.setState({
      players: PlayersStore.toJSON()
    });
  },
  componentDidMount: function () {
    socket.on('point', this.fetchState);
    socket.on('disconnect', this.onDisconnect);

    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = ScoreBoard;
