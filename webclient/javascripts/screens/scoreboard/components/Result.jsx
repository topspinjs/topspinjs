import React from 'react';

const GameResult = React.createClass({
  displayName: 'GameResult'

, render() {
    console.log('winners', this.props.winners);

    return (
      <div>
        And the winner is:
        {this.props.winners}
      </div>
    );
  }
});

export default GameResult;
