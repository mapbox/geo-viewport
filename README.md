# geo-viewport

Turns bounding boxes / extents into centerpoint & zoom
combos for static maps.

## install

    npm install --save geo-viewport

## example

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
