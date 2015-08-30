import React from 'react'

const PlayerPickerItem = React.createClass({
  displayName: 'PlayerPickerItem'

, getClasses() {
    let classes = [];

    classes.push('animated bounceIn player-picker__item');

    if (this.props.selected ) {
      classes.push('player-picker__item--selected');
    }

    if (this.props.disabled ) {
      classes.push('player-picker__item--disabled');
    }

    return classes.join(' ');
  }

, onClick() {
    if (this.props.disabled) {
      return;
    }

    this.props.onClick();
  }

, render() {
    var styles = {
      backgroundImage: 'url(' + this.props.player.avatar + ')'
    };

    return (
      <li
        onClick={this.props.onClick}
        className={this.getClasses()}
        style={styles}>
      </li>
    );
  }
});

export default PlayerPickerItem;
