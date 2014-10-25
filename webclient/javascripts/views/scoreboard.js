/** @jsx React.DOM */

var React = require('react');
var socket = io.connect('http://localhost:3000');

var Scoreboard = React.createClass({
  getInitialState: function () {
    socket.on('point', this.fetchState);

    this.fetchState();

    return {
      score_left: 0
    , score_right: 0
    };
  },
  fetchState: function () {
    $.getJSON('/api/games/current', (data)=> this.setState(data));
  },
  render: function () {
    return (<div>
      <h1>{this.state.score_left}</h1>
      <h1>{this.state.score_right}</h1>
    </div>)
  }
});

module.exports = Scoreboard;
