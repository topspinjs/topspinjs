require('babel/polyfill');

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

import ScoreBoard from './screens/scoreboard/index.jsx';
import Games from './screens/games.js';
import Stats from './screens/stats.js';

import store from './store.js';
import bootstrap from './lib/bootstrap.js';

window.store = store;

//console.log('store', store);

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='games'>Games</Link></li>
            <li><Link to='scoreboard'>Scoreboard</Link></li>
            <li><Link to='stats'>Stats</Link></li>
          </ul>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

console.log('App', App);
console.log('Games', Games);
console.log('ScoreBoard', ScoreBoard);
console.log('Stats', Stats);

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="games" handler={Games}/>
    <Route name="scoreboard" handler={ScoreBoard}/>
    <Route name="stats" handler={Stats}/>
  </Route>
);

run(routes, function (Handler) {
  console.log("document.getElementsByClassName('the-container')[0]", document.getElementsByClassName('the-container')[0]);
  React.render(
    <Provider store={store}>
      {()=> <Handler/>}
    </Provider>
    //<Handler/>
  , document.getElementsByClassName('the-container')[0]
  );
});
