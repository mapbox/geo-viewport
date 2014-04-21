# extent

a simple geographical extent

## api

### `extent()`

Create a new extent object

### `extent.include([lon, lat])`

Expand the extent to include a lon, lat point.

### `extent.union([wsen])`

Expand the extent to include another extent.

### `extent.bbox()`

Get the extent's value. `null` if no points have
been included yet.
