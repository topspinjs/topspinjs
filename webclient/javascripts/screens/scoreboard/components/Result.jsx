import React from 'react';
import Player from 'components/Player';

const GameResult = React.createClass({
  displayName: 'GameResult'

, renderWinners(){
    return this.props.winners.map((player) => (
      <Player player={player}/>
    ));
  }

, render() {
    return (
      <div>
        {this.renderWinners()}
      </div>
    );
  }
});

export default GameResult;
