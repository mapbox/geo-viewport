var test = require('tap').test,
    geojsonExtent = require('../');


test('corners', function(t) {
    t.equal(geojsonExtent(null), null, 'null');
    t.equal(geojsonExtent({
        type: 'FeatureCollection',
        features: []
    }), null, 'no features');
    t.end();
});

test('extent', function(t) {
    t.deepEqual(geojsonExtent({
        type: 'Point',
        coordinates: [0, 0]
    }), [0, 0, 0, 0], 'a single point');

    t.deepEqual(geojsonExtent({
        "type": "MultiPoint",
        "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
    }), [100, 0, 101, 1], 'multipoint');

    t.deepEqual(geojsonExtent(
        { "type": "GeometryCollection",
            "geometries": [
                { "type": "Point",
                    "coordinates": [100.0, 0.0]
            },
            { "type": "LineString",
                "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
            }
            ]
    }), [100, 0, 102, 1], 'multigeometry');

    t.deepEqual(geojsonExtent({ "type": "MultiPolygon",
    "coordinates": [
      [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
      [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
       [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
      ]
    }), [100, 0, 103, 3], 'multipolygon');

    t.deepEqual(geojsonExtent( { "type": "FeatureCollection",
    "features": [
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
        "properties": {"prop0": "value0"}
        },
      { "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
            ]
          },
        "properties": {
          "prop0": "value0",
          "prop1": 0.0
          }
        },
      { "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [
             [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
               [100.0, 1.0], [100.0, 0.0] ]
             ]
         },
         "properties": {
           "prop0": "value0",
           "prop1": {"this": "that"}
           }
         }
       ]
     }), [100, 0, 105, 1], 'example from geojson.org');
    t.end();
});
