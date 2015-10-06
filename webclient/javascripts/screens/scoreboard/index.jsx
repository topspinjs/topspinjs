import React from 'react'
import {connect} from 'react-redux';
import store from 'store';
import Scoreboard from './components/Scoreboard';
import GameResult from './components/Result';
import sidesGetter from 'lib/sidesGetter';

const FINISH_WAIT = 1000;

const ScoreboardScreen = React.createClass({
  displayName: 'Scoreboard Screen'

, getInitialState() {
    return {finished: false};
  }

, renderScoreboard() {
    if (this.state.finished) {
      return;
    }

    if (this.props.game.status === 'played') {
      this.showResult();
    }

    return (
      <Scoreboard
        game={this.props.game}
        left_side={this.props.sides.left}
        right_side={this.props.sides.right}
        players={this.props.players}
        groupsById={this.props.groupsById}
      />
    );
  }

, getWinningSide() {
    const game = this.props.game;

    return game.score_left > game.score_right ? 'left' : 'right';
  }

, getWinners() {
    const sides = this.props.sides;
    return sides[this.getWinningSide()];
  }

, renderResult() {
    if (!this.state.finished) {
      return;
    }

    return (
      <GameResult
        winningSide={this.getWinningSide()}
        winners={this.getWinners()}
        leftScore={this.props.game.left_score}
        rightScore={this.props.game.right_score}
      />
    );
  }

, showResult() {
    setTimeout(() => this.setState({finished: true}), FINISH_WAIT);
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

  console.log('players', players);

  return {
    game
  , players
  , groupsById
  , sides
  }
}

export default connect(select)(ScoreboardScreen);
