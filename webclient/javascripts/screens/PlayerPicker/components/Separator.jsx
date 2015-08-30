import React from 'react';

const Separator = React.createClass({
  render() {
    return (
      <div className="scoreboard__separator" onClick={this.props.onClick}>
        <span className="scoreboard__start">Start!</span>
      </div>
    );
  }
});

export default Separator;
