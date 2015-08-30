import React from 'react'
import Side from './Side';

const Scoreboard = React.createClass({
  displayName: 'Scoreboard'

, render() {
    const isDoubles = this.props.game.type === 'doubles';
    return (
      <div className={"scoreboard full-expanded"}>
        <Side
          score={this.props.game.score_left}
          players={this.props.left_side}
          group={isDoubles && this.props.groupsById[this.props.game.left]}
          onAddTeam={_.partial(this.onAddTeam, 'left')}
          isDoubles={isDoubles}
          side='left'
        />
        <div className="scoreboard__separator" onClick={this.onStart}>
          <span className="scoreboard__vs">vs</span>
        </div>
        <Side
          score={this.props.game.score_right}
          players={this.props.right_side}
          group={isDoubles && this.props.groupsById[this.props.game.right]}
          onAddTeam={_.partial(this.onAddTeam, 'right')}
          isDoubles={isDoubles}
          side='right'
        />
      </div>
    )
  }
});

export default Scoreboard;
