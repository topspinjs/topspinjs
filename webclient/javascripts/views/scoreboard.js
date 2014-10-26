/** @jsx React.DOM */

var React = require('react');
var socket = io.connect('http://localhost:3000');

var Scoreboard = React.createClass({
  getInitialState: function () {
    socket.on('point', this.fetchState);

    $.getJSON('/api/games/current', this.fetchState);
    $.getJSON('/api/players', this.fetchPlayers);

    return {
      score_left: 0
    , score_right: 0
    , left: {}
    , right: {}
    };
  },
  fetchState: function (data) {
    if (!this.players) {
      return;
    }

    data.left = _.findWhere(this.players, {id: data.left});
    data.right = _.findWhere(this.players, {id: data.right});

    this.setState(data);
  },
  fetchPlayers: function (data) {
    this.players = data;
  },
  render: function () {
    return (
      <div className="full-expanded scoreboard-layout">
        <div className="scoreboard scoreboard--flex absolute-positioned">
          <div className="scoreboard__item">
            <div className="scoreboard__player">
              <div className="scoreboard__info">
                {this.state.score_left}
              </div>
              <div className="scoreboard__name">
                {this.state.left.name}
              </div>
              <div className="scoreboard__avatar">
                <img src="/images/example/player-1.svg" />
              </div>
            </div>
          </div>
          <div className="scoreboard__item">
            <div className="scoreboard__player">
              <div className="scoreboard__info">
                {this.state.score_right}
              </div>
              <div className="scoreboard__name">
                {this.state.right.name}
              </div>
              <div className="scoreboard__avatar">
                <img src="/images/example/player-2.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Scoreboard;
