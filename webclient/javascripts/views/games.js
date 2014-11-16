/** @jsx React.DOM */

var React = require('react');

var GamesStore = require( '../stores/games/store.js');
var GamesConstants = require('../constants/GamesConstants.js');
var AppDispatcher = require('../dispatcher.js');
var GameItem = require('../views/games/item.js');

/**
 * Games controller view.
 */
var Games = React.createClass({
  _getAppState: function () {
    return {
      games: GamesStore.toJSON()
    };
  },
  getInitialState: function () {
    return this._getAppState();
  },
  render: function () {
    return (
      <div>
        <h1>Games: {this.state.games.length}</h1>
        <ul>
        {this.state.games.map(function (game) {
          return <GameItem game={game}/>
        })}
        </ul>
      </div>
    )
  },
  _onChange: function () {
    this.setState(this._getAppState());
  },
  componentDidMount: function () {
    GamesStore.on('change sync', this._onChange, this);
  }
});

module.exports = Games;
