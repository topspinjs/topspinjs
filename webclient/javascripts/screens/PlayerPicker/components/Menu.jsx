import React from 'react'
import _ from 'underscore';

var NewPlayerPickerItem = React.createClass({
  render: function () {
    return (
      <li onClick={this.props.onInviteUser} className={"player-picker__item player-picker__item--new-player"}></li>
    );
  }
});

var PlayerPickerItem = React.createClass({
  render: function () {
    var styles = {
      backgroundImage: 'url(' + this.props.player.avatar + ')'
    };

    return (
      <li
        onClick={this.props.onClick}
        className={"player-picker__item " + (this.props.selected ? 'player-picker__item--selected' : '')}
        style={styles}>
      </li>
    );
  }
});

/**
 * Games controller view.
 */
var Menu = React.createClass({
  displayName: 'PlayerPicker Menu'

, getInitialState: function () {
    return {
      inviting: false
    , selected: []
    };
  },

  onInviteUser: function () {
    this.setState({
      inviting: !this.state.inviting
    });
  },

  onCreatePlayer: function () {
    console.log('on create player');
  },

  renderPlayers: function () {
    console.log('this.props.selected', this.props.selected);
    return (
      this.props.players.map((player) =>
        <PlayerPickerItem
          player={player}
          selected={_.contains(this.props.selected, player.id)}
          onClick={() => this.props.onPlayerSelect(player.id)}
        />
      )
    );
  },

  render: function () {
    return (
      <div className="player-picker">
        <div onClick={this.props.toggleMenu} className="player-picker__header">
          <img src="/images/angle-down.svg"/>
        </div>
        <ul className="player-picker__list">
          {this.renderPlayers()}
          <NewPlayerPickerItem onInviteUser={this.onInviteUser}/>
        </ul>
        <div className={'player-picker__qrcode ' + (this.state.inviting ? 'show' : 'hide')}>
          <img src="/auth/qrcode.png" onClick={this.onInviteUser}/>
        </div>
      </div>
    );
  },
});

export default Menu;
