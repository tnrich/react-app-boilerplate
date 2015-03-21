/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

// var userRepository = require('./userRepository.js');  

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var App = require('./App.js');
var Dashboard = require('./Dashboard.js');
var SequenceGrid = require('./SequenceGrid.js');
var SequenceEditor = require('./SequenceEditor.js');
var About = require('./About.js');
var Login = require('./Login.js');
var Logout = require('./Logout.js');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="about" handler={About}/>
	  <Route name="sequences" handler={SequenceGrid}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="SequenceEditor" handler={SequenceEditor}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

// var App = require('./App.js');
// React.render(<App/>, document.body);