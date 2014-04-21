var test = require('tap').test,
    Extent = require('../');

test('extent', function(t) {
    t.equal(Extent().bbox(), null, 'null');
    t.deepEqual(Extent()
        .include([0, 0]).bbox(),
            [0, 0, 0, 0], 'one point');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .bbox(),
            [0, 0, 10, 10], 'two points');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .include([-10, -10])
        .bbox(),
            [-10, -10, 10, 10], 'three points');
    t.end();
});
