var geojsonCoords = require('geojson-coords'),
    extent = require('extent');

module.exports = function(_) {
    var bbox = [Infinity, Infinity, -Infinity, -Infinity],
        ext = extent(),
        coords = geojsonCoords(_);
    for (var i = 0; i < coords.length; i++) ext.include(coords[i]);
    return ext.bbox();
};
