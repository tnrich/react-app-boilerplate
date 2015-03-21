var React = require('react');

var Griddle = require('griddle-react');
var fakedata = require('./fakedata.js');

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
}];

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
