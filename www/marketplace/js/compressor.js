/*!
 * Compressor.js v1.1.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-10-05T02:32:40.212Z
 */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Compressor = t());
})(this, function () {
    "use strict";
    function t(t, e) {
        var r,
            i = Object.keys(t);
        return (
            Object.getOwnPropertySymbols &&
            ((r = Object.getOwnPropertySymbols(t)),
            e &&
            (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
                i.push.apply(i, r)),
                i
        );
    }
    function a(i) {
        for (var e = 1; e < arguments.length; e++) {
            var a = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? t(Object(a), !0).forEach(function (e) {
                    var t, r;
                    (t = i), (e = a[(r = e)]), r in t ? Object.defineProperty(t, r, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : (t[r] = e);
                })
                : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
                    : t(Object(a)).forEach(function (e) {
                        Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(a, e));
                    });
        }
        return i;
    }
    function n(e, t) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
    }
    function s() {
        return (s =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r,
                        i = arguments[t];
                    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
                }
                return e;
            }).apply(this, arguments);
    }
    var e,
        r,
        o,
        l,
        c,
        h,
        u,
        f,
        i = { exports: {} };
    (e = i),
    "undefined" != typeof window &&
    ((o = (r = window).HTMLCanvasElement && r.HTMLCanvasElement.prototype),
        (l =
            r.Blob &&
            (function () {
                try {
                    return Boolean(new Blob());
                } catch (e) {
                    return !1;
                }
            })()),
        (c =
            l &&
            r.Uint8Array &&
            (function () {
                try {
                    return 100 === new Blob([new Uint8Array(100)]).size;
                } catch (e) {
                    return !1;
                }
            })()),
        (h = r.BlobBuilder || r.WebKitBlobBuilder || r.MozBlobBuilder || r.MSBlobBuilder),
        (u = /^data:((.*?)(;charset=.*?)?)(;base64)?,/),
        (f =
            (l || h) &&
            r.atob &&
            r.ArrayBuffer &&
            r.Uint8Array &&
            function (e) {
                var t,
                    r,
                    i,
                    a,
                    n,
                    o = e.match(u);
                if (!o) throw new Error("invalid data URI");
                for (
                    t = o[2] ? o[1] : "text/plain" + (o[3] || ";charset=US-ASCII"), i = !!o[4], o = e.slice(o[0].length), r = (i ? atob : decodeURIComponent)(o), i = new ArrayBuffer(r.length), a = new Uint8Array(i), n = 0;
                    n < r.length;
                    n += 1
                )
                    a[n] = r.charCodeAt(n);
                return l ? new Blob([c ? a : i], { type: t }) : ((o = new h()).append(i), o.getBlob(t));
            }),
    r.HTMLCanvasElement &&
    !o.toBlob &&
    (o.mozGetAsFile
        ? (o.toBlob = function (e, t, r) {
            var i = this;
            setTimeout(function () {
                r && o.toDataURL && f ? e(f(i.toDataURL(t, r))) : e(i.mozGetAsFile("blob", t));
            });
        })
        : o.toDataURL &&
        f &&
        (o.msToBlob
            ? (o.toBlob = function (e, t, r) {
                var i = this;
                setTimeout(function () {
                    ((t && "image/png" !== t) || r) && o.toDataURL && f ? e(f(i.toDataURL(t, r))) : e(i.msToBlob(t));
                });
            })
            : (o.toBlob = function (e, t, r) {
                var i = this;
                setTimeout(function () {
                    e(f(i.toDataURL(t, r)));
                });
            }))),
        e.exports ? (e.exports = f) : (r.dataURLtoBlob = f));
    function j(e) {
        return 0 < e && e < 1 / 0;
    }
    var T = i.exports,
        d = {
            strict: !0,
            checkOrientation: !0,
            maxWidth: 1 / 0,
            maxHeight: 1 / 0,
            minWidth: 0,
            minHeight: 0,
            width: void 0,
            height: void 0,
            resize: "none",
            quality: 0.8,
            mimeType: "auto",
            convertTypes: ["image/png"],
            convertSize: 5e6,
            beforeDraw: null,
            drew: null,
            success: null,
            error: null,
        },
        m = "undefined" != typeof window && void 0 !== window.document ? window : {},
        p = Array.prototype.slice;
    var b = /^image\/.+$/;
    function R(e) {
        return b.test(e);
    }
    var g = String.fromCharCode;
    var y = m.btoa;
    function w(e, t) {
        for (var r, i = [], a = new Uint8Array(e); 0 < a.length; ) i.push(g.apply(null, ((r = a.subarray(0, 8192)), Array.from ? Array.from(r) : p.call(r)))), (a = a.subarray(8192));
        return "data:".concat(t, ";base64,").concat(y(i.join("")));
    }
    function v(e) {
        var t,
            r,
            i,
            a,
            n,
            o,
            s,
            l = new DataView(e);
        try {
            if (255 === l.getUint8(0) && 216 === l.getUint8(1))
                for (var c = l.byteLength, h = 2; h + 1 < c; ) {
                    if (255 === l.getUint8(h) && 225 === l.getUint8(h + 1)) {
                        r = h;
                        break;
                    }
                    h += 1;
                }
            if (
                (r &&
                ((a = r + 10),
                "Exif" ===
                (function (e, t, r) {
                    var i,
                        a = "";
                    for (r += t, i = t; i < r; i += 1) a += g(e.getUint8(i));
                    return a;
                })(l, r + 4, 4) &&
                ((!(s = 18761 === (n = l.getUint16(a))) && 19789 !== n) || 42 !== l.getUint16(a + 2, s) || (8 <= (o = l.getUint32(a + 4, s)) && (i = a + o)))),
                    i)
            )
                for (var u, f = l.getUint16(i, s), d = 0; d < f; d += 1)
                    if (((u = i + 12 * d + 2), 274 === l.getUint16(u, s))) {
                        (u += 8), (t = l.getUint16(u, s)), l.setUint16(u, 1, s);
                        break;
                    }
        } catch (e) {
            t = 1;
        }
        return t;
    }
    var U = /\.\d*(?:0|9){12}\d*$/;
    function k(e, t) {
        t = 1 < arguments.length && void 0 !== t ? t : 1e11;
        return U.test(e) ? Math.round(e * t) / t : e;
    }
    function x(e, t) {
        var r = e.aspectRatio,
            i = e.height,
            a = e.width,
            n = 1 < arguments.length && void 0 !== t ? t : "none",
            o = j(a),
            e = j(i);
        return o && e ? ((t = i * r), (("contain" === n || "none" === n) && a < t) || ("cover" === n && t < a) ? (i = a / r) : (a = i * r)) : o ? (i = a / r) : e && (a = i * r), { width: a, height: i };
    }
    var O = m.ArrayBuffer,
        B = m.FileReader,
        A = m.URL || m.webkitURL,
        M = /\.\w+$/,
        D = m.Compressor;
    return (function () {
        function r(e, t) {
            !(function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, r),
                (this.file = e),
                (this.image = new Image()),
                (this.options = a(a({}, d), t)),
                (this.aborted = !1),
                (this.result = null),
                this.init();
        }
        var e, t, i;
        return (
            (e = r),
                (i = [
                    {
                        key: "noConflict",
                        value: function () {
                            return (window.Compressor = D), r;
                        },
                    },
                    {
                        key: "setDefaults",
                        value: function (e) {
                            s(d, e);
                        },
                    },
                ]),
            (t = [
                {
                    key: "init",
                    value: function () {
                        var i,
                            e,
                            a,
                            n = this,
                            o = this.file,
                            t = this.options;
                        (e = o),
                            "undefined" != typeof Blob && (e instanceof Blob || "[object Blob]" === Object.prototype.toString.call(e))
                                ? R((i = o.type))
                                    ? A && B
                                        ? (O || (t.checkOrientation = !1),
                                            A && !t.checkOrientation
                                                ? this.load({ url: A.createObjectURL(o) })
                                                : ((e = new B()),
                                                    (a = t.checkOrientation && "image/jpeg" === i),
                                                    ((this.reader = e).onload = function (e) {
                                                        var t = e.target.result,
                                                            r = {};
                                                        a
                                                            ? 1 < (e = v(t)) || !A
                                                                ? ((r.url = w(t, i)),
                                                                1 < e &&
                                                                s(
                                                                    r,
                                                                    (function (e) {
                                                                        var t = 0,
                                                                            r = 1,
                                                                            i = 1;
                                                                        switch (e) {
                                                                            case 2:
                                                                                r = -1;
                                                                                break;
                                                                            case 3:
                                                                                t = -180;
                                                                                break;
                                                                            case 4:
                                                                                i = -1;
                                                                                break;
                                                                            case 5:
                                                                                (t = 90), (i = -1);
                                                                                break;
                                                                            case 6:
                                                                                t = 90;
                                                                                break;
                                                                            case 7:
                                                                                (t = 90), (r = -1);
                                                                                break;
                                                                            case 8:
                                                                                t = -90;
                                                                        }
                                                                        return { rotate: t, scaleX: r, scaleY: i };
                                                                    })(e)
                                                                ))
                                                                : (r.url = A.createObjectURL(o))
                                                            : (r.url = t),
                                                            n.load(r);
                                                    }),
                                                    (e.onabort = function () {
                                                        n.fail(new Error("Aborted to read the image with FileReader."));
                                                    }),
                                                    (e.onerror = function () {
                                                        n.fail(new Error("Failed to read the image with FileReader."));
                                                    }),
                                                    (e.onloadend = function () {
                                                        n.reader = null;
                                                    }),
                                                    a ? e.readAsArrayBuffer(o) : e.readAsDataURL(o)))
                                        : this.fail(new Error("The current browser does not support image compression."))
                                    : this.fail(new Error("The first argument must be an image File or Blob object."))
                                : this.fail(new Error("The first argument must be a File or Blob object."));
                    },
                },
                {
                    key: "load",
                    value: function (e) {
                        var t = this,
                            r = this.file,
                            i = this.image;
                        (i.onload = function () {
                            t.draw(a(a({}, e), {}, { naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight }));
                        }),
                            (i.onabort = function () {
                                t.fail(new Error("Aborted to load the image."));
                            }),
                            (i.onerror = function () {
                                t.fail(new Error("Failed to load the image."));
                            }),
                        m.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(m.navigator.userAgent) && (i.crossOrigin = "anonymous"),
                            (i.alt = r.name),
                            (i.src = e.url);
                    },
                },
                {
                    key: "draw",
                    value: function (e) {
                        var t = this,
                            r = e.naturalWidth,
                            i = e.naturalHeight,
                            a = e.rotate,
                            n = void 0 === a ? 0 : a,
                            o = e.scaleX,
                            s = void 0 === o ? 1 : o,
                            l = e.scaleY,
                            c = void 0 === l ? 1 : l,
                            h = this.file,
                            u = this.image,
                            f = this.options,
                            d = document.createElement("canvas"),
                            m = d.getContext("2d"),
                            p = Math.abs(n) % 180 == 90,
                            b = ("contain" === f.resize || "cover" === f.resize) && j(f.width) && j(f.height),
                            g = Math.max(f.maxWidth, 0) || 1 / 0,
                            y = Math.max(f.maxHeight, 0) || 1 / 0,
                            w = Math.max(f.minWidth, 0) || 0,
                            a = Math.max(f.minHeight, 0) || 0,
                            o = r / i,
                            e = f.width,
                            l = f.height;
                        p && ((g = (v = [y, g])[0]), (y = v[1]), (w = (v = [a, w])[0]), (a = v[1]), (e = (v = [l, e])[0]), (l = v[1]));
                        var v = x({ aspectRatio: (o = b ? e / l : o), width: g, height: y }, "contain");
                        (g = v.width), (y = v.height);
                        v = x({ aspectRatio: o, width: w, height: a }, "cover");
                        (w = v.width),
                            (a = v.height),
                            (l = b
                                ? ((e = (v = x({ aspectRatio: o, width: e, height: l }, f.resize)).width), v.height)
                                : ((e = void 0 === (O = (U = x({ aspectRatio: o, width: e, height: l })).width) ? r : O), void 0 === (O = U.height) ? i : O));
                        var U = -(e = Math.floor(k(Math.min(Math.max(e, w), g)))) / 2,
                            O = -(l = Math.floor(k(Math.min(Math.max(l, a), y)))) / 2,
                            w = e,
                            g = l,
                            a = [];
                        b && ((y = (o = x({ aspectRatio: o, width: (y = r), height: (b = i) }, { contain: "cover", cover: "contain" }[f.resize])).width), (b = o.height), a.push((r - y) / 2, (i - b) / 2, y, b)),
                            a.push(U, O, w, g),
                        p && ((e = (B = [l, e])[0]), (l = B[1])),
                            (d.width = e),
                            (d.height = l),
                        R(f.mimeType) || (f.mimeType = h.type);
                        var B = "transparent";
                        h.size > f.convertSize && 0 <= f.convertTypes.indexOf(f.mimeType) && (f.mimeType = "image/jpeg"),
                        "image/jpeg" === f.mimeType && (B = "#fff"),
                            (m.fillStyle = B),
                            m.fillRect(0, 0, e, l),
                        f.beforeDraw && f.beforeDraw.call(this, m, d),
                        this.aborted ||
                        (m.save(),
                            m.translate(e / 2, l / 2),
                            m.rotate((n * Math.PI) / 180),
                            m.scale(s, c),
                            m.drawImage.apply(m, [u].concat(a)),
                            m.restore(),
                        f.drew && f.drew.call(this, m, d),
                        this.aborted ||
                        ((m = function (e) {
                            t.aborted || t.done({ naturalWidth: r, naturalHeight: i, result: e });
                        }),
                            d.toBlob ? d.toBlob(m, f.mimeType, f.quality) : m(T(d.toDataURL(f.mimeType, f.quality)))));
                    },
                },
                {
                    key: "done",
                    value: function (e) {
                        var t = e.naturalWidth,
                            r = e.naturalHeight,
                            i = e.result,
                            a = this.file,
                            n = this.image,
                            e = this.options;
                        A && !e.checkOrientation && A.revokeObjectURL(n.src),
                            !i || (e.strict && i.size > a.size && e.mimeType === a.type && !(e.width > t || e.height > r || e.minWidth > t || e.minHeight > r || e.maxWidth < t || e.maxHeight < r))
                                ? (i = a)
                                : ((r = new Date()),
                                    (i.lastModified = r.getTime()),
                                    (i.lastModifiedDate = r),
                                    (i.name = a.name),
                                i.name && i.type !== a.type && (i.name = i.name.replace(M, ((a = R((a = i.type)) ? a.substr(6) : ""), ".".concat((a = "jpeg" === a ? "jpg" : a)))))),
                            (this.result = i),
                        e.success && e.success.call(this, i);
                    },
                },
                {
                    key: "fail",
                    value: function (e) {
                        var t = this.options;
                        if (!t.error) throw e;
                        t.error.call(this, e);
                    },
                },
                {
                    key: "abort",
                    value: function () {
                        this.aborted || ((this.aborted = !0), this.reader ? this.reader.abort() : this.image.complete ? this.fail(new Error("The compression process has been aborted.")) : ((this.image.onload = null), this.image.onabort()));
                    },
                },
            ]) && n(e.prototype, t),
            i && n(e, i),
                r
        );
    })();
});
