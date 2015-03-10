/** @jsx React.DOM */

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var React = require('react');
var ScoreBoard = require('./views/scoreboard/ScoreBoard.js');
var Games = require('./views/games.js');
var Stats = require('./views/stats.js');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

console.log('RouteHandler', RouteHandler);

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

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="games" handler={Games}/>
    <Route name="scoreboard" handler={ScoreBoard}/>
    <Route name="stats" handler={Stats}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.renderComponent(<Handler/>, document.body);
});
