var flatten = require('../'),
    fs = require('fs'),
    test = require('tap').test;

function f(_) {
    return JSON.parse(fs.readFileSync(_, 'utf8'));
}

test('flatten', function(t) {
    t.deepEqual(flatten(f('./test/multigeometry.input.geojson')), f('./test/multigeometry.output.geojson'),
        'expands geometrycollection');
    t.deepEqual(flatten(f('./test/point.input.geojson')), f('./test/point.input.geojson'),
        'does not touch point');
    t.deepEqual(flatten(f('./test/linestring.geojson')), f('./test/linestring.geojson'),
        'does not touch line');
    t.end();
});
