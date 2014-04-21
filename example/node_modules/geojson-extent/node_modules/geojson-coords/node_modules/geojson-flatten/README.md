# geojson-flatten

Flatten MultiPoint, MultiPolygon, MultiLineString, and GeometryCollection
geometries in [GeoJSON](http://geojson.org/) files into simple non-complex
geometries.

## install

    npm install --save geojson-flatten

Or download `geojson-flatten.js` for non-[browserify](http://browserify.org/) usage.

## example

```
var flatten = require('geojson-flatten');

flattened = flatten(geojsonObject);
```
