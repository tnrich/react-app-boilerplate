var React = require('react');
var _ = require('lodash');
var RowItem = React.createClass({
  render: function () {

    var row = this.props.row;
    var visibilityParameters = this.props.visibilityParameters;
    // function  (argument) {
    //   // body...
    // }
    var featureSvgs = _.map(row.features, function (feature) {
      var featureSvgStart = 0;
      return
    })
    return (
      <div className="infinite-list-item">
        <div className="rowContainer">
            row
            <text x="5" y="60" textLength={visibilityParameters.rowWidth} lengthAdjust="spacingAndGlyphs">
              {row.sequence} rrrr
            </text> 
        </div>
      </div>
    );
  }
});

module.exports = RowItem;