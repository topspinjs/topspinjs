/** @jsx React.DOM */

var React = require('react');

var PlayerPin = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },
  onNumberKeyPress: function (key) {
    this.setState({
      value: this.state.value + key
    });
  },
  onEraseKeyPress: function (key) {
    this.setState({
      value: '' // TODO: Only last char
    });
  },
  onConfirmKeyPress: function (key) {
    alert(this.state.value);
    this.props.onConfirm(this.state.value);
  },
  render: function () {
    var self = this
      , keys;

    keys = _.range(1,11).map(function (v) {
      return v % 10;
    });

    return (
      <div className="playerpin__keyboard">
	<input type="password" value={this.state.value}/>
        {keys.map(function (value) {
          return <button onClick={_.partial(self.onNumberKeyPress, value)}>{value}</button>;
        })}

        <button onClick={this.onEraseKeyPress}>X</button>
        <button onClick={this.onConfirmKeyPress}>OK</button>
      </div>
    );
  }
});

module.exports = PlayerPin;
