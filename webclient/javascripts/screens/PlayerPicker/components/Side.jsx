import React from 'react';
import Player from 'components/Player';

const Side = React.createClass({
  renderPlayers() {
    return this.props.selected.map((player) => <Player nameSize='small' player={player}/>)
  }

, render() {
    return (
      <div className='scoreboard__item'>
        <div className="scoreboard__players">
          {this.renderPlayers()}
        </div>
        <div className="scoreboard__players" onClick={this.props.toggleMenu}>
          <button className="scoreboard__select">+</button>
        </div>
        <div className="scoreboard__addplayer">Add player</div>
      </div>
    );
  }
});

export default Side;
