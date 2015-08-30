var React = require('react');

//var PlayerPicker = require('../../views/playerpicker/PlayerPicker.js');

var ScoreBoardSide = React.createClass({
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

    return this.props.players.map((player) => {
      let style = {};
      style.backgroundImage = 'url(' + player.avatar + ')';

      return (
        <div className="scoreboard__player">
          <div className={"scoreboard__avatar"} style={style}></div>
          <div className="scoreboard__name">
            {player.name}
          </div>
        </div>
      );
    });
  }

, renderGroupName() {
    console.log(this.props.group);

    if (!this.props.group) {
      return;
    }

    return <div className="scoreboard__name">{this.props.group.name}</div>;
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
        <div className={`scoreboard__score ${this.state.rotating ? 'rotate' : ''}`}>{this.props.score}</div>
        <div className="scoreboard__players">
          {this.renderPlayers()}
        </div>
        {this.renderGroupName()}
      </div>
    );
  }
});

module.exports = ScoreBoardSide;

