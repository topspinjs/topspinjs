import React from 'react'
import Side from './Side';
import PlayerPicker from './PlayerPicker';

const Scoreboard = React.createClass({
  displayName: 'Scoreboard'

//, getInitialState() {
    //return {
      //openMenu: false
    //, selected_left: []
    //, selected_right: []
    //}
  //}

//, getDefaultProps() {
    //return {
      //game: {}
    //}
  //}

//, onCloseMenu() {
    //this.setState({openMenu: false});
  //}

//, onAddTeam(side) {
    //this.setState({
      //openMenu: true
    //, choosingSide: side
    //});
  //}

//, onPlayerSelect: function (player_id) {
    //const side = this.state.choosingSide;

    //console.log('side', side);

    //let selected = this.state[`selected_${side}`];

    //if (_.contains(selected, player_id)) {
      //selected = _.without(selected, player_id);
    //} else {
      //selected.push(player_id);
    //}

    //this.setState({[`selected_${side}`]: [...selected]});

    //console.log('this.state', this.state);
  //}

//, getSelectedPlayersFromChoosingSide() {
    //return this.state[`selected_${this.state.choosingSide}`];
  //}

, render() {
    return (
      <div className={"scoreboard full-expanded"}>
        <Side
          score={this.props.game.score_left}
          players={this.props.left_side}
          group={this.props.groupsById[this.props.game.left]}
          onAddTeam={_.partial(this.onAddTeam, 'left')}
          isDoubles={this.props.game.type === 'doubles'}
          side='left'
        />
        <div className="scoreboard__separator" onClick={this.onStart}>
          <span className="scoreboard__vs">vs</span>
        </div>
        <Side
          score={this.props.game.score_right}
          players={this.props.right_side}
          group={this.props.groupsById[this.props.game.right]}
          onAddTeam={_.partial(this.onAddTeam, 'right')}
          isDoubles={this.props.game.type === 'doubles'}
          side='right'
        />
        {/*
        <div className={'offscreen-menu slide-from-bottom ' + (false ? 'show' : 'hide')}>
          <PlayerPicker
            players={this.props.players}
            selected={this.getSelectedPlayersFromChoosingSide()}
            onPlayerSelect={this.onPlayerSelect}
            onCloseMenu={this.onCloseMenu}
          />
        </div>
        */}
      </div>
    )
  }
});

export default Scoreboard;
