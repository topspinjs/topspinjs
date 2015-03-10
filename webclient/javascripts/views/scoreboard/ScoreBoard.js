/** @jsx React.DOM */

var React = require('react');
var socket = io.connect();

var GamesActions = require('../../actions/GamesActions.js');
var PlayersStore = require('../../stores/players/store.js');
var GroupsStore = require('../../stores/groups/store.js');

var ScoreBoardSide = require('./ScoreBoardSide.js');

var ScoreBoard = React.createClass({
  getInitialState: function () {
    $.getJSON('/api/games/current')
      .done(this.fetchState)
      .fail(this.buildGame);

    return {
      score_left: 0
    , score_right: 0
    , left: {}
    , right: {}
    , players: PlayersStore
    , groups: GroupsStore
    };
  },
  buildGame: function () {
    this.setState({
      status: 'warmup'
    });
  },
  fetchState: function (data) {
    if (!this.state.players) {
      return;
    }

    if (this.state.type === 'singles') {
      data.left = this.state.players.get(data.left).toJSON();
      data.right = this.state.players.get(data.right).toJSON();
    } else {
      data.left = this.state.groups.get(data.left).toJSON();
      data.right = this.state.groups.get(data.right).toJSON();
    }

    this.setState(data);
  },
  onStart: function () {
    alert(this.state.left);

    GamesActions.schedule(this.state.left, this.state.right);
  },
  onDisconnect: function () {
    // # Blur grey...
    this.setState({
      connection: false
    });
  },
  render: function () {
    return (
      <div className={"scoreboard full-expanded scoreboard--gamestatus-" + this.state.status}>
        <ScoreBoardSide game={this.state} side='left'/>
        <div className="scoreboard__separator" onClick={this.onStart}>
          <div><span className="scoreboard__vs">vs</span></div>
          <div><span className="scoreboard__start">Start</span></div>
        </div>
        <ScoreBoardSide game={this.state} side='right'/>
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
