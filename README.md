[![Build Status](https://travis-ci.org/mapbox/geo-viewport.svg)](https://travis-ci.org/mapbox/geo-viewport)

# geo-viewport

Turns bounding boxes / extents into centerpoint & zoom
combos for static maps.

Works in node.js and browsers, via [browserify](http://browserify.org/)
or a script tag.

## Install

    npm install --save @mapbox/geo-viewport

Or use a plugin:

```html
<script src='//api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.2.1/geo-viewport.js'></script>
```

The script-tag include exports an object called `geoViewport`,
with methods `bounds` and `viewport` documented below.

## Example

[Live example with Mapbox Static Map API](https://www.mapbox.com/mapbox.js/example/v1.0.0/static-map-from-bounds-with-geo-viewport/)

### With Node

```js
var geoViewport = require('@mapbox/geo-viewport');

geoViewport.viewport([
    5.668343999999995,
    45.111511000000014,
    5.852471999999996,
    45.26800200000002
], [640, 480])

// yields
// {
//     center: [
//         5.7604079999999955,
//         45.189756500000016
//     ],
//     zoom: 11
// }
```

In a browser:

```html
<script src='//api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.1.1/geo-viewport.js'></script>
<script>
var bounds = geoViewport.viewport([
    5.668343999999995,
    45.111511000000014,
    5.852471999999996,
    45.26800200000002
], [640, 480]);

var center = geoViewport.bounds(
  [-75.03,
  35.25],
  14,
  [600, 400]);

console.log(bounds);
console.log(center);
</script>
```

## api

### `viewport(bounds, dimensions, minzoom, maxzoom, tileSize, allowFloat)`

Given a `WSEN` array of bounds and a `[x, y]` array of pixel dimensions, return a `{ center: [lon, lat], zoom: zoom }` viewport. Use `allowFloat` to retain float values in the output.

Example:

```js
// first argument is the bounds, and the image is 640x480
geoViewport.viewport([
    5.6683, 45.111, 5.8524, 45.268
], [640, 480])
```

### `bounds(viewport, zoom, dimensions, tileSize)`

Given a centerpoint as `[lon, lat]` or `{ lon, lat }`, a zoom,
and dimensions as `[x, y]`, return a bounding box.

Example:

```js
geoViewport.bounds([-75.03, 35.25], 14, [600, 400])
```

## tile sizes

Be aware that these calculations are sensitive to tile size. The default size assumed by this library is 256x256px; however, Mapbox Vector Tiles are 512x512px.

For example, to calculating a bounding box for a classic raster-based 256x256 tile:

```js
geoViewport.bounds([-75.03, 35.25], 14, [600, 400], 256)

// since 256 is default, you can omit the tileSize param
geoViewport.bounds([-75.03, 35.25], 14, [600, 400])
```

To calculate a bounding box for a Mapbox vector tile source, such as an image from the [Mapbox Static Image API](https://www.mapbox.com/api-documentation/#static):

```js
geoViewport.bounds([-75.03, 35.25], 14, [600, 400], 512)
```

There's a [handy blog post discussing the issue here](https://www.mapbox.com/blog/512px-map-tile).
