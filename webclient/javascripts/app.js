require('babel/polyfill');
require('../scss/app.scss');

import React from 'react';

import {
  Routes
, Route
, RouteHandler
, Link
, DefaultRoute
, run
} from 'react-router';

import {Provider} from 'react-redux';

import ScoreboardScreen from './screens/scoreboard';
import PlayerPickerScreen from './screens/PlayerPicker';

import store from './store';
import bootstrap from 'lib/bootstrap';

window.store = store;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='player-picker'>New game</Link></li>
            <li><Link to='scoreboard'>Scoreboard</Link></li>
          </ul>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

bootstrap().then(() => {
  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="player-picker" handler={PlayerPickerScreen}/>
      <Route name="scoreboard" handler={ScoreboardScreen}/>
    </Route>
  );

  run(routes, function (Handler) {
    React.render(
      <Provider store={store}>
        {()=> <Handler/>}
      </Provider>
    , document.getElementsByClassName('the-container')[0]
    );
  });
});
