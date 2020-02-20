var viewport = require('../'),
    test = require('tap').test;

// Compare float values up to ~1mm precision
var decDegreesFloatTolerance = 8;

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

test('viewport', function (t) {

    t.deepEqual(viewport.viewport([
        5.668343999999995,
        45.111511000000014,
        5.852471999999996,
        45.26800200000002
    ], [640, 480]), {
        center: [
            5.7604079999999955,
            45.189756500000016
        ],
        zoom: 11
    });

    t.deepEqual(viewport.viewport([
        5.668343999999995,
        45.111511000000014,
        5.852471999999996,
        45.26800200000002
    ], [64, 48]), {
        center: [
            5.7604079999999955,
            45.189756500000016
        ],
        zoom: 8
    });

    t.deepEqual(viewport.viewport([
        5.668343999999995,
        45.111511000000014,
        5.852471999999996,
        45.26800200000002
    ], [10, 10]), {
        center: [
            5.7604079999999955,
            45.189756500000016
        ],
        zoom: 5
    });

    t.end();
});

test('bounds for 512px tiles', function (t) {
    var bounds = viewport.bounds([-77.036556, 38.897708], 17, [1080, 350], 512);
    var xMin = bounds[0];
    var yMin = bounds[1];
    var xMax = bounds[2];
    var yMax = bounds[3];

    t.equal(precisionRound(xMin, decDegreesFloatTolerance), -77.03945339);
    t.equal(precisionRound(yMin, decDegreesFloatTolerance), 38.89697827);
    t.equal(precisionRound(xMax, decDegreesFloatTolerance), -77.03365982);
    t.equal(precisionRound(yMax, decDegreesFloatTolerance), 38.89843951);
    t.end();
});

test('bounds for float zooms', function (t) {
  var zoom = 16.52;
  var bounds = viewport.bounds([-77.036556, 38.897708], zoom, [1080, 350], 512);
  var xMin = bounds[0];
  var yMin = bounds[1];
  var xMax = bounds[2];
  var yMax = bounds[3];

  t.equal(precisionRound(xMin, decDegreesFloatTolerance), -77.04059627);
  t.equal(precisionRound(yMin, decDegreesFloatTolerance), 38.89668897);
  t.equal(precisionRound(xMax, decDegreesFloatTolerance), -77.03251573);
  t.equal(precisionRound(yMax, decDegreesFloatTolerance), 38.89872702);
  t.end();
});

test('viewport for float zooms', function(t) {
    t.deepEqual(viewport.viewport([
        5.668343999999995,
        45.111511000000014,
        5.852471999999996,
        45.26800200000002
    ], [10, 10], undefined, undefined, 256, true), {
        center: [
            5.7604079999999955,
            45.189756500000016
        ],
        zoom: 5.984828902182182
    });
    t.end();
});

test('viewport and bounds should return initial values', function(t) {

    const expCenter = [
      -3.9673465629413203,
       52.48259851586781
    ]
    const tilesize = 512
    const expZoom = 7.770670445470639
    const imgsize = [1169, 1240]
    const bounds = [
      -5.715601797359881,
      51.267265845221885,
      -2.2190913285227603,
      53.69793118651373
    ]
    const actual = viewport.viewport(bounds, imgsize, undefined, undefined, tilesize, true)

    t.deepEqual(actual,  {
        center: expCenter,
        zoom: expZoom,
    });
    
    const reverted = viewport.bounds([actual.center[0], actual.center[1]], actual.zoom, imgsize, tilesize)

    t.deepEqual(bounds, reverted)
    t.end();
});
