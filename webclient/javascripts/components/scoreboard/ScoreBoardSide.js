var React = require('react');

var PlayerPicker = require('../../views/playerpicker/PlayerPicker.js');

var ScoreBoardSide = React.createClass({
  getInitialState: function () {
    return {
      openMenu: false
    };
  },
  openMenu: function () {
    if (this.props.game.status !== 'warmup') {
      return;
    }

    this.setState({openMenu: true});
  },
  addTeam: function (selected) {
    this.setState({
      openMenu: false
    });
    this.props.setSide(selected[0]); // TODO
  },
  render: function () {
    var styles = {}
      , defined
      , score
      , player;

    score = this.props.game['score_' + this.props.side];
    player = this.props.game[this.props.side];

    defined = !_.isEmpty(player);

    if (!defined) {
      player = this.state.player;
    }

    defined = !_.isEmpty(player);

    if (defined) {
      styles.backgroundImage = 'url(' + player.avatar + ')';
    }

    return (
      <div className="scoreboard__item">
        <div className="scoreboard__player">
          <div className="scoreboard__score">{score}</div>
          <div className={"scoreboard__select " + (defined ? 'hide' : '')} onClick={this.openMenu}>+</div>
          <div className={"scoreboard__avatar " + (defined ? '' : 'hide')} onClick={this.openMenu} style={styles}></div>
          <div className="scoreboard__name">
            {defined ? player.name : 'Add Players'}
          </div>
        </div>
        <div className={'playerpicker offscreen-menu slide-from-bottom ' + (this.state.openMenu ? 'show' : 'hide')}>
          <PlayerPicker addTeam={this.addTeam}/>
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState(this._getAppState());
  }
});

module.exports = ScoreBoardSide;
