var viewport = require('../'),
    test = require('tap').test;

test('viewport', function(t) {
    t.deepEqual(viewport.viewport([
        5.668343999999995,
        45.111511000000014,
        5.852471999999996,
        45.26800200000002
    ], [640, 480]), [
        5.760955810546875,
        45.18978009667531,
        5]);
    t.end();
});

test('bounds', function(t) {
    t.deepEqual(viewport.bounds([
        5.668343999999995,
        45.111511000000014
    ], 10, [640, 480]), [
        5.760955810546875,
        45.18978009667531,
        5.728056088168029]);
    t.end();
});
