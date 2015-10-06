import React from 'react'
import _ from 'underscore';

import PlayerPickerItem from './components/PlayerPickerItem';

/**
 * Games controller view.
 */
var Menu = React.createClass({
  displayName: 'PlayerPicker Menu'

, getInitialState: function () {
    return {
      inviting: false
    };
  }

, onInviteUser: function () {
    this.setState({
      inviting: !this.state.inviting
    });
  }

, renderPlayers: function () {
    return (
      this.props.players.map((player) => {
        const selected = _.contains(this.props.selectedPlayerIds, player.id)
            , disabled = _.contains(this.props.disabledPlayerIds, player.id);

        return (
          <PlayerPickerItem
            player={player}
            selected={selected}
            disabled={disabled}
            onClick={() => this.props.onSelectPlayer(player.id, {selected})}
          />
        );
      })
    );
  }

, getClasses() {
    return `player-picker player-picker--picking-${this.props.side}`
  }

, render: function () {
    return (
      <div className={this.getClasses()}>
        <div onClick={this.props.toggleMenu} className="player-picker__header">
          <img src="/images/angle-down.svg"/>
        </div>

        <ul className="player-picker__list">
          {this.renderPlayers()}
        </ul>

        <div
          className={'player-picker__qrcode ' + (this.state.inviting ? 'animated bounceIn zoomIn' : 'hide animated bounceOut zoomOut')}
          onClick={this.onInviteUser}
        >
          <h1>Sign in with Facebook</h1>
          <p>TopspinJS provides a built-in QR code to sign in with the simplest way ever. You can flash your QR code with your phone, accept the authorization request and you will be added as a new member for the current TopspinJS instance</p>
          <img src="/auth/qrcode.png" />
        </div>

        <div className="player-picker__footer">
          <div className="player-picker__footer__right">
            <button className="round-button round-button--white button--plus" onClick={this.onInviteUser}>+</button>
          </div>
        </div>

      </div>
    );
  },
});

export default Menu;
