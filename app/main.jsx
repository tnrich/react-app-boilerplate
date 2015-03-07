/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Griddle = require('griddle-react');
var App = require('./App.js');
// var userRepository = require('./userRepository.js');  
var fakedata = require('./fakedata.js');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
          Dashboard
      </div>
    );
  }
});
 
var Sequences = React.createClass({
  render: function () {
    return (
      <div>
          <SequenceLine/>
      </div>
    );
  }
});

var exampleMetaData = [{
  "columnName": "name",
  "order": 9,
  "locked": false,
  "visible": true,
  "displayName": "Employee Name"
}, {
  "columnName": "city",
  "order": 8,
  "locked": false,
  "visible": true
}, {
  "columnName": "state",
  "order": 7,
  "locked": false,
  "visible": true
}, {
  "columnName": "country",
  "order": 6,
  "locked": false,
  "visible": true
}, {
  "columnName": "company",
  "order": 5,
  "locked": false,
  "visible": true
}, {
  "columnName": "favoriteNumber",
  "order": 4,
  "locked": false,
  "visible": true,
  "displayName": "Favorite Number"
}]


var SequenceLine = React.createClass({
  render: function () {
    return (
      <div>
        <Griddle results={fakedata} tableClassName="table" showFilter={true}
 showSettings={true} columns={["name", "circular", "features", "description"]} />
      </div>
    );
  }
});

var Calendar = React.createClass({
  render: function () {
    return (
      <div>
          Calendar
      </div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="sequences">Sequences</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
}); 

var routes = (
  <Route name="app" path="/" handler={App}>
	<Route name="sequences" handler={Sequences}/>
	<Route name="calendar" handler={Calendar}/>
  <DefaultRoute handler={Dashboard}/>
  </Route>
);



Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

// var App = require('./App.js');
// React.render(<App/>, document.body);