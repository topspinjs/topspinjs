import React from 'react'
import {connect} from 'react-redux';
import store from 'store';
import Side from './components/Side';
import PlayerPicker from './components/PlayerPicker';

const ScoreboardScreen = React.createClass({
  displayName: 'Scoreboard Screen'
, getInitialState() {
    return {
      openMenu: false
    , selected_left: []
    , selected_right: []
    }
  }
, getDefaultProps() {
    return {
      game: {}
    , left_player: null
    , right_player: null
    }
  }

, onCloseMenu() {
    this.setState({openMenu: false});
  }

, onAddTeam(side) {
    this.setState({
      openMenu: true
    , choosingSide: side
    });
  }

, onPlayerSelect: function (player_id) {
    const side = this.state.choosingSide;

    console.log('side', side);

    let selected = this.state[`selected_${side}`];

    if (_.contains(selected, player_id)) {
      selected = _.without(selected, player_id);
    } else {
      selected.push(player_id);
    }

    this.setState({[`selected_${side}`]: [...selected]});

    console.log('this.state', this.state);
  }

, getSelectedPlayersFromChoosingSide() {
    return this.state[`selected_${this.state.choosingSide}`];
  }

, getLeftTeam() {
  }

, getRightTeam() {
  }

, render() {
    return (
      <div className={"scoreboard full-expanded"}>
        <Side
          score={this.props.game.score_left}
          player={this.props.left_player}
          onAddTeam={_.partial(this.onAddTeam, 'left')}
          side='left'
        />
        <div className="scoreboard__separator" onClick={this.onStart}>
          <div><span className="scoreboard__vs">vs</span></div>
          <div><span className="scoreboard__start">Start</span></div>
        </div>
        <Side
          score={this.props.game.score_right}
          player={this.props.right_player}
          onAddTeam={_.partial(this.onAddTeam, 'right')}
          side='right'
        />
        <div className={'offscreen-menu slide-from-bottom ' + (this.state.openMenu ? 'show' : 'hide')}>
          <PlayerPicker
            players={this.props.players}
            selected={this.getSelectedPlayersFromChoosingSide()}
            onPlayerSelect={this.onPlayerSelect}
            onCloseMenu={this.onCloseMenu}
          />
        </div>
      </div>
    )
  }
});

const select = (state) => {
  const [game] = state.games.entities;
  const left_player = game && state.players.entities.find((p) => p.id === game.left);
  const right_player = game && state.players.entities.find((p) => p.id === game.right);
  const players = state.players.entities;

  return {
    game
  , left_player
  , right_player
  , players
  }
}

export default connect(select)(ScoreboardScreen);
