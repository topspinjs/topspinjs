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
  render: function () {
    return (
      <div className="scoreboard full-expanded">
        <GameBuilderSide player={this.state.left}/>
        <GameBuilderSide player={this.state.right}/>
      </div>
    );
  },
  componentDidMount: function () {
  }
});

module.exports = GameBuilder;
