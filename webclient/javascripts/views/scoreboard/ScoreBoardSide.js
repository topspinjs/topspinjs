/** @jsx React.DOM */

var React = require('react');
var ScoreBoardSide = React.createClass({
  render: function () {
    var styles = {
      backgroundImage: 'url(' + this.props.player.avatar + ')'
    };

    return (
      <div className="scoreboard__item">
        <div className="scoreboard__player">
          <div className="scoreboard__score">
            {this.props.score}
          </div>
          <div className="scoreboard__avatar" style={styles}></div>
          <div className="scoreboard__name">
            {this.props.player.name}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ScoreBoardSide;
