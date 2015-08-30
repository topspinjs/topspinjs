import React from 'react';
import Player from 'components/Player';

const GameResult = React.createClass({
  displayName: 'GameResult'

, renderWinners(){
    return this.props.winners.map((player) => (
      <Player player={player}/>
    ));
  }

, getClasses() {
    return `game-result game-result--${this.props.winningSide}-wins`;
  }

, render() {
    return (
      <div className={this.getClasses()}>
        <div className="game-result__title animated bounce">
          <img src="/images/trophy.png"/>
          <span>YOU WIN</span>
          <img src="/images/trophy.png"/>
        </div>
        <div className="game-result__winners animated bounceInUp">
          {this.renderWinners()}
        </div>
      </div>
    );
  }
});

export default GameResult;
