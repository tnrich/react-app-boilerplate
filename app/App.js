var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Route.Link;

var App = React.createClass({
  render: function() {
    return ( < h1 > Hello world! </h1>);
  }
});

module.exports = App;