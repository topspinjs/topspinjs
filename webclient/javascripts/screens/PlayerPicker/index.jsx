import React from 'react'
import {connect} from 'react-redux';
import store from 'store';
import Side from './components/Side';
import Menu from './components/Menu';

const PlayerPickerScreen = React.createClass({
  displayName: 'PlayerPicker Screen'

, getInitialState() {
    return {
      selected_left: []
    , selected_right: []
    , isMenuOpen: false
    }
  }

, toggleMenu(side) {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    , side
    });
  }

, onSelectPlayer(side, player) {
  }

, render() {
    return (
      <div className='scoreboard full-expanded'>
        <Side
          selected={this.state.selected_left}
          toggleMenu={this.toggleMenu.bind(this, 'left')}
        />
        <Side
          selected={this.state.selected_right}
          toggleMenu={this.toggleMenu.bind(this, 'right')}
        />
        <Menu players={this.props.players}/>
      </div>
    );
  }
});

const select = (state) => {
  const players = state.players.entities;
  const groups = state.groups.entities

  return {
    players
  , groups
  }
}

export default connect(select)(PlayerPickerScreen);
