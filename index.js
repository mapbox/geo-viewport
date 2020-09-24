var SphericalMercator = require('@mapbox/sphericalmercator');

// The SphericalMercator library only accepts a variable
// tileSize on instantiation, which it uses to pre-cache
// calculations by zoom level.
// We cache each instantiation, keyed by tile size, to avoid
// repeating this cost when working with a single tile size
// (assumed to be the most-common use case).
var smCache = {};

module.exports.viewport = viewport;
module.exports.bounds = bounds;

function fetchMerc(tileSize) {
    tileSize = tileSize || 256;

    if (!smCache[tileSize]) {
        smCache[tileSize] = new SphericalMercator({ size: tileSize });
    }

    return smCache[tileSize];
}

function getAdjusted(base, ratios, allowFloat) {
    var adjusted = Math.min(
        base - (Math.log(ratios[0]) / Math.log(2)),
        base - (Math.log(ratios[1]) / Math.log(2)));

    return allowFloat ? adjusted : Math.floor(adjusted);
}

function viewport(bounds, dimensions, minzoom, maxzoom, tileSize, allowFloat) {
    minzoom = (minzoom === undefined) ? 0 : minzoom;
    maxzoom = (maxzoom === undefined) ? 20 : maxzoom;
    var merc = fetchMerc(tileSize);
    var base = maxzoom;
    var bl = merc.px([bounds[0], bounds[1]], base);
    var tr = merc.px([bounds[2], bounds[3]], base);
    var width = tr[0] - bl[0];
    var height = bl[1] - tr[1];
    var centerPixelX = bl[0] + (width / 2);
    var centerPixelY = tr[1] + (height / 2);
    var ratios = [width / dimensions[0], height / dimensions[1]];
    var adjusted = getAdjusted(base, ratios, allowFloat);

    var center = merc.ll([centerPixelX, centerPixelY], base);
    var zoom = Math.max(minzoom, Math.min(maxzoom, adjusted));

    return { center, zoom };
}

function bounds(viewport, zoom, dimensions, tileSize) {
    if (viewport.lon !== undefined) {
        viewport = [
            viewport.lon,
            viewport.lat
        ];
    }

    var merc = fetchMerc(tileSize);
    var px = merc.px(viewport, zoom);
    var tl = merc.ll([
        px[0] - (dimensions[0] / 2),
        px[1] - (dimensions[1] / 2)
    ], zoom);
    var br = merc.ll([
        px[0] + (dimensions[0] / 2),
        px[1] + (dimensions[1] / 2)
    ], zoom);
    return [tl[0], br[1], br[0], tl[1]];
}
