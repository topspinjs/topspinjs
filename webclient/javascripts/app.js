/** @jsx React.DOM */

var React = require('react');
var Scoreboard = require('./views/scoreboard.js');
var Games = require('./views/games.js');
var Stats = require('./views/stats.js');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var App = React.createClass({
  render: function () {
    return (
      <header>
        <ul>
          <li><Link to='/games'>Games</Link></li>
          <li><Link to='/scoreboard'>Scoreboard</Link></li>
          <li><Link to='/stats'>Stats</Link></li>
        </ul>
        <this.props.activeRouteHandler/>
      </header>
    );
  }
});

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="games" handler={Games}/>
      <Route name="scoreboard" handler={Scoreboard}/>
      <Route name="stats" handler={Stats}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);
