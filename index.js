var merc = new (require('sphericalmercator'))();

module.exports.viewport = viewport;
module.exports.bounds = bounds;

function viewport(bounds, dimensions, minzoom, maxzoom) {
    minzoom = (minzoom === undefined) ? 0 : minzoom;
    maxzoom = (maxzoom === undefined) ? 20 : maxzoom;

    var base = maxzoom,
        bl = merc.px([bounds[0], bounds[1]], base),
        tr = merc.px([bounds[2], bounds[3]], base),
        width = tr[0] - bl[0],
        height = bl[1] - tr[1],
        ratios = [width / dimensions[0], height / dimensions[1]],
        center = [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2],
        adjusted = Math.floor(Math.min(
            base - (Math.log(ratios[0]) / Math.log(2)),
            base - (Math.log(ratios[1]) / Math.log(2)))),
        zoom = Math.max(minzoom, Math.min(maxzoom, adjusted));

    return { center: center, zoom: zoom };
}

function bounds(viewport, zoom, dimensions) {
    if (viewport.lon !== undefined) {
        viewport = [
            viewport.lon,
            viewport.lat
        ];
    }
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

function baseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
