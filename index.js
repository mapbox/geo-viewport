var merc = new (require('sphericalmercator'))();

module.exports.viewport = function(bounds, dimensions) {
    var tl = merc.px([bounds[0], bounds[1]], 10),
        br = merc.px([bounds[2], bounds[3]], 10),
        width = br[0] - tl[0],
        height = br[1] - tl[1],
        ratios = [width / dimensions[0], height / dimensions[1]];

    var center = merc.ll([
        (tl[0] + br[0]) / 2,
        (tl[1] + br[1]) / 2], 10);

    var dim, now;
    if (ratios[0] > ratios[1]) {
        now = width;
        dim = dimensions[0];
    } else {
        now = height;
        dim = dimensions[1];
    }
    return center.concat([Math.floor(Math.pow(10, baseLog(dim, now)))]);
};

module.exports.bounds = function(viewport, zoom, dimensions) {
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
};

function baseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
