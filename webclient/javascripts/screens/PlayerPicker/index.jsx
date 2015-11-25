import React from 'react'
import {connect} from 'react-redux';
import store from 'store';
import Side from './components/Side';
import Separator from './components/Separator';
import Menu from './components/Menu';
import _ from 'underscore';
import {createGame} from 'actions/games';

const flip = (side) => side === 'left' ? 'right' : 'left';

const PlayerPickerScreen = React.createClass({
  displayName: 'PlayerPicker Screen'

, getInitialState() {
    return {
      selected_left: []
    , selected_right: []
    , isMenuOpen: false
    , side: null
    }
  }

, toggleMenu(side) {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    , side
    });
  }

, getDisabledPlayerIds() {
    return this.state[`selected_${flip(this.state.side)}`];
  }

, getSelectedPlayerIds() {
    return this.state[`selected_${this.state.side}`];
  }

, onSelectPlayer(player_id, {selected}) {
    const selected_side = `selected_${this.state.side}`;

    let result;

    if (selected) {
      result = this.state[selected_side].filter((side_player_id) => side_player_id !== player_id);
    } else {
      result = [...this.state[selected_side], player_id];
    }

    this.setState({
      [selected_side]: result
    });
  }

, getSelectedPlayers(side) {
    return this.state[`selected_${side}`].map((player_id) => this.props.playersById[player_id]);
  }

, getTotalSelectedCount() {
    return [
      ...this.getSelectedPlayers('left')
    , ...this.getSelectedPlayers('right')
    ].length;
  }

, canGameStart() {
    let left_count = this.state.selected_left.length
      , right_count = this.state.selected_right.length
      , total_count = left_count + right_count;

    return _.all([
      left_count === right_count
    , total_count > 0
    , total_count % 2 === 0
    ]);
  }

, startGame() {
    createGame({
      left: this.state.selected_left
    , right: this.state.selected_right
    }).then(() => {
      //TODO poor's man redirect :trollface:
      window.location = '/#/scoreboard';
      window.location.reload(true);
    });
  }

, renderSeparator() {
    if (!this.canGameStart()) {
      return;
    }

    return <Separator onClick={this.startGame}/>
  }

, render() {
    return (
      <div>
        <div className='scoreboard full-expanded'>
          <Side
            selected={this.getSelectedPlayers('left')}
            toggleMenu={this.toggleMenu.bind(this, 'left')}
          />
          {this.renderSeparator()}
          <Side
            selected={this.getSelectedPlayers('right')}
            toggleMenu={this.toggleMenu.bind(this, 'right')}
          />
          <div className={`offscreen-menu slide-from-bottom ${this.state.isMenuOpen ? 'show' : 'hide'}`}>
            <Menu
              players={this.props.players}
              disabledPlayerIds={this.getDisabledPlayerIds()}
              selectedPlayerIds={this.getSelectedPlayerIds()}
              onSelectPlayer={this.onSelectPlayer}
              side={this.state.side}
              toggleMenu={this.toggleMenu.bind(this, this.state.side)}
            />
          </div>
        </div>
      </div>
    );
  }
});

const select = (state) => {
  const players = state.players.entities;
  const playersById = state.players.byId;
  const groups = state.groups.entities

  return {
    players
  , playersById
  , groups
  }
}

export default connect(select)(PlayerPickerScreen);
