/** @jsx React.DOM */
var React = require('react');
var Authentication = require('./Authentication.js');

var Dashboard = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    return (
      <div>
        Dashboard
        <div>
            Designs
        </div>
        <div>
            Parts
        </div>
        <div>
            Sequences
        </div>
        <div>
            Strains
        </div>
      </div>
      
    );
  }
});

module.exports = Dashboard;