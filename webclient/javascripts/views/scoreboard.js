/** @jsx React.DOM */

var React = require('react');
var socket = io.connect('http://localhost:3000');

var Scoreboard = React.createClass({
  getInitialState: function () {
    socket.on('point', this.fetchState);

    $.getJSON('/api/games/current', (data)=> this.setState(data));

    return {
      score_left: 0
    , score_right: 0
    };
  },
  fetchState: function (data) {
    this.setState(data);
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
              <div className="scoreboard__avatar">
                <img src="/images/example/player-1.png" />
              </div>
            </div>
          </div>
          <div className="scoreboard__item">
            <div className="scoreboard__player">
              <div className="scoreboard__info">
                {this.state.score_right}
              </div>
              <div className="scoreboard__avatar">
                <img src="/images/example/player-2.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Scoreboard;
