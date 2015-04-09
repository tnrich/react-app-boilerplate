var React = require('react');
var RowItem = require('./RowItem');
var _ = require('lodash');
var FONT_SIZE = 12; //tnrtodo: this should go in a constants section


var SequenceEditor2 = React.createClass({
  render: function() {
      //   var sequenceData = this.props.sequenceData;
      // var visibilityParameters = this.props.visibilityParameters;
      //   var rows = prepareRowData(sequenceData,visibilityParameters);
      //   var rowItems = rows.map(function(row){
      //     return(<RowItem rowData={row} />);
      //   });
      var sequenceData = {
        sequence: "atatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagagatatattgagagagag",
        features: {
          12355134: {
            id: "12355134",
            start: 4,
            end: 5,
            name: 'cooljim',
            color: 'orange',
            direction: "forward",
            annotationType: "feature"
          },
          1235515134: {
            id: "1235515134",
            start: 45,
            end: 5,
            name: 'cooljim',
            color: 'blue',
            direction: "forward",
            annotationType: "feature"
          },
          222: {
            id: "222",
            start: 24,
            end: 53,
            name: 'cooljim',
            color: 'orange',
            direction: "backward",
            annotationType: "feature"
          }
        },
        parts: {
          123141434: {
            id: "123141434",
            start: 4,
            end: 5,
            name: 'cooljim',
            color: 'pink',
            direction: "forward",
            annotationType: "part"
          },
          12311321334: {
            id: "12311321334",
            start: 45,
            end: 5,
            name: 'cooljim',
            color: 'orange',
            direction: "forward",
            annotationType: "part"
          },
          121234134: {
            id: "121234134",
            start: 24,
            end: 53,
            name: 'cooljim',
            color: 'orange',
            direction: "forward",
            annotationType: "part"
          }
        }
      };

      var exampleActiveCutsites = {

      }
      var visibilityParameters = {
        rowLength: 30,
        preloadRowStart: 3,
        preloadRowEnd: 8,
        showOrfs: true,
        showCutsites: true,
        showParts: true,
        showFeatures: true,
        showReverseSequence: true,
      };
      visibilityParameters.rowWidth = FONT_SIZE * visibilityParameters.rowLength;


    return (
      <div>
        <RowView sequenceData={sequenceData} visibilityParameters={visibilityParameters}/>
      </div>
    );
  }
});



var RowView = React.createClass({
  render: function () {
    var sequenceData = this.props.sequenceData;
    var visibilityParameters = this.props.visibilityParameters;
    var rows = prepareRowData(sequenceData, visibilityParameters);


    var rowItems = rows.map(function(row) {
      return(<RowItem key={row.rowNumber} row={row} visibilityParameters={visibilityParameters} />);
    });

    return (
      <div>
        SequenceEditor2
        <div> 
        {rowItems}
        </div>
      </div>
    );
  }
});

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
            <text x="5" y="60" textLength={visibilityParameters.rowWidth} lengthAdjust="spacingAndGlyphs">
              {row.sequence} WANKER
            </text> 
        </div>
      </div>
    );
  }
});


function insertAnnotationLocationIntoRows (annotationLocation, annotation, rows, rowLength) {
  
  var rowStart = Math.floor(annotationLocation.start / rowLength);
  var rowEnd = Math.floor(annotationLocation.end / rowLength);
  for (var i = rowStart; i < rowEnd + 1; i++) {
    var row = rows[i];
    var annotationType = annotation.type
    row.annotationType
  };
}


function mapAnnotationToRow (annotation, sequenceLength, row, rowLength) {
  var annotationLocations = splitAnnotationOnOrigin(annotation, sequenceLength);
  annotationLocations.forEach(function(annotationLocation){
    insertAnnotationLocationIntoRows(annotationLocation, annotation, rows, rowLength)
  });
}

function prepareRowData (sequenceData, visibilityParameters) {
  var sequenceLength = sequenceData.sequence.length;
  // var totalRows = Math.ceil(sequenceLength/visibilityParameters.rowLength);
  if (!globalRows) {
    var globalRows = {};
  }
  var requestedRows = [];
  for (var rowNumber = visibilityParameters.preloadRowStart; rowNumber < visibilityParameters.preloadRowEnd + 1; rowNumber++) {
    if (!globalRows[rowNumber]) {
      globalRows[rowNumber] = populateRowByRowNumber(sequenceData, visibilityParameters, rowNumber, sequenceLength);
    }
    requestedRows.push(globalRows[rowNumber]);
  }
  //return only the requested rows
  return requestedRows;
}

function populateRowByRowNumber(sequenceData, visibilityParameters, rowNumber, sequenceLength) {
  var row = {};
  row.rowNumber = rowNumber;
  row.start = rowNumber*visibilityParameters.rowLength;
  row.end = (rowNumber+1)*(visibilityParameters.rowLength-1);
  row.sequence = sequenceData.sequence.slice(row.start, row.end);

  row.features = mapAnnotationsToRow(sequenceData.features, row, sequenceLength);
  row.parts = mapAnnotationsToRow(sequenceData.parts, row, sequenceLength);
  row.orfs = mapAnnotationsToRow(sequenceData.orfs, row, sequenceLength);
  row.cutsites = mapAnnotationsToRow(sequenceData.cutsites, row, sequenceLength);

  return row;
}

function mapAnnotationsToRow(annotations, row, sequenceLength) {
  var annotationsInRow = {};
  
  //convert each anotation into 1 or 2 annotationLocations by spliiting on the origin.
  //for each location, add to the row any stetches of the location that overlap the row
  _.each(annotations, function(annotation) {
    var annotationLocations = splitAnnotationOnOrigin(annotation, sequenceLength);
    var overlaps;
    annotationLocations.forEach(function(annotationLocation) {
      var overlap = getOverlapOfRowWithAnnotationLocation(annotationLocation, annotation, row);
      if (overlap) { //only if the annotationLocation overlaps with the row do we push anything in
        if (!overlaps) {
          overlaps = [];
        }
        overlaps.push(overlap);
      }
    });
    if (overlaps) {
      //calculate the yOffset for the new overlaps
      var yOffset = calculateNecessaryYOffsetForAnnotationInRow(annotationsInRow, overlaps);
      //add the annotation to the row
      var annotationId = annotation.id;
      annotationsInRow[annotationId] = {
        annotation: annotation,
        overlaps: overlaps,
        yOffset: yOffset
      };
    }
  }, this);
  return annotationsInRow;
}

function calculateNecessaryYOffsetForAnnotationInRow(annotationsAlreadyAddedToRow, overlaps) {
  var blockedYOffsets = [];
  //adjust the yOffset of the location being pushed in by checking its range against other locations in the row
  _.each(annotationsAlreadyAddedToRow, function(comparisonAnnotation) {
    //loop through every location in the comparisonAnnotation (there is a max of two)
    //also note that locations cannot be circular
    comparisonAnnotation.overlaps.forEach(function(comparisonOverlap) {
      overlaps.forEach(function(overlap) {
        //check for overlap with other annotations
        if (overlap.start < comparisonOverlap.start) {
          if (overlap.end < comparisonOverlap.start) {
            //----llll
            //--------cccc
            //no overlap
          } else {
            //----llll
            //-------cccc
            //overlap
            blockedYOffsets.push(comparisonAnnotation.yOffset);
          }
        } else {
          if (overlap.start > comparisonOverlap.end) {
            //------llll
            // -cccc
            //no overlap
          } else {
            //-----llll
            // -cccc
            //overlap
            blockedYOffsets.push(comparisonAnnotation.yOffset);
          }
        }
      });

    });
  });

  var newYOffset = 0;
  //sort and remove duplicates from the blockedYOffsets array
  //then starting with newYOffset = 0, see if there is space for the location 
  if (blockedYOffsets.length > 0) {
    var sortedBlockedYOffsets = _.sortBy(blockedYOffsets, function(n) {
      return n
    });
    var sortedUniqueBlockedYOffsets = _.uniq(sortedBlockedYOffsets, true); //true here specifies that the array has already been sorted
    var stillPotentiallyBlocked = true;
    while (stillPotentiallyBlocked) {
      if (sortedUniqueBlockedYOffsets[newYOffset] != newYOffset) {
        //the newYOffset isn't blocked
        stillPotentiallyBlocked = false;
      } else {
        //it is blocked
        newYOffset++;
      }
    }
  }
  return newYOffset;
}

function splitAnnotationOnOrigin (annotation, sequenceLength) {
  var annotationLocations = [];
  if (annotation.start > annotation.end) {
    annotationLocations.push({
      start: 0,
      end: annotation.start
    });
    annotationLocations.push({
      start: annotation.end,
      end: sequenceLength-1
    });
  } else {
    annotationLocations.push({
      start: annotation.start,
      end: annotation.end
    });
  }
  return annotationLocations;
}

function getOverlapOfRowWithAnnotationLocation(annotationLocation, annotation, row) {
  var overlap;
  if (annotationLocation.start < row.start) {
    if (annotationLocation.end < row.start) {
      //do nothing
    } else { //end of annotation intersects row
      if (annotationLocation.end < row.end) {
        overlap = {
          start: row.start,
          end: annotationLocation.end
        };
      } else {
        overlap = {
          start: row.start,
          end: row.end
        };
      }
    }
  } else { //annotationLocation.start >= row.start
    if (annotationLocation.start > row.end) {
      //do nothing
    } else { //annotationLocation.start <= row.end
      //start of annotation intersects row
      if (annotationLocation.end < rowEnd) {
        //annotation fully enclosed within row
        overlap = {
          start: annotationLocation.start,
          end: annotationLocation.end
        };
      } else {
        //annotation end greater than row end
        overlap = {
          start: annotationLocation.start,
          end: row.end
        };
      }
    }
  }
  if (overlap) {
    //get the overlap type
    if (overlap.start === annotation.start) {
      if (overlap.end === annotation.end) {
        overlap.type = "beginningAndEnd";
      } else {
        overlap.type = "beginning";
      }
    } else {
      if (overlap.end === annotation.end) {
        overlap.type = "end";
      } else {
        overlap.type = "middle";
      }
    }


    return overlap;
  }
}

module.exports = SequenceEditor2;