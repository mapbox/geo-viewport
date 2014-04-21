![](http://img.shields.io/travis/mapbox/geojson-extent.svg?style=flat)

# geojson-extent

Compute an extent given a GeoJSON object.

## install

    npm install --save geojson-extent

## api

### `extent(geojson)`

Given any valid GeoJSON object, return bounds in the form `[WSEN]`.
Invalid objects will return `null`.
