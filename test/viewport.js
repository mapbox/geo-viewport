var viewport = require('../'),
    test = require('tap').test;

// Compare float values up to ~1mm precision
var decDegreesFloatTolerance = 8;

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

const sampleBounds = [
    5.668343999999995,
    45.111511000000014,
    5.852471999999996,
    45.26800200000002
];

const expectedCenter = [
    5.760407969355583,
    45.189810341718136
];

test('viewport', function(t) {
    t.deepEqual(viewport.viewport(sampleBounds, [640, 480]), {
        center: expectedCenter,
        zoom: 11
    });

    t.deepEqual(viewport.viewport(sampleBounds, [64, 48]), {
        center: expectedCenter,
        zoom: 8
    });

    t.deepEqual(viewport.viewport(sampleBounds, [10, 10]), {
        center: expectedCenter,
        zoom: 5
    });

    t.end();
});

test('viewport in Southern hemisphere', function(t) {
    t.deepEqual(viewport.viewport([10, -20, 20, -10], [500, 250]), {
        center: [
            14.999999776482582,
            -15.058651551491899
        ],
        zoom: 5
    });

    t.deepEqual(viewport.viewport([-10, -60, 10, -30], [500, 250]), {
        center: [
            0,
            -47.05859720188612
        ],
        zoom: 2
    });

    t.end();
});

test('bounds for 512px tiles', function(t) {
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

test('bounds for float zooms', function(t) {
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
    t.deepEqual(viewport.viewport(sampleBounds, [10, 10], undefined, undefined, 256, true), {
        center: expectedCenter,
        zoom: 5.984828902182182
    });

    t.end();
});
