var React = require('react');

//var PlayerPicker = require('../../views/playerpicker/PlayerPicker.js');

var ScoreBoardSide = React.createClass({
  getInitialState () {
    return {rotating: false};
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.score != nextProps.score) {
      this.setState({rotating: true});
      setTimeout(() => this.setState({rotating: false}), 650);
    }
  },

  render() {
    var styles = {}
      , defined
      , score
      , player;

    score = this.props.score;
    player = this.props.player;
    defined = !!player;

    if (defined) {
      styles.backgroundImage = 'url(' + player.avatar + ')';
    }

    return (
      <div className="scoreboard__item">
        <div className="scoreboard__player">
          <div className={`scoreboard__score ${this.state.rotating ? 'rotate' : ''}`}>{score}</div>
          <div className={"scoreboard__select " + (defined ? 'hide' : '')} onClick={this.props.onAddTeam}>+</div>
          <div className={"scoreboard__avatar " + (defined ? '' : 'hide')} style={styles}></div>
          <div className="scoreboard__name">
            {defined ? player.name : 'Add Players'}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ScoreBoardSide;

