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

    t.equal(precisionRound(xMin, decDegreesFloatTolerance), precisionRound(-77.03945338726044, decDegreesFloatTolerance));
    t.equal(precisionRound(yMin, decDegreesFloatTolerance), precisionRound(38.89697827424865, decDegreesFloatTolerance));
    t.equal(precisionRound(xMax, decDegreesFloatTolerance), precisionRound(-77.03365981578827, decDegreesFloatTolerance));
    t.equal(precisionRound(yMax, decDegreesFloatTolerance), precisionRound(38.89843950894583, decDegreesFloatTolerance));
    t.end();
});

test('bounds for float zooms', function (t) {
  var zoom = 16.52;
  var bounds = viewport.bounds([-77.036556, 38.897708], zoom, [1080, 350], 512);
  var xMin = bounds[0];
  var yMin = bounds[1];
  var xMax = bounds[2];
  var yMax = bounds[3];

  t.equal(precisionRound(xMin, decDegreesFloatTolerance), precisionRound(-77.04059627355818, decDegreesFloatTolerance));
  t.equal(precisionRound(yMin, decDegreesFloatTolerance), precisionRound(38.8966889687563, decDegreesFloatTolerance));
  t.equal(precisionRound(xMax, decDegreesFloatTolerance), precisionRound(-77.03251572644183, decDegreesFloatTolerance));
  t.equal(precisionRound(yMax, decDegreesFloatTolerance), precisionRound(38.89872701662092, decDegreesFloatTolerance));
  t.end();
});
