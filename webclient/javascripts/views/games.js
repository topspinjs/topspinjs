/** @jsx React.DOM */

var React = require('react');

var GamesStore = require( '../stores/games/store.js');
var PlayersStore = require( '../stores/players/store.js');
var AppDispatcher = require('../dispatcher.js');
var GameItem = require('./games/item.js');
var PlayerPicker = require('./player-picker.js');

/**
 * Games controller view.
 */
var Games = React.createClass({
  _getAppState: function () {
    return {
      games: GamesStore.toJSON()
    , players: PlayersStore.toJSON()
    };
  },
  getInitialState: function () {
    return _.extend({
      openMenu: false
    , stripeColors: _.shuffle(_.range(10))
    }, this._getAppState());
  },
  openMenu: function () {
    this.setState({openMenu: true});
  },
  getStripeIndex: function (index) {
    var stripes = this.state.stripeColors;
    return stripes[stripes.length % index];
  },
  render: function () {
    var self = this;

    return (
      <div className='game-board full-expanded'>
      	<div className='game-list-container'>
      	  <ul className='game-list'>
      	  {this.state.games.map(function (game, index) {
      	    return <GameItem game={game} index={self.getStripeIndex(index)}/>;
      	  })}
          <li className='game-item schedule-game' onClick={this.openMenu}><span>+</span></li>
      	  </ul>
      	</div>
      	<div className={'offscreen-menu slide-from-bottom ' + (this.state.openMenu ? 'show' : 'hide')}>
      	  <h1>Schedule a game</h1>
      	  <PlayerPicker players={this.state.players}/>
      	</div>
      </div>
    );
  },
  _onChange: function () {
    this.setState(this._getAppState());
  },
  componentDidMount: function () {
    GamesStore.on('change sync', this._onChange, this);
    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = Games;
