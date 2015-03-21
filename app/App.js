/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var RouteHandler = Router.RouteHandler;
var Dashboard = require('./Dashboard.js');
var SequenceGrid = require('./SequenceGrid.js');
var SequenceEditor = require('./SequenceEditor.js');

var Login = require('./Login.js');
var Logout = require('./Logout.js');
var Authentication = require('./Authentication.js');
var About = require('./About.js');
var auth = require('./auth.js');
var pretendRequest = require('./pretendRequest');

var App = React.createClass({

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
    };
  },
  

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <header>
          <ul>
            <li>{loginOrOut}</li>
            <li><Link to="about">About</Link></li>
            <li><Link to="dashboard">Dashboard</Link></li>
            <li><Link to="sequences">Sequences</Link></li>
            <li><Link to="SequenceEditor">SequenceEditor</Link></li>
          </ul>
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;