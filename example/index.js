var geojsonExtent = require('geojson-extent');
var viewport = require('../');
var opener = require('opener');

var ext = geojsonExtent(require('./us.json'));
var extsm = geojsonExtent(require('./small.json'));

var fout = require('fs').createWriteStream('index.html');

function staticOf(extent, size) {
    var vp = viewport.viewport(extent, size);
    return '<img src="http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/' +
        vp.center.join(',') + ',' + vp.zoom + '/' + size.join('x') + '.png" />';
}

fout.write(staticOf(ext, [1000, 800]));
fout.write(staticOf(ext, [500, 300]));
fout.write(staticOf(ext, [200, 100]));
fout.write(staticOf(ext, [100, 100]));
fout.write(staticOf(ext, [10, 10]));

fout.write(staticOf(extsm, [1000, 800]));
fout.write(staticOf(extsm, [500, 300]));
fout.write(staticOf(extsm, [200, 100]));
fout.write(staticOf(extsm, [100, 100]));
fout.write(staticOf(extsm, [10, 10]));
opener('index.html');
