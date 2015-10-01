import React from 'react';

const Player = React.createClass({
  displayName: 'Player'

, getDefaultProps() {
    return {
      nameSize: 'big'
    }
  }

, render() {
    let style = {};
    //style.backgroundImage = `url('${this.props.player.avatar}')`;

    return (
      <div className="scoreboard__player">
        <div className={"scoreboard__avatar"} style={style}></div>
        <div className={`scoreboard__name scoreboard__name--${this.props.nameSize}`}>
          paco
        </div>
      </div>
    );
  }
});

export default Player;
