import React from 'react'
import {connect} from 'react-redux';
import store from 'store';
import Scoreboard from './components/Scoreboard';
import GameResult from './components/Result';
import sidesGetter from 'lib/sidesGetter';

const ScoreboardScreen = React.createClass({
  displayName: 'Scoreboard Screen'

, renderScoreboard() {
    console.log(this.props.game);
    if (this.props.game.status !== 'playing') {
      return;
    }

    return (
      <Scoreboard
        game={this.props.game}
        left_side={this.props.left_side}
        right_side={this.props.right_side}
        players={this.props.players}
        groupsById={this.props.groupsById}
      />
    );
  }

, getWinners() {
    const game = this.props.game;
    const sides = sidesGetter(game, this.props.players, this.props.groups);
    const winner_side = game.score_left > game.score_right ? 'left' : 'right';

    return sides[winnner_side];
  }

, renderResult() {
    console.log('result!');
    if (this.props.game.status !== 'played') {
      return;
    }

    return (
      <GameResult
        winners={this.getWinners()}
      />
    );
  }

, render() {
    let content;
    if (!this.props.game) {
      content = (<div>No game!</div>);
    } else {
      content = (
        <div>
          {this.renderScoreboard()}
          {this.renderResult()}
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});

const select = (state) => {
  const [game] = state.games.entities;
  const players = state.players.entities;
  const groupsById = state.groups.byId;

  const sides = sidesGetter(game, state.players, state.groups);

  console.log(sides);

  return {
    game
  , left_side: sides.left
  , right_side: sides.right
  , players
  , groupsById
  }
}

export default connect(select)(ScoreboardScreen);
