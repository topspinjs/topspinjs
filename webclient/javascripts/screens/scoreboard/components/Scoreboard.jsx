import React from 'react'
import Side from './Side';

const Scoreboard = React.createClass({
  displayName: 'Scoreboard'

, renderWarmup() {
    if (this.props.game.status !== 'warmup') {
      return;
    }

    return (
      <div className="scoreboard__decide-serve blink">
        Decide serve and press button
      </div>
    )
  }

, render() {
    const isDoubles = this.props.game.type === 'doubles';

    console.log('this.props.left_side', this.props.left_side);

    return (
      <div className={"scoreboard full-expanded"}>
        <Side
          score={this.props.game.score_left}
          players={this.props.left_side}
          group={isDoubles && this.props.groupsById[this.props.game.left]}
          onAddTeam={_.partial(this.onAddTeam, 'left')}
          isDoubles={isDoubles}
          serving={this.props.game.serve_player_id === this.props.game.left}
          side='left'
        />
        {this.renderWarmup()}
        <div className="scoreboard__separator" onClick={this.onStart}>
          <span className="scoreboard__vs">vs</span>
        </div>
        <Side
          score={this.props.game.score_right}
          players={this.props.right_side}
          group={isDoubles && this.props.groupsById[this.props.game.right]}
          onAddTeam={_.partial(this.onAddTeam, 'right')}
          isDoubles={isDoubles}
          serving={this.props.game.serve_player_id === this.props.game.right}
          side='right'
        />
      </div>
    )
  }
});

export default Scoreboard;
