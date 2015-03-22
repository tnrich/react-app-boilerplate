var React = require('react');
var fakedata = require('./fakedata.js');
var SequenceLine = require('./SequenceLine.js');
var Authentication = require('./Authentication.js');
var auth = require('./auth.js');
var d3 = require('d3');


var fakeSequenceData = {
  sequence: "agtTgagaagagTTAGagag",
  features: [{
    start: 5,
    end: 4,
    id: 45123123,
    name: "feature1",
    color: "orange",
  }]
};

var SequenceEditor = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    return (
      <div>
        {fakeSequenceData.sequence}
      </div>
    );
  }
});

module.exports = SequenceEditor;