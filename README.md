# geo-viewport

Turns bounding boxes / extents into centerpoint & zoom combos for static maps.

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
[
  5.760955810546875,
  45.18978009667531,
  5]
```

## api

`viewport(bounds, dimensions)`

Given a `NESW` array of bounds and a `[x, y]` array of pixel
dimensions, return a `[lon, lat, zoom]` viewport.
