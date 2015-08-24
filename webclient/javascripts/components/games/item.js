var React = require('react');

/**
 * Games controller view.
 */
var Games = React.createClass({
  render: function () {
    return (
      <li className={'game-item' + ' stripe-' + this.props.index}>
        <span className='game-player-name game-player--left'>
        	{'LEFT PLAYER'}
        </span>
        <span className="vs">VS</span>
        <span className='game-player-name game-player--right'>
          {'RIGHT PLAYER'}
        </span>
      </li>
    );
  }
});

module.exports = Games;
