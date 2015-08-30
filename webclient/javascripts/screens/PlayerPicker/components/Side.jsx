import React from 'react';

const Side = React.createClass({

  render() {
    return (
      <div className='scoreboard__item'>
        <div className="scoreboard__players">
          <button className="scoreboard__select">+</button>
        </div>
        <div className="scoreboard__name">Add team</div>
      </div>
    );
  }
});

export default Side;
