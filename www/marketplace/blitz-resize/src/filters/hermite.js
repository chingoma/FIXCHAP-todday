'use strict'

const name = 'hermite'

const filter = function (event) {
    var data = new Uint8ClampedArray(event.data[0]);
    var W = event.data[1];
    var H = event.data[2];
    var img = new ImageData(
        data,
        W,
        H
    )

    var data2 = new Uint8ClampedArray(event.data[5]);
    var W2 = event.data[3];
    var H2 = event.data[4];
    var img2 = new ImageData(
        data2,
        W2,
        H2
    )

    var ratio_w = W / W2;
    var ratio_h = H / H2;
    var ratio_w_half = Math.ceil(ratio_w/2);
    var ratio_h_half = Math.ceil(ratio_h/2);

    for(var j = 0; j < H2; j++) {
        for(var i = 0; i < W2; i++) {
            var x2 = (i + j*W2) * 4;
            var weight = 0;
            var weights = 0;
            var gx_r = gx_g = gx_b = gx_a = 0;
            var center_y = (j + 0.5) * ratio_h;
            for(var yy = Math.floor(j * ratio_h); yy < (j + 1) * ratio_h; yy++) {
                var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                var center_x = (i + 0.5) * ratio_w;
                var w0 = dy*dy //pre-calc part of w
                for(var xx = Math.floor(i * ratio_w); xx < (i + 1) * ratio_w; xx++) {
                    var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    var w = Math.sqrt(w0 + dx*dx);
                    if(w >= -1 && w <= 1){
                        //hermite filter
                        weight = 2 * w*w*w - 3*w*w + 1;
                        if(weight > 0) {
                            dx = 4*(xx + yy*W);
                            gx_r += weight * data[dx];
                            gx_g += weight * data[dx + 1];
                            gx_b += weight * data[dx + 2];
                            gx_a += weight * data[dx + 3];
                            weights += weight;
                        }
                    }
                }
            }

            data2[x2]     = gx_r / weights;
            data2[x2 + 1] = gx_g / weights;
            data2[x2 + 2] = gx_b / weights;
            data2[x2 + 3] = gx_a / weights;

        }
    }
    return img2.data.buffer;
}

module.exports = {
    name,
    filter
}