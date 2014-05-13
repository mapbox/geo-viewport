[![Build Status](https://travis-ci.org/mapbox/geo-viewport.svg?branch=v0.1.0)](https://travis-ci.org/mapbox/geo-viewport)

# geo-viewport

Turns bounding boxes / extents into centerpoint & zoom
combos for static maps.

## install

    npm install --save geo-viewport

Or use a plugin:

```html
<script src='//api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.1.1/geo-viewport.js'></script>
```

## example

[Live example with Mapbox Static Map API](https://www.mapbox.com/mapbox.js/example/v1.0.0/static-map-from-bounds-with-geo-viewport/)

```js
var viewport = require('geo-viewport');

viewport.viewport([
    5.668343999999995,
    45.111511000000014,
    5.852471999999996,
    45.26800200000002
], [640, 480])

// yields
{
    center: [
        5.7604079999999955,
        45.189756500000016
    ],
    zoom: 11
}
```

## api

`viewport(bounds, dimensions)`

Given a `WSEN` array of bounds and a `[x, y]` array of pixel
dimensions, return a `{ center: [lon, lat], zoom: zoom }` viewport.

`bounds(center, zoom, dimensions)`

Given a centerpoint as `[lon, lat]` or `{ lon, lat }`, a zoom,
and dimensions as `[x, y]`, return a bounding box.
