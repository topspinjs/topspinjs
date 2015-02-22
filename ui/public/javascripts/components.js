var PlayerSelector = React.createClass({
  getInitialState: function() {
    return {
      players: []
    };
  },

  componentDidMount: function() {
    var self = this;
    $.get(this.props.source, function(result) {
      if (this.isMounted()) {
        this.setState({
          players: result
        });
      }
    }.bind(this));
  },

  render: function() {
    players = this.state.players || [];
    return (
      <section>
      {players.map(function(player){
        return <div>{player.name}</div>
      })}
      </div>
    );
  }
});

React.render(
  <PlayerSelector source="/api/players" />,
  document.getElementById('content')
);
