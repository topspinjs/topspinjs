import React from 'react';

import Player from 'components/Player';

const ScoreBoardSide = React.createClass({
  getInitialState () {
    return {rotating: false};
  }

, componentWillReceiveProps (nextProps) {
    if (this.props.score != nextProps.score) {
      this.setState({rotating: true});
      setTimeout(() => this.setState({rotating: false}), 650);
    }
  }

, renderPlayers() {
    return this.props.players.map((player) => (
      <Player player={player}/>
    ));
  }

, renderGroupName() {
    if (!this.props.group) {
      return;
    }

    return <div className="scoreboard__name">{this.props.group.name}</div>;
  }

, renderServing() {
    console.log('this.props.serving', this.props.serving);
    console.log('this.props.side', this.props.side);

    if (!this.props.serving) {
      return;
    }

    return (
      <div className="scoreboard__serving-wrapper">
        <div className="scoreboard__serving bounce"></div>
      </div>
    )
  }

, getClasses() {
    let classes = [];

    classes.push('scoreboard__item');

    if (this.props.isDoubles) {
      classes.push('scoreboard__item--doubles');
    }

    return classes.join(' ');
  }

, render() {
    return (
      <div className={this.getClasses()}>
        {this.renderServing()}
        <div className={`scoreboard__score ${this.state.rotating ? 'rotate' : ''}`}>
            {this.props.score}
        </div>
        <div className="scoreboard__players">
          {this.renderPlayers()}
        </div>
        {this.renderGroupName()}
      </div>
    );
  }
});

module.exports = ScoreBoardSide;
