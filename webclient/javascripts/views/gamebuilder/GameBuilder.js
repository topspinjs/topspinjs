/** @jsx React.DOM */

var React = require('react');
var socket = io.connect();
var PlayersStore = require('../../stores/players/store.js');
var GameBuilderSide = require('./GameBuilderSide.js');

var GameBuilder = React.createClass({
  getInitialState: function () {
    return {
      left: {}
    , right: {}
    };
  },
  onStart: function () {
    alert('');
  },
  render: function () {
    return (
      <div className="scoreboard full-expanded">
        <GameBuilderSide player={this.state.left}/>
        <div className="scoreboard__separator" onClick={this.onStart}>
          <span className="scoreboard__vs">vs</span>
          <span className="scoreboard__start">Start</span>
        </div>
        <GameBuilderSide player={this.state.right}/>
      </div>
    );
  },
  componentDidMount: function () {
  }
});

module.exports = GameBuilder;
