! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var i, a = (t = t || oe).createElement("script");
        if (a.text = e, n)
            for (i in ye) n[i] && (a[i] = n[i]);
        t.head.appendChild(a).parentNode.removeChild(a)
    }

    function i(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[pe.call(e)] || "object" : typeof e
    }

    function a(e) {
        var t = !!e && "length" in e && e.length,
            n = i(e);
        return !ve(e) && !be(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function o(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }

    function r(e, t, n) {
        return ve(t) ? we.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        }) : t.nodeType ? we.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? we.grep(e, function(e) {
            return de.call(t, e) > -1 !== n
        }) : we.filter(t, e, n)
    }

    function s(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function l(e) {
        var t = {};
        return we.each(e.match(Me) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function c(e) {
        return e
    }

    function d(e) {
        throw e
    }

    function u(e, t, n, i) {
        var a;
        try {
            e && ve(a = e.promise) ? a.call(e).done(t).fail(n) : e && ve(a = e.then) ? a.call(e, t, n) : t.apply(void 0, [e].slice(i))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }

    function p() {
        oe.removeEventListener("DOMContentLoaded", p), e.removeEventListener("load", p), we.ready()
    }

    function f(e, t) {
        return t.toUpperCase()
    }

    function h(e) {
        return e.replace(qe, "ms-").replace(Ae, f)
    }

    function g() {
        this.expando = we.expando + g.uid++
    }

    function m(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ze.test(e) ? JSON.parse(e) : e)
    }

    function v(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(Ne, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                try {
                    n = m(n)
                } catch (e) {}
                Oe.set(e, t, n)
            } else n = void 0;
        return n
    }

    function b(e, t, n, i) {
        var a, o, r = 20,
            s = i ? function() {
                return i.cur()
            } : function() {
                return we.css(e, t, "")
            },
            l = s(),
            c = n && n[3] || (we.cssNumber[t] ? "" : "px"),
            d = (we.cssNumber[t] || "px" !== c && +l) && Re.exec(we.css(e, t));
        if (d && d[3] !== c) {
            for (l /= 2, c = c || d[3], d = +l || 1; r--;) we.style(e, t, d + c), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (r = 0), d /= o;
            d *= 2, we.style(e, t, d + c), n = n || []
        }
        return n && (d = +d || +l || 0, a = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = a)), a
    }

    function y(e) {
        var t, n = e.ownerDocument,
            i = e.nodeName,
            a = Ve[i];
        return a || (t = n.body.appendChild(n.createElement(i)), a = we.css(t, "display"), t.parentNode.removeChild(t), "none" === a && (a = "block"), Ve[i] = a, a)
    }

    function w(e, t) {
        for (var n, i, a = [], o = 0, r = e.length; o < r; o++)(i = e[o]).style && (n = i.style.display, t ? ("none" === n && (a[o] = De.get(i, "display") || null, a[o] || (i.style.display = "")), "" === i.style.display && Be(i) && (a[o] = y(i))) : "none" !== n && (a[o] = "none", De.set(i, "display", n)));
        for (o = 0; o < r; o++) null != a[o] && (e[o].style.display = a[o]);
        return e
    }

    function x(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && o(e, t) ? we.merge([e], n) : n
    }

    function $(e, t) {
        for (var n = 0, i = e.length; n < i; n++) De.set(e[n], "globalEval", !t || De.get(t[n], "globalEval"))
    }

    function C(e, t, n, a, o) {
        for (var r, s, l, c, d, u, p = t.createDocumentFragment(), f = [], h = 0, g = e.length; h < g; h++)
            if ((r = e[h]) || 0 === r)
                if ("object" === i(r)) we.merge(f, r.nodeType ? [r] : r);
                else if (Ze.test(r)) {
            for (s = s || p.appendChild(t.createElement("div")), l = (Ue.exec(r) || ["", ""])[1].toLowerCase(), c = Ke[l] || Ke._default, s.innerHTML = c[1] + we.htmlPrefilter(r) + c[2], u = c[0]; u--;) s = s.lastChild;
            we.merge(f, s.childNodes), (s = p.firstChild).textContent = ""
        } else f.push(t.createTextNode(r));
        for (p.textContent = "", h = 0; r = f[h++];)
            if (a && we.inArray(r, a) > -1) o && o.push(r);
            else if (d = we.contains(r.ownerDocument, r), s = x(p.appendChild(r), "script"), d && $(s), n)
            for (u = 0; r = s[u++];) Qe.test(r.type || "") && n.push(r);
        return p
    }

    function k() {
        return !0
    }

    function T() {
        return !1
    }

    function H() {
        try {
            return oe.activeElement
        } catch (e) {}
    }

    function j(e, t, n, i, a, o) {
        var r, s;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (s in t) j(e, s, n, i, t[s], o);
            return e
        }
        if (null == i && null == a ? (a = n, i = n = void 0) : null == a && ("string" == typeof n ? (a = i, i = void 0) : (a = i, i = n, n = void 0)), !1 === a) a = T;
        else if (!a) return e;
        return 1 === o && (r = a, (a = function(e) {
            return we().off(e), r.apply(this, arguments)
        }).guid = r.guid || (r.guid = we.guid++)), e.each(function() {
            we.event.add(this, t, a, i, n)
        })
    }

    function W(e, t) {
        return o(e, "table") && o(11 !== t.nodeType ? t : t.firstChild, "tr") ? we(e).children("tbody")[0] || e : e
    }

    function _(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function S(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function M(e, t) {
        var n, i, a, o, r, s, l, c;
        if (1 === t.nodeType) {
            if (De.hasData(e) && (o = De.access(e), r = De.set(t, o), c = o.events)) {
                delete r.handle, r.events = {};
                for (a in c)
                    for (n = 0, i = c[a].length; n < i; n++) we.event.add(t, a, c[a][n])
            }
            Oe.hasData(e) && (s = Oe.access(e), l = we.extend({}, s), Oe.set(t, l))
        }
    }

    function E(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ye.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function P(e, t, i, a) {
        t = le.apply([], t);
        var o, r, s, l, c, d, u = 0,
            p = e.length,
            f = p - 1,
            h = t[0],
            g = ve(h);
        if (g || p > 1 && "string" == typeof h && !me.checkClone && ot.test(h)) return e.each(function(n) {
            var o = e.eq(n);
            g && (t[0] = h.call(this, n, o.html())), P(o, t, i, a)
        });
        if (p && (o = C(t, e[0].ownerDocument, !1, e, a), r = o.firstChild, 1 === o.childNodes.length && (o = r), r || a)) {
            for (l = (s = we.map(x(o, "script"), _)).length; u < p; u++) c = o, u !== f && (c = we.clone(c, !0, !0), l && we.merge(s, x(c, "script"))), i.call(e[u], c, u);
            if (l)
                for (d = s[s.length - 1].ownerDocument, we.map(s, S), u = 0; u < l; u++) c = s[u], Qe.test(c.type || "") && !De.access(c, "globalEval") && we.contains(d, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? we._evalUrl && we._evalUrl(c.src) : n(c.textContent.replace(rt, ""), d, c))
        }
        return e
    }

    function I(e, t, n) {
        for (var i, a = t ? we.filter(t, e) : e, o = 0; null != (i = a[o]); o++) n || 1 !== i.nodeType || we.cleanData(x(i)), i.parentNode && (n && we.contains(i.ownerDocument, i) && $(x(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function q(e, t, n) {
        var i, a, o, r, s = e.style;
        return (n = n || lt(e)) && ("" !== (r = n.getPropertyValue(t) || n[t]) || we.contains(e.ownerDocument, e) || (r = we.style(e, t)), !me.pixelBoxStyles() && st.test(r) && ct.test(t) && (i = s.width, a = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = r, r = n.width, s.width = i, s.minWidth = a, s.maxWidth = o)), void 0 !== r ? r + "" : r
    }

    function A(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }

    function L(e) {
        if (e in gt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = ht.length; n--;)
            if ((e = ht[n] + t) in gt) return e
    }

    function D(e) {
        var t = we.cssProps[e];
        return t || (t = we.cssProps[e] = L(e) || e), t
    }

    function O(e, t, n) {
        var i = Re.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function z(e, t, n, i, a, o) {
        var r = "width" === t ? 1 : 0,
            s = 0,
            l = 0;
        if (n === (i ? "border" : "content")) return 0;
        for (; r < 4; r += 2) "margin" === n && (l += we.css(e, n + Xe[r], !0, a)), i ? ("content" === n && (l -= we.css(e, "padding" + Xe[r], !0, a)), "margin" !== n && (l -= we.css(e, "border" + Xe[r] + "Width", !0, a))) : (l += we.css(e, "padding" + Xe[r], !0, a), "padding" !== n ? l += we.css(e, "border" + Xe[r] + "Width", !0, a) : s += we.css(e, "border" + Xe[r] + "Width", !0, a));
        return !i && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - .5))), l
    }

    function N(e, t, n) {
        var i = lt(e),
            a = q(e, t, i),
            o = "border-box" === we.css(e, "boxSizing", !1, i),
            r = o;
        if (st.test(a)) {
            if (!n) return a;
            a = "auto"
        }
        return r = r && (me.boxSizingReliable() || a === e.style[t]), ("auto" === a || !parseFloat(a) && "inline" === we.css(e, "display", !1, i)) && (a = e["offset" + t[0].toUpperCase() + t.slice(1)], r = !0), (a = parseFloat(a) || 0) + z(e, t, n || (o ? "border" : "content"), r, i, a) + "px"
    }

    function F(e, t, n, i, a) {
        return new F.prototype.init(e, t, n, i, a)
    }

    function R() {
        vt && (!1 === oe.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(R) : e.setTimeout(R, we.fx.interval), we.fx.tick())
    }

    function X() {
        return e.setTimeout(function() {
            mt = void 0
        }), mt = Date.now()
    }

    function B(e, t) {
        var n, i = 0,
            a = {
                height: e
            };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) a["margin" + (n = Xe[i])] = a["padding" + n] = e;
        return t && (a.opacity = a.width = e), a
    }

    function G(e, t, n) {
        for (var i, a = (Y.tweeners[t] || []).concat(Y.tweeners["*"]), o = 0, r = a.length; o < r; o++)
            if (i = a[o].call(n, t, e)) return i
    }

    function V(e, t) {
        var n, i, a, o, r;
        for (n in e)
            if (i = h(n), a = t[i], o = e[n], Array.isArray(o) && (a = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (r = we.cssHooks[i]) && "expand" in r) {
                o = r.expand(o), delete e[i];
                for (n in o) n in e || (e[n] = o[n], t[n] = a)
            } else t[i] = a
    }

    function Y(e, t, n) {
        var i, a, o = 0,
            r = Y.prefilters.length,
            s = we.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (a) return !1;
                for (var t = mt || X(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), o = 0, r = c.tweens.length; o < r; o++) c.tweens[o].run(i);
                return s.notifyWith(e, [c, i, n]), i < 1 && r ? n : (r || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
            },
            c = s.promise({
                elem: e,
                props: we.extend({}, t),
                opts: we.extend(!0, {
                    specialEasing: {},
                    easing: we.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: mt || X(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = we.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; n < i; n++) c.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                }
            }),
            d = c.props;
        for (V(d, c.opts.specialEasing); o < r; o++)
            if (i = Y.prefilters[o].call(c, e, d, c.opts)) return ve(i.stop) && (we._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return we.map(d, G, c), ve(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), we.fx.timer(we.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }

    function U(e) {
        return (e.match(Me) || []).join(" ")
    }

    function Q(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function K(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(Me) || [] : []
    }

    function Z(e, t, n, a) {
        var o;
        if (Array.isArray(t)) we.each(t, function(t, i) {
            n || St.test(e) ? a(e, i) : Z(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, a)
        });
        else if (n || "object" !== i(t)) a(e, t);
        else
            for (o in t) Z(e + "[" + o + "]", t[o], n, a)
    }

    function J(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, a = 0,
                o = t.toLowerCase().match(Me) || [];
            if (ve(n))
                for (; i = o[a++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function ee(e, t, n, i) {
        function a(s) {
            var l;
            return o[s] = !0, we.each(e[s] || [], function(e, s) {
                var c = s(t, n, i);
                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
            }), l
        }
        var o = {},
            r = e === Ft;
        return a(t.dataTypes[0]) || !o["*"] && a("*")
    }

    function te(e, t) {
        var n, i, a = we.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((a[n] ? e : i || (i = {}))[n] = t[n]);
        return i && we.extend(!0, e, i), e
    }

    function ne(e, t, n) {
        for (var i, a, o, r, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (a in s)
                if (s[a] && s[a].test(i)) {
                    l.unshift(a);
                    break
                }
        if (l[0] in n) o = l[0];
        else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        if (o) return o !== l[0] && l.unshift(o), n[o]
    }

    function ie(e, t, n, i) {
        var a, o, r, s, l, c = {},
            d = e.dataTypes.slice();
        if (d[1])
            for (r in e.converters) c[r.toLowerCase()] = e.converters[r];
        for (o = d.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = d.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (!(r = c[l + " " + o] || c["* " + o]))
                for (a in c)
                    if ((s = a.split(" "))[1] === o && (r = c[l + " " + s[0]] || c["* " + s[0]])) {
                        !0 === r ? r = c[a] : !0 !== c[a] && (o = s[0], d.unshift(s[1]));
                        break
                    }
            if (!0 !== r)
                if (r && e.throws) t = r(t);
                else try {
                    t = r(t)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: r ? e : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    var ae = [],
        oe = e.document,
        re = Object.getPrototypeOf,
        se = ae.slice,
        le = ae.concat,
        ce = ae.push,
        de = ae.indexOf,
        ue = {},
        pe = ue.toString,
        fe = ue.hasOwnProperty,
        he = fe.toString,
        ge = he.call(Object),
        me = {},
        ve = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        be = function(e) {
            return null != e && e === e.window
        },
        ye = {
            type: !0,
            src: !0,
            noModule: !0
        },
        we = function(e, t) {
            return new we.fn.init(e, t)
        },
        xe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    we.fn = we.prototype = {
        jquery: "3.3.1",
        constructor: we,
        length: 0,
        toArray: function() {
            return se.call(this)
        },
        get: function(e) {
            return null == e ? se.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = we.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return we.each(this, e)
        },
        map: function(e) {
            return this.pushStack(we.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(se.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ce,
        sort: ae.sort,
        splice: ae.splice
    }, we.extend = we.fn.extend = function() {
        var e, t, n, i, a, o, r = arguments[0] || {},
            s = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof r && (c = r, r = arguments[s] || {}, s++), "object" == typeof r || ve(r) || (r = {}), s === l && (r = this, s--); s < l; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = r[t], r !== (i = e[t]) && (c && i && (we.isPlainObject(i) || (a = Array.isArray(i))) ? (a ? (a = !1, o = n && Array.isArray(n) ? n : []) : o = n && we.isPlainObject(n) ? n : {}, r[t] = we.extend(c, o, i)) : void 0 !== i && (r[t] = i));
        return r
    }, we.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== pe.call(e) || (t = re(e)) && ("function" != typeof(n = fe.call(t, "constructor") && t.constructor) || he.call(n) !== ge))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e) {
            n(e)
        },
        each: function(e, t) {
            var n, i = 0;
            if (a(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(xe, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (a(Object(e)) ? we.merge(n, "string" == typeof e ? [e] : e) : ce.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : de.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, a = e.length; i < n; i++) e[a++] = t[i];
            return e.length = a, e
        },
        grep: function(e, t, n) {
            for (var i = [], a = 0, o = e.length, r = !n; a < o; a++) !t(e[a], a) !== r && i.push(e[a]);
            return i
        },
        map: function(e, t, n) {
            var i, o, r = 0,
                s = [];
            if (a(e))
                for (i = e.length; r < i; r++) null != (o = t(e[r], r, n)) && s.push(o);
            else
                for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
            return le.apply([], s)
        },
        guid: 1,
        support: me
    }), "function" == typeof Symbol && (we.fn[Symbol.iterator] = ae[Symbol.iterator]), we.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ue["[object " + t + "]"] = t.toLowerCase()
    });
    var $e = function(e) {
        function t(e, t, n, i) {
            var a, o, r, s, l, d, p, f = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
            if (!i && ((t ? t.ownerDocument || t : O) !== M && S(t), t = t || M, P)) {
                if (11 !== h && (l = ge.exec(e)))
                    if (a = l[1]) {
                        if (9 === h) {
                            if (!(r = t.getElementById(a))) return n;
                            if (r.id === a) return n.push(r), n
                        } else if (f && (r = f.getElementById(a)) && L(t, r) && r.id === a) return n.push(r), n
                    } else {
                        if (l[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = l[3]) && w.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(a)), n
                    }
                if (w.qsa && !X[e + " "] && (!I || !I.test(e))) {
                    if (1 !== h) f = t, p = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(ye, we) : t.setAttribute("id", s = D), o = (d = k(e)).length; o--;) d[o] = "#" + s + " " + u(d[o]);
                        p = d.join(","), f = me.test(e) && c(t.parentNode) || t
                    }
                    if (p) try {
                        return Q.apply(n, f.querySelectorAll(p)), n
                    } catch (e) {} finally {
                        s === D && t.removeAttribute("id")
                    }
                }
            }
            return H(e.replace(oe, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > x.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[D] = !0, e
        }

        function a(e) {
            var t = M.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = t
        }

        function r(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && $e(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function l(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var a, o = e([], n.length, t), r = o.length; r--;) n[a = o[r]] && (n[a] = !(i[a] = n[a]))
                })
            })
        }

        function c(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function d() {}

        function u(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i
        }

        function p(e, t, n) {
            var i = t.dir,
                a = t.next,
                o = a || i,
                r = n && "parentNode" === o,
                s = N++;
            return t.first ? function(t, n, a) {
                for (; t = t[i];)
                    if (1 === t.nodeType || r) return e(t, n, a);
                return !1
            } : function(t, n, l) {
                var c, d, u, p = [z, s];
                if (l) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || r) && e(t, n, l)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || r)
                            if (u = t[D] || (t[D] = {}), d = u[t.uniqueID] || (u[t.uniqueID] = {}), a && a === t.nodeName.toLowerCase()) t = t[i] || t;
                            else {
                                if ((c = d[o]) && c[0] === z && c[1] === s) return p[2] = c[2];
                                if (d[o] = p, p[2] = e(t, n, l)) return !0
                            } return !1
            }
        }

        function f(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var a = e.length; a--;)
                    if (!e[a](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function h(e, n, i) {
            for (var a = 0, o = n.length; a < o; a++) t(e, n[a], i);
            return i
        }

        function g(e, t, n, i, a) {
            for (var o, r = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, i, a) || (r.push(o), c && t.push(s)));
            return r
        }

        function m(e, t, n, a, o, r) {
            return a && !a[D] && (a = m(a)), o && !o[D] && (o = m(o, r)), i(function(i, r, s, l) {
                var c, d, u, p = [],
                    f = [],
                    m = r.length,
                    v = i || h(t || "*", s.nodeType ? [s] : s, []),
                    b = !e || !i && t ? v : g(v, p, e, s, l),
                    y = n ? o || (i ? e : m || a) ? [] : r : b;
                if (n && n(b, y, s, l), a)
                    for (c = g(y, f), a(c, [], s, l), d = c.length; d--;)(u = c[d]) && (y[f[d]] = !(b[f[d]] = u));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (c = [], d = y.length; d--;)(u = y[d]) && c.push(b[d] = u);
                            o(null, y = [], c, l)
                        }
                        for (d = y.length; d--;)(u = y[d]) && (c = o ? Z(i, u) : p[d]) > -1 && (i[c] = !(r[c] = u))
                    }
                } else y = g(y === r ? y.splice(m, y.length) : y), o ? o(null, r, y, l) : Q.apply(r, y)
            })
        }

        function v(e) {
            for (var t, n, i, a = e.length, o = x.relative[e[0].type], r = o || x.relative[" "], s = o ? 1 : 0, l = p(function(e) {
                    return e === t
                }, r, !0), c = p(function(e) {
                    return Z(t, e) > -1
                }, r, !0), d = [function(e, n, i) {
                    var a = !o && (i || n !== j) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                    return t = null, a
                }]; s < a; s++)
                if (n = x.relative[e[s].type]) d = [p(f(d), n)];
                else {
                    if ((n = x.filter[e[s].type].apply(null, e[s].matches))[D]) {
                        for (i = ++s; i < a && !x.relative[e[i].type]; i++);
                        return m(s > 1 && f(d), s > 1 && u(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(oe, "$1"), n, s < i && v(e.slice(s, i)), i < a && v(e = e.slice(i)), i < a && u(e))
                    }
                    d.push(n)
                }
            return f(d)
        }

        function b(e, n) {
            var a = n.length > 0,
                o = e.length > 0,
                r = function(i, r, s, l, c) {
                    var d, u, p, f = 0,
                        h = "0",
                        m = i && [],
                        v = [],
                        b = j,
                        y = i || o && x.find.TAG("*", c),
                        w = z += null == b ? 1 : Math.random() || .1,
                        $ = y.length;
                    for (c && (j = r === M || r || c); h !== $ && null != (d = y[h]); h++) {
                        if (o && d) {
                            for (u = 0, r || d.ownerDocument === M || (S(d), s = !P); p = e[u++];)
                                if (p(d, r || M, s)) {
                                    l.push(d);
                                    break
                                }
                            c && (z = w)
                        }
                        a && ((d = !p && d) && f--, i && m.push(d))
                    }
                    if (f += h, a && h !== f) {
                        for (u = 0; p = n[u++];) p(m, v, r, s);
                        if (i) {
                            if (f > 0)
                                for (; h--;) m[h] || v[h] || (v[h] = Y.call(l));
                            v = g(v)
                        }
                        Q.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                    }
                    return c && (z = w, j = b), m
                };
            return a ? i(r) : r
        }
        var y, w, x, $, C, k, T, H, j, W, _, S, M, E, P, I, q, A, L, D = "sizzle" + 1 * new Date,
            O = e.document,
            z = 0,
            N = 0,
            F = n(),
            R = n(),
            X = n(),
            B = function(e, t) {
                return e === t && (_ = !0), 0
            },
            G = {}.hasOwnProperty,
            V = [],
            Y = V.pop,
            U = V.push,
            Q = V.push,
            K = V.slice,
            Z = function(e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            },
            J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ee = "[\\x20\\t\\r\\n\\f]",
            te = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            ne = "\\[" + ee + "*(" + te + ")(?:" + ee + "*([*^$|!~]?=)" + ee + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + te + "))|)" + ee + "*\\]",
            ie = ":(" + te + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ne + ")*)|.*)\\)|)",
            ae = new RegExp(ee + "+", "g"),
            oe = new RegExp("^" + ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ee + "+$", "g"),
            re = new RegExp("^" + ee + "*," + ee + "*"),
            se = new RegExp("^" + ee + "*([>+~]|" + ee + ")" + ee + "*"),
            le = new RegExp("=" + ee + "*([^\\]'\"]*?)" + ee + "*\\]", "g"),
            ce = new RegExp(ie),
            de = new RegExp("^" + te + "$"),
            ue = {
                ID: new RegExp("^#(" + te + ")"),
                CLASS: new RegExp("^\\.(" + te + ")"),
                TAG: new RegExp("^(" + te + "|[*])"),
                ATTR: new RegExp("^" + ne),
                PSEUDO: new RegExp("^" + ie),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ee + "*(even|odd|(([+-]|)(\\d*)n|)" + ee + "*(?:([+-]|)" + ee + "*(\\d+)|))" + ee + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + J + ")$", "i"),
                needsContext: new RegExp("^" + ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ee + "*((?:-\\d)?\\d*)" + ee + "*\\)|)(?=[^-]|$)", "i")
            },
            pe = /^(?:input|select|textarea|button)$/i,
            fe = /^h\d$/i,
            he = /^[^{]+\{\s*\[native \w/,
            ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            me = /[+~]/,
            ve = new RegExp("\\\\([\\da-f]{1,6}" + ee + "?|(" + ee + ")|.)", "ig"),
            be = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            ye = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            we = function(e, t) {
                return t ? "\0" === e ? "???" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            xe = function() {
                S()
            },
            $e = p(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            Q.apply(V = K.call(O.childNodes), O.childNodes), V[O.childNodes.length].nodeType
        } catch (e) {
            Q = {
                apply: V.length ? function(e, t) {
                    U.apply(e, K.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, C = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, S = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : O;
            return i !== M && 9 === i.nodeType && i.documentElement ? (M = i, E = M.documentElement, P = !C(M), O !== M && (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)), w.attributes = a(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = a(function(e) {
                return e.appendChild(M.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = he.test(M.getElementsByClassName), w.getById = a(function(e) {
                return E.appendChild(e).id = D, !M.getElementsByName || !M.getElementsByName(D).length
            }), w.getById ? (x.filter.ID = function(e) {
                var t = e.replace(ve, be);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, x.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && P) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (x.filter.ID = function(e) {
                var t = e.replace(ve, be);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, x.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && P) {
                    var n, i, a, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        for (a = t.getElementsByName(e), i = 0; o = a[i++];)
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                    }
                    return []
                }
            }), x.find.TAG = w.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    a = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[a++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, x.find.CLASS = w.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && P) return t.getElementsByClassName(e)
            }, q = [], I = [], (w.qsa = he.test(M.querySelectorAll)) && (a(function(e) {
                E.appendChild(e).innerHTML = "<a id='" + D + "'></a><select id='" + D + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + ee + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || I.push("\\[" + ee + "*(?:value|" + J + ")"), e.querySelectorAll("[id~=" + D + "-]").length || I.push("~="), e.querySelectorAll(":checked").length || I.push(":checked"), e.querySelectorAll("a#" + D + "+*").length || I.push(".#.+[+~]")
            }), a(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = M.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && I.push("name" + ee + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && I.push(":enabled", ":disabled"), E.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && I.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), I.push(",.*:")
            })), (w.matchesSelector = he.test(A = E.matches || E.webkitMatchesSelector || E.mozMatchesSelector || E.oMatchesSelector || E.msMatchesSelector)) && a(function(e) {
                w.disconnectedMatch = A.call(e, "*"), A.call(e, "[s!='']:x"), q.push("!=", ie)
            }), I = I.length && new RegExp(I.join("|")), q = q.length && new RegExp(q.join("|")), t = he.test(E.compareDocumentPosition), L = t || he.test(E.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, B = t ? function(e, t) {
                if (e === t) return _ = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === M || e.ownerDocument === O && L(O, e) ? -1 : t === M || t.ownerDocument === O && L(O, t) ? 1 : W ? Z(W, e) - Z(W, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return _ = !0, 0;
                var n, i = 0,
                    a = e.parentNode,
                    o = t.parentNode,
                    s = [e],
                    l = [t];
                if (!a || !o) return e === M ? -1 : t === M ? 1 : a ? -1 : o ? 1 : W ? Z(W, e) - Z(W, t) : 0;
                if (a === o) return r(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; s[i] === l[i];) i++;
                return i ? r(s[i], l[i]) : s[i] === O ? -1 : l[i] === O ? 1 : 0
            }, M) : M
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== M && S(e), n = n.replace(le, "='$1']"), w.matchesSelector && P && !X[n + " "] && (!q || !q.test(n)) && (!I || !I.test(n))) try {
                var i = A.call(e, n);
                if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (e) {}
            return t(n, M, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== M && S(e), L(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== M && S(e);
            var n = x.attrHandle[t.toLowerCase()],
                i = n && G.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
            return void 0 !== i ? i : w.attributes || !P ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.escape = function(e) {
            return (e + "").replace(ye, we)
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                a = 0;
            if (_ = !w.detectDuplicates, W = !w.sortStable && e.slice(0), e.sort(B), _) {
                for (; t = e[a++];) t === e[a] && (i = n.push(a));
                for (; i--;) e.splice(n[i], 1)
            }
            return W = null, e
        }, $ = t.getText = function(e) {
            var t, n = "",
                i = 0,
                a = e.nodeType;
            if (a) {
                if (1 === a || 9 === a || 11 === a) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += $(e)
                } else if (3 === a || 4 === a) return e.nodeValue
            } else
                for (; t = e[i++];) n += $(t);
            return n
        }, (x = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ue,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(ve, be), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, be), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return ue.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(ve, be).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = F[e + " "];
                    return t || (t = new RegExp("(^|" + ee + ")" + e + "(" + ee + "|$)")) && F(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(a) {
                        var o = t.attr(a, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, n, i, a) {
                    var o = "nth" !== e.slice(0, 3),
                        r = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === i && 0 === a ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var c, d, u, p, f, h, g = o !== r ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            b = !l && !s,
                            y = !1;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (p = t; p = p[g];)
                                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [r ? m.firstChild : m.lastChild], r && b) {
                                for (y = (f = (c = (d = (u = (p = m)[D] || (p[D] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === z && c[1]) && c[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (y = f = 0) || h.pop();)
                                    if (1 === p.nodeType && ++y && p === t) {
                                        d[e] = [z, f, y];
                                        break
                                    }
                            } else if (b && (y = f = (c = (d = (u = (p = t)[D] || (p[D] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === z && c[1]), !1 === y)
                                for (;
                                    (p = ++f && p && p[g] || (y = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++y || (b && ((d = (u = p[D] || (p[D] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [z, y]), p !== t)););
                            return (y -= a) === i || y % i == 0 && y / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var a, o = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[D] ? o(n) : o.length > 1 ? (a = [e, e, "", n], x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, a = o(e, n), r = a.length; r--;) e[i = Z(e, a[r])] = !(t[i] = a[r])
                    }) : function(e) {
                        return o(e, 0, a)
                    }) : o
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        a = T(e.replace(oe, "$1"));
                    return a[D] ? i(function(e, t, n, i) {
                        for (var o, r = a(e, null, i, []), s = e.length; s--;)(o = r[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, a(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(ve, be),
                        function(t) {
                            return (t.textContent || t.innerText || $(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(ve, be).toLowerCase(),
                        function(t) {
                            var n;
                            do {
                                if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === E
                },
                focus: function(e) {
                    return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: s(!1),
                disabled: s(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !x.pseudos.empty(e)
                },
                header: function(e) {
                    return fe.test(e.nodeName)
                },
                input: function(e) {
                    return pe.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }).pseudos.nth = x.pseudos.eq;
        for (y in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[y] = function(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }(y);
        for (y in {
                submit: !0,
                reset: !0
            }) x.pseudos[y] = function(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }(y);
        return d.prototype = x.filters = x.pseudos, x.setFilters = new d, k = t.tokenize = function(e, n) {
            var i, a, o, r, s, l, c, d = R[e + " "];
            if (d) return n ? 0 : d.slice(0);
            for (s = e, l = [], c = x.preFilter; s;) {
                i && !(a = re.exec(s)) || (a && (s = s.slice(a[0].length) || s), l.push(o = [])), i = !1, (a = se.exec(s)) && (i = a.shift(), o.push({
                    value: i,
                    type: a[0].replace(oe, " ")
                }), s = s.slice(i.length));
                for (r in x.filter) !(a = ue[r].exec(s)) || c[r] && !(a = c[r](a)) || (i = a.shift(), o.push({
                    value: i,
                    type: r,
                    matches: a
                }), s = s.slice(i.length));
                if (!i) break
            }
            return n ? s.length : s ? t.error(e) : R(e, l).slice(0)
        }, T = t.compile = function(e, t) {
            var n, i = [],
                a = [],
                o = X[e + " "];
            if (!o) {
                for (t || (t = k(e)), n = t.length; n--;)(o = v(t[n]))[D] ? i.push(o) : a.push(o);
                (o = X(e, b(a, i))).selector = e
            }
            return o
        }, H = t.select = function(e, t, n, i) {
            var a, o, r, s, l, d = "function" == typeof e && e,
                p = !i && k(e = d.selector || e);
            if (n = n || [], 1 === p.length) {
                if ((o = p[0] = p[0].slice(0)).length > 2 && "ID" === (r = o[0]).type && 9 === t.nodeType && P && x.relative[o[1].type]) {
                    if (!(t = (x.find.ID(r.matches[0].replace(ve, be), t) || [])[0])) return n;
                    d && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (a = ue.needsContext.test(e) ? 0 : o.length; a-- && (r = o[a], !x.relative[s = r.type]);)
                    if ((l = x.find[s]) && (i = l(r.matches[0].replace(ve, be), me.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(a, 1), !(e = i.length && u(o))) return Q.apply(n, i), n;
                        break
                    }
            }
            return (d || T(e, p))(i, t, !P, n, !t || me.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = D.split("").sort(B).join("") === D, w.detectDuplicates = !!_, S(), w.sortDetached = a(function(e) {
            return 1 & e.compareDocumentPosition(M.createElement("fieldset"))
        }), a(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && a(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), a(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(J, function(e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    we.find = $e, we.expr = $e.selectors, we.expr[":"] = we.expr.pseudos, we.uniqueSort = we.unique = $e.uniqueSort, we.text = $e.getText, we.isXMLDoc = $e.isXML, we.contains = $e.contains, we.escapeSelector = $e.escape;
    var Ce = function(e, t, n) {
            for (var i = [], a = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (a && we(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        ke = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        Te = we.expr.match.needsContext,
        He = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    we.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? we.find.matchesSelector(i, e) ? [i] : [] : we.find.matches(e, we.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, we.fn.extend({
        find: function(e) {
            var t, n, i = this.length,
                a = this;
            if ("string" != typeof e) return this.pushStack(we(e).filter(function() {
                for (t = 0; t < i; t++)
                    if (we.contains(a[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < i; t++) we.find(e, a[t], n);
            return i > 1 ? we.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && Te.test(e) ? we(e) : e || [], !1).length
        }
    });
    var je, We = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (we.fn.init = function(e, t, n) {
        var i, a;
        if (!e) return this;
        if (n = n || je, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : We.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof we ? t[0] : t, we.merge(this, we.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : oe, !0)), He.test(i[1]) && we.isPlainObject(t))
                    for (i in t) ve(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (a = oe.getElementById(i[2])) && (this[0] = a, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : ve(e) ? void 0 !== n.ready ? n.ready(e) : e(we) : we.makeArray(e, this)
    }).prototype = we.fn, je = we(oe);
    var _e = /^(?:parents|prev(?:Until|All))/,
        Se = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    we.fn.extend({
        has: function(e) {
            var t = we(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (we.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, i = 0,
                a = this.length,
                o = [],
                r = "string" != typeof e && we(e);
            if (!Te.test(e))
                for (; i < a; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (r ? r.index(n) > -1 : 1 === n.nodeType && we.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? we.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? de.call(we(e), this[0]) : de.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(we.uniqueSort(we.merge(this.get(), we(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), we.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Ce(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Ce(e, "parentNode", n)
        },
        next: function(e) {
            return s(e, "nextSibling")
        },
        prev: function(e) {
            return s(e, "previousSibling")
        },
        nextAll: function(e) {
            return Ce(e, "nextSibling")
        },
        prevAll: function(e) {
            return Ce(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Ce(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Ce(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ke((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ke(e.firstChild)
        },
        contents: function(e) {
            return o(e, "iframe") ? e.contentDocument : (o(e, "template") && (e = e.content || e), we.merge([], e.childNodes))
        }
    }, function(e, t) {
        we.fn[e] = function(n, i) {
            var a = we.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (a = we.filter(i, a)), this.length > 1 && (Se[e] || we.uniqueSort(a), _e.test(e) && a.reverse()), this.pushStack(a)
        }
    });
    var Me = /[^\x20\t\r\n\f]+/g;
    we.Callbacks = function(e) {
        e = "string" == typeof e ? l(e) : we.extend({}, e);
        var t, n, a, o, r = [],
            s = [],
            c = -1,
            d = function() {
                for (o = o || e.once, a = t = !0; s.length; c = -1)
                    for (n = s.shift(); ++c < r.length;) !1 === r[c].apply(n[0], n[1]) && e.stopOnFalse && (c = r.length, n = !1);
                e.memory || (n = !1), t = !1, o && (r = n ? [] : "")
            },
            u = {
                add: function() {
                    return r && (n && !t && (c = r.length - 1, s.push(n)), function t(n) {
                        we.each(n, function(n, a) {
                            ve(a) ? e.unique && u.has(a) || r.push(a) : a && a.length && "string" !== i(a) && t(a)
                        })
                    }(arguments), n && !t && d()), this
                },
                remove: function() {
                    return we.each(arguments, function(e, t) {
                        for (var n;
                            (n = we.inArray(t, r, n)) > -1;) r.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? we.inArray(e, r) > -1 : r.length > 0
                },
                empty: function() {
                    return r && (r = []), this
                },
                disable: function() {
                    return o = s = [], r = n = "", this
                },
                disabled: function() {
                    return !r
                },
                lock: function() {
                    return o = s = [], n || t || (r = n = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, n) {
                    return o || (n = [e, (n = n || []).slice ? n.slice() : n], s.push(n), t || d()), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!a
                }
            };
        return u
    }, we.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", we.Callbacks("memory"), we.Callbacks("memory"), 2],
                    ["resolve", "done", we.Callbacks("once memory"), we.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", we.Callbacks("once memory"), we.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return we.Deferred(function(t) {
                            we.each(n, function(n, i) {
                                var a = ve(e[i[4]]) && e[i[4]];
                                o[i[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && ve(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, i, a) {
                        function o(t, n, i, a) {
                            return function() {
                                var s = this,
                                    l = arguments,
                                    u = function() {
                                        var e, u;
                                        if (!(t < r)) {
                                            if ((e = i.apply(s, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            u = e && ("object" == typeof e || "function" == typeof e) && e.then, ve(u) ? a ? u.call(e, o(r, n, c, a), o(r, n, d, a)) : (r++, u.call(e, o(r, n, c, a), o(r, n, d, a), o(r, n, c, n.notifyWith))) : (i !== c && (s = void 0, l = [e]), (a || n.resolveWith)(s, l))
                                        }
                                    },
                                    p = a ? u : function() {
                                        try {
                                            u()
                                        } catch (e) {
                                            we.Deferred.exceptionHook && we.Deferred.exceptionHook(e, p.stackTrace), t + 1 >= r && (i !== d && (s = void 0, l = [e]), n.rejectWith(s, l))
                                        }
                                    };
                                t ? p() : (we.Deferred.getStackHook && (p.stackTrace = we.Deferred.getStackHook()), e.setTimeout(p))
                            }
                        }
                        var r = 0;
                        return we.Deferred(function(e) {
                            n[0][3].add(o(0, e, ve(a) ? a : c, e.notifyWith)), n[1][3].add(o(0, e, ve(t) ? t : c)), n[2][3].add(o(0, e, ve(i) ? i : d))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? we.extend(e, a) : a
                    }
                },
                o = {};
            return we.each(n, function(e, t) {
                var r = t[2],
                    s = t[5];
                a[t[1]] = r.add, s && r.add(function() {
                    i = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), r.add(t[3].fire), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[t[0] + "With"] = r.fireWith
            }), a.promise(o), t && t.call(o, o), o
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                i = Array(n),
                a = se.call(arguments),
                o = we.Deferred(),
                r = function(e) {
                    return function(n) {
                        i[e] = this, a[e] = arguments.length > 1 ? se.call(arguments) : n, --t || o.resolveWith(i, a)
                    }
                };
            if (t <= 1 && (u(e, o.done(r(n)).resolve, o.reject, !t), "pending" === o.state() || ve(a[n] && a[n].then))) return o.then();
            for (; n--;) u(a[n], r(n), o.reject);
            return o.promise()
        }
    });
    var Ee = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    we.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && Ee.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, we.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var Pe = we.Deferred();
    we.fn.ready = function(e) {
        return Pe.then(e).catch(function(e) {
            we.readyException(e)
        }), this
    }, we.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --we.readyWait : we.isReady) || (we.isReady = !0, !0 !== e && --we.readyWait > 0 || Pe.resolveWith(oe, [we]))
        }
    }), we.ready.then = Pe.then, "complete" === oe.readyState || "loading" !== oe.readyState && !oe.documentElement.doScroll ? e.setTimeout(we.ready) : (oe.addEventListener("DOMContentLoaded", p), e.addEventListener("load", p));
    var Ie = function(e, t, n, a, o, r, s) {
            var l = 0,
                c = e.length,
                d = null == n;
            if ("object" === i(n)) {
                o = !0;
                for (l in n) Ie(e, t, l, n[l], !0, r, s)
            } else if (void 0 !== a && (o = !0, ve(a) || (s = !0), d && (s ? (t.call(e, a), t = null) : (d = t, t = function(e, t, n) {
                    return d.call(we(e), n)
                })), t))
                for (; l < c; l++) t(e[l], n, s ? a : a.call(e[l], l, t(e[l], n)));
            return o ? e : d ? t.call(e) : c ? t(e[0], n) : r
        },
        qe = /^-ms-/,
        Ae = /-([a-z])/g,
        Le = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    g.uid = 1, g.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Le(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var i, a = this.cache(e);
            if ("string" == typeof t) a[h(t)] = n;
            else
                for (i in t) a[h(i)] = t[i];
            return a
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i = e[this.expando];
            if (void 0 !== i) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(h) : (t = h(t)) in i ? [t] : t.match(Me) || []).length;
                    for (; n--;) delete i[t[n]]
                }(void 0 === t || we.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !we.isEmptyObject(t)
        }
    };
    var De = new g,
        Oe = new g,
        ze = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Ne = /[A-Z]/g;
    we.extend({
        hasData: function(e) {
            return Oe.hasData(e) || De.hasData(e)
        },
        data: function(e, t, n) {
            return Oe.access(e, t, n)
        },
        removeData: function(e, t) {
            Oe.remove(e, t)
        },
        _data: function(e, t, n) {
            return De.access(e, t, n)
        },
        _removeData: function(e, t) {
            De.remove(e, t)
        }
    }), we.fn.extend({
        data: function(e, t) {
            var n, i, a, o = this[0],
                r = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (a = Oe.get(o), 1 === o.nodeType && !De.get(o, "hasDataAttrs"))) {
                    for (n = r.length; n--;) r[n] && 0 === (i = r[n].name).indexOf("data-") && (i = h(i.slice(5)), v(o, i, a[i]));
                    De.set(o, "hasDataAttrs", !0)
                }
                return a
            }
            return "object" == typeof e ? this.each(function() {
                Oe.set(this, e)
            }) : Ie(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (void 0 !== (n = Oe.get(o, e))) return n;
                    if (void 0 !== (n = v(o, e))) return n
                } else this.each(function() {
                    Oe.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Oe.remove(this, e)
            })
        }
    }), we.extend({
        queue: function(e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = De.get(e, t), n && (!i || Array.isArray(n) ? i = De.access(e, t, we.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = we.queue(e, t),
                i = n.length,
                a = n.shift(),
                o = we._queueHooks(e, t);
            "inprogress" === a && (a = n.shift(), i--), a && ("fx" === t && n.unshift("inprogress"), delete o.stop, a.call(e, function() {
                we.dequeue(e, t)
            }, o)), !i && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return De.get(e, n) || De.access(e, n, {
                empty: we.Callbacks("once memory").add(function() {
                    De.remove(e, [t + "queue", n])
                })
            })
        }
    }), we.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? we.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = we.queue(this, e, t);
                we._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && we.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                we.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                a = we.Deferred(),
                o = this,
                r = this.length,
                s = function() {
                    --i || a.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; r--;)(n = De.get(o[r], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
            return s(), a.promise(t)
        }
    });
    var Fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Re = new RegExp("^(?:([+-])=|)(" + Fe + ")([a-z%]*)$", "i"),
        Xe = ["Top", "Right", "Bottom", "Left"],
        Be = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && we.contains(e.ownerDocument, e) && "none" === we.css(e, "display")
        },
        Ge = function(e, t, n, i) {
            var a, o, r = {};
            for (o in t) r[o] = e.style[o], e.style[o] = t[o];
            a = n.apply(e, i || []);
            for (o in t) e.style[o] = r[o];
            return a
        },
        Ve = {};
    we.fn.extend({
        show: function() {
            return w(this, !0)
        },
        hide: function() {
            return w(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Be(this) ? we(this).show() : we(this).hide()
            })
        }
    });
    var Ye = /^(?:checkbox|radio)$/i,
        Ue = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Qe = /^$|^module$|\/(?:java|ecma)script/i,
        Ke = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ke.optgroup = Ke.option, Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead, Ke.th = Ke.td;
    var Ze = /<|&#?\w+;/;
    ! function() {
        var e = oe.createDocumentFragment().appendChild(oe.createElement("div")),
            t = oe.createElement("input");
        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), me.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", me.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var Je = oe.documentElement,
        et = /^key/,
        tt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        nt = /^([^.]*)(?:\.(.+)|)/;
    we.event = {
        global: {},
        add: function(e, t, n, i, a) {
            var o, r, s, l, c, d, u, p, f, h, g, m = De.get(e);
            if (m)
                for (n.handler && (n = (o = n).handler, a = o.selector), a && we.find.matchesSelector(Je, a), n.guid || (n.guid = we.guid++), (l = m.events) || (l = m.events = {}), (r = m.handle) || (r = m.handle = function(t) {
                        return void 0 !== we && we.event.triggered !== t.type ? we.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(Me) || [""]).length; c--;) f = g = (s = nt.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), f && (u = we.event.special[f] || {}, f = (a ? u.delegateType : u.bindType) || f, u = we.event.special[f] || {}, d = we.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: a,
                    needsContext: a && we.expr.match.needsContext.test(a),
                    namespace: h.join(".")
                }, o), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, r) || e.addEventListener && e.addEventListener(f, r)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), a ? p.splice(p.delegateCount++, 0, d) : p.push(d), we.event.global[f] = !0)
        },
        remove: function(e, t, n, i, a) {
            var o, r, s, l, c, d, u, p, f, h, g, m = De.hasData(e) && De.get(e);
            if (m && (l = m.events)) {
                for (c = (t = (t || "").match(Me) || [""]).length; c--;)
                    if (s = nt.exec(t[c]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
                        for (u = we.event.special[f] || {}, p = l[f = (i ? u.delegateType : u.bindType) || f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = o = p.length; o--;) d = p[o], !a && g !== d.origType || n && n.guid !== d.guid || s && !s.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(o, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                        r && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, m.handle) || we.removeEvent(e, f, m.handle), delete l[f])
                    } else
                        for (f in l) we.event.remove(e, f + t[c], n, i, !0);
                we.isEmptyObject(l) && De.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, i, a, o, r, s = we.event.fix(e),
                l = new Array(arguments.length),
                c = (De.get(this, "events") || {})[s.type] || [],
                d = we.event.special[s.type] || {};
            for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
            if (s.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, s)) {
                for (r = we.event.handlers.call(this, s, c), t = 0;
                    (a = r[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = a.elem, n = 0;
                        (o = a.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (i = ((we.event.special[o.origType] || {}).handle || o.handler).apply(a.elem, l)) && !1 === (s.result = i) && (s.preventDefault(), s.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, s), s.result
            }
        },
        handlers: function(e, t) {
            var n, i, a, o, r, s = [],
                l = t.delegateCount,
                c = e.target;
            if (l && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (o = [], r = {}, n = 0; n < l; n++) void 0 === r[a = (i = t[n]).selector + " "] && (r[a] = i.needsContext ? we(a, this).index(c) > -1 : we.find(a, this, null, [c]).length), r[a] && o.push(i);
                        o.length && s.push({
                            elem: c,
                            handlers: o
                        })
                    }
            return c = this, l < t.length && s.push({
                elem: c,
                handlers: t.slice(l)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(we.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: ve(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[we.expando] ? e : new we.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== H() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === H() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && o(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return o(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, we.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, we.Event = function(e, t) {
        if (!(this instanceof we.Event)) return new we.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? k : T, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && we.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[we.expando] = !0
    }, we.Event.prototype = {
        constructor: we.Event,
        isDefaultPrevented: T,
        isPropagationStopped: T,
        isImmediatePropagationStopped: T,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = k, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = k, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = k, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, we.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && et.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && tt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, we.event.addProp), we.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        we.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    a = e.relatedTarget,
                    o = e.handleObj;
                return a && (a === i || we.contains(i, a)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), we.fn.extend({
        on: function(e, t, n, i) {
            return j(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return j(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, a;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, we(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (a in e) this.off(a, t, e[a]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = T), this.each(function() {
                we.event.remove(this, e, n, t)
            })
        }
    });
    var it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        at = /<script|<style|<link/i,
        ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    we.extend({
        htmlPrefilter: function(e) {
            return e.replace(it, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, a, o, r, s = e.cloneNode(!0),
                l = we.contains(e.ownerDocument, e);
            if (!(me.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || we.isXMLDoc(e)))
                for (r = x(s), i = 0, a = (o = x(e)).length; i < a; i++) E(o[i], r[i]);
            if (t)
                if (n)
                    for (o = o || x(e), r = r || x(s), i = 0, a = o.length; i < a; i++) M(o[i], r[i]);
                else M(e, s);
            return (r = x(s, "script")).length > 0 && $(r, !l && x(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, i, a = we.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Le(n)) {
                    if (t = n[De.expando]) {
                        if (t.events)
                            for (i in t.events) a[i] ? we.event.remove(n, i) : we.removeEvent(n, i, t.handle);
                        n[De.expando] = void 0
                    }
                    n[Oe.expando] && (n[Oe.expando] = void 0)
                }
        }
    }), we.fn.extend({
        detach: function(e) {
            return I(this, e, !0)
        },
        remove: function(e) {
            return I(this, e)
        },
        text: function(e) {
            return Ie(this, function(e) {
                return void 0 === e ? we.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return P(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || W(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return P(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = W(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return P(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return P(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (we.cleanData(x(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return we.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ie(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !at.test(e) && !Ke[(Ue.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = we.htmlPrefilter(e);
                    try {
                        for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (we.cleanData(x(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return P(this, arguments, function(t) {
                var n = this.parentNode;
                we.inArray(this, e) < 0 && (we.cleanData(x(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), we.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        we.fn[e] = function(e) {
            for (var n, i = [], a = we(e), o = a.length - 1, r = 0; r <= o; r++) n = r === o ? this : this.clone(!0), we(a[r])[t](n), ce.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var st = new RegExp("^(" + Fe + ")(?!px)[a-z%]+$", "i"),
        lt = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        ct = new RegExp(Xe.join("|"), "i");
    ! function() {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Je.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                i = "1%" !== t.top, s = 12 === n(t.marginLeft), c.style.right = "60%", r = 36 === n(t.right), a = 36 === n(t.width), c.style.position = "absolute", o = 36 === c.offsetWidth || "absolute", Je.removeChild(l), c = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var i, a, o, r, s, l = oe.createElement("div"),
            c = oe.createElement("div");
        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", me.clearCloneStyle = "content-box" === c.style.backgroundClip, we.extend(me, {
            boxSizingReliable: function() {
                return t(), a
            },
            pixelBoxStyles: function() {
                return t(), r
            },
            pixelPosition: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), s
            },
            scrollboxSize: function() {
                return t(), o
            }
        }))
    }();
    var dt = /^(none|table(?!-c[ea]).+)/,
        ut = /^--/,
        pt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ft = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ht = ["Webkit", "Moz", "ms"],
        gt = oe.createElement("div").style;
    we.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = q(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var a, o, r, s = h(t),
                    l = ut.test(t),
                    c = e.style;
                if (l || (t = D(s)), r = we.cssHooks[t] || we.cssHooks[s], void 0 === n) return r && "get" in r && void 0 !== (a = r.get(e, !1, i)) ? a : c[t];
                "string" == (o = typeof n) && (a = Re.exec(n)) && a[1] && (n = b(e, t, a), o = "number"), null != n && n === n && ("number" === o && (n += a && a[3] || (we.cssNumber[s] ? "" : "px")), me.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), r && "set" in r && void 0 === (n = r.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, i) {
            var a, o, r, s = h(t);
            return ut.test(t) || (t = D(s)), (r = we.cssHooks[t] || we.cssHooks[s]) && "get" in r && (a = r.get(e, !0, n)), void 0 === a && (a = q(e, t, i)), "normal" === a && t in ft && (a = ft[t]), "" === n || n ? (o = parseFloat(a), !0 === n || isFinite(o) ? o || 0 : a) : a
        }
    }), we.each(["height", "width"], function(e, t) {
        we.cssHooks[t] = {
            get: function(e, n, i) {
                if (n) return !dt.test(we.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? N(e, t, i) : Ge(e, pt, function() {
                    return N(e, t, i)
                })
            },
            set: function(e, n, i) {
                var a, o = lt(e),
                    r = "border-box" === we.css(e, "boxSizing", !1, o),
                    s = i && z(e, t, i, r, o);
                return r && me.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - z(e, t, "border", !1, o) - .5)), s && (a = Re.exec(n)) && "px" !== (a[3] || "px") && (e.style[t] = n, n = we.css(e, t)), O(0, n, s)
            }
        }
    }), we.cssHooks.marginLeft = A(me.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(q(e, "marginLeft")) || e.getBoundingClientRect().left - Ge(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), we.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        we.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, a = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) a[e + Xe[i] + t] = o[i] || o[i - 2] || o[0];
                return a
            }
        }, "margin" !== e && (we.cssHooks[e + t].set = O)
    }), we.fn.extend({
        css: function(e, t) {
            return Ie(this, function(e, t, n) {
                var i, a, o = {},
                    r = 0;
                if (Array.isArray(t)) {
                    for (i = lt(e), a = t.length; r < a; r++) o[t[r]] = we.css(e, t[r], !1, i);
                    return o
                }
                return void 0 !== n ? we.style(e, t, n) : we.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), we.Tween = F, F.prototype = {
        constructor: F,
        init: function(e, t, n, i, a, o) {
            this.elem = e, this.prop = n, this.easing = a || we.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (we.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = F.propHooks[this.prop];
            return e && e.get ? e.get(this) : F.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = t = we.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
        }
    }, F.prototype.init.prototype = F.prototype, F.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = we.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                we.fx.step[e.prop] ? we.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[we.cssProps[e.prop]] && !we.cssHooks[e.prop] ? e.elem[e.prop] = e.now : we.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, F.propHooks.scrollTop = F.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, we.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, we.fx = F.prototype.init, we.fx.step = {};
    var mt, vt, bt = /^(?:toggle|show|hide)$/,
        yt = /queueHooks$/;
    we.Animation = we.extend(Y, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return b(n.elem, e, Re.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ve(e) ? (t = e, e = ["*"]) : e = e.match(Me);
                for (var n, i = 0, a = e.length; i < a; i++) n = e[i], Y.tweeners[n] = Y.tweeners[n] || [], Y.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var i, a, o, r, s, l, c, d, u = "width" in t || "height" in t,
                    p = this,
                    f = {},
                    h = e.style,
                    g = e.nodeType && Be(e),
                    m = De.get(e, "fxshow");
                n.queue || (null == (r = we._queueHooks(e, "fx")).unqueued && (r.unqueued = 0, s = r.empty.fire, r.empty.fire = function() {
                    r.unqueued || s()
                }), r.unqueued++, p.always(function() {
                    p.always(function() {
                        r.unqueued--, we.queue(e, "fx").length || r.empty.fire()
                    })
                }));
                for (i in t)
                    if (a = t[i], bt.test(a)) {
                        if (delete t[i], o = o || "toggle" === a, a === (g ? "hide" : "show")) {
                            if ("show" !== a || !m || void 0 === m[i]) continue;
                            g = !0
                        }
                        f[i] = m && m[i] || we.style(e, i)
                    }
                if ((l = !we.isEmptyObject(t)) || !we.isEmptyObject(f)) {
                    u && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = m && m.display) && (c = De.get(e, "display")), "none" === (d = we.css(e, "display")) && (c ? d = c : (w([e], !0), c = e.style.display || c, d = we.css(e, "display"), w([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === we.css(e, "float") && (l || (p.done(function() {
                        h.display = c
                    }), null == c && (d = h.display, c = "none" === d ? "" : d)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), l = !1;
                    for (i in f) l || (m ? "hidden" in m && (g = m.hidden) : m = De.access(e, "fxshow", {
                        display: c
                    }), o && (m.hidden = !g), g && w([e], !0), p.done(function() {
                        g || w([e]), De.remove(e, "fxshow");
                        for (i in f) we.style(e, i, f[i])
                    })), l = G(g ? m[i] : 0, i, p), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
                }
            }],
            prefilter: function(e, t) {
                t ? Y.prefilters.unshift(e) : Y.prefilters.push(e)
            }
        }), we.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? we.extend({}, e) : {
                complete: n || !n && t || ve(e) && e,
                duration: e,
                easing: n && t || t && !ve(t) && t
            };
            return we.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in we.fx.speeds ? i.duration = we.fx.speeds[i.duration] : i.duration = we.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                ve(i.old) && i.old.call(this), i.queue && we.dequeue(this, i.queue)
            }, i
        }, we.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Be).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var a = we.isEmptyObject(e),
                    o = we.speed(t, n, i),
                    r = function() {
                        var t = Y(this, we.extend({}, e), o);
                        (a || De.get(this, "finish")) && t.stop(!0)
                    };
                return r.finish = r, a || !1 === o.queue ? this.each(r) : this.queue(o.queue, r)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        a = null != e && e + "queueHooks",
                        o = we.timers,
                        r = De.get(this);
                    if (a) r[a] && r[a].stop && i(r[a]);
                    else
                        for (a in r) r[a] && r[a].stop && yt.test(a) && i(r[a]);
                    for (a = o.length; a--;) o[a].elem !== this || null != e && o[a].queue !== e || (o[a].anim.stop(n), t = !1, o.splice(a, 1));
                    !t && n || we.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = De.get(this),
                        i = n[e + "queue"],
                        a = n[e + "queueHooks"],
                        o = we.timers,
                        r = i ? i.length : 0;
                    for (n.finish = !0, we.queue(this, e, []), a && a.stop && a.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < r; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), we.each(["toggle", "show", "hide"], function(e, t) {
            var n = we.fn[t];
            we.fn[t] = function(e, i, a) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(B(t, !0), e, i, a)
            }
        }), we.each({
            slideDown: B("show"),
            slideUp: B("hide"),
            slideToggle: B("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            we.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), we.timers = [], we.fx.tick = function() {
            var e, t = 0,
                n = we.timers;
            for (mt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || we.fx.stop(), mt = void 0
        }, we.fx.timer = function(e) {
            we.timers.push(e), we.fx.start()
        }, we.fx.interval = 13, we.fx.start = function() {
            vt || (vt = !0, R())
        }, we.fx.stop = function() {
            vt = null
        }, we.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, we.fn.delay = function(t, n) {
            return t = we.fx ? we.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                var a = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(a)
                }
            })
        },
        function() {
            var e = oe.createElement("input"),
                t = oe.createElement("select").appendChild(oe.createElement("option"));
            e.type = "checkbox", me.checkOn = "" !== e.value, me.optSelected = t.selected, (e = oe.createElement("input")).value = "t", e.type = "radio", me.radioValue = "t" === e.value
        }();
    var wt, xt = we.expr.attrHandle;
    we.fn.extend({
        attr: function(e, t) {
            return Ie(this, we.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                we.removeAttr(this, e)
            })
        }
    }), we.extend({
        attr: function(e, t, n) {
            var i, a, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? we.prop(e, t, n) : (1 === o && we.isXMLDoc(e) || (a = we.attrHooks[t.toLowerCase()] || (we.expr.match.bool.test(t) ? wt : void 0)), void 0 !== n ? null === n ? void we.removeAttr(e, t) : a && "set" in a && void 0 !== (i = a.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : a && "get" in a && null !== (i = a.get(e, t)) ? i : null == (i = we.find.attr(e, t)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!me.radioValue && "radio" === t && o(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i = 0,
                a = t && t.match(Me);
            if (a && 1 === e.nodeType)
                for (; n = a[i++];) e.removeAttribute(n)
        }
    }), wt = {
        set: function(e, t, n) {
            return !1 === t ? we.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, we.each(we.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = xt[t] || we.find.attr;
        xt[t] = function(e, t, i) {
            var a, o, r = t.toLowerCase();
            return i || (o = xt[r], xt[r] = a, a = null != n(e, t, i) ? r : null, xt[r] = o), a
        }
    });
    var $t = /^(?:input|select|textarea|button)$/i,
        Ct = /^(?:a|area)$/i;
    we.fn.extend({
        prop: function(e, t) {
            return Ie(this, we.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[we.propFix[e] || e]
            })
        }
    }), we.extend({
        prop: function(e, t, n) {
            var i, a, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && we.isXMLDoc(e) || (t = we.propFix[t] || t, a = we.propHooks[t]), void 0 !== n ? a && "set" in a && void 0 !== (i = a.set(e, n, t)) ? i : e[t] = n : a && "get" in a && null !== (i = a.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = we.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : $t.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), me.optSelected || (we.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), we.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        we.propFix[this.toLowerCase()] = this
    }), we.fn.extend({
        addClass: function(e) {
            var t, n, i, a, o, r, s, l = 0;
            if (ve(e)) return this.each(function(t) {
                we(this).addClass(e.call(this, t, Q(this)))
            });
            if ((t = K(e)).length)
                for (; n = this[l++];)
                    if (a = Q(n), i = 1 === n.nodeType && " " + U(a) + " ") {
                        for (r = 0; o = t[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                        a !== (s = U(i)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, a, o, r, s, l = 0;
            if (ve(e)) return this.each(function(t) {
                we(this).removeClass(e.call(this, t, Q(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = K(e)).length)
                for (; n = this[l++];)
                    if (a = Q(n), i = 1 === n.nodeType && " " + U(a) + " ") {
                        for (r = 0; o = t[r++];)
                            for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                        a !== (s = U(i)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                i = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && i ? t ? this.addClass(e) : this.removeClass(e) : ve(e) ? this.each(function(n) {
                we(this).toggleClass(e.call(this, n, Q(this), t), t)
            }) : this.each(function() {
                var t, a, o, r;
                if (i)
                    for (a = 0, o = we(this), r = K(e); t = r[a++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else void 0 !== e && "boolean" !== n || ((t = Q(this)) && De.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : De.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + U(Q(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var kt = /\r/g;
    we.fn.extend({
        val: function(e) {
            var t, n, i, a = this[0];
            return arguments.length ? (i = ve(e), this.each(function(n) {
                var a;
                1 === this.nodeType && (null == (a = i ? e.call(this, n, we(this).val()) : e) ? a = "" : "number" == typeof a ? a += "" : Array.isArray(a) && (a = we.map(a, function(e) {
                    return null == e ? "" : e + ""
                })), (t = we.valHooks[this.type] || we.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, a, "value") || (this.value = a))
            })) : a ? (t = we.valHooks[a.type] || we.valHooks[a.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(a, "value")) ? n : "string" == typeof(n = a.value) ? n.replace(kt, "") : null == n ? "" : n : void 0
        }
    }), we.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = we.find.attr(e, "value");
                    return null != t ? t : U(we.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, i, a = e.options,
                        r = e.selectedIndex,
                        s = "select-one" === e.type,
                        l = s ? null : [],
                        c = s ? r + 1 : a.length;
                    for (i = r < 0 ? c : s ? r : 0; i < c; i++)
                        if (((n = a[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !o(n.parentNode, "optgroup"))) {
                            if (t = we(n).val(), s) return t;
                            l.push(t)
                        }
                    return l
                },
                set: function(e, t) {
                    for (var n, i, a = e.options, o = we.makeArray(t), r = a.length; r--;)((i = a[r]).selected = we.inArray(we.valHooks.option.get(i), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), we.each(["radio", "checkbox"], function() {
        we.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = we.inArray(we(e).val(), t) > -1
            }
        }, me.checkOn || (we.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), me.focusin = "onfocusin" in e;
    var Tt = /^(?:focusinfocus|focusoutblur)$/,
        Ht = function(e) {
            e.stopPropagation()
        };
    we.extend(we.event, {
        trigger: function(t, n, i, a) {
            var o, r, s, l, c, d, u, p, f = [i || oe],
                h = fe.call(t, "type") ? t.type : t,
                g = fe.call(t, "namespace") ? t.namespace.split(".") : [];
            if (r = p = s = i = i || oe, 3 !== i.nodeType && 8 !== i.nodeType && !Tt.test(h + we.event.triggered) && (h.indexOf(".") > -1 && (h = (g = h.split(".")).shift(), g.sort()), c = h.indexOf(":") < 0 && "on" + h, t = t[we.expando] ? t : new we.Event(h, "object" == typeof t && t), t.isTrigger = a ? 2 : 3, t.namespace = g.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : we.makeArray(n, [t]), u = we.event.special[h] || {}, a || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                if (!a && !u.noBubble && !be(i)) {
                    for (l = u.delegateType || h, Tt.test(l + h) || (r = r.parentNode); r; r = r.parentNode) f.push(r), s = r;
                    s === (i.ownerDocument || oe) && f.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0;
                    (r = f[o++]) && !t.isPropagationStopped();) p = r, t.type = o > 1 ? l : u.bindType || h, (d = (De.get(r, "events") || {})[t.type] && De.get(r, "handle")) && d.apply(r, n), (d = c && r[c]) && d.apply && Le(r) && (t.result = d.apply(r, n), !1 === t.result && t.preventDefault());
                return t.type = h, a || t.isDefaultPrevented() || u._default && !1 !== u._default.apply(f.pop(), n) || !Le(i) || c && ve(i[h]) && !be(i) && ((s = i[c]) && (i[c] = null), we.event.triggered = h, t.isPropagationStopped() && p.addEventListener(h, Ht), i[h](), t.isPropagationStopped() && p.removeEventListener(h, Ht), we.event.triggered = void 0, s && (i[c] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var i = we.extend(new we.Event, n, {
                type: e,
                isSimulated: !0
            });
            we.event.trigger(i, null, t)
        }
    }), we.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                we.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return we.event.trigger(e, t, n, !0)
        }
    }), me.focusin || we.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            we.event.simulate(t, e.target, we.event.fix(e))
        };
        we.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    a = De.access(i, t);
                a || i.addEventListener(e, n, !0), De.access(i, t, (a || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    a = De.access(i, t) - 1;
                a ? De.access(i, t, a) : (i.removeEventListener(e, n, !0), De.remove(i, t))
            }
        }
    });
    var jt = e.location,
        Wt = Date.now(),
        _t = /\?/;
    we.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || we.error("Invalid XML: " + t), n
    };
    var St = /\[\]$/,
        Mt = /\r?\n/g,
        Et = /^(?:submit|button|image|reset|file)$/i,
        Pt = /^(?:input|select|textarea|keygen)/i;
    we.param = function(e, t) {
        var n, i = [],
            a = function(e, t) {
                var n = ve(t) ? t() : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !we.isPlainObject(e)) we.each(e, function() {
            a(this.name, this.value)
        });
        else
            for (n in e) Z(n, e[n], t, a);
        return i.join("&")
    }, we.fn.extend({
        serialize: function() {
            return we.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = we.prop(this, "elements");
                return e ? we.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !we(this).is(":disabled") && Pt.test(this.nodeName) && !Et.test(e) && (this.checked || !Ye.test(e))
            }).map(function(e, t) {
                var n = we(this).val();
                return null == n ? null : Array.isArray(n) ? we.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Mt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Mt, "\r\n")
                }
            }).get()
        }
    });
    var It = /%20/g,
        qt = /#.*$/,
        At = /([?&])_=[^&]*/,
        Lt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Dt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ot = /^(?:GET|HEAD)$/,
        zt = /^\/\//,
        Nt = {},
        Ft = {},
        Rt = "*/".concat("*"),
        Xt = oe.createElement("a");
    Xt.href = jt.href, we.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: jt.href,
            type: "GET",
            isLocal: Dt.test(jt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Rt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": we.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? te(te(e, we.ajaxSettings), t) : te(we.ajaxSettings, e)
        },
        ajaxPrefilter: J(Nt),
        ajaxTransport: J(Ft),
        ajax: function(t, n) {
            function i(t, n, i, s) {
                var c, p, f, w, x, $ = n;
                d || (d = !0, l && e.clearTimeout(l), a = void 0, r = s || "", C.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, i && (w = ne(h, C, i)), w = ie(h, w, C, c), c ? (h.ifModified && ((x = C.getResponseHeader("Last-Modified")) && (we.lastModified[o] = x), (x = C.getResponseHeader("etag")) && (we.etag[o] = x)), 204 === t || "HEAD" === h.type ? $ = "nocontent" : 304 === t ? $ = "notmodified" : ($ = w.state, p = w.data, c = !(f = w.error))) : (f = $, !t && $ || ($ = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || $) + "", c ? v.resolveWith(g, [p, $, C]) : v.rejectWith(g, [C, $, f]), C.statusCode(y), y = void 0, u && m.trigger(c ? "ajaxSuccess" : "ajaxError", [C, h, c ? p : f]), b.fireWith(g, [C, $]), u && (m.trigger("ajaxComplete", [C, h]), --we.active || we.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var a, o, r, s, l, c, d, u, p, f, h = we.ajaxSetup({}, n),
                g = h.context || h,
                m = h.context && (g.nodeType || g.jquery) ? we(g) : we.event,
                v = we.Deferred(),
                b = we.Callbacks("once memory"),
                y = h.statusCode || {},
                w = {},
                x = {},
                $ = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (d) {
                            if (!s)
                                for (s = {}; t = Lt.exec(r);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return d ? r : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == d && (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, w[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == d && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (d) C.always(e[C.status]);
                            else
                                for (t in e) y[t] = [y[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || $;
                        return a && a.abort(t), i(0, t), this
                    }
                };
            if (v.promise(C), h.url = ((t || h.url || jt.href) + "").replace(zt, jt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(Me) || [""], null == h.crossDomain) {
                c = oe.createElement("a");
                try {
                    c.href = h.url, c.href = c.href, h.crossDomain = Xt.protocol + "//" + Xt.host != c.protocol + "//" + c.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = we.param(h.data, h.traditional)), ee(Nt, h, n, C), d) return C;
            (u = we.event && h.global) && 0 == we.active++ && we.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ot.test(h.type), o = h.url.replace(qt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(It, "+")) : (f = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (_t.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(At, "$1"), f = (_t.test(o) ? "&" : "?") + "_=" + Wt++ + f), h.url = o + f), h.ifModified && (we.lastModified[o] && C.setRequestHeader("If-Modified-Since", we.lastModified[o]), we.etag[o] && C.setRequestHeader("If-None-Match", we.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && C.setRequestHeader("Content-Type", h.contentType), C.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : h.accepts["*"]);
            for (p in h.headers) C.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, C, h) || d)) return C.abort();
            if ($ = "abort", b.add(h.complete), C.done(h.success), C.fail(h.error), a = ee(Ft, h, n, C)) {
                if (C.readyState = 1, u && m.trigger("ajaxSend", [C, h]), d) return C;
                h.async && h.timeout > 0 && (l = e.setTimeout(function() {
                    C.abort("timeout")
                }, h.timeout));
                try {
                    d = !1, a.send(w, i)
                } catch (e) {
                    if (d) throw e;
                    i(-1, e)
                }
            } else i(-1, "No Transport");
            return C
        },
        getJSON: function(e, t, n) {
            return we.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return we.get(e, void 0, t, "script")
        }
    }), we.each(["get", "post"], function(e, t) {
        we[t] = function(e, n, i, a) {
            return ve(n) && (a = a || i, i = n, n = void 0), we.ajax(we.extend({
                url: e,
                type: t,
                dataType: a,
                data: n,
                success: i
            }, we.isPlainObject(e) && e))
        }
    }), we._evalUrl = function(e) {
        return we.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, we.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (ve(e) && (e = e.call(this[0])), t = we(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return ve(e) ? this.each(function(t) {
                we(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = we(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ve(e);
            return this.each(function(n) {
                we(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                we(this).replaceWith(this.childNodes)
            }), this
        }
    }), we.expr.pseudos.hidden = function(e) {
        return !we.expr.pseudos.visible(e)
    }, we.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, we.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Bt = {
            0: 200,
            1223: 204
        },
        Gt = we.ajaxSettings.xhr();
    me.cors = !!Gt && "withCredentials" in Gt, me.ajax = Gt = !!Gt, we.ajaxTransport(function(t) {
        var n, i;
        if (me.cors || Gt && !t.crossDomain) return {
            send: function(a, o) {
                var r, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (r in t.xhrFields) s[r] = t.xhrFields[r];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || a["X-Requested-With"] || (a["X-Requested-With"] = "XMLHttpRequest");
                for (r in a) s.setRequestHeader(r, a[r]);
                n = function(e) {
                    return function() {
                        n && (n = i = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Bt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), i = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && i()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (e) {
                    if (n) throw e
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), we.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), we.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return we.globalEval(e), e
            }
        }
    }), we.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), we.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, a) {
                    t = we("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && a("error" === e.type ? 404 : 200, e.type)
                    }), oe.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Vt = [],
        Yt = /(=)\?(?=&|$)|\?\?/;
    we.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Vt.pop() || we.expando + "_" + Wt++;
            return this[e] = !0, e
        }
    }), we.ajaxPrefilter("json jsonp", function(t, n, i) {
        var a, o, r, s = !1 !== t.jsonp && (Yt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return a = t.jsonpCallback = ve(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Yt, "$1" + a) : !1 !== t.jsonp && (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + a), t.converters["script json"] = function() {
            return r || we.error(a + " was not called"), r[0]
        }, t.dataTypes[0] = "json", o = e[a], e[a] = function() {
            r = arguments
        }, i.always(function() {
            void 0 === o ? we(e).removeProp(a) : e[a] = o, t[a] && (t.jsonpCallback = n.jsonpCallback, Vt.push(a)), r && ve(o) && o(r[0]), r = o = void 0
        }), "script"
    }), me.createHTMLDocument = function() {
        var e = oe.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), we.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var i, a, o;
        return t || (me.createHTMLDocument ? ((i = (t = oe.implementation.createHTMLDocument("")).createElement("base")).href = oe.location.href, t.head.appendChild(i)) : t = oe), a = He.exec(e), o = !n && [], a ? [t.createElement(a[1])] : (a = C([e], t, o), o && o.length && we(o).remove(), we.merge([], a.childNodes))
    }, we.fn.load = function(e, t, n) {
        var i, a, o, r = this,
            s = e.indexOf(" ");
        return s > -1 && (i = U(e.slice(s)), e = e.slice(0, s)), ve(t) ? (n = t, t = void 0) : t && "object" == typeof t && (a = "POST"), r.length > 0 && we.ajax({
            url: e,
            type: a || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, r.html(i ? we("<div>").append(we.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            r.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, we.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        we.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), we.expr.pseudos.animated = function(e) {
        return we.grep(we.timers, function(t) {
            return e === t.elem
        }).length
    }, we.offset = {
        setOffset: function(e, t, n) {
            var i, a, o, r, s, l, c = we.css(e, "position"),
                d = we(e),
                u = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), o = we.css(e, "top"), l = we.css(e, "left"), ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1 ? (r = (i = d.position()).top, a = i.left) : (r = parseFloat(o) || 0, a = parseFloat(l) || 0), ve(t) && (t = t.call(e, n, we.extend({}, s))), null != t.top && (u.top = t.top - s.top + r), null != t.left && (u.left = t.left - s.left + a), "using" in t ? t.using.call(e, u) : d.css(u)
        }
    }, we.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                we.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0];
            return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, i = this[0],
                    a = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === we.css(i, "position")) t = i.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === we.css(e, "position");) e = e.parentNode;
                    e && e !== i && 1 === e.nodeType && ((a = we(e).offset()).top += we.css(e, "borderTopWidth", !0), a.left += we.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - a.top - we.css(i, "marginTop", !0),
                    left: t.left - a.left - we.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === we.css(e, "position");) e = e.offsetParent;
                return e || Je
            })
        }
    }), we.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        we.fn[e] = function(i) {
            return Ie(this, function(e, i, a) {
                var o;
                if (be(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === a) return o ? o[t] : e[i];
                o ? o.scrollTo(n ? o.pageXOffset : a, n ? a : o.pageYOffset) : e[i] = a
            }, e, i, arguments.length)
        }
    }), we.each(["top", "left"], function(e, t) {
        we.cssHooks[t] = A(me.pixelPosition, function(e, n) {
            if (n) return n = q(e, t), st.test(n) ? we(e).position()[t] + "px" : n
        })
    }), we.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        we.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            we.fn[i] = function(a, o) {
                var r = arguments.length && (n || "boolean" != typeof a),
                    s = n || (!0 === a || !0 === o ? "margin" : "border");
                return Ie(this, function(t, n, a) {
                    var o;
                    return be(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === a ? we.css(t, n, s) : we.style(t, n, a, s)
                }, t, r ? a : void 0, r)
            }
        })
    }), we.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        we.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), we.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), we.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), we.proxy = function(e, t) {
        var n, i, a;
        if ("string" == typeof t && (n = e[t], t = e, e = n), ve(e)) return i = se.call(arguments, 2), a = function() {
            return e.apply(t || this, i.concat(se.call(arguments)))
        }, a.guid = e.guid = e.guid || we.guid++, a
    }, we.holdReady = function(e) {
        e ? we.readyWait++ : we.ready(!0)
    }, we.isArray = Array.isArray, we.parseJSON = JSON.parse, we.nodeName = o, we.isFunction = ve, we.isWindow = be, we.camelCase = h, we.type = i, we.now = Date.now, we.isNumeric = function(e) {
        var t = we.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return we
    });
    var Ut = e.jQuery,
        Qt = e.$;
    return we.noConflict = function(t) {
        return e.$ === we && (e.$ = Qt), t && e.jQuery === we && (e.jQuery = Ut), we
    }, t || (e.jQuery = e.$ = we), we
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    "use strict";

    function t(e, t, n, i) {
        var a, o = {
            raw: {}
        };
        i = i || {};
        for (a in i) i.hasOwnProperty(a) && ("classes" === e ? (o.raw[i[a]] = t + "-" + i[a], o[i[a]] = "." + t + "-" + i[a]) : (o.raw[a] = i[a], o[a] = i[a] + "." + t));
        for (a in n) n.hasOwnProperty(a) && ("classes" === e ? (o.raw[a] = n[a].replace(/{ns}/g, t), o[a] = n[a].replace(/{ns}/g, "." + t)) : (o.raw[a] = n[a].replace(/.{ns}/g, ""), o[a] = n[a].replace(/{ns}/g, t)));
        return o
    }

    function n() {
        f.windowWidth = f.$window.width(), f.windowHeight = f.$window.height(), v = p.startTimer(v, b, i)
    }

    function i() {
        for (var e in f.ResizeHandlers) f.ResizeHandlers.hasOwnProperty(e) && f.ResizeHandlers[e].callback.call(window, f.windowWidth, f.windowHeight)
    }

    function a() {
        if (f.support.raf) {
            f.window.requestAnimationFrame(a);
            for (var e in f.RAFHandlers) f.RAFHandlers.hasOwnProperty(e) && f.RAFHandlers[e].callback.call(window)
        }
    }

    function o(e, t) {
        return parseInt(e.priority) - parseInt(t.priority)
    }
    var r, s, l, c = "undefined" != typeof window ? window : this,
        d = c.document,
        u = function() {
            this.Version = "1.4.13", this.Plugins = {}, this.DontConflict = !1, this.Conflicts = {
                fn: {}
            }, this.ResizeHandlers = [], this.RAFHandlers = [], this.window = c, this.$window = e(c), this.document = d, this.$document = e(d), this.$body = null, this.windowWidth = 0, this.windowHeight = 0, this.fallbackWidth = 1024, this.fallbackHeight = 768, this.userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera, this.isFirefox = /Firefox/i.test(this.userAgent), this.isChrome = /Chrome/i.test(this.userAgent), this.isSafari = /Safari/i.test(this.userAgent) && !this.isChrome, this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent), this.isIEMobile = /IEMobile/i.test(this.userAgent), this.isFirefoxMobile = this.isFirefox && this.isMobile, this.transform = null, this.transition = null, this.support = {
                file: !!(window.File && window.FileList && window.FileReader),
                history: !!(window.history && window.history.pushState && window.history.replaceState),
                matchMedia: !(!window.matchMedia && !window.msMatchMedia),
                pointer: !!window.PointerEvent,
                raf: !(!window.requestAnimationFrame || !window.cancelAnimationFrame),
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                transition: !1,
                transform: !1
            }
        },
        p = {
            killEvent: function(e, t) {
                try {
                    e.preventDefault(), e.stopPropagation(), t && e.stopImmediatePropagation()
                } catch (e) {}
            },
            killGesture: function(e) {
                try {
                    e.preventDefault()
                } catch (e) {}
            },
            lockViewport: function(t) {
                y[t] = !0, e.isEmptyObject(y) || w || (r.length ? r.attr("content", l) : r = e("head").append('<meta name="viewport" content="' + l + '">'), f.$body.on(m.gestureChange, p.killGesture).on(m.gestureStart, p.killGesture).on(m.gestureEnd, p.killGesture), w = !0)
            },
            unlockViewport: function(t) {
                "undefined" !== e.type(y[t]) && delete y[t], e.isEmptyObject(y) && w && (r.length && (s ? r.attr("content", s) : r.remove()), f.$body.off(m.gestureChange).off(m.gestureStart).off(m.gestureEnd), w = !1)
            },
            startTimer: function(e, t, n, i) {
                return p.clearTimer(e), i ? setInterval(n, t) : setTimeout(n, t)
            },
            clearTimer: function(e, t) {
                e && (t ? clearInterval(e) : clearTimeout(e), e = null)
            },
            sortAsc: function(e, t) {
                return parseInt(e, 10) - parseInt(t, 10)
            },
            sortDesc: function(e, t) {
                return parseInt(t, 10) - parseInt(e, 10)
            },
            decodeEntities: function(e) {
                var t = f.document.createElement("textarea");
                return t.innerHTML = e, t.value
            },
            parseQueryString: function(e) {
                for (var t = {}, n = e.slice(e.indexOf("?") + 1).split("&"), i = 0; i < n.length; i++) {
                    var a = n[i].split("=");
                    t[a[0]] = a[1]
                }
                return t
            }
        },
        f = new u,
        h = e.Deferred(),
        g = {
            base: "{ns}",
            element: "{ns}-element"
        },
        m = {
            namespace: ".{ns}",
            beforeUnload: "beforeunload.{ns}",
            blur: "blur.{ns}",
            change: "change.{ns}",
            click: "click.{ns}",
            dblClick: "dblclick.{ns}",
            drag: "drag.{ns}",
            dragEnd: "dragend.{ns}",
            dragEnter: "dragenter.{ns}",
            dragLeave: "dragleave.{ns}",
            dragOver: "dragover.{ns}",
            dragStart: "dragstart.{ns}",
            drop: "drop.{ns}",
            error: "error.{ns}",
            focus: "focus.{ns}",
            focusIn: "focusin.{ns}",
            focusOut: "focusout.{ns}",
            gestureChange: "gesturechange.{ns}",
            gestureStart: "gesturestart.{ns}",
            gestureEnd: "gestureend.{ns}",
            input: "input.{ns}",
            keyDown: "keydown.{ns}",
            keyPress: "keypress.{ns}",
            keyUp: "keyup.{ns}",
            load: "load.{ns}",
            mouseDown: "mousedown.{ns}",
            mouseEnter: "mouseenter.{ns}",
            mouseLeave: "mouseleave.{ns}",
            mouseMove: "mousemove.{ns}",
            mouseOut: "mouseout.{ns}",
            mouseOver: "mouseover.{ns}",
            mouseUp: "mouseup.{ns}",
            panStart: "panstart.{ns}",
            pan: "pan.{ns}",
            panEnd: "panend.{ns}",
            resize: "resize.{ns}",
            scaleStart: "scalestart.{ns}",
            scaleEnd: "scaleend.{ns}",
            scale: "scale.{ns}",
            scroll: "scroll.{ns}",
            select: "select.{ns}",
            swipe: "swipe.{ns}",
            touchCancel: "touchcancel.{ns}",
            touchEnd: "touchend.{ns}",
            touchLeave: "touchleave.{ns}",
            touchMove: "touchmove.{ns}",
            touchStart: "touchstart.{ns}"
        },
        v = null,
        b = 20,
        y = [],
        w = !1;
    return u.prototype.NoConflict = function() {
            f.DontConflict = !0;
            for (var t in f.Plugins) f.Plugins.hasOwnProperty(t) && (e[t] = f.Conflicts[t], e.fn[t] = f.Conflicts.fn[t])
        }, u.prototype.Ready = function(e) {
            "complete" === f.document.readyState || "loading" !== f.document.readyState && !f.document.documentElement.doScroll ? e() : f.document.addEventListener("DOMContentLoaded", e)
        }, u.prototype.Plugin = function(n, i) {
            return f.Plugins[n] = function(n, i) {
                function a(t) {
                    var a, o, s, c = "object" === e.type(t),
                        d = Array.prototype.slice.call(arguments, c ? 1 : 0),
                        u = this,
                        p = e();
                    for (t = e.extend(!0, {}, i.defaults || {}, c ? t : {}), o = 0, s = u.length; o < s; o++)
                        if (a = u.eq(o), !r(a)) {
                            i.guid++;
                            var f = "__" + i.guid,
                                h = i.classes.raw.base + f,
                                g = a.data(n + "-options"),
                                m = e.extend(!0, {
                                    $el: a,
                                    guid: f,
                                    numGuid: i.guid,
                                    rawGuid: h,
                                    dotGuid: "." + h
                                }, t, "object" === e.type(g) ? g : {});
                            a.addClass(i.classes.raw.element).data(l, m), i.methods._construct.apply(a, [m].concat(d)), p = p.add(a)
                        }
                    for (o = 0, s = p.length; o < s; o++) a = p.eq(o), i.methods._postConstruct.apply(a, [r(a)]);
                    return u
                }

                function r(e) {
                    return e.data(l)
                }
                var s = "fs-" + n,
                    l = "fs" + n.replace(/(^|\s)([a-z])/g, function(e, t, n) {
                        return t + n.toUpperCase()
                    });
                return i.initialized = !1, i.priority = i.priority || 10, i.classes = t("classes", s, g, i.classes), i.events = t("events", n, m, i.events), i.functions = e.extend({
                    getData: r,
                    iterate: function(t) {
                        for (var n = this, i = Array.prototype.slice.call(arguments, 1), a = 0, o = n.length; a < o; a++) {
                            var s = n.eq(a),
                                l = r(s) || {};
                            "undefined" !== e.type(l.$el) && t.apply(s, [l].concat(i))
                        }
                        return n
                    }
                }, p, i.functions), i.methods = e.extend(!0, {
                    _construct: e.noop,
                    _postConstruct: e.noop,
                    _destruct: e.noop,
                    _resize: !1,
                    destroy: function(e) {
                        i.functions.iterate.apply(this, [i.methods._destruct].concat(Array.prototype.slice.call(arguments, 1))), this.removeClass(i.classes.raw.element).removeData(l)
                    }
                }, i.methods), i.utilities = e.extend(!0, {
                    _initialize: !1,
                    _delegate: !1,
                    defaults: function(t) {
                        i.defaults = e.extend(!0, i.defaults, t || {})
                    }
                }, i.utilities), i.widget && (f.Conflicts.fn[n] = e.fn[n], e.fn[l] = function(t) {
                    if (this instanceof e) {
                        var n = i.methods[t];
                        if ("object" === e.type(t) || !t) return a.apply(this, arguments);
                        if (n && 0 !== t.indexOf("_")) {
                            var o = [n].concat(Array.prototype.slice.call(arguments, 1));
                            return i.functions.iterate.apply(this, o)
                        }
                        return this
                    }
                }, f.DontConflict || (e.fn[n] = e.fn[l])), f.Conflicts[n] = e[n], e[l] = i.utilities._delegate || function(t) {
                    var n = i.utilities[t] || i.utilities._initialize || !1;
                    if (n) {
                        var a = Array.prototype.slice.call(arguments, "object" === e.type(t) ? 0 : 1);
                        return n.apply(window, a)
                    }
                }, f.DontConflict || (e[n] = e[l]), i.namespace = n, i.namespaceClean = l, i.guid = 0, i.methods._resize && (f.ResizeHandlers.push({
                    namespace: n,
                    priority: i.priority,
                    callback: i.methods._resize
                }), f.ResizeHandlers.sort(o)), i.methods._raf && (f.RAFHandlers.push({
                    namespace: n,
                    priority: i.priority,
                    callback: i.methods._raf
                }), f.RAFHandlers.sort(o)), i
            }(n, i), f.Plugins[n]
        }, f.$window.on("resize.fs", n), n(), a(), f.Ready(function() {
            f.$body = e("body"), e("html").addClass(f.support.touch ? "touchevents" : "no-touchevents"), r = e('meta[name="viewport"]'), s = !!r.length && r.attr("content"), l = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0", h.resolve()
        }), m.clickTouchStart = m.click + " " + m.touchStart,
        function() {
            var e, t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                },
                n = ["transition", "-webkit-transition"],
                i = {
                    transform: "transform",
                    MozTransform: "-moz-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    webkitTransform: "-webkit-transform"
                },
                a = "transitionend",
                o = "",
                r = "",
                s = document.createElement("div");
            for (e in t)
                if (t.hasOwnProperty(e) && e in s.style) {
                    a = t[e], f.support.transition = !0;
                    break
                }
            m.transitionEnd = a + ".{ns}";
            for (e in n)
                if (n.hasOwnProperty(e) && n[e] in s.style) {
                    o = n[e];
                    break
                }
            f.transition = o;
            for (e in i)
                if (i.hasOwnProperty(e) && i[e] in s.style) {
                    f.support.transform = !0, r = i[e];
                    break
                }
            f.transform = r
        }(), window.Formstone = f, f
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        g.scrollDepth && l()
    }

    function i(t) {
        !x && b && b.length && (x = !0, (g = e.extend(g, t || {})).autoEvents && b.find("a").not("[" + C + "]").each(o), g.scrollDepth && (l(), v.on(w.scroll, r).one(w.load, n)), b.on(w.click, "*[" + C + "]", c))
    }

    function a() {
        x && b && b.length && (v.off(w.namespace), b.off(w.namespace), x = !1)
    }

    function o() {
        var t, n = e(this),
            i = "undefined" !== e.type(n[0].href) ? n[0].href : "",
            a = document.domain.split(".").reverse(),
            o = null !== i.match(a[1] + "." + a[0]);
        i.match(/^mailto\:/i) ? t = "Email, Click, " + i.replace(/^mailto\:/i, "") : i.match(/^tel\:/i) ? t = "Telephone, Click, " + i.replace(/^tel\:/i, "") : i.match(g.fileTypes) ? t = "File, Download:" + (/[.]/.exec(i) ? /[^.]+$/.exec(i) : void 0)[0] + ", " + i.replace(/ /g, "-") : o || (t = "ExternalLink, Click, " + i), t && n.attr(C, t)
    }

    function r(e) {
        y.startTimer(T, 250, s)
    }

    function s() {
        for (var n, i = v.scrollTop() + t.windowHeight, a = 1 / g.scrollStops, o = a, r = 1; r <= g.scrollStops; r++) n = Math.round(100 * o).toString(), !k[H][n].passed && i > k[H][n].edge && (k[H][n].passed = !0, d(e.extend(g.scrollFields, {
            eventCategory: "ScrollDepth",
            eventAction: H,
            eventLabel: n,
            nonInteraction: !0
        }))), o += a
    }

    function l() {
        var t, n = e.mediaquery("state"),
            i = b.outerHeight(),
            a = {},
            o = 1 / g.scrollStops,
            r = o,
            s = 0;
        n.minWidth && (H = "MinWidth:" + n.minWidth + "px");
        for (var l = 1; l <= g.scrollStops; l++) s = parseInt(i * r), a[t = Math.round(100 * r).toString()] = {
            edge: "100" === t ? s - 10 : s,
            passsed: !(!k[H] || !k[H][t]) && k[H][t].passed
        }, r += o;
        k[H] = a
    }

    function c(t) {
        var n = e(this),
            i = n.attr("href"),
            a = n.data($).split(",");
        g.eventCallback && t.preventDefault();
        for (var o in a) a.hasOwnProperty(o) && (a[o] = e.trim(a[o]));
        d({
            eventCategory: a[0],
            eventAction: a[1],
            eventLabel: a[2] || i,
            eventValue: a[3],
            nonInteraction: a[4]
        }, n)
    }

    function d(t, n) {
        m.location;
        var i = e.extend({
            hitType: "event"
        }, t);
        if ("undefined" !== e.type(n) && !n.attr("data-analytics-stop")) {
            var a = "undefined" !== e.type(n[0].href) ? n[0].href : "",
                o = !a.match(/^mailto\:/i) && !a.match(/^tel\:/i) && a.indexOf(":") < 0 ? m.location.protocol + "//" + m.location.hostname + "/" + a : a;
            if ("" !== o) {
                var r = n.attr("target");
                r ? m.open(o, r) : g.eventCallback && (i.hitCallback = function() {
                    j && (y.clearTimer(j), f(o))
                }, j = y.startTimer(j, g.eventTimeout, i.hitCallback))
            }
        }
        p(i)
    }

    function u(t) {
        p(e.extend({
            hitType: "pageview"
        }, t))
    }

    function p(t) {
        if ("function" === e.type(m.ga) && "function" === e.type(m.ga.getAll))
            for (var n = m.ga.getAll(), i = 0, a = n.length; i < a; i++) m.ga(n[i].get("name") + ".send", t)
    }

    function f(e) {
        document.location = e
    }
    var h = t.Plugin("analytics", {
            methods: {
                _resize: n
            },
            utilities: {
                _delegate: function() {
                    if (arguments.length && "object" !== e.type(arguments[0]))
                        if ("destroy" === arguments[0]) a.apply(this);
                        else {
                            var t = Array.prototype.slice.call(arguments, 1);
                            switch (arguments[0]) {
                                case "pageview":
                                    u.apply(this, t);
                                    break;
                                case "event":
                                    d.apply(this, t)
                            }
                        } else i.apply(this, arguments);
                    return null
                }
            }
        }),
        g = {
            autoEvents: !1,
            fileTypes: /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
            eventCallback: !1,
            eventTimeout: 1e3,
            scrollDepth: !1,
            scrollStops: 5,
            scrollFields: {}
        },
        m = t.window,
        v = t.$window,
        b = null,
        y = h.functions,
        w = h.events,
        x = !1,
        $ = "analytics-event",
        C = "data-" + $,
        k = {},
        T = null,
        H = "Site",
        j = null;
    t.Ready(function() {
        b = t.$body
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./analytics"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        u && !u.hasClass(w.base) && u.on(y.click, f.selector, i).addClass(w.base)
    }

    function i(e) {
        var t = e.currentTarget;
        e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || window.location.protocol !== t.protocol || window.location.host !== t.host || "_blank" === t.target || (!t.hash || t.href.replace(t.hash, "") !== window.location.href.replace(location.hash, "") && t.href !== window.location.href + "#") && (t.href.match(f.ignoreTypes) || (b.killEvent(e), e.stopImmediatePropagation(), t.href !== $ && o(t.href, !0)))
    }

    function a(e) {
        p && p.abort();
        var t = e.originalEvent.state;
        t && (C = t.id, t.url !== $ && o(t.url, !1))
    }

    function o(t, n) {
        p && p.abort(), m.trigger(y.requested, [n]), f.transitionOutDeferred = f.transitionOut.apply(v, [!1]);
        var i = d(t),
            a = i.params,
            o = i.hash,
            s = i.clean,
            l = "User error",
            c = null,
            u = e.Deferred();
        a[f.requestKey] = !0, p = e.ajax({
            url: s,
            data: a,
            dataType: "json",
            cache: f.cache,
            xhr: function() {
                var e = new v.XMLHttpRequest;
                return e.addEventListener("progress", function(e) {
                    if (e.lengthComputable) {
                        var t = e.loaded / e.total;
                        m.trigger(y.progress, [t])
                    }
                }, !1), e
            },
            success: function(n, a, r) {
                c = "string" === e.type(n) ? e.parseJSON(n) : n, n.location && (t = n.location, i = d(t), o = i.hash), u.resolve()
            },
            error: function(e, t, n) {
                l = n, u.reject()
            }
        }), e.when(u, f.transitionOutDeferred).done(function() {
            r(i, c, n)
        }).fail(function() {
            m.trigger(y.failed, [l])
        })
    }

    function r(t, n, i) {
        m.trigger(y.loaded, [n]), void 0 !== e.fsAnalytics && e.fsAnalytics("pageview"), f.render.call(this, n, t.hash), $ = t.url, i && l(++C, $), m.trigger(y.rendered, [n]);
        var a = !1;
        if ("" !== t.hash) {
            var o = e(t.hash);
            o.length && (a = o.offset().top)
        }!1 !== a && m.scrollTop(a)
    }

    function s(t, n) {
        if ("undefined" !== e.type(t)) {
            var i;
            for (var a in t) t.hasOwnProperty(a) && (i = e(a)).length && i.html(t[a])
        }
    }

    function l(e, t) {
        history.pushState({
            id: e,
            url: t
        }, x + e, t)
    }

    function c(e, t) {
        history.replaceState({
            id: e,
            url: t
        }, x + e, t)
    }

    function d(e) {
        var t = e.indexOf("?"),
            n = e.indexOf("#"),
            i = {},
            a = "",
            o = e;
        return n > -1 && (a = e.slice(n), o = e.slice(0, n)), t > -1 && (i = b.parseQueryString(e.slice(t + 1, n > -1 ? n : e.length)), o = e.slice(0, t)), {
            hash: a,
            params: i,
            url: e,
            clean: o
        }
    }
    var u, p, f, h = t.Plugin("asap", {
            utilities: {
                _initialize: function(i) {
                    !f && t.support.history && (u = t.$body, (f = e.extend(g, i)).render === e.noop && (f.render = s), f.transitionOut === e.noop && (f.transitionOut = function() {
                        return e.Deferred().resolve()
                    }), history.state ? (C = history.state.id, $ = history.state.url) : ($ = window.location.href, c(C, $)), m.on(y.popState, a), n())
                },
                load: function(e) {
                    f && t.support.history ? e && o(e, !0) : window.location.href = e
                },
                replace: function(e) {
                    var t = history.state;
                    $ = e, c(t.id, e)
                }
            },
            events: {
                failed: "failed",
                loaded: "loaded",
                popState: "popstate",
                progress: "progress",
                requested: "requested",
                rendered: "rendered"
            }
        }),
        g = {
            cache: !0,
            ignoreTypes: /\.(jpg|sjpg|jpeg|png|gif|zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
            render: e.noop,
            requestKey: "fs-asap",
            selector: "a",
            transitionOut: e.noop
        },
        m = t.$window,
        v = m[0],
        b = h.functions,
        y = h.events,
        w = h.classes.raw,
        x = "asap-",
        $ = "",
        C = 1
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./transition"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        (T = k.scrollTop() + t.windowHeight) < 0 && (T = 0), $.iterate.call(j, m)
    }

    function i() {
        H = e(y.base), j = e(y.lazy), $.iterate.call(j, g)
    }

    function a(e) {
        if (e.visible) {
            var t = e.source;
            e.source = null, o(e, t, !0)
        }
    }

    function o(t, n, i) {
        if (n !== t.source && t.visible) {
            if (t.source = n, t.responsive = !1, t.isYouTube = !1, "object" === e.type(n) && "string" === e.type(n.video)) {
                var a = n.video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
                a && a.length >= 1 && (t.isYouTube = !0, t.videoId = a[1])
            }
            var o = !t.isYouTube && "object" === e.type(n) && (n.hasOwnProperty("mp4") || n.hasOwnProperty("ogg") || n.hasOwnProperty("webm"));
            if (t.video = t.isYouTube || o, t.playing = !1, t.isYouTube) t.playerReady = !1, t.posterLoaded = !1, c(t, n, i);
            else if ("object" === e.type(n) && n.hasOwnProperty("poster")) l(t, n, i);
            else {
                var d = n;
                if ("object" === e.type(n)) {
                    var u, p = [],
                        f = [];
                    for (u in n) n.hasOwnProperty(u) && f.push(u);
                    f.sort($.sortAsc);
                    for (u in f) f.hasOwnProperty(u) && p.push({
                        width: parseInt(f[u]),
                        url: n[f[u]],
                        mq: C.matchMedia("(min-width: " + parseInt(f[u]) + "px)")
                    });
                    t.responsive = !0, t.sources = p, d = r(t)
                }
                s(t, d, !1, i)
            }
        } else t.$el.trigger(x.loaded)
    }

    function r(e) {
        var n = e.source;
        if (e.responsive) {
            n = e.sources[0].url;
            for (var i in e.sources) e.sources.hasOwnProperty(i) && (t.support.matchMedia ? e.sources[i].mq.matches && (n = e.sources[i].url) : e.sources[i].width < t.fallbackWidth && (n = e.sources[i].url))
        }
        return n
    }

    function s(t, n, i, a) {
        var o = [w.media, w.image, !0 !== a ? w.animated : ""].join(" "),
            r = e('<div class="' + o + '" aria-hidden="true"><img alt="' + t.alt + '"></div>'),
            s = r.find("img"),
            l = n;
        s.one(x.load, function() {
            W && r.addClass(w.native).css({
                backgroundImage: "url('" + l + "')"
            }), r.fsTransition({
                property: "opacity"
            }, function() {
                i || d(t)
            }).css({
                opacity: 1
            }), h(t), i && !a || t.$el.trigger(x.loaded)
        }).one(x.error, t, u).attr("src", l), t.responsive && r.addClass(w.responsive), t.$container.append(r), (s[0].complete || 4 === s[0].readyState) && s.trigger(x.load), t.currentSource = l
    }

    function l(t, n, i) {
        t.source && t.source.poster && (s(t, t.source.poster, !0, !0), i = !1);
        var a = '<div class="' + [w.media, w.video, !0 !== i ? w.animated : ""].join(" ") + '" aria-hidden="true">';
        a += "<video playsinline", t.loop && (a += " loop"), t.mute && (a += " muted"), t.autoPlay && (a += " autoplay"), a += ">", t.source.webm && (a += '<source src="' + t.source.webm + '" type="video/webm" />'), t.source.mp4 && (a += '<source src="' + t.source.mp4 + '" type="video/mp4" />'), t.source.ogg && (a += '<source src="' + t.source.ogg + '" type="video/ogg" />'), a += "</video>";
        var o = e(a += "</div>");
        o.find("video").one(x.loadedMetaData, function(e) {
            o.fsTransition({
                property: "opacity"
            }, function() {
                d(t)
            }).css({
                opacity: 1
            }), h(t), t.$el.trigger(x.loaded), t.autoPlay && p(t)
        }), t.$container.append(o)
    }

    function c(t, n, i) {
        if (!t.videoId) {
            var a = n.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
            t.videoId = a[1]
        }
        if (t.posterLoaded || (t.source.poster || (t.source.poster = "//img.youtube.com/vi/" + t.videoId + "/0.jpg"), t.posterLoaded = !0, s(t, t.source.poster, !0, i), i = !1), e("script[src*='youtube.com/iframe_api']").length || e("head").append('<script src="//www.youtube.com/iframe_api"><\/script>'), _) {
            var o = t.guid + "_" + t.youTubeGuid++,
                r = '<div class="' + [w.media, w.embed, !0 !== i ? w.animated : ""].join(" ") + '" aria-hidden="true">';
            r += '<div id="' + o + '"></div>';
            var l = e(r += "</div>"),
                c = e.extend(!0, {}, {
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    wmode: "transparent",
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: o,
                    loop: t.loop ? 1 : 0,
                    autoplay: 1,
                    origin: C.location.protocol + "//" + C.location.host
                }, t.youtubeOptions);
            c.autoplay = 1, t.$container.append(l), t.player && (t.oldPlayer = t.player, t.player = null), t.player = new C.YT.Player(o, {
                videoId: t.videoId,
                playerVars: c,
                events: {
                    onReady: function(e) {
                        t.playerReady = !0, t.mute && t.player.mute(), t.autoPlay || t.player.pauseVideo()
                    },
                    onStateChange: function(e) {
                        t.playing || e.data !== C.YT.PlayerState.PLAYING ? t.loop && t.playing && e.data === C.YT.PlayerState.ENDED && t.player.playVideo() : (t.playing = !0, l.fsTransition({
                            property: "opacity"
                        }, function() {
                            d(t)
                        }).css({
                            opacity: 1
                        }), h(t), t.$el.trigger(x.loaded)), t.$el.find(y.embed).addClass(w.ready)
                    },
                    onPlaybackQualityChange: function(e) {},
                    onPlaybackRateChange: function(e) {},
                    onError: function(e) {
                        u({
                            data: t
                        })
                    },
                    onApiChange: function(e) {}
                }
            }), h(t)
        } else S.push({
            data: t,
            source: n
        })
    }

    function d(e) {
        var t = e.$container.find(y.media);
        t.length >= 1 && (t.not(":last").remove(), e.oldPlayer = null)
    }

    function u(e) {
        e.data.$el.trigger(x.error)
    }

    function p(e) {
        if (e.video && !e.playing)
            if (e.isYouTube) e.playerReady ? e.player.playVideo() : e.autoPlay = !0;
            else {
                var t = e.$container.find("video");
                t.length && t[0].play(), e.playing = !0
            }
    }

    function f(e) {
        if (e.visible)
            if (e.responsive) {
                var t = r(e);
                t !== e.currentSource ? s(e, t, !1, !0) : h(e)
            } else h(e)
    }

    function h(e) {
        for (var t = e.$container.find(y.media), n = 0, i = t.length; n < i; n++) {
            var a = t.eq(n),
                o = e.isYouTube ? "iframe" : a.find("video").length ? "video" : "img",
                r = a.find(o);
            if (r.length && ("img" !== o || !W)) {
                var s = e.$el.outerWidth(),
                    l = e.$el.outerHeight(),
                    c = v(e, r);
                e.width = c.width, e.height = c.height, e.left = 0, e.top = 0;
                var d = e.isYouTube ? e.embedRatio : e.width / e.height;
                e.height = l, e.width = e.height * d, e.width < s && (e.width = s, e.height = e.width / d), e.left = -(e.width - s) / 2, e.top = -(e.height - l) / 2, a.css({
                    height: e.height,
                    width: e.width,
                    left: e.left,
                    top: e.top
                })
            }
        }
    }

    function g(e) {
        e.scrollTop = e.$el.offset().top
    }

    function m(e) {
        !e.visible && e.scrollTop < T + e.lazyEdge && (e.visible = !0, a(e))
    }

    function v(t, n) {
        if (t.isYouTube) return {
            height: 500,
            width: 500 / t.embedRatio
        };
        if (n.is("img")) {
            var i = n[0];
            if ("undefined" !== e.type(i.naturalHeight)) return {
                height: i.naturalHeight,
                width: i.naturalWidth
            };
            var a = new Image;
            return a.src = i.src, {
                height: a.height,
                width: a.width
            }
        }
        return {
            height: n[0].videoHeight,
            width: n[0].videoWidth
        }
    }
    var b = t.Plugin("background", {
            widget: !0,
            defaults: {
                alt: "",
                autoPlay: !0,
                customClass: "",
                embedRatio: 1.777777,
                lazy: !1,
                lazyEdge: 100,
                loop: !0,
                mute: !0,
                source: null,
                youtubeOptions: {}
            },
            classes: ["container", "media", "animated", "responsive", "native", "fixed", "ready", "lazy"],
            events: {
                loaded: "loaded",
                ready: "ready",
                loadedMetaData: "loadedmetadata"
            },
            methods: {
                _construct: function(t) {
                    t.youTubeGuid = 0, t.$container = e('<div class="' + w.container + '"></div>').appendTo(this), t.thisClasses = [w.base, t.customClass], t.visible = !0, t.lazy && (t.visible = !1, t.thisClasses.push(w.lazy)), this.addClass(t.thisClasses.join(" ")), i(), t.lazy ? (g(t), m(t)) : a(t)
                },
                _destruct: function(e) {
                    e.$container.remove(), this.removeClass(e.thisClasses.join(" ")).off(x.namespace), i()
                },
                _resize: function() {
                    $.iterate.call(H, f), $.iterate.call(j, g), $.iterate.call(j, m)
                },
                play: p,
                pause: function(e) {
                    if (e.video && e.playing) {
                        if (e.isYouTube) e.playerReady ? e.player.pauseVideo() : e.autoPlay = !1;
                        else {
                            var t = e.$container.find("video");
                            t.length && t[0].pause()
                        }
                        e.playing = !1
                    }
                },
                mute: function(e) {
                    if (e.video)
                        if (e.isYouTube && e.playerReady) e.player.mute();
                        else {
                            var t = e.$container.find("video");
                            t.length && (t[0].muted = !0)
                        }
                    e.mute = !0
                },
                unmute: function(e) {
                    if (e.video) {
                        if (e.isYouTube && e.playerReady) e.player.unMute();
                        else {
                            var t = e.$container.find("video");
                            t.length && (t[0].muted = !1)
                        }
                        e.playing = !0
                    }
                    e.mute = !1
                },
                resize: h,
                load: o,
                unload: function(e) {
                    var t = e.$container.find(y.media);
                    t.length >= 1 && t.fsTransition({
                        property: "opacity"
                    }, function() {
                        t.remove(), delete e.source
                    }).css({
                        opacity: 0
                    })
                }
            }
        }),
        y = b.classes,
        w = y.raw,
        x = b.events,
        $ = b.functions,
        C = t.window,
        k = t.$window,
        T = 0,
        H = [],
        j = [],
        W = "backgroundSize" in t.document.documentElement.style,
        _ = !1,
        S = [];
    t.Ready(function() {
        n(), k.on("scroll", n)
    }), C.onYouTubeIframeAPIReady = function() {
        _ = !0;
        for (var e in S) S.hasOwnProperty(e) && c(S[e].data, S[e].source);
        S = []
    }
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery", "./touch"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        L = e(P.base)
    }

    function i(e) {
        e.enabled && (A.clearTimer(e.autoTimer), e.enabled = !1, e.$subordinate.off(q.update), this.removeClass([I.enabled, I.animated].join(" ")).off(q.namespace), e.$canister.fsTouch("destroy").off(q.namespace).attr("style", "").css(O, "none"), e.$items.css({
            width: "",
            height: ""
        }).removeClass([I.visible, P.item_previous, P.item_next].join(" ")), e.$images.off(q.namespace), e.$controlItems.off(q.namespace), e.$pagination.html("").off(q.namespace), m(e), e.useMargin ? e.$canister.css({
            marginLeft: ""
        }) : e.$canister.css(D, ""), e.index = 0)
    }

    function a(e) {
        e.enabled || (e.enabled = !0, this.addClass(I.enabled), e.$controlItems.on(q.click, e, f), e.$pagination.on(q.click, P.page, e, h), e.$items.on(q.click, e, T), e.$subordinate.on(q.update, e, j), j({
            data: e
        }, 0), e.$canister.fsTouch({
            axis: "x",
            pan: !0,
            swipe: !0
        }).on(q.panStart, e, w).on(q.pan, e, x).on(q.panEnd, e, $).on(q.swipe, e, C).on(q.focusIn, e, H).css(O, ""), r(e), e.$images.on(q.load, e, u), e.autoAdvance && (e.autoTimer = A.startTimer(e.autoTimer, e.autoTime, function() {
            p(e)
        }, !0)), o.call(this, e))
    }

    function o(t) {
        if (t.enabled) {
            var n, i, a, o, r;
            if (t.count = t.$items.length, t.count < 1) return m(t), void t.$canister.css({
                height: ""
            });
            if (this.removeClass(I.animated), t.containerWidth = t.$container.outerWidth(!1), t.visible = y(t), t.perPage = t.paged ? 1 : t.visible, t.itemMarginLeft = parseInt(t.$items.eq(0).css("marginLeft")), t.itemMarginRight = parseInt(t.$items.eq(0).css("marginRight")), t.itemMargin = t.itemMarginLeft + t.itemMarginRight, isNaN(t.itemMargin) && (t.itemMargin = 0), t.itemWidth = (t.containerWidth - t.itemMargin * (t.visible - 1)) / t.visible, t.itemHeight = 0, t.pageWidth = t.paged ? t.itemWidth : t.containerWidth, t.matchWidth) t.canisterWidth = t.single ? t.containerWidth : (t.itemWidth + t.itemMargin) * t.count;
            else
                for (t.canisterWidth = 0, t.$canister.css({
                        width: 1e6
                    }), n = 0; n < t.count; n++) t.canisterWidth += t.$items.eq(n).outerWidth(!0);
            t.$canister.css({
                width: t.canisterWidth,
                height: ""
            }), t.$items.css({
                width: t.matchWidth ? t.itemWidth : "",
                height: ""
            }).removeClass([I.visible, I.item_previous, I.item_next].join(" ")), t.pages = [], t.items = [];
            var s, l = 0,
                c = 0,
                d = 0,
                u = 0;
            for (a = 0, o = 0, i = e(), n = 0; n < t.count; n++) s = t.$items.eq(n), l = t.matchWidth ? t.itemWidth + t.itemMargin : s.outerWidth(!0), c = s.outerHeight(), u = s.position().left, t.items.push({
                $el: s,
                width: l,
                left: t.rtl ? u - (t.canisterWidth - l) : u
            }), (i.length && a + l > t.containerWidth + t.itemMargin || t.paged && n > 0) && (r = (t.rtl ? i.eq(i.length - 1) : i.eq(0)).position().left, t.pages.push({
                left: t.rtl ? r - (t.canisterWidth - a) : r,
                height: o,
                width: a,
                $items: i
            }), i = e(), o = 0, a = 0), i = i.add(s), a += l, d += l, c > o && (o = c), o > t.itemHeight && (t.itemHeight = o);
            t.rtl ? i.eq(i.length - 1) : i.eq(0), r = t.canisterWidth - t.containerWidth - (t.rtl ? t.itemMarginLeft : t.itemMarginRight), t.pages.push({
                left: t.rtl ? -r : r,
                height: o,
                width: a,
                $items: i
            }), t.pageCount = t.pages.length, t.paged && (t.pageCount -= t.count % t.visible), t.pageCount <= 0 && (t.pageCount = 1), t.maxMove = -t.pages[t.pageCount - 1].left, t.autoHeight ? t.$canister.css({
                height: t.pages[0].height
            }) : t.matchHeight && t.$items.css({
                height: t.itemHeight
            });
            var p = "";
            for (n = 0; n < t.pageCount; n++) p += '<button type="button" class="' + I.page + '">' + (n + 1) + "</button>";
            t.$pagination.html(p), t.pageCount <= 1 ? m(t) : v(t), t.$paginationItems = t.$pagination.find(P.page), g(t, t.index, !1), setTimeout(function() {
                t.$el.addClass(I.animated)
            }, 5)
        }
    }

    function r(e) {
        e.$items = e.$canister.children().not(":hidden").addClass(I.item), e.$images = e.$canister.find("img"), e.totalImages = e.$images.length
    }

    function s(e, t) {
        e.$images.off(q.namespace), !1 !== t && e.$canister.html(t), e.index = 0, r(e), o.call(this, e)
    }

    function l(e, t, n, i, a) {
        e.enabled && (A.clearTimer(e.autoTimer), void 0 === a && (a = !0), g(e, t - 1, a, n, i))
    }

    function c(e) {
        var t = e.index - 1;
        e.infinite && t < 0 && (t = e.pageCount - 1), g(e, t)
    }

    function d(e) {
        var t = e.index + 1;
        e.infinite && t >= e.pageCount && (t = 0), g(e, t)
    }

    function u(e) {
        var t = e.data;
        t.resizeTimer = A.startTimer(t.resizeTimer, 1, function() {
            o.call(t.$el, t)
        })
    }

    function p(e) {
        var t = e.index + 1;
        t >= e.pageCount && (t = 0), g(e, t)
    }

    function f(t) {
        A.killEvent(t);
        var n = t.data,
            i = n.index + (e(t.currentTarget).hasClass(I.control_next) ? 1 : -1);
        A.clearTimer(n.autoTimer), g(n, i)
    }

    function h(t) {
        A.killEvent(t);
        var n = t.data,
            i = n.$paginationItems.index(e(t.currentTarget));
        A.clearTimer(n.autoTimer), g(n, i)
    }

    function g(t, n, i, a, o) {
        if (n < 0 && (n = t.infinite ? t.pageCount - 1 : 0), n >= t.pageCount && (n = t.infinite ? 0 : t.pageCount - 1), !(t.count < 1)) {
            if (t.pages[n] && (t.leftPosition = -t.pages[n].left), t.leftPosition = W(t, t.leftPosition), t.useMargin ? t.$canister.css({
                    marginLeft: t.leftPosition
                }) : !1 === i ? (t.$canister.css(O, "none").css(D, "translateX(" + t.leftPosition + "px)"), setTimeout(function() {
                    t.$canister.css(O, "")
                }, 5)) : t.$canister.css(D, "translateX(" + t.leftPosition + "px)"), t.$items.removeClass([I.visible, I.item_previous, I.item_next].join(" ")), t.single)
                for (var r = 0, s = t.pages.length; r < s; r++) r === n ? t.pages[r].$items.addClass(I.visible).attr("aria-hidden", "false") : t.pages[r].$items.not(t.pages[n].$items).addClass(r < n ? I.item_previous : I.item_next).attr("aria-hidden", "true");
            else
                for (r = 0; r < t.count; r++) {
                    var l = t.rtl ? -1 : 1,
                        c = t.leftPosition * l + t.items[r].left * l,
                        d = c + t.items[r].width,
                        u = t.containerWidth + t.itemMargin + 1;
                    c >= -1 && d <= u ? t.items[r].$el.addClass(I.visible).attr("aria-hidden", "false") : c < 0 ? t.items[r].$el.addClass(I.item_previous).attr("aria-hidden", "false") : t.items[r].$el.addClass(I.item_next).attr("aria-hidden", "false")
                }
            t.autoHeight && t.$canister.css({
                height: t.pages[n].height
            }), !1 !== i && !0 !== a && n !== t.index && (t.infinite || n > -1 && n < t.pageCount) && t.$el.trigger(q.update, [n]), t.index = n, t.linked && !0 !== o && e(t.linked).not(t.$el)[E]("jumpPage", t.index + 1, !0, !0), b(t)
        }
    }

    function m(e) {
        e.$controls.removeClass(I.visible), e.$controlItems.removeClass(I.visible), e.$pagination.removeClass(I.visible)
    }

    function v(e) {
        e.$controls.addClass(I.visible), e.$controlItems.addClass(I.visible), e.$pagination.addClass(I.visible)
    }

    function b(e) {
        e.$paginationItems.removeClass(I.active).eq(e.index).addClass(I.active), e.infinite ? e.$controlItems.addClass(I.visible) : e.pageCount < 1 ? e.$controlItems.removeClass(I.visible) : (e.$controlItems.addClass(I.visible), e.index <= 0 ? e.$controlPrevious.removeClass(I.visible) : (e.index >= e.pageCount - 1 || !e.single && e.leftPosition === e.maxMove) && e.$controlNext.removeClass(I.visible))
    }

    function y(n) {
        var i = 1;
        if (n.single) return i;
        if ("array" === e.type(n.show))
            for (var a in n.show) n.show.hasOwnProperty(a) && (t.support.matchMedia ? n.show[a].mq.matches && (i = n.show[a].count) : n.show[a].width < t.fallbackWidth && (i = n.show[a].count));
        else i = n.show;
        return n.fill && n.count < i ? n.count : i
    }

    function w(t, n) {
        var i = t.data;
        if (A.clearTimer(i.autoTimer), !i.single) {
            if (i.useMargin) i.leftPosition = parseInt(i.$canister.css("marginLeft"));
            else {
                var a = i.$canister.css(D).split(",");
                i.leftPosition = parseInt(a[4])
            }
            if (i.$canister.css(O, "none").css("will-change", "transform"), x(t), i.linked && !0 !== n) {
                var o = t.deltaX / i.pageWidth;
                i.rtl && (o *= -1), e(i.linked).not(i.$el)[E]("panStart", o)
            }
        }
        i.isTouching = !0
    }

    function x(t, n) {
        var i = t.data;
        if (!i.single && (i.touchLeft = W(i, i.leftPosition + t.deltaX), i.useMargin ? i.$canister.css({
                marginLeft: i.touchLeft
            }) : i.$canister.css(D, "translateX(" + i.touchLeft + "px)"), i.linked && !0 !== n)) {
            var a = t.deltaX / i.pageWidth;
            i.rtl && (a *= -1), e(i.linked).not(i.$el)[E]("pan", a)
        }
    }

    function $(t, n) {
        var i = t.data,
            a = Math.abs(t.deltaX),
            o = _(i, t),
            r = !1;
        if (i.didPan = !1, 0 == o) r = i.index;
        else {
            if (!i.single) {
                var s, l, c = Math.abs(i.touchLeft),
                    d = !1,
                    u = i.rtl ? "right" : "left";
                if (t.directionX === u)
                    for (s = 0, l = i.pages.length; s < l; s++) d = i.pages[s], c > Math.abs(d.left) + 20 && (r = s + 1);
                else
                    for (s = i.pages.length - 1, l = 0; s >= l; s--) d = i.pages[s], c < Math.abs(d.left) && (r = s - 1)
            }!1 === r && (r = a < 50 ? i.index : i.index + o)
        }
        r !== i.index && (i.didPan = !0), i.linked && !0 !== n && e(i.linked).not(i.$el)[E]("panEnd", r), k(i, r)
    }

    function C(t, n) {
        var i = t.data,
            a = _(i, t),
            o = i.index + a;
        i.linked && !0 !== n && e(i.linked).not(i.$el)[E]("swipe", t.directionX), k(i, o)
    }

    function k(e, t) {
        e.$canister.css(O, "").css("will-change", ""), g(e, t), e.isTouching = !1
    }

    function T(t) {
        var n = t.data,
            i = e(t.currentTarget);
        if (!n.didPan && (i.trigger(q.itemClick), n.controller)) {
            var a = n.$items.index(i);
            j(t, a), n.$subordinate[E]("jumpPage", a + 1, !0)
        }
    }

    function H(t) {
        var n = t.data;
        if (n.enabled && !n.isTouching) {
            A.clearTimer(n.autoTimer), n.$container.scrollLeft(0);
            var i, a = e(t.target);
            a.hasClass(I.item) ? i = a : a.parents(P.item).length && (i = a.parents(P.item).eq(0));
            for (var o = 0; o < n.pageCount; o++)
                if (n.pages[o].$items.is(i)) {
                    g(n, o);
                    break
                }
        }
    }

    function j(e, t) {
        var n = e.data;
        if (n.controller) {
            var i = n.$items.eq(t);
            n.$items.removeClass(I.active), i.addClass(I.active);
            for (var a = 0; a < n.pageCount; a++)
                if (n.pages[a].$items.is(i)) {
                    g(n, a, !0, !0);
                    break
                }
        }
    }

    function W(e, t) {
        return isNaN(t) ? t = 0 : e.rtl ? (t > e.maxMove && (t = e.maxMove), t < 0 && (t = 0)) : (t < e.maxMove && (t = e.maxMove), t > 0 && (t = 0)), t
    }

    function _(e, t) {
        return Math.abs(t.deltaX) < Math.abs(t.deltaY) ? 0 : e.rtl ? "right" === t.directionX ? 1 : -1 : "left" === t.directionX ? 1 : -1
    }
    var S = t.Plugin("carousel", {
            widget: !0,
            defaults: {
                autoAdvance: !1,
                autoHeight: !1,
                autoTime: 8e3,
                contained: !0,
                controls: !0,
                customClass: "",
                fill: !1,
                infinite: !1,
                labels: {
                    next: "Next",
                    previous: "Previous",
                    controls: "Carousel {guid} Controls",
                    pagination: "Carousel {guid} Pagination"
                },
                matchHeight: !1,
                matchWidth: !0,
                maxWidth: 1 / 0,
                minWidth: "0px",
                paged: !1,
                pagination: !0,
                rtl: !1,
                show: 1,
                single: !1,
                theme: "fs-light",
                useMargin: !1
            },
            classes: ["ltr", "rtl", "viewport", "wrapper", "container", "canister", "item", "item_previous", "item_next", "controls", "controls_custom", "control", "control_previous", "control_next", "pagination", "page", "animated", "enabled", "visible", "active", "auto_height", "contained", "single"],
            events: {
                itemClick: "itemClick",
                update: "update"
            },
            methods: {
                _construct: function(o) {
                    var s;
                    o.didPan = !1, o.carouselClasses = [I.base, o.theme, o.customClass, o.rtl ? I.rtl : I.ltr], o.maxWidth = o.maxWidth === 1 / 0 ? "100000px" : o.maxWidth, o.mq = "(min-width:" + o.minWidth + ") and (max-width:" + o.maxWidth + ")", o.customControls = "object" === e.type(o.controls) && o.controls.previous && o.controls.next, o.customPagination = "string" === e.type(o.pagination), o.id = this.attr("id"), o.id ? o.ariaId = o.id : (o.ariaId = o.rawGuid, this.attr("id", o.ariaId)), t.support.transform || (o.useMargin = !0);
                    var l = "",
                        c = "",
                        d = [I.control, I.control_previous].join(" "),
                        u = [I.control, I.control_next].join(" ");
                    o.controls && !o.customControls && (o.labels.controls = o.labels.controls.replace("{guid}", o.numGuid), l += '<div class="' + I.controls + '" aria-label="' + o.labels.controls + '" aria-controls="' + o.ariaId + '">', l += '<button type="button" class="' + d + '" aria-label="' + o.labels.previous + '">' + o.labels.previous + "</button>", l += '<button type="button" class="' + u + '" aria-label="' + o.labels.next + '">' + o.labels.next + "</button>", l += "</div>"), o.pagination && !o.customPagination && (o.labels.pagination = o.labels.pagination.replace("{guid}", o.numGuid), c += '<div class="' + I.pagination + '" aria-label="' + o.labels.pagination + '" aria-controls="' + o.ariaId + '" role="navigation">', c += "</div>"), o.autoHeight && o.carouselClasses.push(I.auto_height), o.contained && o.carouselClasses.push(I.contained), o.single && o.carouselClasses.push(I.single), this.addClass(o.carouselClasses.join(" ")).wrapInner('<div class="' + I.wrapper + '" aria-live="polite"><div class="' + I.container + '"><div class="' + I.canister + '"></div></div></div>').append(l).wrapInner('<div class="' + I.viewport + '"></div>').append(c), o.$viewport = this.find(P.viewport).eq(0), o.$container = this.find(P.container).eq(0), o.$canister = this.find(P.canister).eq(0), o.$pagination = this.find(P.pagination).eq(0), o.$controlPrevious = o.$controlNext = e(""), o.customControls ? (o.$controls = e(o.controls.container).addClass([I.controls, I.controls_custom].join(" ")), o.$controlPrevious = e(o.controls.previous).addClass(d), o.$controlNext = e(o.controls.next).addClass(u)) : (o.$controls = this.find(P.controls).eq(0), o.$controlPrevious = o.$controls.find(P.control_previous), o.$controlNext = o.$controls.find(P.control_next)), o.$controlItems = o.$controlPrevious.add(o.$controlNext), o.customPagination && (o.$pagination = e(o.pagination).addClass([I.pagination])), o.$paginationItems = o.$pagination.find(P.page), o.index = 0, o.enabled = !1, o.leftPosition = 0, o.autoTimer = null, o.resizeTimer = null;
                    var p = this.data(M + "-linked");
                    o.linked = !!p && "[data-" + M + '-linked="' + p + '"]', o.linked && (o.paged = !0);
                    var f = this.data(M + "-controller-for") || "";
                    if (o.$subordinate = e(f), o.$subordinate.length && (o.controller = !0), "object" === e.type(o.show)) {
                        var h = o.show,
                            g = [],
                            m = [];
                        for (s in h) h.hasOwnProperty(s) && m.push(s);
                        m.sort(A.sortAsc);
                        for (s in m) m.hasOwnProperty(s) && g.push({
                            width: parseInt(m[s]),
                            count: h[m[s]],
                            mq: window.matchMedia("(min-width: " + parseInt(m[s]) + "px)")
                        });
                        o.show = g
                    }
                    r(o), e.fsMediaquery("bind", o.rawGuid, o.mq, {
                        enter: function() {
                            a.call(o.$el, o)
                        },
                        leave: function() {
                            i.call(o.$el, o)
                        }
                    }), n(), o.carouselClasses.push(I.enabled), o.carouselClasses.push(I.animated)
                },
                _destruct: function(t) {
                    A.clearTimer(t.autoTimer), A.clearTimer(t.resizeTimer), i.call(this, t), e.fsMediaquery("unbind", t.rawGuid), t.id !== t.ariaId && this.removeAttr("id"), t.$controlItems.removeClass([P.control, I.control_previous, P.control_next, P.visible].join(" ")).off(q.namespace), t.$images.off(q.namespace), t.$canister.fsTouch("destroy"), t.$items.removeClass([I.item, I.visible, P.item_previous, P.item_next].join(" ")).unwrap().unwrap().unwrap().unwrap(), t.controls && !t.customControls && t.$controls.remove(), t.customControls && t.$controls.removeClass([I.controls, I.controls_custom, I.visible].join(" ")), t.pagination && !t.customPagination && t.$pagination.remove(), t.customPagination && t.$pagination.html("").removeClass([I.pagination, I.visible].join(" ")), this.removeClass(t.carouselClasses.join(" ")), n()
                },
                _resize: function(e) {
                    A.iterate.call(L, o)
                },
                disable: i,
                enable: a,
                jump: l,
                previous: c,
                next: d,
                jumpPage: l,
                previousPage: c,
                nextPage: d,
                jumpItem: function(e, t, n, i, a) {
                    if (e.enabled) {
                        A.clearTimer(e.autoTimer);
                        var o = e.$items.eq(t - 1);
                        void 0 === a && (a = !0);
                        for (var r = 0; r < e.pageCount; r++)
                            if (e.pages[r].$items.is(o)) {
                                g(e, r, a, n, i);
                                break
                            }
                    }
                },
                reset: function(e) {
                    e.enabled && s.call(this, e, !1)
                },
                resize: o,
                update: s,
                panStart: function(e, t) {
                    if (A.clearTimer(e.autoTimer), !e.single) {
                        if (e.rtl && (t *= -1), e.useMargin) e.leftPosition = parseInt(e.$canister.css("marginLeft"));
                        else {
                            var n = e.$canister.css(D).split(",");
                            e.leftPosition = parseInt(n[4])
                        }
                        e.$canister.css(O, "none"), x({
                            data: e,
                            deltaX: e.pageWidth * t
                        }, !0)
                    }
                    e.isTouching = !0
                },
                pan: function(e, t) {
                    if (!e.single) {
                        e.rtl && (t *= -1);
                        var n = e.pageWidth * t;
                        e.touchLeft = W(e, e.leftPosition + n), e.useMargin ? e.$canister.css({
                            marginLeft: e.touchLeft
                        }) : e.$canister.css(D, "translateX(" + e.touchLeft + "px)")
                    }
                },
                panEnd: function(e, t) {
                    k(e, t)
                },
                swipe: function(e, t) {
                    C({
                        data: e,
                        directionX: t
                    }, !0)
                }
            }
        }),
        M = S.namespace,
        E = S.namespaceClean,
        P = S.classes,
        I = P.raw,
        q = S.events,
        A = S.functions,
        L = [],
        D = t.transform,
        O = t.transition
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t) {
        var n = t.data;
        e(t.target).is(n.$el) || (t.preventDefault(), n.$el.trigger("click"))
    }

    function i(e) {
        var t = e.data,
            n = t.$el.is(":disabled"),
            i = t.$el.is(":checked");
        n || (t.radio ? i && a(e) : i ? a(e) : o(e))
    }

    function a(t) {
        t.data.radio && e('input[name="' + t.data.group + '"]').not(t.data.$el).trigger("deselect"), t.data.$el.trigger(u.focus), t.data.$classable.addClass(d.checked)
    }

    function o(e) {
        e.data.$classable.removeClass(d.checked)
    }

    function r(e) {
        e.data.$classable.addClass(d.focus)
    }

    function s(e) {
        e.data.$classable.removeClass(d.focus)
    }
    var l = t.Plugin("checkbox", {
            widget: !0,
            defaults: {
                customClass: "",
                toggle: !1,
                labels: {
                    on: "ON",
                    off: "OFF"
                },
                theme: "fs-light"
            },
            classes: ["element_placeholder", "label", "marker", "flag", "radio", "focus", "checked", "disabled", "toggle", "state", "state_on", "state_off"],
            methods: {
                _construct: function(t) {
                    var a = this.closest("label"),
                        l = a.length ? a.eq(0) : e("label[for=" + this.attr("id") + "]"),
                        p = [d.base, t.theme, t.customClass].join(" "),
                        f = [d.label, t.theme, t.customClass].join(" "),
                        h = "";
                    t.radio = "radio" === this.attr("type"), t.group = this.attr("name"), h += '<div class="' + d.marker + '" aria-hidden="true">', h += '<div class="' + d.flag + '"></div>', t.toggle && (p += " " + d.toggle, f += " " + d.toggle, h += '<span class="' + [d.state, d.state_on].join(" ") + '">' + t.labels.on + "</span>", h += '<span class="' + [d.state, d.state_off].join(" ") + '">' + t.labels.off + "</span>"), t.radio && (p += " " + d.radio, f += " " + d.radio), h += "</div>", t.$placeholder = e('<span class="' + d.element_placeholder + '"></span>'), this.before(t.$placeholder), t.labelParent = l.find(this).length, t.labelClass = f, l.addClass(f), t.labelParent ? l.wrap('<div class="' + p + '"></div>').before(h) : this.before('<div class=" ' + p + '">' + h + "</div>"), t.$checkbox = t.labelParent ? l.parents(c.base) : this.prev(c.base), t.$marker = t.$checkbox.find(c.marker), t.$states = t.$checkbox.find(c.state), t.$label = l, t.$classable = e().add(t.$checkbox).add(t.$label), this.is(":checked") && t.$classable.addClass(d.checked), this.is(":disabled") && t.$classable.addClass(d.disabled), this.appendTo(t.$marker), this.on(u.focus, t, r).on(u.blur, t, s).on(u.change, t, i).on(u.click, t, n).on(u.deselect, t, o), t.$checkbox.on(u.click, t, n)
                },
                _destruct: function(e) {
                    e.$checkbox.off(u.namespace), e.$marker.remove(), e.$states.remove(), e.$label.removeClass(e.labelClass), e.labelParent ? e.$label.unwrap() : this.unwrap(), e.$placeholder.before(this), e.$placeholder.remove(), this.off(u.namespace)
                },
                enable: function(e) {
                    this.prop("disabled", !1), e.$classable.removeClass(d.disabled)
                },
                disable: function(e) {
                    this.prop("disabled", !0), e.$classable.addClass(d.disabled)
                },
                update: function(e) {
                    var t = e.$el.is(":disabled"),
                        n = e.$el.is(":checked");
                    t || (n ? a({
                        data: e
                    }) : o({
                        data: e
                    }))
                }
            },
            events: {
                deselect: "deselect"
            }
        }),
        c = l.classes,
        d = c.raw,
        u = l.events;
    l.functions
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        h = f.height(), p.iterate.call(v, r)
    }

    function i() {
        v = e(c.base), n()
    }

    function a() {
        p.iterate.call(v, s)
    }

    function o(e) {
        if (e.hasParent) {
            var t = e.$parent.scrollTop();
            t !== e.parentScroll && (s(e), e.parentScroll = t)
        }
    }

    function r(e) {
        if (e.initialized) {
            switch (e.parentHeight = e.hasParent ? e.$parent.outerHeight(!1) : h, e.windowIntersect) {
                case "top":
                    e.windowCheck = 0 - e.offset;
                    break;
                case "middle":
                case "center":
                    e.windowCheck = e.parentHeight / 2 - e.offset;
                    break;
                case "bottom":
                    e.windowCheck = e.parentHeight - e.offset
            }
            switch (e.elOffset = e.$target.offset(), e.elIntersect) {
                case "top":
                    e.elCheck = e.elOffset.top;
                    break;
                case "middle":
                    e.elCheck = e.elOffset.top + e.$target.outerHeight() / 2;
                    break;
                case "bottom":
                    e.elCheck = e.elOffset.top + e.$target.outerHeight()
            }
            if (e.hasParent) {
                var t = e.$parent.offset();
                e.elCheck -= t.top
            }
            s(e)
        }
    }

    function s(e) {
        e.initialized && (e.windowCheck + (e.hasParent ? e.parentScroll : g) >= e.elCheck ? (e.active || e.$el.trigger(u.activate), e.active = !0, e.$el.addClass(d.active)) : e.reverse && (e.active && e.$el.trigger(u.deactivate), e.active = !1, e.$el.removeClass(d.active)))
    }
    var l = t.Plugin("checkpoint", {
            widget: !0,
            defaults: {
                intersect: "bottom-top",
                offset: 0,
                reverse: !1
            },
            classes: ["active"],
            events: {
                activate: "activate",
                deactivate: "deactivate"
            },
            methods: {
                _construct: function(t) {
                    t.initialized = !1;
                    var n = e(t.$el.data("checkpoint-parent")),
                        i = e(t.$el.data("checkpoint-container")),
                        a = t.$el.data("checkpoint-intersect"),
                        o = t.$el.data("checkpoint-offset");
                    a && (t.intersect = a), o && (t.offset = o);
                    var s = t.intersect.split("-");
                    t.windowIntersect = s[0], t.elIntersect = s[1], t.visible = !1, t.$target = i.length ? i : t.$el, t.hasParent = n.length > 0, t.$parent = n;
                    var l = t.$target.find("img");
                    l.length && l.on(u.load, t, r), t.$el.addClass(d.base), t.initialized = !0
                },
                _postConstruct: function(e) {
                    i(), n()
                },
                _destruct: function(e) {
                    e.$el.removeClass(d.base), i()
                },
                _resize: n,
                _raf: function() {
                    (g = f.scrollTop()) < 0 && (g = 0), g !== m && (a(), m = g), p.iterate.call(v, o)
                },
                resize: r
            }
        }),
        c = (l.namespace, l.classes),
        d = c.raw,
        u = l.events,
        p = l.functions,
        f = (t.window, t.$window),
        h = 0,
        g = 0,
        m = 0,
        v = []
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t, n, i) {
        var a = !1,
            o = new Date;
        i.expires && "number" === e.type(i.expires) && (o.setTime(o.getTime() + i.expires), a = o.toGMTString());
        var s = i.domain ? "; domain=" + i.domain : "",
            l = a ? "; expires=" + a : "",
            c = a ? "; max-age=" + i.expires / 1e3 : "",
            d = i.path ? "; path=" + i.path : "",
            u = i.secure ? "; secure" : "";
        r.cookie = t + "=" + n + l + c + s + d + u
    }

    function i(e) {
        for (var t = e + "=", n = r.cookie.split(";"), i = 0; i < n.length; i++) {
            for (var a = n[i];
                " " === a.charAt(0);) a = a.substring(1, a.length);
            if (0 === a.indexOf(t)) return a.substring(t.length, a.length)
        }
        return null
    }

    function a(t, i) {
        n(t, "", e.extend({}, i, {
            expires: -6048e5
        }))
    }
    t.Plugin("cookie", {
        utilities: {
            _delegate: function(t, r, s) {
                if ("object" === e.type(t)) o = e.extend(o, t);
                else if (s = e.extend({}, o, s || {}), "undefined" !== e.type(t)) {
                    if ("undefined" === e.type(r)) return i(t);
                    null === r ? a(t, s) : n(t, r, s)
                }
                return null
            }
        }
    });
    var o = {
            domain: null,
            expires: 6048e5,
            path: null,
            secure: null
        },
        r = t.document
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./scrollbar", "./touch"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t) {
        for (var n = "", i = 0, a = t.$allOptions.length; i < a; i++) {
            var o = t.$allOptions.eq(i),
                r = [];
            if ("OPTGROUP" === o[0].tagName) r.push(x.group), o.prop("disabled") && r.push(x.disabled), n += '<span class="' + r.join(" ") + '">' + o.attr("label") + "</span>";
            else {
                var s = o.val(),
                    l = o.data("label"),
                    c = t.links ? "a" : 'button type="button"';
                o.attr("value") || o.attr("value", s), r.push(x.item), o.hasClass(x.item_placeholder) && (r.push(x.item_placeholder), c = "span"), o.prop("selected") && r.push(x.item_selected), o.prop("disabled") && r.push(x.item_disabled), n += "<" + c + ' class="' + r.join(" ") + '"', t.links ? "span" === c ? n += ' aria-hidden="true"' : (n += ' href="' + s + '"', t.external && (n += ' target="_blank"')) : n += ' data-value="' + s + '"', n += ' role="option"', o.prop("selected") && (n += ' "aria-selected"="true"'), n += ">", n += l || C.decodeEntities(b(o.text(), t.trim)), n += "</" + c + ">"
            }
        }
        t.$items = t.$wrapper.html(e.parseHTML(n)).find(w.item)
    }

    function i(e) {
        C.killEvent(e);
        var t = e.data;
        t.disabled || t.useNative || (t.closed ? o(t) : r(t)), a(t)
    }

    function a(t) {
        e(w.base).not(t.$dropdown).trigger($.close, [t])
    }

    function o(e) {
        if (e.closed) {
            var t = T.height(),
                n = e.$wrapper.outerHeight(!0);
            e.$dropdown[0].getBoundingClientRect().bottom + n > t - e.bottomEdge && e.$dropdown.addClass(x.bottom), H.on($.click + e.dotGuid, ":not(" + w.options + ")", e, s), e.$dropdown.trigger($.focusIn), e.$dropdown.addClass(x.open), g(e), e.closed = !1
        }
    }

    function r(e) {
        e && !e.closed && (H.off($.click + e.dotGuid), e.$dropdown.removeClass([x.open, x.bottom].join(" ")), e.closed = !0)
    }

    function s(t) {
        C.killEvent(t);
        var n = t.data;
        n && 0 === e(t.currentTarget).parents(w.base).length && (r(n), n.$dropdown.trigger($.focusOut))
    }

    function l(e) {
        var t = e.data;
        t && (r(t), t.$dropdown.trigger($.focusOut))
    }

    function c(t) {
        var n = e(this),
            i = t.data;
        if (C.killEvent(t), !i.disabled) {
            var a = i.$items.index(n);
            i.focusIndex = a, i.$wrapper.is(":visible") && (h(a, i, t.shiftKey, t.metaKey || t.ctrlKey), m(i)), i.multiple || r(i), i.$dropdown.trigger($.focus)
        }
    }

    function d(t, n) {
        e(this);
        var i = t.data;
        if (!n && !i.multiple) {
            var a = i.$options.index(i.$options.filter(":selected"));
            i.focusIndex = a, h(a, i), m(i, !0)
        }
    }

    function u(t) {
        C.killEvent(t), e(t.currentTarget);
        var n = t.data;
        n.disabled || n.multiple || n.focused || (a(n), n.focused = !0, n.focusIndex = n.index, n.input = "", n.$dropdown.addClass(x.focus).on($.keyDown + n.dotGuid, n, f))
    }

    function p(t) {
        C.killEvent(t), e(t.currentTarget);
        var n = t.data;
        n.focused && n.closed && (n.focused = !1, n.$dropdown.removeClass(x.focus).off($.keyDown + n.dotGuid), n.multiple || (r(n), n.index !== n.focusIndex && (m(n), n.focusIndex = n.index)))
    }

    function f(n) {
        var i = n.data;
        if (i.keyTimer = C.startTimer(i.keyTimer, 1e3, function() {
                i.input = ""
            }), 13 === n.keyCode) i.closed || (r(i), h(i.index, i)), m(i);
        else if (!(9 === n.keyCode || n.metaKey || n.altKey || n.ctrlKey || n.shiftKey)) {
            C.killEvent(n);
            var a = i.$items.length - 1,
                o = i.index < 0 ? 0 : i.index;
            if (e.inArray(n.keyCode, t.isFirefox ? [38, 40, 37, 39] : [38, 40]) > -1)(o += 38 === n.keyCode || t.isFirefox && 37 === n.keyCode ? -1 : 1) < 0 && (o = 0), o > a && (o = a);
            else {
                var s, l = String.fromCharCode(n.keyCode).toUpperCase();
                for (i.input += l, s = i.index + 1; s <= a; s++)
                    if (i.$options.eq(s).text().substr(0, i.input.length).toUpperCase() === i.input) {
                        o = s;
                        break
                    }
                if (o < 0 || o === i.index)
                    for (s = 0; s <= a; s++)
                        if (i.$options.eq(s).text().substr(0, i.input.length).toUpperCase() === i.input) {
                            o = s;
                            break
                        }
            }
            o >= 0 && (h(o, i), g(i))
        }
    }

    function h(e, t, n, i) {
        var a = t.$items.eq(e),
            o = t.$options.eq(e),
            r = a.hasClass(x.item_selected);
        if (!a.hasClass(x.item_disabled))
            if (t.multiple)
                if (t.useNative) r ? (o.prop("selected", null).attr("aria-selected", null), a.removeClass(x.item_selected)) : (o.prop("selected", !0).attr("aria-selected", !0), a.addClass(x.item_selected));
                else if (n && !1 !== t.lastIndex) {
            var s = t.lastIndex > e ? e : t.lastIndex,
                l = (t.lastIndex > e ? t.lastIndex : e) + 1;
            t.$options.prop("selected", null).attr("aria-selected", null), t.$items.filter(w.item_selected).removeClass(x.item_selected), t.$options.slice(s, l).not("[disabled]").prop("selected", !0), t.$items.slice(s, l).not(w.item_disabled).addClass(x.item_selected)
        } else i || t.selectMultiple ? (r ? (o.prop("selected", null).attr("aria-selected", null), a.removeClass(x.item_selected)) : (o.prop("selected", !0).attr("aria-selected", !0), a.addClass(x.item_selected)), t.lastIndex = e) : (t.$options.prop("selected", null).attr("aria-selected", null), t.$items.filter(w.item_selected).removeClass(x.item_selected), o.prop("selected", !0).attr("aria-selected", !0), a.addClass(x.item_selected), t.lastIndex = e);
        else if (e > -1 && e < t.$items.length) {
            if (e !== t.index) {
                var c = o.data("label") || a.html();
                t.$selected.html(c).removeClass(w.item_placeholder), t.$items.filter(w.item_selected).removeClass(x.item_selected), t.$el[0].selectedIndex = e, a.addClass(x.item_selected), t.index = e
            }
        } else "" !== t.label && t.$selected.html(t.label)
    }

    function g(t) {
        var n = t.$items.eq(t.index),
            i = t.index >= 0 && !n.hasClass(x.item_placeholder) ? n.position() : {
                left: 0,
                top: 0
            },
            a = (t.$wrapper.outerHeight() - n.outerHeight()) / 2;
        void 0 !== e.fn.fsScrollbar ? t.$wrapper.fsScrollbar("resize").fsScrollbar("scroll", t.$wrapper.find(".fs-scrollbar-content").scrollTop() + i.top) : t.$wrapper.scrollTop(t.$wrapper.scrollTop() + i.top - a)
    }

    function m(e, t) {
        e.links ? v(e) : t || e.$el.trigger($.raw.change, [!0])
    }

    function v(e) {
        var t = e.$el.val();
        e.external ? k.open(t) : k.location.href = t
    }

    function b(e, t) {
        return 0 === t ? e : e.length > t ? e.substring(0, t) + "..." : e
    }
    var y = t.Plugin("dropdown", {
            widget: !0,
            defaults: {
                bottomEdge: 0,
                cover: !1,
                customClass: "",
                label: "",
                external: !1,
                links: !1,
                mobile: !1,
                native: !1,
                theme: "fs-light",
                trim: 0,
                selectMultiple: !1
            },
            methods: {
                _construct: function(a) {
                    a.multiple = this.prop("multiple"), a.disabled = this.prop("disabled") || this.is("[readonly]"), a.lastIndex = !1, a.native = a.mobile || a.native, a.useNative = a.native || t.isMobile, a.multiple ? a.links = !1 : a.external && (a.links = !0);
                    var o = this.find("[selected]").not(":disabled"),
                        r = this.find(":selected").not(":disabled"),
                        s = r.text(),
                        f = this.find("option").index(r);
                    a.multiple || "" === a.label || o.length ? a.label = "" : (r = this.prepend('<option value="" class="' + x.item_placeholder + '" selected>' + a.label + "</option>"), s = a.label, f = 0);
                    var g = this.find("option, optgroup"),
                        m = g.filter("option"),
                        v = e('[for="' + this.attr("id") + '"]');
                    a.tabIndex = this[0].tabIndex, this[0].tabIndex = -1, v.length && (v[0].tabIndex = -1);
                    var y = [x.base, a.theme, a.customClass];
                    a.useNative ? y.push(x.native) : a.cover && y.push(x.cover), a.multiple && y.push(x.multiple), a.disabled && y.push(x.disabled), a.id = this.attr("id"), a.id ? a.ariaId = a.id : a.ariaId = a.rawGuid, a.ariaId += "-dropdown", a.selectedAriaId = a.ariaId + "-selected";
                    var C = "",
                        k = "";
                    C += '<div class="' + y.join(" ") + '"id="' + a.ariaId + '" tabindex="' + a.tabIndex + '" role="listbox"', a.multiple ? C += ' aria-label="multi select"' : C += ' aria-haspopup="true" aria-live="polite" aria-labelledby="' + a.selectedAriaId + '"', C += "></div>", a.multiple || (k += '<button type="button" class="' + x.selected + '" id="' + a.selectedAriaId + '" tabindex="-1">', k += e("<span></span>").text(b(s, a.trim)).html(), k += "</button>"), k += '<div class="' + x.options + '">', k += "</div>", this.wrap(C).after(k), a.$dropdown = this.parent(w.base), a.$label = v, a.$allOptions = g, a.$options = m, a.$selected = a.$dropdown.find(w.selected), a.$wrapper = a.$dropdown.find(w.options), a.$placeholder = a.$dropdown.find(w.placeholder), a.index = -1, a.closed = !0, a.focused = !1, n(a), a.multiple || h(f, a), void 0 !== e.fn.fsScrollbar && a.$wrapper.fsScrollbar({
                        theme: a.theme
                    }).find(".fs-scrollbar-content").attr("tabindex", null), a.$dropdown.on($.click, a, i), a.$selected.on($.click, a, i), a.$dropdown.on($.click, w.item, a, c).on($.close, a, l), this.on($.change, a, d), a.useNative || (this.on($.focusIn, a, function(e) {
                        e.data.$dropdown.trigger($.raw.focus)
                    }), a.$dropdown.on($.focusIn, a, u).on($.focusOut, a, p))
                },
                _destruct: function(t) {
                    t.$dropdown.hasClass(x.open) && t.$selected.trigger($.click), void 0 !== e.fn.fsScrollbar && t.$wrapper.fsScrollbar("destroy"), t.$el[0].tabIndex = t.tabIndex, t.$label.length && (t.$label[0].tabIndex = t.tabIndex), t.$dropdown.off($.namespace), t.$options.off($.namespace), t.$placeholder.remove(), t.$selected.remove(), t.$wrapper.remove(), t.$el.off($.namespace).show().unwrap()
                },
                disable: function(e, t) {
                    if (void 0 !== t) {
                        var n = e.$items.index(e.$items.filter("[data-value=" + t + "]"));
                        e.$items.eq(n).addClass(x.item_disabled), e.$options.eq(n).prop("disabled", !0)
                    } else e.$dropdown.hasClass(x.open) && e.$selected.trigger($.click), e.$dropdown.addClass(x.disabled), e.$el.prop("disabled", !0), e.disabled = !0
                },
                enable: function(e, t) {
                    if (void 0 !== t) {
                        var n = e.$items.index(e.$items.filter("[data-value=" + t + "]"));
                        e.$items.eq(n).removeClass(x.item_disabled), e.$options.eq(n).prop("disabled", !1)
                    } else e.$dropdown.removeClass(x.disabled), e.$el.prop("disabled", !1), e.disabled = !1
                },
                update: function(t) {
                    void 0 !== e.fn.fsScrollbar && t.$wrapper.fsScrollbar("destroy");
                    var i = t.index;
                    t.$allOptions = t.$el.find("option, optgroup"), t.$options = t.$allOptions.filter("option"), t.index = -1, i = t.$options.index(t.$options.filter(":selected")), n(t), t.multiple || h(i, t), void 0 !== e.fn.fsScrollbar && t.$wrapper.fsScrollbar({
                        theme: t.theme
                    }).find(".fs-scrollbar-content").attr("tabindex", null)
                },
                open: o,
                close: r
            },
            classes: ["cover", "bottom", "multiple", "mobile", "native", "open", "disabled", "focus", "selected", "options", "group", "item", "item_disabled", "item_selected", "item_placeholder"],
            events: {
                close: "close"
            }
        }),
        w = y.classes,
        x = w.raw,
        $ = y.events,
        C = y.functions,
        k = t.window,
        T = t.$window,
        H = (t.document, null);
    t.Ready(function() {
        H = t.$body
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        u = e(l.element)
    }

    function i(e) {
        if (e.data && (e = e.data), e.enabled)
            for (var t, n, i, a = 0; a < e.target.length; a++) {
                t = 0, n = 0, (i = e.$el.find(e.target[a])).css(e.property, "");
                for (var o = 0; o < i.length; o++)(n = i.eq(o)[e.type]()) > t && (t = n);
                i.css(e.property, t)
            }
    }

    function a(e) {
        e.enabled && (e.enabled = !1, r(e))
    }

    function o(e) {
        if (!e.enabled) {
            e.enabled = !0;
            var t = e.$el.find("img");
            t.length && t.on(c.load, e, i), i(e)
        }
    }

    function r(e) {
        for (var t = 0; t < e.target.length; t++) e.$el.find(e.target[t]).css(e.property, "");
        e.$el.find("img").off(c.namespace)
    }
    var s = t.Plugin("equalize", {
            widget: !0,
            priority: 5,
            defaults: {
                maxWidth: 1 / 0,
                minWidth: "0px",
                property: "height",
                target: null
            },
            methods: {
                _construct: function(t) {
                    t.maxWidth = t.maxWidth === 1 / 0 ? "100000px" : t.maxWidth, t.mq = "(min-width:" + t.minWidth + ") and (max-width:" + t.maxWidth + ")", t.type = "height" === t.property ? "outerHeight" : "outerWidth", t.target ? e.isArray(t.target) || (t.target = [t.target]) : t.target = ["> *"], n(), e.fsMediaquery("bind", t.rawGuid, t.mq, {
                        enter: function() {
                            o.call(t.$el, t)
                        },
                        leave: function() {
                            a.call(t.$el, t)
                        }
                    })
                },
                _destruct: function(t) {
                    r(t), e.fsMediaquery("unbind", t.rawGuid), n()
                },
                _resize: function(e) {
                    d.iterate.call(u, i)
                },
                resize: i
            }
        }),
        l = s.classes,
        c = (l.raw, s.events),
        d = s.functions,
        u = []
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./touch", "./transition", "./viewer"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(n) {
        if (!Y) {
            var i = n.data;
            !0 === i.overlay && (i.mobile = !0), (Y = e.extend({}, {
                visible: !1,
                gallery: {
                    active: !1
                },
                isMobile: t.isMobile || i.mobile,
                isTouch: t.support.touch,
                isAnimating: !0,
                isZooming: !1,
                oldContentHeight: 0,
                oldContentWidth: 0,
                metaHeight: 0,
                thumbnailHeight: 0,
                captionOpen: !1,
                thumbnailsOpen: !1,
                tapTimer: null
            }, i)).isViewer = Y.isMobile && i.viewer && void 0 !== e.fn.fsViewer;
            var o = i.$el,
                r = i.$object,
                l = o && o[0].href ? o[0].href || "" : "",
                d = o && o[0].hash ? o[0].hash || "" : "",
                p = (l.toLowerCase().split(".").pop().split(/\#|\?/), o ? o.data(A + "-type") : ""),
                h = "image" === p || l.match(i.fileTypes) || "data:image" === l.substr(0, 10),
                g = P(l),
                v = "url" === p || !h && !g && "http" === l.substr(0, 4) && !d,
                b = "element" === p || !h && !g && !v && "#" === d.substr(0, 1),
                x = void 0 !== r;
            if (b && (l = d), !(h || g || v || b || x)) return void(Y = null);
            if (N.killEvent(n), Y.margin *= 2, Y.type = h ? "image" : g ? "video" : "element", h || g) {
                var $ = o.data(A + "-gallery");
                $ && (Y.gallery.active = !0, Y.gallery.id = $, Y.gallery.$items = e("a[data-lightbox-gallery= " + Y.gallery.id + "], a[rel= " + Y.gallery.id + "]"), Y.gallery.index = Y.gallery.$items.index(Y.$el), Y.gallery.total = Y.gallery.$items.length - 1)
            }
            Y.thumbnails && (h || g) && Y.gallery.active || (Y.thumbnails = !1);
            var C = "";
            Y.isMobile || (C += '<div class="' + [O.overlay, Y.theme, Y.customClass].join(" ") + '"></div>');
            var j = [O.base, O.loading, O.animating, Y.theme, Y.customClass];
            if (Y.fixed && j.push(O.fixed), Y.isMobile && j.push(O.mobile), Y.isTouch && j.push(O.touch), v && j.push(O.iframed), (b || x) && j.push(O.inline), Y.thumbnails && j.push(O.thumbnailed), Y.labels.lightbox = Y.labels.lightbox.replace("{guid}", i.numGuid), C += '<div class="' + j.join(" ") + '" role="dialog" aria-label="' + Y.labels.lightbox + '" tabindex="-1">', C += '<button type="button" class="' + O.close + '">' + Y.labels.close + "</button>", C += '<span class="' + O.loading_icon + '"></span>', C += '<div class="' + O.container + '">', Y.gallery.active && Y.thumbnails) {
                C += '<div class="' + [O.thumbnails] + '">', C += '<div class="' + [O.thumbnail_container] + '">';
                for (var S, M, E = 0, q = Y.gallery.$items.length; E < q; E++)(M = (S = Y.gallery.$items.eq(E)).data("lightbox-thumbnail")) || (M = S.find("img").attr("src")), C += '<button class="' + [O.thumbnail_item] + '">', C += '<img src="' + M + '" alt="">', C += "</button>";
                C += "</div></div>"
            }
            C += '<div class="' + O.content + '"></div>', (h || g) && (C += '<div class="' + O.tools + '">', C += '<div class="' + O.controls + '">', Y.gallery.active && (C += '<button type="button" class="' + [O.control, O.control_previous].join(" ") + '">' + Y.labels.previous + "</button>", C += '<button type="button" class="' + [O.control, O.control_next].join(" ") + '">' + Y.labels.next + "</button>"), Y.isMobile && Y.isTouch && (C += '<button type="button" class="' + [O.toggle, O.caption_toggle].join(" ") + '">' + Y.labels.captionClosed + "</button>", Y.gallery.active && Y.thumbnails && (C += '<button type="button" class="' + [O.toggle, O.thumbnail_toggle].join(" ") + '">' + Y.labels.thumbnailsClosed + "</button>")), C += "</div>", C += '<div class="' + O.meta + '">', C += '<div class="' + O.meta_content + '">', Y.gallery.active && (C += '<p class="' + O.position + '"', Y.gallery.total < 1 && (C += ' style="display: none;"'), C += ">", C += '<span class="' + O.position_current + '">' + (Y.gallery.index + 1) + "</span> ", C += Y.labels.count, C += ' <span class="' + O.position_total + '">' + (Y.gallery.total + 1) + "</span>", C += "</p>"), C += '<div class="' + O.caption + '">', C += Y.formatter.call(o, i), C += "</div></div></div>", C += "</div>"), C += "</div></div>", X.append(C), Y.$overlay = e(D.overlay), Y.$lightbox = e(D.base), Y.$close = e(D.close), Y.$container = e(D.container), Y.$content = e(D.content), Y.$tools = e(D.tools), Y.$meta = e(D.meta), Y.$metaContent = e(D.meta_content), Y.$position = e(D.position), Y.$caption = e(D.caption), Y.$controlBox = e(D.controls), Y.$controls = e(D.control), Y.$thumbnails = e(D.thumbnails), Y.$thumbnailContainer = e(D.thumbnail_container), Y.$thumbnailItems = e(D.thumbnail_item), Y.isMobile ? (Y.paddingVertical = Y.$close.outerHeight(), Y.paddingHorizontal = 0, Y.mobilePaddingVertical = parseInt(Y.$content.css("paddingTop"), 10) + parseInt(Y.$content.css("paddingBottom"), 10), Y.mobilePaddingHorizontal = parseInt(Y.$content.css("paddingLeft"), 10) + parseInt(Y.$content.css("paddingRight"), 10)) : (Y.paddingVertical = parseInt(Y.$lightbox.css("paddingTop"), 10) + parseInt(Y.$lightbox.css("paddingBottom"), 10), Y.paddingHorizontal = parseInt(Y.$lightbox.css("paddingLeft"), 10) + parseInt(Y.$lightbox.css("paddingRight"), 10), Y.mobilePaddingVertical = 0, Y.mobilePaddingHorizontal = 0), Y.contentHeight = Y.$lightbox.outerHeight() - Y.paddingVertical, Y.contentWidth = Y.$lightbox.outerWidth() - Y.paddingHorizontal, Y.controlHeight = Y.$controls.outerHeight(), s(), Y.gallery.active && (Y.$lightbox.addClass(O.has_controls), k()), R.on(z.keyDown, T), X.on(z.click, [D.overlay, D.close].join(", "), a).on([z.focus, z.focusIn].join(" "), I), Y.gallery.active && Y.$lightbox.on(z.click, D.control, y), Y.thumbnails && Y.$lightbox.on(z.click, D.thumbnail_item, w), Y.isMobile && Y.isTouch && Y.$lightbox.on(z.click, D.caption_toggle, c).on(z.click, D.thumbnail_toggle, u), Y.$lightbox.fsTransition({
                property: "opacity"
            }, function() {
                h ? f(l) : g ? m(l) : v ? W(l) : b ? H(l) : x && _(Y.$object)
            }).addClass(O.open), Y.$overlay.addClass(O.open)
        }
    }

    function i(e) {
        "object" != typeof e && (Y.targetHeight = arguments[0], Y.targetWidth = arguments[1]), "element" === Y.type ? S(Y.$content.find("> :first-child")) : "image" === Y.type ? h() : "video" === Y.type && v(), r()
    }

    function a(e) {
        N.killEvent(e), Y && (Y.$lightbox.fsTransition("destroy"), Y.$content.fsTransition("destroy"), Y.$lightbox.addClass(O.animating).fsTransition({
            property: "opacity"
        }, function(e) {
            void 0 !== Y.$inlineTarget && Y.$inlineTarget.length && j(), Y.isViewer && Y.$imageContainer && Y.$imageContainer.length && Y.$imageContainer.fsViewer("destroy"), Y.$lightbox.off(z.namespace), Y.$container.off(z.namespace), R.off(z.keyDown), X.off(z.namespace), X.off(z.namespace), Y.$overlay.remove(), Y.$lightbox.remove(), void 0 !== Y.$el && Y.$el && Y.$el.length && Y.$el.focus(), Y = null, R.trigger(z.close)
        }), Y.$lightbox.removeClass(O.open), Y.$overlay.removeClass(O.open), Y.isMobile && (B.removeClass(O.lock), N.unlockViewport(A)))
    }

    function o() {
        var e = l();
        Y.isMobile || Y.duration, Y.isMobile ? N.lockViewport(A) : Y.$controls.css({
            marginTop: (Y.contentHeight - Y.controlHeight - Y.metaHeight + Y.thumbnailHeight) / 2
        }), "" === Y.$caption.html() ? (Y.$caption.hide(), Y.$lightbox.removeClass(O.has_caption), Y.gallery.active || Y.$tools.hide()) : (Y.$caption.show(), Y.$lightbox.addClass(O.has_caption)), Y.$lightbox.fsTransition({
            property: Y.contentHeight !== Y.oldContentHeight ? "height" : "width"
        }, function() {
            Y.$content.fsTransition({
                property: "opacity"
            }, function() {
                Y.$lightbox.removeClass(O.animating), Y.isAnimating = !1
            }), Y.$lightbox.removeClass(O.loading).addClass(O.ready), Y.visible = !0, R.trigger(z.open), Y.gallery.active && (b(), x(), $()), Y.$lightbox.focus()
        }), Y.isMobile || Y.$lightbox.css({
            height: Y.contentHeight + Y.paddingVertical,
            width: Y.contentWidth + Y.paddingHorizontal,
            top: Y.fixed ? 0 : e.top
        });
        var t = Y.oldContentHeight !== Y.contentHeight || Y.oldContentWidth !== Y.contentWidth;
        !Y.isMobile && t || Y.$lightbox.fsTransition("resolve"), Y.oldContentHeight = Y.contentHeight, Y.oldContentWidth = Y.contentWidth, Y.isMobile && B.addClass(O.lock)
    }

    function r() {
        if (Y.visible && !Y.isMobile) {
            var e = l();
            Y.$controls.css({
                marginTop: (Y.contentHeight - Y.controlHeight - Y.metaHeight + Y.thumbnailHeight) / 2
            }), Y.$lightbox.css({
                height: Y.contentHeight + Y.paddingVertical,
                width: Y.contentWidth + Y.paddingHorizontal,
                top: Y.fixed ? 0 : e.top
            }), Y.oldContentHeight = Y.contentHeight, Y.oldContentWidth = Y.contentWidth
        }
    }

    function s() {
        var e = l();
        Y.$lightbox.css({
            top: Y.fixed ? 0 : e.top
        })
    }

    function l() {
        if (Y.isMobile) return {
            left: 0,
            top: 0
        };
        var e = {
            left: (t.windowWidth - Y.contentWidth - Y.paddingHorizontal) / 2,
            top: Y.top <= 0 ? (t.windowHeight - Y.contentHeight - Y.paddingVertical) / 2 : Y.top
        };
        return !0 !== Y.fixed && (e.top += R.scrollTop()), e
    }

    function c(e) {
        if (N.killEvent(e), Y.captionOpen) d();
        else {
            p();
            var t = parseInt(Y.$metaContent.outerHeight(!0));
            t += parseInt(Y.$meta.css("padding-top")), t += parseInt(Y.$meta.css("padding-bottom")), Y.$meta.css({
                height: t
            }), Y.$lightbox.addClass(O.caption_open).find(D.caption_toggle).text(Y.labels.captionOpen), Y.captionOpen = !0
        }
    }

    function d() {
        Y.$lightbox.removeClass(O.caption_open).find(D.caption_toggle).text(Y.labels.captionClosed), Y.captionOpen = !1
    }

    function u(e) {
        N.killEvent(e), Y.thumbnailsOpen ? p() : (d(), Y.$lightbox.addClass(O.thumbnails_open).find(D.thumbnail_toggle).text(Y.labels.thumbnailsOpen), Y.thumbnailsOpen = !0)
    }

    function p() {
        Y.$lightbox.removeClass(O.thumbnails_open).find(D.thumbnail_toggle).text(Y.labels.thumbnailsClosed), Y.thumbnailsOpen = !1
    }

    function f(t) {
        Y.isViewer ? (Y.$imageContainer = e('<div class="' + O.image_container + '"><img></div>'), Y.$image = Y.$imageContainer.find("img"), Y.$image.attr("src", t).addClass(O.image), Y.$content.prepend(Y.$imageContainer), h(), Y.$imageContainer.one("loaded.viewer", function() {
            o()
        }).fsViewer({
            theme: Y.theme
        })) : (Y.$imageContainer = e('<div class="' + O.image_container + '"><img></div>'), Y.$image = Y.$imageContainer.find("img"), Y.$image.one(z.load, function() {
            var e = E(Y.$image);
            Y.naturalHeight = e.naturalHeight, Y.naturalWidth = e.naturalWidth, Y.retina && (Y.naturalHeight /= 2, Y.naturalWidth /= 2), Y.$content.prepend(Y.$imageContainer), h(), o()
        }).on(z.error, M).attr("src", t).addClass(O.image), (Y.$image[0].complete || 4 === Y.$image[0].readyState) && Y.$image.trigger(z.load))
    }

    function h() {
        if (Y.$image) {
            var e = 0;
            for (Y.windowHeight = Y.viewportHeight = t.windowHeight - Y.mobilePaddingVertical - Y.paddingVertical, Y.windowWidth = Y.viewportWidth = t.windowWidth - Y.mobilePaddingHorizontal - Y.paddingHorizontal, Y.contentHeight = 1 / 0, Y.contentWidth = 1 / 0, Y.imageMarginTop = 0, Y.imageMarginLeft = 0; Y.contentHeight > Y.viewportHeight && e < 2;) Y.imageHeight = 0 === e ? Y.naturalHeight : Y.$image.outerHeight(), Y.imageWidth = 0 === e ? Y.naturalWidth : Y.$image.outerWidth(), Y.metaHeight = 0 === e ? 0 : Y.metaHeight, Y.spacerHeight = 0 === e ? 0 : Y.spacerHeight, Y.thumbnailHeight = 0 === e ? 0 : Y.thumbnailHeight, 0 === e && (Y.ratioHorizontal = Y.imageHeight / Y.imageWidth, Y.ratioVertical = Y.imageWidth / Y.imageHeight, Y.isWide = Y.imageWidth > Y.imageHeight), Y.imageHeight < Y.minHeight && (Y.minHeight = Y.imageHeight), Y.imageWidth < Y.minWidth && (Y.minWidth = Y.imageWidth), Y.isMobile ? (Y.isTouch ? (Y.$controlBox.css({
                width: t.windowWidth
            }), Y.spacerHeight = Y.$controls.outerHeight(!0)) : (Y.$tools.css({
                width: t.windowWidth
            }), Y.spacerHeight = Y.$tools.outerHeight(!0)), Y.contentHeight = Y.viewportHeight, Y.contentWidth = Y.viewportWidth, Y.isTouch || Y.$content.css({
                height: Y.contentHeight - Y.spacerHeight
            }), Y.$thumbnails.length && (Y.spacerHeight += Y.$thumbnails.outerHeight(!0)), Y.spacerHeight += 10, g(), Y.imageMarginTop = (Y.contentHeight - Y.targetImageHeight - Y.spacerHeight) / 2, Y.imageMarginLeft = (Y.contentWidth - Y.targetImageWidth) / 2) : (0 === e && (Y.viewportHeight -= Y.margin + Y.paddingVertical, Y.viewportWidth -= Y.margin + Y.paddingHorizontal), Y.viewportHeight -= Y.metaHeight, Y.thumbnails && (Y.viewportHeight -= Y.thumbnailHeight), g(), Y.contentHeight = Y.targetImageHeight, Y.contentWidth = Y.targetImageWidth), Y.isMobile || Y.isTouch || Y.$meta.css({
                width: Y.contentWidth
            }), Y.$image.css({
                height: Y.targetImageHeight,
                width: Y.targetImageWidth,
                marginTop: Y.imageMarginTop,
                marginLeft: Y.imageMarginLeft
            }), Y.isMobile || (Y.metaHeight = Y.$meta.outerHeight(!0), Y.contentHeight += Y.metaHeight), Y.thumbnails && (Y.thumbnailHeight = Y.$thumbnails.outerHeight(!0), Y.contentHeight += Y.thumbnailHeight), e++
        }
    }

    function g() {
        var e = Y.isMobile ? Y.contentHeight - Y.spacerHeight : Y.viewportHeight,
            t = Y.isMobile ? Y.contentWidth : Y.viewportWidth;
        Y.isWide ? (Y.targetImageWidth = t, Y.targetImageHeight = Y.targetImageWidth * Y.ratioHorizontal, Y.targetImageHeight > e && (Y.targetImageHeight = e, Y.targetImageWidth = Y.targetImageHeight * Y.ratioVertical)) : (Y.targetImageHeight = e, Y.targetImageWidth = Y.targetImageHeight * Y.ratioVertical, Y.targetImageWidth > t && (Y.targetImageWidth = t, Y.targetImageHeight = Y.targetImageWidth * Y.ratioHorizontal)), (Y.targetImageWidth > Y.imageWidth || Y.targetImageHeight > Y.imageHeight) && (Y.targetImageHeight = Y.imageHeight, Y.targetImageWidth = Y.imageWidth), (Y.targetImageWidth < Y.minWidth || Y.targetImageHeight < Y.minHeight) && (Y.targetImageWidth < Y.minWidth ? (Y.targetImageWidth = Y.minWidth, Y.targetImageHeight = Y.targetImageWidth * Y.ratioHorizontal) : (Y.targetImageHeight = Y.minHeight, Y.targetImageWidth = Y.targetImageHeight * Y.ratioVertical))
    }

    function m(t) {
        var n = P(t),
            i = t.split("?"),
            a = "&origin=" + encodeURIComponent(window.location.protocol + "//" + window.location.hostname);
        n ? (i.length >= 2 && (n += "?" + i.slice(1)[0].trim()), Y.$videoWrapper = e('<div class="' + O.video_wrapper + '"></div>'), Y.$video = e('<iframe class="' + O.video + '" frameborder="0" seamless="seamless" allowfullscreen></iframe>'), Y.$video.attr("src", n + "&enablejsapi=1" + a).addClass(O.video).prependTo(Y.$videoWrapper), Y.$content.prepend(Y.$videoWrapper), v(), o()) : M()
    }

    function v() {
        Y.windowHeight = Y.viewportHeight = t.windowHeight - Y.mobilePaddingVertical - Y.paddingVertical, Y.windowWidth = Y.viewportWidth = t.windowWidth - Y.mobilePaddingHorizontal - Y.paddingHorizontal, Y.videoMarginTop = 0, Y.videoMarginLeft = 0, Y.isMobile ? (Y.isTouch ? (Y.$controlBox.css({
            width: t.windowWidth
        }), Y.spacerHeight = Y.$controls.outerHeight(!0) + 10) : (Y.$tools.css({
            width: t.windowWidth
        }), Y.spacerHeight = Y.$tools.outerHeight(!0), Y.spacerHeight += Y.$thumbnails.outerHeight(!0) + 10), Y.viewportHeight -= Y.spacerHeight, Y.targetVideoWidth = Y.viewportWidth, Y.targetVideoHeight = Y.targetVideoWidth * Y.videoRatio, Y.targetVideoHeight > Y.viewportHeight && (Y.targetVideoHeight = Y.viewportHeight, Y.targetVideoWidth = Y.targetVideoHeight / Y.videoRatio), Y.videoMarginTop = (Y.viewportHeight - Y.targetVideoHeight) / 2, Y.videoMarginLeft = (Y.viewportWidth - Y.targetVideoWidth) / 2) : (Y.viewportHeight = Y.windowHeight - Y.margin, Y.viewportWidth = Y.windowWidth - Y.margin, Y.targetVideoWidth = Y.videoWidth > Y.viewportWidth ? Y.viewportWidth : Y.videoWidth, Y.targetVideoWidth < Y.minWidth && (Y.targetVideoWidth = Y.minWidth), Y.targetVideoHeight = Y.targetVideoWidth * Y.videoRatio, Y.contentHeight = Y.targetVideoHeight, Y.contentWidth = Y.targetVideoWidth), Y.isMobile || Y.isTouch || Y.$meta.css({
            width: Y.contentWidth
        }), Y.$videoWrapper.css({
            height: Y.targetVideoHeight,
            width: Y.targetVideoWidth,
            marginTop: Y.videoMarginTop,
            marginLeft: Y.videoMarginLeft
        }), Y.isMobile || (Y.metaHeight = Y.$meta.outerHeight(!0), Y.contentHeight += Y.metaHeight), Y.thumbnails && (Y.thumbnailHeight = Y.$thumbnails.outerHeight(!0), Y.contentHeight += Y.thumbnailHeight)
    }

    function b(t) {
        var n = "";
        Y.gallery.index > 0 && (P(n = Y.gallery.$items.eq(Y.gallery.index - 1).attr("href")) || e('<img src="' + n + '">')), Y.gallery.index < Y.gallery.total && (P(n = Y.gallery.$items.eq(Y.gallery.index + 1).attr("href")) || e('<img src="' + n + '">'))
    }

    function y(t) {
        N.killEvent(t);
        var n = e(t.currentTarget);
        Y.isAnimating || n.hasClass(O.control_disabled) || (Y.isAnimating = !0, d(), Y.gallery.index += n.hasClass(O.control_next) ? 1 : -1, Y.gallery.index > Y.gallery.total && (Y.gallery.index = Y.infinite ? 0 : Y.gallery.total), Y.gallery.index < 0 && (Y.gallery.index = Y.infinite ? Y.gallery.total : 0), x(), Y.$lightbox.addClass(O.animating), Y.$content.fsTransition({
            property: "opacity"
        }, C), Y.$lightbox.addClass(O.loading))
    }

    function w(t) {
        N.killEvent(t);
        var n = e(t.currentTarget);
        Y.isAnimating || n.hasClass(O.active) || (Y.isAnimating = !0, d(), Y.gallery.index = Y.$thumbnailItems.index(n), x(), Y.$lightbox.addClass(O.animating), Y.$content.fsTransition({
            property: "opacity"
        }, C), Y.$lightbox.addClass(O.loading))
    }

    function x() {
        if (Y.thumbnails) {
            var e = Y.$thumbnailItems.eq(Y.gallery.index);
            Y.$thumbnailItems.removeClass(O.active), e.addClass(O.active)
        }
    }

    function $() {
        if (Y.thumbnails) {
            var e = Y.$thumbnailItems.eq(Y.gallery.index),
                t = e.position().left + e.outerWidth(!1) / 2 - Y.$thumbnailContainer.outerWidth(!0) / 2;
            Y.$thumbnailContainer.stop().animate({
                scrollLeft: t
            }, 200, "linear")
        }
    }

    function C() {
        void 0 !== Y.$imageContainer && (Y.isViewer && Y.$imageContainer.fsViewer("destroy"), Y.$imageContainer.remove()), void 0 !== Y.$videoWrapper && Y.$videoWrapper.remove(), Y.$el = Y.gallery.$items.eq(Y.gallery.index), Y.$caption.html(Y.formatter.call(Y.$el, Y)), Y.$position.find(D.position_current).html(Y.gallery.index + 1);
        var e = Y.$el.attr("href");
        P(e) ? (Y.type = "video", m(e)) : (Y.type = "image", f(e)), k()
    }

    function k() {
        Y.$controls.removeClass(O.control_disabled), Y.infinite || (0 === Y.gallery.index && Y.$controls.filter(D.control_previous).addClass(O.control_disabled), Y.gallery.index === Y.gallery.total && Y.$controls.filter(D.control_next).addClass(O.control_disabled))
    }

    function T(e) {
        !Y.gallery.active || 37 !== e.keyCode && 39 !== e.keyCode ? 27 === e.keyCode && Y.$close.trigger(z.click) : (N.killEvent(e), Y.$controls.filter(37 === e.keyCode ? D.control_previous : D.control_next).trigger(z.click))
    }

    function H(t) {
        Y.$inlineTarget = e(t), Y.$inlineContents = Y.$inlineTarget.children().detach(), _(Y.$inlineContents)
    }

    function j() {
        Y.$inlineTarget.append(Y.$inlineContents.detach())
    }

    function W(t) {
        t += t.indexOf("?") > -1 ? "&" + Y.requestKey + "=true" : "?" + Y.requestKey + "=true", _(e('<iframe class="' + O.iframe + '" src="' + t + '"></iframe>'))
    }

    function _(e) {
        Y.$content.append(e), S(e), o()
    }

    function S(e) {
        Y.windowHeight = t.windowHeight - Y.mobilePaddingVertical - Y.paddingVertical, Y.windowWidth = t.windowWidth - Y.mobilePaddingHorizontal - Y.paddingHorizontal, Y.objectHeight = e.outerHeight(!0), Y.objectWidth = e.outerWidth(!0), Y.targetHeight = Y.targetHeight || (Y.$el ? Y.$el.data(A + "-height") : null), Y.targetWidth = Y.targetWidth || (Y.$el ? Y.$el.data(A + "-width") : null), Y.maxHeight = Y.windowHeight < 0 ? Y.minHeight : Y.windowHeight, Y.isIframe = e.is("iframe"), Y.objectMarginTop = 0, Y.objectMarginLeft = 0, Y.isMobile || (Y.windowHeight -= Y.margin, Y.windowWidth -= Y.margin), Y.contentHeight = Y.targetHeight ? Y.targetHeight : Y.isIframe || Y.isMobile ? Y.windowHeight : Y.objectHeight, Y.contentWidth = Y.targetWidth ? Y.targetWidth : Y.isIframe || Y.isMobile ? Y.windowWidth : Y.objectWidth, (Y.isIframe || Y.isObject) && Y.isMobile ? (Y.contentHeight = Y.windowHeight, Y.contentWidth = Y.windowWidth) : Y.isObject && (Y.contentHeight = Y.contentHeight > Y.windowHeight ? Y.windowHeight : Y.contentHeight, Y.contentWidth = Y.contentWidth > Y.windowWidth ? Y.windowWidth : Y.contentWidth), Y.isMobile || (Y.contentHeight > Y.maxHeight && (Y.contentHeight = Y.maxHeight), Y.contentWidth > Y.maxWidth && (Y.contentWidth = Y.maxWidth))
    }

    function M() {
        var t = e('<div class="' + O.error + '"><p>Error Loading Resource</p></div>');
        Y.type = "element", Y.$tools.remove(), Y.$image.off(z.namespace), _(t), R.trigger(z.error)
    }

    function E(e) {
        var t = e[0],
            n = new Image;
        return void 0 !== t.naturalHeight ? {
            naturalHeight: t.naturalHeight,
            naturalWidth: t.naturalWidth
        } : "img" === t.tagName.toLowerCase() && (n.src = t.src, {
            naturalHeight: n.height,
            naturalWidth: n.width
        })
    }

    function P(e) {
        var t, n = Y.videoFormatter;
        for (var i in n)
            if (n.hasOwnProperty(i) && null !== (t = e.match(n[i].pattern))) return n[i].format.call(Y, t);
        return !1
    }

    function I(t) {
        var n = t.target;
        e.contains(Y.$lightbox[0], n) || n === Y.$lightbox[0] || n === Y.$overlay[0] || (N.killEvent(t), Y.$lightbox.focus())
    }
    var q = t.Plugin("lightbox", {
            widget: !0,
            defaults: {
                customClass: "",
                fileTypes: /\.(jpg|sjpg|jpeg|png|gif)/i,
                fixed: !1,
                formatter: function() {
                    var e = this.attr("title"),
                        t = !(void 0 === e || !e) && e.replace(/^\s+|\s+$/g, "");
                    return t ? '<p class="caption">' + t + "</p>" : ""
                },
                infinite: !1,
                labels: {
                    close: "Close",
                    count: "of",
                    next: "Next",
                    previous: "Previous",
                    captionClosed: "View Caption",
                    captionOpen: "Close Caption",
                    thumbnailsClosed: "View Thumbnails",
                    thumbnailsOpen: "Close Thumbnails",
                    lightbox: "Lightbox {guid}"
                },
                margin: 50,
                maxHeight: 1e4,
                maxWidth: 1e4,
                minHeight: 100,
                minWidth: 100,
                mobile: !1,
                overlay: !1,
                retina: !1,
                requestKey: "fs-lightbox",
                theme: "fs-light",
                thumbnails: !1,
                top: 0,
                videoFormatter: {
                    youtube: {
                        pattern: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/,
                        format: function(e) {
                            return "//www.youtube.com/embed/" + e[1]
                        }
                    },
                    vimeo: {
                        pattern: /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
                        format: function(e) {
                            return "//player.vimeo.com/video/" + e[3]
                        }
                    }
                },
                videoRatio: .5625,
                videoWidth: 800,
                viewer: !0
            },
            classes: ["loading", "animating", "fixed", "mobile", "touch", "inline", "iframed", "open", "ready", "overlay", "close", "loading_icon", "container", "content", "image", "image_container", "video", "video_wrapper", "tools", "meta", "meta_content", "controls", "control", "control_previous", "control_next", "control_disabled", "position", "position_current", "position_total", "toggle", "caption_toggle", "caption", "caption_open", "thumbnailed", "thumbnails_open", "thumbnail_toggle", "thumbnails", "thumbnail_container", "thumbnail_item", "active", "has_controls", "has_caption", "iframe", "error", "active", "lock"],
            events: {
                open: "open",
                close: "close"
            },
            methods: {
                _construct: function(e) {
                    this.on(z.click, e, n);
                    var t = this.data(A + "-gallery");
                    !V && G && t === G && (V = !0, this.trigger(z.click))
                },
                _destruct: function(e) {
                    a(), this.off(z.namespace)
                },
                _resize: function() {
                    Y && i()
                },
                resize: i
            },
            utilities: {
                _initialize: function(t, i) {
                    t instanceof e && n.apply(F, [{
                        data: e.extend(!0, {}, {
                            $object: t
                        }, L, i || {})
                    }])
                },
                close: a
            }
        }),
        A = q.namespace,
        L = q.defaults,
        D = q.classes,
        O = D.raw,
        z = q.events,
        N = q.functions,
        F = t.window,
        R = t.$window,
        X = null,
        B = null,
        G = !1,
        V = !1,
        Y = null;
    t.Ready(function() {
        X = t.$body, B = e("html, body"), G = t.window.location.hash.replace("#", "")
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        p = {
            unit: s.unit
        };
        for (var e in g)
            if (g.hasOwnProperty(e))
                for (var t in h[e])
                    if (h[e].hasOwnProperty(t)) {
                        var n = "Infinity" === t ? 1 / 0 : parseInt(t, 10),
                            i = e.indexOf("max") > -1;
                        h[e][t].matches && (i ? (!p[e] || n < p[e]) && (p[e] = n) : (!p[e] || n > p[e]) && (p[e] = n))
                    }
    }

    function i() {
        n(), c.trigger(l.mqChange, [p])
    }

    function a(e) {
        var t = o(e.media),
            n = f[t],
            i = e.matches,
            a = i ? l.enter : l.leave;
        if (n && (n.active || !n.active && i)) {
            for (var r in n[a]) n[a].hasOwnProperty(r) && n[a][r].apply(n.mq);
            n.active = !0
        }
    }

    function o(e) {
        return e.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "").replace(/^\s+|\s+$/g, "")
    }
    var r = t.Plugin("mediaquery", {
            utilities: {
                _initialize: function(t) {
                    t = t || {};
                    for (var n in g) g.hasOwnProperty(n) && (s[n] = t[n] ? e.merge(t[n], s[n]) : s[n]);
                    (s = e.extend(s, t)).minWidth.sort(u.sortDesc), s.maxWidth.sort(u.sortAsc), s.minHeight.sort(u.sortDesc), s.maxHeight.sort(u.sortAsc);
                    for (var a in g)
                        if (g.hasOwnProperty(a)) {
                            h[a] = {};
                            for (var o in s[a])
                                if (s[a].hasOwnProperty(o)) {
                                    var r = window.matchMedia("(" + g[a] + ": " + (s[a][o] === 1 / 0 ? 1e5 : s[a][o]) + s.unit + ")");
                                    r.addListener(i), h[a][s[a][o]] = r
                                }
                        }
                    i()
                },
                state: function() {
                    return p
                },
                bind: function(e, t, n) {
                    var i = d.matchMedia(t),
                        r = o(i.media);
                    f[r] || (f[r] = {
                        mq: i,
                        active: !0,
                        enter: {},
                        leave: {}
                    }, f[r].mq.addListener(a));
                    for (var s in n) n.hasOwnProperty(s) && f[r].hasOwnProperty(s) && (f[r][s][e] = n[s]);
                    var c = f[r],
                        u = i.matches;
                    u && c[l.enter].hasOwnProperty(e) ? (c[l.enter][e].apply(i), c.active = !0) : !u && c[l.leave].hasOwnProperty(e) && (c[l.leave][e].apply(i), c.active = !1)
                },
                unbind: function(e, t) {
                    if (e)
                        if (t) {
                            var n = o(t);
                            f[n] && (f[n].enter[e] && delete f[n].enter[e], f[n].leave[e] && delete f[n].leave[e])
                        } else
                            for (var i in f) f.hasOwnProperty(i) && (f[i].enter[e] && delete f[i].enter[e], f[i].leave[e] && delete f[i].leave[e])
                }
            },
            events: {
                mqChange: "mqchange"
            }
        }),
        s = {
            minWidth: [0],
            maxWidth: [1 / 0],
            minHeight: [0],
            maxHeight: [1 / 0],
            unit: "px"
        },
        l = e.extend(r.events, {
            enter: "enter",
            leave: "leave"
        }),
        c = t.$window,
        d = c[0],
        u = r.functions,
        p = null,
        f = [],
        h = {},
        g = {
            minWidth: "min-width",
            maxWidth: "max-width",
            minHeight: "min-height",
            maxHeight: "max-height"
        }
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t) {
        u.killEvent(t);
        var n = t.data,
            i = n.index + (e(t.currentTarget).hasClass(c.control_previous) ? -1 : 1);
        i >= 0 && n.$items.eq(i).trigger(d.raw.click)
    }

    function i(t) {
        u.killEvent(t);
        var n = t.data,
            i = e(t.currentTarget),
            a = parseInt(i.val(), 10);
        n.$items.eq(a).trigger(d.raw.click)
    }

    function a(t) {
        var n = t.data,
            i = e(t.currentTarget),
            a = n.$items.index(i);
        n.ajax ? u.killEvent(t) : i[0].click(), o(n, a)
    }

    function o(e, t) {
        if (t < 0 && (t = 0), t > e.total && (t = e.total), t !== e.index) {
            e.index = t;
            var n = e.index - e.visible,
                i = e.index + (e.visible + 1);
            n < 0 && (n = 0), i > e.total && (i = e.total), e.$items.removeClass(c.visible).removeClass(c.hidden).filter(l.active).removeClass(c.active).end().eq(e.index).addClass(c.active).end().slice(n, i).addClass(c.visible), e.$items.not(l.visible).addClass(c.hidden), e.$position.find(l.current).text(e.index + 1).end().find(l.total).text(e.total + 1), e.$select.val(e.index), e.$controls.removeClass(c.visible), t > 0 && e.$controls.filter(l.control_previous).addClass(c.visible), t < e.total && e.$controls.filter(l.control_next).addClass(c.visible), e.$ellipsis.removeClass(c.visible), t > e.visible + 1 && e.$ellipsis.eq(0).addClass(c.visible), t < e.total - e.visible - 1 && e.$ellipsis.eq(1).addClass(c.visible), e.$el.trigger(d.update, [e.index])
        }
    }

    function r(e) {
        for (var t = "", n = 0; n <= e.total; n++) t += '<option value="' + n + '"', n === e.index && (t += 'selected="selected"'), t += ">Page " + (n + 1) + "</option>";
        e.$select.html(t)
    }
    var s = t.Plugin("pagination", {
            widget: !0,
            defaults: {
                ajax: !1,
                customClass: "",
                labels: {
                    count: "of",
                    next: "Next",
                    previous: "Previous",
                    select: "Select Page",
                    pagination: "Pagination {guid}"
                },
                maxWidth: "740px",
                theme: "fs-light",
                visible: 2
            },
            classes: ["pages", "page", "active", "first", "last", "ellipsis", "visible", "hidden", "control", "control_previous", "control_next", "position", "select", "mobile", "current", "total"],
            events: {
                update: "update"
            },
            methods: {
                _construct: function(t) {
                    t.mq = "(max-width:" + (t.maxWidth === 1 / 0 ? "100000px" : t.maxWidth) + ")";
                    var u = "";
                    u += '<button type="button" class="' + [c.control, c.control_previous].join(" ") + '">' + t.labels.previous + "</button>", u += '<button type="button" class="' + [c.control, c.control_next].join(" ") + '">' + t.labels.next + "</button>", u += '<div class="' + c.position + '" aria-hidden="true">', u += '<span class="' + c.current + '">0</span>', u += " " + t.labels.count + " ", u += '<span class="' + c.total + '">0</span>', u += '<select class="' + c.select + '" title="' + t.labels.select + '" tabindex="-1" aria-hidden="true"></select>', u += "</div>", t.thisClasses = [c.base, t.theme, t.customClass], t.labels.pagination = t.labels.pagination.replace("{guid}", t.numGuid), this.addClass(t.thisClasses.join(" ")).wrapInner('<div class="' + c.pages + '" aria-label="' + t.labels.pagination + '"></div>').prepend(u), t.$controls = this.find(l.control), t.$pages = this.find(l.pages), t.$items = t.$pages.children().addClass(c.page), t.$position = this.find(l.position), t.$select = this.find(l.select), t.index = -1, t.total = t.$items.length - 1;
                    var p = t.$items.index(t.$items.filter("[data-" + s.namespace + "-active]"));
                    p < 0 && (p = t.$items.index(t.$items.filter(l.active))), t.$items.eq(0).addClass(c.first).after('<span class="' + c.ellipsis + '">&hellip;</span>').end().eq(t.total).addClass(c.last).before('<span class="' + c.ellipsis + '">&hellip;</span>'), t.$ellipsis = t.$pages.find(l.ellipsis), r(t), this.on(d.click, l.page, t, a).on(d.click, l.control, t, n).on(d.change, l.select, t, i), e.fsMediaquery("bind", t.rawGuid, t.mq, {
                        enter: function() {
                            t.$el.addClass(c.mobile)
                        },
                        leave: function() {
                            t.$el.removeClass(c.mobile)
                        }
                    }), o(t, p)
                },
                _destruct: function(t) {
                    e.fsMediaquery("unbind", t.rawGuid), t.$controls.remove(), t.$ellipsis.remove(), t.$select.remove(), t.$position.remove(), t.$items.removeClass([c.page, c.active, c.visible, c.first, c.last].join(" ")).unwrap(), this.removeClass(t.thisClasses.join(" ")).off(d.namespace)
                }
            }
        }),
        l = s.classes,
        c = l.raw,
        d = s.events,
        u = s.functions
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery", "./swap"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e) {
        e.$handle.fsSwap("deactivate")
    }

    function i(e) {
        e.data.$handle.addClass(v.focus)
    }

    function a(e) {
        e.data.$handle.removeClass(v.focus)
    }

    function o(e) {
        var t = e.data;
        13 !== e.keyCode && 32 !== e.keyCode || (y.killEvent(e), t.$handle.trigger(b.raw.click))
    }

    function r(e) {
        if (!e.originalEvent) {
            var t = e.data;
            t.open || (t.$el.trigger(b.open).attr("aria-hidden", !1), t.$content.addClass(t.contentClassesOpen).one(b.click, function() {
                n(t)
            }), t.$handle.attr("aria-expanded", !0), t.label && t.$handle.html(t.labels.open), d(t), t.open = !0, t.$nav.focus())
        }
    }

    function s(e) {
        if (!e.originalEvent) {
            var t = e.data;
            t.open && (t.$el.trigger(b.close).attr("aria-hidden", !0), t.$content.removeClass(t.contentClassesOpen).off(b.namespace), t.$handle.attr("aria-expanded", !1), t.label && t.$handle.html(t.labels.closed), u(t), t.open = !1, t.$el.focus())
        }
    }

    function l(e) {
        var t = e.data;
        t.$el.attr("aria-hidden", !0), t.$handle.attr("aria-controls", t.ariaId).attr("aria-expanded", !1), t.$content.addClass(v.enabled), setTimeout(function() {
            t.$animate.addClass(v.animated)
        }, 0), t.label && t.$handle.html(t.labels.closed)
    }

    function c(e) {
        var t = e.data;
        t.$el.removeAttr("aria-hidden"), t.$handle.removeAttr("aria-controls").removeAttr("aria-expanded"), t.$content.removeClass(v.enabled, v.animated), t.$animate.removeClass(v.animated), f(t), u(t)
    }

    function d(e) {
        e.isToggle || w.addClass(v.lock)
    }

    function u(e) {
        e.isToggle || w.removeClass(v.lock)
    }

    function p(e) {
        if (e.label)
            if (e.$handle.length > 1) {
                e.originalLabel = [];
                for (var t = 0, n = e.$handle.length; t < n; t++) e.originalLabel[t] = e.$handle.eq(t).html()
            } else e.originalLabel = e.$handle.html()
    }

    function f(e) {
        if (e.label)
            if (e.$handle.length > 1)
                for (var t = 0, n = e.$handle.length; t < n; t++) e.$handle.eq(t).html(e.originalLabel[t]);
            else e.$handle.html(e.originalLabel)
    }
    var h = t.Plugin("navigation", {
            widget: !0,
            defaults: {
                customClass: "",
                gravity: "left",
                label: !0,
                labels: {
                    closed: "Menu",
                    open: "Close"
                },
                maxWidth: "980px",
                theme: "fs-light",
                type: "toggle"
            },
            classes: ["handle", "nav", "content", "animated", "enabled", "focus", "open", "toggle", "push", "reveal", "overlay", "left", "right", "lock"],
            events: {
                open: "open",
                close: "close"
            },
            methods: {
                _construct: function(t) {
                    t.handleGuid = v.handle + t.guid, t.isToggle = "toggle" === t.type, t.open = !1, t.isToggle && (t.gravity = "");
                    var n = v.base,
                        d = [n, t.type].join("-"),
                        u = t.gravity ? [d, t.gravity].join("-") : "",
                        f = [t.rawGuid, t.theme, t.customClass].join(" ");
                    t.handle = this.data(g + "-handle"), t.content = this.data(g + "-content"), t.handleClasses = [v.handle, v.handle.replace(n, d), u ? v.handle.replace(n, u) : "", t.handleGuid, f].join(" "), t.thisClasses = [v.nav.replace(n, d), u ? v.nav.replace(n, u) : "", f], t.contentClasses = [v.content.replace(n, d), f].join(" "), t.contentClassesOpen = [u ? v.content.replace(n, u) : "", v.open].join(" "), t.$nav = this.addClass(t.thisClasses.join(" ")).attr("role", "navigation"), t.$handle = e(t.handle).addClass(t.handleClasses), t.$content = e(t.content).addClass(t.contentClasses), t.$animate = e().add(t.$nav).add(t.$content), p(t), t.navTabIndex = t.$nav.attr("tabindex"), t.$nav.attr("tabindex", -1), t.id = this.attr("id"), t.id ? t.ariaId = t.id : (t.ariaId = t.rawGuid, this.attr("id", t.ariaId)), t.$handle.attr("data-swap-target", t.dotGuid).attr("data-swap-linked", t.handleGuid).attr("data-swap-group", v.base).attr("tabindex", 0).on("activate.swap" + t.dotGuid, t, r).on("deactivate.swap" + t.dotGuid, t, s).on("enable.swap" + t.dotGuid, t, l).on("disable.swap" + t.dotGuid, t, c).on(b.focus + t.dotGuid, t, i).on(b.blur + t.dotGuid, t, a).fsSwap({
                        maxWidth: t.maxWidth,
                        classes: {
                            target: t.dotGuid,
                            enabled: m.enabled,
                            active: m.open,
                            raw: {
                                target: t.rawGuid,
                                enabled: v.enabled,
                                active: v.open
                            }
                        }
                    }), t.$handle.is("a, button") || t.$handle.on(b.keyPress + t.dotGuid, t, o)
                },
                _destruct: function(e) {
                    e.$content.removeClass([e.contentClasses, e.contentClassesOpen].join(" ")).off(b.namespace), e.$handle.removeAttr("aria-controls").removeAttr("aria-expanded").removeAttr("data-swap-target").removeData("swap-target").removeAttr("data-swap-linked").removeAttr("data-swap-group").removeData("swap-linked").removeData("tabindex").removeClass(e.handleClasses).off(e.dotGuid).html(e.originalLabel).fsSwap("destroy"), e.$nav.attr("tabindex", e.navTabIndex), f(e), u(e), this.removeAttr("aria-hidden").removeClass(e.thisClasses.join(" ")).off(b.namespace), this.attr("id") === e.rawGuid && this.removeAttr("id")
                },
                open: function(e) {
                    e.$handle.fsSwap("activate")
                },
                close: n,
                enable: function(e) {
                    e.$handle.fsSwap("enable")
                },
                disable: function(e) {
                    e.$handle.fsSwap("disable")
                }
            }
        }),
        g = h.namespace,
        m = h.classes,
        v = m.raw,
        b = h.events,
        y = h.functions,
        w = null;
    t.Ready(function() {
        w = e("html, body")
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e) {
        e.data.$container.addClass(p.focus)
    }

    function i(e) {
        s(e.data, 0), e.data.$container.removeClass(p.focus)
    }

    function a(e) {
        var t = e.data;
        38 !== e.keyCode && 40 !== e.keyCode || (e.preventDefault(), s(t, 38 === e.keyCode ? t.step : -t.step))
    }

    function o(t) {
        h.killEvent(t), r(t);
        var n = t.data;
        if (!n.disabled && t.which <= 1) {
            var i = e(t.target).hasClass(p.up) ? n.step : -n.step;
            n.timer = h.startTimer(n.timer, 300, function() {
                n.timer = h.startTimer(n.timer, 100, function() {
                    s(n, i)
                }, !0)
            }), s(n, i), g.on([f.touchEnd, f.mouseUp].join(" "), n, r)
        }
    }

    function r(e) {
        h.killEvent(e);
        var t = e.data;
        h.clearTimer(t.timer, !0), g.off(f.namespace)
    }

    function s(t, n) {
        var i = parseFloat(t.$el.val()),
            a = n;
        "undefined" === e.type(i) || isNaN(i) ? a = isNaN(i) ? "" : !1 !== t.min ? t.min : "" : !1 !== t.min && i < t.min ? a = t.min : a += i, "" !== a && (!1 !== t.min && a < t.min && (a = t.min), !1 !== t.max && a > t.max && (a = t.max)), a === i && 0 != n || ("" !== a && (a = c(a, t.digits)), t.$el.val(a).trigger(f.raw.change, [!0]))
    }

    function l(e) {
        var t = String(e);
        return t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0
    }

    function c(e, t) {
        var n = Math.pow(10, t);
        return Math.round(e * n) / n
    }
    var d = t.Plugin("number", {
            widget: !0,
            defaults: {
                customClass: "",
                labels: {
                    up: "Up",
                    down: "Down"
                },
                theme: "fs-light"
            },
            classes: ["arrow", "up", "down", "disabled", "focus"],
            methods: {
                _construct: function(e) {
                    var t = parseFloat(this.attr("min")),
                        r = parseFloat(this.attr("max"));
                    e.min = !(!t && 0 !== t) && t, e.max = !(!r && 0 !== r) && r, e.step = parseFloat(this.attr("step")) || 1, e.timer = null, e.digits = l(e.step), e.disabled = this.is(":disabled") || this.is("[readonly]");
                    var c = "";
                    c += '<button type="button" class="' + [p.arrow, p.up].join(" ") + '" aria-hidden="true" tabindex="-1">' + e.labels.up + "</button>", c += '<button type="button" class="' + [p.arrow, p.down].join(" ") + '" aria-hidden="true" tabindex="-1">' + e.labels.down + "</button>", this.wrap('<div class="' + [p.base, e.theme, e.customClass, e.disabled ? p.disabled : ""].join(" ") + '"></div>').after(c), e.$container = this.parent(u.base), e.$arrows = e.$container.find(u.arrow), this.on(f.focus, e, n).on(f.blur, e, i).on(f.keyPress, e, a), e.$container.on([f.touchStart, f.mouseDown].join(" "), u.arrow, e, o), s(e, 0)
                },
                _destruct: function(e) {
                    e.$arrows.remove(), this.unwrap().off(f.namespace)
                },
                enable: function(e) {
                    e.disabled && (this.prop("disabled", !1), e.$container.removeClass(p.disabled), e.disabled = !1)
                },
                disable: function(e) {
                    e.disabled || (this.prop("disabled", !0), e.$container.addClass(p.disabled), e.disabled = !0)
                },
                update: function(e) {
                    var t = parseFloat(e.$el.attr("min")),
                        n = parseFloat(e.$el.attr("max"));
                    e.min = !(!t && 0 !== t) && t, e.max = !(!n && 0 !== n) && n, e.step = parseFloat(e.$el.attr("step")) || 1, e.timer = null, e.digits = l(e.step), e.disabled = e.$el.is(":disabled") || e.$el.is("[readonly]"), s(e, 0)
                }
            }
        }),
        u = d.classes,
        p = u.raw,
        f = d.events,
        h = d.functions,
        g = null;
    t.Ready(function() {
        g = t.$body
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./touch"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        v = e(f.element)
    }

    function i(e) {
        e.stepCount = (e.max - e.min) / e.step, e.offset = e.$track.offset(), e.vertical ? (e.trackHeight = e.$track.outerHeight(), e.handleHeight = e.$handle.outerHeight(), e.increment = e.trackHeight / e.stepCount) : (e.trackWidth = e.$track.outerWidth(), e.handleWidth = e.$handle.outerWidth(), e.increment = e.trackWidth / e.stepCount), c(e, (e.$el.val() - e.min) / (e.max - e.min), !0)
    }

    function a(e) {
        m.killEvent(e);
        var t = e.data;
        t.disabled || (i(t), o(e), t.$container.addClass(h.focus))
    }

    function o(e) {
        m.killEvent();
        var t = e.data;
        t.disabled || c(t, t.vertical ? 1 - (e.pageY - t.offset.top) / t.trackHeight : (e.pageX - t.offset.left) / t.trackWidth)
    }

    function r(e) {
        m.killEvent(e);
        var t = e.data;
        t.disabled || t.$container.removeClass(h.focus)
    }

    function s(e) {
        e.data.$container.addClass(h.focus)
    }

    function l(e) {
        e.data.$container.removeClass(h.focus)
    }

    function c(e, t, n) {
        e.increment > 1 && (t = e.vertical ? Math.round(t * e.stepCount) * e.increment / e.trackHeight : Math.round(t * e.stepCount) * e.increment / e.trackWidth), t < 0 && (t = 0), t > 1 && (t = 1);
        var i = (e.min - e.max) * t;
        i = -parseFloat(i.toFixed(e.digits)), e.$fill.css(e.vertical ? "height" : "width", 100 * t + "%"), e.$handle.css(e.vertical ? "bottom" : "left", 100 * t + "%"), (i += e.min) !== e.value && !1 !== i && !0 !== n && (e.$el.val(i).trigger(g.raw.change, [!0]), e.value = i)
    }

    function d(e, t) {
        var n = e.data;
        t || n.disabled || c(n, (n.$el.val() - n.min) / (n.max - n.min))
    }

    function u(e) {
        var t = e.toString().split(".");
        return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), t.join(".")
    }
    var p = t.Plugin("range", {
            widget: !0,
            defaults: {
                customClass: "",
                fill: !1,
                formatter: !1,
                labels: {
                    max: !1,
                    min: !1
                },
                theme: "fs-light",
                vertical: !1
            },
            classes: ["track", "handle", "fill", "marker", "labels", "label", "label_min", "label_max", "vertical", "focus", "disabled"],
            methods: {
                _construct: function(e) {
                    e.formatter || (e.formatter = u), e.min = parseFloat(this.attr("min")) || 0, e.max = parseFloat(this.attr("max")) || 100, e.step = parseFloat(this.attr("step")) || 1, e.digits = e.step.toString().length - e.step.toString().indexOf("."), e.value = parseFloat(this.val()) || e.min + (e.max - e.min) / 2;
                    var t = "";
                    e.vertical = "vertical" === this.attr("orient") || e.vertical, e.disabled = this.is(":disabled") || this.is("[readonly]"), t += '<div class="' + h.track + '" aria-hidden="true">', e.fill && (t += '<span class="' + h.fill + '"></span>'), t += '<div class="' + h.handle + '" role="slider">', t += '<span class="' + h.marker + '"></span>', t += "</div>", t += "</div>";
                    var c = [h.base, e.theme, e.customClass, e.vertical ? h.vertical : "", e.labels ? h.labels : "", e.disabled ? h.disabled : ""];
                    if (this.addClass(h.element).wrap('<div class="' + c.join(" ") + '"></div>').after(t), e.$container = this.parents(f.base), e.$track = e.$container.find(f.track), e.$fill = e.$container.find(f.fill), e.$handle = e.$container.find(f.handle), e.$output = e.$container.find(f.output), e.labels) {
                        var p = '<span class="' + [h.label, h.label_max].join(" ") + '">' + e.formatter.call(this, e.labels.max ? e.labels.max : e.max) + "</span>",
                            m = '<span class="' + [h.label, h.label_min].join(" ") + '">' + e.formatter.call(this, e.labels.max ? e.labels.min : e.min) + "</span>";
                        e.$container.prepend(e.vertical ? p : m).append(e.vertical ? m : p)
                    }
                    e.$labels = e.$container.find(f.label), this.on(g.focus, e, s).on(g.blur, e, l).on(g.change, e, d), e.$container.fsTouch({
                        pan: !0,
                        axis: e.vertical ? "y" : "x"
                    }).on(g.panStart, e, a).on(g.pan, e, o).on(g.panEnd, e, r), n(), i.call(this, e)
                },
                _destruct: function(e) {
                    e.$container.off(g.namespace).fsTouch("destroy"), e.$track.remove(), e.$labels.remove(), this.unwrap().removeClass(h.element).off(g.namespace), n()
                },
                _resize: function(e) {
                    m.iterate.call(v, i)
                },
                enable: function(e) {
                    e.disabled && (this.prop("disabled", !1), e.$container.removeClass(h.disabled), e.disabled = !1)
                },
                disable: function(e) {
                    e.disabled || (this.prop("disabled", !0), e.$container.addClass(h.disabled), e.disabled = !0)
                },
                resize: i,
                update: function(e) {
                    e.min = parseFloat(e.$el.attr("min")) || 0, e.max = parseFloat(e.$el.attr("max")) || 100, e.step = parseFloat(e.$el.attr("step")) || 1, e.digits = e.step.toString().length - e.step.toString().indexOf("."), e.value = parseFloat(this.val()) || e.min + (e.max - e.min) / 2, e.labels && (e.$labels.filter(f.label_max).html(e.formatter.call(this, e.labels.max ? e.labels.max : e.max)), e.$labels.filter(f.label_min).html(e.formatter.call(this, e.labels.max ? e.labels.min : e.min))), i.call(this, e)
                }
            }
        }),
        f = p.classes,
        h = f.raw,
        g = p.events,
        m = p.functions,
        v = []
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./touch"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        b = e(h.base)
    }

    function i(e) {
        e.$el.addClass(g.isSetup);
        var t = {},
            n = {},
            i = {},
            o = 0,
            r = !0;
        e.horizontal ? (e.barHeight = e.$content[0].offsetHeight - e.$content[0].clientHeight, e.frameWidth = e.$content.outerWidth(), e.trackWidth = e.frameWidth - 2 * e.trackMargin, e.scrollWidth = e.$content[0].scrollWidth, e.ratio = e.trackWidth / e.scrollWidth, e.trackRatio = e.trackWidth / e.scrollWidth, e.handleWidth = e.handleSize > 0 ? e.handleSize : e.trackWidth * e.trackRatio, e.scrollRatio = (e.scrollWidth - e.frameWidth) / (e.trackWidth - e.handleWidth), e.handleBounds = {
            left: 0,
            right: e.trackWidth - e.handleWidth
        }, e.$content.css({
            paddingBottom: e.barHeight + e.paddingBottom
        }), o = e.$content.scrollLeft() * e.ratio, r = e.scrollWidth <= e.frameWidth, t = {
            width: e.frameWidth
        }, n = {
            width: e.trackWidth,
            marginLeft: e.trackMargin,
            marginRight: e.trackMargin
        }, i = {
            width: e.handleWidth
        }) : (e.barWidth = e.$content[0].offsetWidth - e.$content[0].clientWidth, e.frameHeight = e.$content.outerHeight(), e.trackHeight = e.frameHeight - 2 * e.trackMargin, e.scrollHeight = e.$content[0].scrollHeight, e.ratio = e.trackHeight / e.scrollHeight, e.trackRatio = e.trackHeight / e.scrollHeight, e.handleHeight = e.handleSize > 0 ? e.handleSize : e.trackHeight * e.trackRatio, e.scrollRatio = (e.scrollHeight - e.frameHeight) / (e.trackHeight - e.handleHeight), e.handleBounds = {
            top: 0,
            bottom: e.trackHeight - e.handleHeight
        }, o = e.$content.scrollTop() * e.ratio, r = e.scrollHeight <= e.frameHeight, t = {
            height: e.frameHeight
        }, n = {
            height: e.trackHeight,
            marginBottom: e.trackMargin,
            marginTop: e.trackMargin
        }, i = {
            height: e.handleHeight
        }), r ? e.$el.removeClass(g.active) : e.$el.addClass(g.active), e.$bar.css(t), e.$track.css(n), e.$handle.css(i), e.panning = !1, u(e, o), a({
            data: e
        }), e.$el.removeClass(g.setup)
    }

    function a(e) {
        v.killEvent(e);
        var t = e.data,
            n = {};
        if (!t.panning) {
            if (t.horizontal) {
                var i = t.$content.scrollLeft();
                i < 0 && (i = 0), t.handleLeft = i / t.scrollRatio, t.handleLeft > t.handleBounds.right && (t.handleLeft = t.handleBounds.right), n = {
                    left: t.handleLeft
                }
            } else {
                var a = t.$content.scrollTop();
                a < 0 && (a = 0), t.handleTop = a / t.scrollRatio, t.handleTop > t.handleBounds.bottom && (t.handleTop = t.handleBounds.bottom), n = {
                    top: t.handleTop
                }
            }
            t.$handle.css(n)
        }
    }

    function o(e) {
        r(e, !0)
    }

    function r(e, t) {
        var n, i, a = e.data;
        if (a.horizontal) {
            var o = a.$content[0].scrollLeft,
                r = a.$content[0].scrollWidth,
                l = a.$content.outerWidth();
            if (n = e.originalEvent.deltaX * (!0 === t ? -1 : 1), !0 === t) return a.$content.scrollLeft(o - n), s(e);
            if ("left" == (i = n < 0 ? "right" : "left") && n > r - l - o) return a.$content.scrollLeft(r), s(e);
            if ("right" === i && -n > o) return a.$content.scrollLeft(0), s(e)
        } else {
            var c = a.$content[0].scrollTop,
                d = a.$content[0].scrollHeight,
                u = a.$content.outerHeight();
            if (n = e.originalEvent.deltaY * (!0 === t ? -1 : 1), !0 === t) return a.$content.scrollTop(c - n), s(e);
            if ("down" == (i = n < 0 ? "up" : "down") && n > d - u - c) return a.$content.scrollTop(d), s(e);
            if ("up" === i && -n > c) return a.$content.scrollTop(0), s(e)
        }
    }

    function s(e) {
        return v.killEvent(e), e.returnValue = !1, !1
    }

    function l(e) {
        var t, n = e.data,
            i = n.$track.offset();
        n.panning = !0, t = n.horizontal ? n.handleLeft = e.pageX - i.left - n.handleWidth / 2 : n.handleTop = e.pageY - i.top - n.handleHeight / 2, u(n, t)
    }

    function c(e) {
        var t = e.data;
        u(t, t.horizontal ? t.handleLeft + e.deltaX : t.handleTop + e.deltaY)
    }

    function d(e) {
        var t = e.data;
        t.panning = !1, t.horizontal ? t.handleLeft += e.deltaX : t.handleTop += e.deltaY
    }

    function u(e, t) {
        var n = {};
        e.horizontal ? (t < e.handleBounds.left && (t = e.handleBounds.left), t > e.handleBounds.right && (t = e.handleBounds.right), n = {
            left: t
        }, e.$content.scrollLeft(Math.round(t * e.scrollRatio))) : (t < e.handleBounds.top && (t = e.handleBounds.top), t > e.handleBounds.bottom && (t = e.handleBounds.bottom), n = {
            top: t
        }, e.$content.scrollTop(Math.round(t * e.scrollRatio))), e.$handle.css(n)
    }
    var p, f = t.Plugin("scrollbar", {
            widget: !0,
            defaults: {
                customClass: "",
                duration: 0,
                handleSize: 0,
                horizontal: !1,
                mouseWheel: !0,
                theme: "fs-light",
                trackMargin: 0
            },
            classes: ["content", "bar", "track", "handle", "horizontal", "setup", "active"],
            methods: {
                _construct: function(e) {
                    var t = "";
                    t += '<div class="' + g.bar + '">', t += '<div class="' + g.track + '">', t += '<button type="button" class="' + g.handle + '" aria-hidden="true" tabindex="-1"></button>', t += "</div></div>", e.paddingRight = parseInt(this.css("padding-right"), 10), e.paddingBottom = parseInt(this.css("padding-bottom"), 10), e.thisClasses = [g.base, e.theme, e.customClass, e.horizontal ? g.horizontal : ""], this.addClass(e.thisClasses.join(" ")).wrapInner('<div class="' + g.content + '" tabindex="0"></div>').prepend(t), e.$content = this.find(h.content), e.$bar = this.find(h.bar), e.$track = this.find(h.track), e.$handle = this.find(h.handle), e.trackMargin = parseInt(e.trackMargin, 10), e.$content.on(m.scroll, e, a), e.mouseWheel && e.$content.on("wheel" + m.namespace, e, r), e.$track.fsTouch({
                        axis: e.horizontal ? "x" : "y",
                        pan: !0
                    }).on(m.panStart, e, l).on(m.pan, e, c).on(m.panEnd, e, d).on(m.click, v.killEvent).on("wheel" + m.namespace, e, o), i(e), n()
                },
                _destruct: function(e) {
                    e.$track.fsTouch("destroy"), e.$bar.remove(), e.$content.off(m.namespace).contents().unwrap(), this.removeClass(e.thisClasses.join(" ")).off(m.namespace), this.attr("id") === e.rawGuid && this.removeAttr("id")
                },
                _resize: function(e) {
                    v.iterate.call(b, i)
                },
                scroll: function(t, n, i) {
                    var a = i || t.duration,
                        o = {};
                    if ("number" !== e.type(n)) {
                        var r = e(n);
                        if (r.length > 0) {
                            var s = r.position();
                            n = t.horizontal ? s.left + t.$content.scrollLeft() : s.top + t.$content.scrollTop()
                        } else n = "top" === n ? 0 : "bottom" === n ? t.horizontal ? t.$content[0].scrollWidth : t.$content[0].scrollHeight : t.$content.scrollTop()
                    }
                    o[t.horizontal ? "scrollLeft" : "scrollTop"] = n, t.$content.stop().animate(o, a)
                },
                resize: i
            }
        }),
        h = f.classes,
        g = h.raw,
        m = f.events,
        v = f.functions,
        b = (t.$window, []);
    t.Ready(function() {
        p = t.$body
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        h.iterate.call(b, s)
    }

    function i() {
        b = e(u.base), n()
    }

    function a(e) {
        e.enabled = !0, e.$el.addClass(p.enabled), s(e)
    }

    function o(e) {
        e.enabled = !1, e.$el.css({
            height: "",
            width: "",
            top: "",
            bottom: "",
            marginBottom: ""
        }).removeClass(p.enabled), e.$stickys.removeClass([p.passed, p.stuck].join(" "))
    }

    function r() {
        h.iterate.call(b, c)
    }

    function s(e) {
        if (e.enabled) {
            if (l(e), e.$container.length) {
                var t = e.$container.offset();
                e.min = t.top - e.margin, e.max = e.min + e.$container.outerHeight(!1) - e.height
            } else {
                var n, i = (n = e.stuck ? e.$clone : e.$el).offset();
                e.min = i.top - e.margin, e.max = !1
            }
            c(e)
        }
    }

    function l(e) {
        var t;
        t = e.stuck ? e.$clone : e.$el, e.margin = parseInt(t.css("margin-top"), 10), e.$container.length ? e.containerMargin = parseInt(e.$container.css("margin-top"), 10) : e.containerMargin = 0, e.height = t.outerHeight(), e.width = t.outerWidth()
    }

    function c(e) {
        if (e.enabled) {
            var t = m + e.offset;
            if (t >= e.min) {
                e.stuck = !0, e.$stickys.addClass(p.stuck), e.stuck || (e.$el.trigger(f.stuck), l(e));
                var n = e.offset,
                    i = "";
                e.max && t > e.max ? (e.passed || e.$el.trigger(f.passed), e.passed = !0, e.$stickys.addClass(p.passed), n = "", i = 0) : (e.passed = !1, e.$stickys.removeClass(p.passed)), e.$el.css({
                    height: e.height,
                    width: e.width,
                    top: n,
                    bottom: i,
                    marginBottom: 0
                })
            } else e.stuck = !1, e.$stickys.removeClass(p.stuck).removeClass(p.passed), e.stuck && e.$el.trigger(f.unstuck), e.$el.css({
                height: "",
                width: "",
                top: "",
                bottom: "",
                marginBottom: ""
            })
        }
    }
    var d = t.Plugin("sticky", {
            widget: !0,
            defaults: {
                maxWidth: 1 / 0,
                minWidth: "0px",
                offset: 0
            },
            classes: ["enabled", "sticky", "stuck", "clone", "container", "passed"],
            events: {
                passed: "passed",
                stuck: "stuck",
                unstuck: "unstuck"
            },
            methods: {
                _construct: function(t) {
                    t.enabled = !1, t.stuck = !1, t.passed = !0, t.$clone = t.$el.clone(), t.container = t.$el.data("sticky-container"), t.$container = e(t.container), t.$el.addClass(p.base), t.$clone.removeClass(p.element).addClass(p.clone), t.$container.addClass(p.container), t.$stickys = e().add(t.$el).add(t.$clone), t.$el.after(t.$clone);
                    var n = e().add(t.$el.find("img")).add(t.$container.find("img"));
                    n.length && n.on(f.load, t, s), t.maxWidth = t.maxWidth === 1 / 0 ? "100000px" : t.maxWidth, t.mq = "(min-width:" + t.minWidth + ") and (max-width:" + t.maxWidth + ")", e.fsMediaquery("bind", t.rawGuid, t.mq, {
                        enter: function() {
                            a.call(t.$el, t)
                        },
                        leave: function() {
                            o.call(t.$el, t)
                        }
                    })
                },
                _postConstruct: function(e) {
                    i(), n()
                },
                _destruct: function(e) {
                    e.$clone.remove(), e.$container.removeClass(p.container), e.$el.css({
                        height: "",
                        width: "",
                        top: "",
                        bottom: "",
                        marginBottom: ""
                    }).removeClass(p.base), i()
                },
                _resize: n,
                _raf: function() {
                    (m = g.scrollTop()) < 0 && (m = 0), m !== v && (r(), v = m)
                },
                disable: o,
                enable: a,
                reset: s,
                resize: s
            }
        }),
        u = (d.namespace, d.classes),
        p = u.raw,
        f = d.events,
        h = d.functions,
        g = (t.window, t.$window),
        m = 0,
        v = 0,
        b = []
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t, n) {
        if (t.enabled && !t.active) {
            t.group && !n && e(t.group).not(t.$el).not(t.linked)[s.namespaceClean]("deactivate", !0);
            var i = t.group ? e(t.group).index(t.$el) : null;
            t.$swaps.addClass(t.classes.raw.active), n || t.linked && e(t.linked).not(t.$el)[s.namespaceClean]("activate", !0), this.trigger(d.activate, [i]), t.active = !0
        }
    }

    function i(t, n) {
        t.enabled && t.active && (t.$swaps.removeClass(t.classes.raw.active), n || t.linked && e(t.linked).not(t.$el)[s.namespaceClean]("deactivate", !0), this.trigger(d.deactivate), t.active = !1)
    }

    function a(t, a) {
        t.enabled || (t.enabled = !0, t.$swaps.addClass(t.classes.raw.enabled), a || e(t.linked).not(t.$el)[s.namespaceClean]("enable"), this.trigger(d.enable), t.onEnable ? (t.active = !1, n.call(this, t)) : (t.active = !0, i.call(this, t)))
    }

    function o(t, n) {
        t.enabled && (t.enabled = !1, t.$swaps.removeClass([t.classes.raw.enabled, t.classes.raw.active].join(" ")), n || e(t.linked).not(t.$el)[s.namespaceClean]("disable"), this.trigger(d.disable))
    }

    function r(e) {
        u.killEvent(e);
        var t = e.data;
        t.active && t.collapse ? i.call(t.$el, t) : n.call(t.$el, t)
    }
    var s = t.Plugin("swap", {
            widget: !0,
            defaults: {
                collapse: !0,
                maxWidth: 1 / 0
            },
            classes: ["target", "enabled", "active"],
            events: {
                activate: "activate",
                deactivate: "deactivate",
                enable: "enable",
                disable: "disable"
            },
            methods: {
                _construct: function(t) {
                    t.enabled = !1, t.active = !1, t.classes = e.extend(!0, {}, c, t.classes), t.target = this.data(l + "-target"), t.$target = e(t.target).addClass(t.classes.raw.target), t.mq = "(max-width:" + (t.maxWidth === 1 / 0 ? "100000px" : t.maxWidth) + ")";
                    var n = this.data(l + "-linked");
                    t.linked = !!n && "[data-" + l + '-linked="' + n + '"]';
                    var i = this.data(l + "-group");
                    t.group = !!i && "[data-" + l + '-group="' + i + '"]', t.$swaps = e().add(this).add(t.$target), this.on(d.click + t.dotGuid, t, r)
                },
                _postConstruct: function(t) {
                    t.collapse || !t.group || e(t.group).filter("[data-" + l + "-active]").length || e(t.group).eq(0).attr("data-" + l + "-active", "true"), t.onEnable = this.data(l + "-active") || !1, e.fsMediaquery("bind", t.rawGuid, t.mq, {
                        enter: function() {
                            a.call(t.$el, t, !0)
                        },
                        leave: function() {
                            o.call(t.$el, t, !0)
                        }
                    })
                },
                _destruct: function(t) {
                    e.fsMediaquery("unbind", t.rawGuid), t.$swaps.removeClass([t.classes.raw.enabled, t.classes.raw.active].join(" ")).off(d.namespace)
                },
                activate: n,
                deactivate: i,
                enable: a,
                disable: o
            }
        }),
        l = s.namespace,
        c = s.classes,
        d = s.events,
        u = s.functions
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mediaquery", "./swap"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e) {
        if (!e.originalEvent) {
            var t = e.data;
            t.$el.attr("aria-selected", !0).trigger(f.update, [0]), t.$mobileTab.addClass(p.active), t.$content.attr("aria-hidden", !1).addClass(p.active)
        }
    }

    function i(e) {
        if (!e.originalEvent) {
            var t = e.data;
            t.$el.attr("aria-selected", !1), t.$mobileTab.removeClass(p.active), t.$content.attr("aria-hidden", !0).removeClass(p.active)
        }
    }

    function a(e) {
        var t = e.data;
        t.$el.attr("aria-controls", t.ariaContentId), t.$mobileTab.addClass(p.enabled), t.$content.attr("aria-labelledby", t.ariaId).addClass(p.enabled)
    }

    function o(e) {
        var t = e.data;
        t.$el.removeAttr("aria-controls").removeAttr("aria-selected"), t.$mobileTab.removeClass(p.enabled), t.$content.removeAttr("aria-labelledby").removeAttr("aria-hidden").removeClass(p.enabled)
    }

    function r(e) {
        e.data.$el.fsSwap("activate")
    }

    function s(e) {
        e.$el.addClass(p.mobile), e.$mobileTab.addClass(p.mobile), e.$content.addClass(p.mobile)
    }

    function l(e) {
        e.$el.removeClass(p.mobile), e.$mobileTab.removeClass(p.mobile), e.$content.removeClass(p.mobile)
    }
    var c = t.Plugin("tabs", {
            widget: !0,
            defaults: {
                customClass: "",
                maxWidth: 1 / 0,
                mobileMaxWidth: "740px",
                theme: "fs-light"
            },
            classes: ["tab", "tab_mobile", "mobile", "content", "enabled", "active"],
            events: {
                update: "update"
            },
            methods: {
                _construct: function(r) {
                    r.mq = "(max-width:" + (r.mobileMaxWidth === 1 / 0 ? "100000px" : r.mobileMaxWidth) + ")", r.content = this.attr("href"), r.group = this.data(d + "-group"), r.elementClasses = [p.tab, r.rawGuid, r.theme, r.customClass], r.mobileTabClasses = [p.tab, p.tab_mobile, r.rawGuid, r.theme, r.customClass], r.contentClasses = [p.content, r.rawGuid, r.theme, r.customClass], r.$mobileTab = e('<button type="button" class="' + r.mobileTabClasses.join(" ") + '" aria-hidden="true">' + this.html() + "</button>"), r.$content = e(r.content).addClass(r.contentClasses.join(" ")), r.$content.before(r.$mobileTab).attr("role", "tabpanel"), this.attr("role", "tab"), r.id = this.attr("id"), r.id ? r.ariaId = r.id : (r.ariaId = r.rawGuid, this.attr("id", r.ariaId)), r.contentId = r.$content.attr("id"), r.contentGuid = r.rawGuid + "_content", r.contentId ? r.ariacontentId = r.contentId : (r.ariaContentId = r.contentGuid, r.$content.attr("id", r.ariaContentId));
                    var s = t.window.location.hash,
                        l = !1,
                        c = !1;
                    s.length && (l = this.filter("[href*='" + s + "']").length > 0, c = r.group && e("[data-" + d + '-group="' + r.group + '"]').filter("[href*='" + s + "']").length > 0), l ? this.attr("data-swap-active", "true") : c ? this.removeAttr("data-swap-active").removeData("data-swap-active") : "true" === this.attr("data-tabs-active") && this.attr("data-swap-active", "true"), this.attr("data-swap-target", r.content).attr("data-swap-group", r.group).addClass(r.elementClasses.join(" ")).on("activate.swap" + r.dotGuid, r, n).on("deactivate.swap" + r.dotGuid, r, i).on("enable.swap" + r.dotGuid, r, a).on("disable.swap" + r.dotGuid, r, o)
                },
                _postConstruct: function(t) {
                    this.fsSwap({
                        maxWidth: t.maxWidth,
                        classes: {
                            target: t.dotGuid,
                            enabled: u.enabled,
                            active: u.active,
                            raw: {
                                target: t.rawGuid,
                                enabled: p.enabled,
                                active: p.active
                            }
                        },
                        collapse: !1
                    }), t.$mobileTab.on("click" + t.dotGuid, t, r), e.fsMediaquery("bind", t.rawGuid, t.mq, {
                        enter: function() {
                            s.call(t.$el, t)
                        },
                        leave: function() {
                            l.call(t.$el, t)
                        }
                    })
                },
                _destruct: function(t) {
                    e.fsMediaquery("unbind", t.rawGuid), t.$mobileTab.off(f.namespace).remove(), t.elementClasses.push(p.mobile), t.contentClasses.push(p.mobile), t.$content.removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("role").removeClass(t.contentClasses.join(" ")), t.$content.attr("id") === t.contentGuid && t.$content.removeAttr("id"), this.removeAttr("aria-controls").removeAttr("aria-selected").removeAttr("data-swap-active").removeData("data-swap-active").removeAttr("data-swap-target").removeData("data-swap-target").removeAttr("data-swap-group").removeData("data-swap-group").removeAttr("role").removeClass(t.elementClasses.join(" ")).off(f.namespace).fsSwap("destroy"), this.attr("id") === t.rawGuid && this.removeAttr("id")
                },
                activate: function(e) {
                    this.fsSwap("activate")
                },
                enable: function(e) {
                    this.fsSwap("enable")
                },
                disable: function(e) {
                    this.fsSwap("disable")
                }
            }
        }),
        d = c.namespace,
        u = c.classes,
        p = u.raw,
        f = c.events;
    c.functions
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e) {
        s();
        var t = e.data;
        t.left = e.pageX, t.top = e.pageY, o(t)
    }

    function i(e) {
        var t = e.data;
        p.clearTimer(t.timer), s()
    }

    function a(e) {
        r(e.pageX, e.pageY)
    }

    function o(n) {
        s();
        var o = "";
        o += '<div class="', o += [d.base, d[n.direction], n.theme, n.customClass].join(" "), o += '">', o += '<div class="' + d.content + '">', o += n.formatter.call(n.$el, n), o += '<span class="' + d.caret + '"></span>', o += "</div>", f = {
            $tooltip: e(o += "</div>"),
            $el: n.$el
        }, t.$body.append(f.$tooltip);
        var l = f.$tooltip.find(c.content),
            h = f.$tooltip.find(c.caret),
            g = n.$el.offset(),
            m = n.$el.outerHeight(),
            v = n.$el.outerWidth(),
            b = 0,
            y = 0,
            w = 0,
            x = 0,
            $ = !1,
            C = !1,
            k = h.outerHeight(!0),
            T = h.outerWidth(!0),
            H = l.outerHeight(!0),
            j = l.outerWidth(!0);
        "right" === n.direction || "left" === n.direction ? (C = (H - k) / 2, x = -H / 2, "right" === n.direction ? w = n.margin : "left" === n.direction && (w = -(j + n.margin))) : ($ = (j - T) / 2, w = -j / 2, "bottom" === n.direction ? x = n.margin : "top" === n.direction && (x = -(H + n.margin))), l.css({
            top: x,
            left: w
        }), h.css({
            top: C,
            left: $
        }), n.follow ? n.$el.on(u.mouseMove, n, a) : (n.match ? "right" === n.direction || "left" === n.direction ? (y = n.top, "right" === n.direction ? b = g.left + v : "left" === n.direction && (b = g.left)) : (b = n.left, "bottom" === n.direction ? y = g.top + m : "top" === n.direction && (y = g.top)) : "right" === n.direction || "left" === n.direction ? (y = g.top + m / 2, "right" === n.direction ? b = g.left + v : "left" === n.direction && (b = g.left)) : (b = g.left + v / 2, "bottom" === n.direction ? y = g.top + m : "top" === n.direction && (y = g.top)), r(b, y)), n.timer = p.startTimer(n.timer, n.delay, function() {
            f.$tooltip.addClass(d.visible)
        }), n.$el.one(u.mouseLeave, n, i)
    }

    function r(e, t) {
        f && f.$tooltip.css({
            left: e,
            top: t
        })
    }

    function s() {
        f && (f.$el.off([u.mouseMove, u.mouseLeave].join(" ")), f.$tooltip.remove(), f = null)
    }
    var l = t.Plugin("tooltip", {
            widget: !0,
            defaults: {
                customClass: "",
                delay: 0,
                direction: "top",
                follow: !1,
                formatter: function(e) {
                    return this.data("title")
                },
                margin: 15,
                match: !1,
                theme: "fs-light"
            },
            classes: ["content", "caret", "visible", "top", "bottom", "right", "left"],
            methods: {
                _construct: function(e) {
                    this.on(u.mouseEnter, e, n)
                },
                _destruct: function(e) {
                    s(), this.off(u.namespace)
                }
            }
        }),
        c = l.classes,
        d = c.raw,
        u = l.events,
        p = l.functions,
        f = null
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e) {
        e.preventManipulation && e.preventManipulation();
        var t = e.data,
            n = e.originalEvent;
        if (n.type.match(/(up|end|cancel)$/i)) o(e);
        else {
            if (n.pointerId) {
                var r = !1;
                for (var s in t.touches) t.touches[s].id === n.pointerId && (r = !0, t.touches[s].pageX = n.pageX, t.touches[s].pageY = n.pageY);
                r || t.touches.push({
                    id: n.pointerId,
                    pageX: n.pageX,
                    pageY: n.pageY
                })
            } else t.touches = n.touches;
            n.type.match(/(down|start)$/i) ? i(e) : n.type.match(/move$/i) && a(e)
        }
    }

    function i(i) {
        var r = i.data,
            s = "undefined" !== e.type(r.touches) && r.touches.length ? r.touches[0] : null;
        s && r.$el.off(h.mouseDown), r.touching || (r.startE = i.originalEvent, r.startX = s ? s.pageX : i.pageX, r.startY = s ? s.pageY : i.pageY, r.startT = (new Date).getTime(), r.scaleD = 1, r.passedAxis = !1), r.$links && r.$links.off(h.click);
        var u = l(r.scale ? h.scaleStart : h.panStart, i, r.startX, r.startY, r.scaleD, 0, 0, "", "");
        if (r.scale && r.touches && r.touches.length >= 2) {
            var p = r.touches;
            r.pinch = {
                startX: c(p[0].pageX, p[1].pageX),
                startY: c(p[0].pageY, p[1].pageY),
                startD: d(p[1].pageX - p[0].pageX, p[1].pageY - p[0].pageY)
            }, u.pageX = r.startX = r.pinch.startX, u.pageY = r.startY = r.pinch.startY
        }
        r.touching || (r.touching = !0, r.pan && !s && m.on(h.mouseMove, r, a).on(h.mouseUp, r, o), t.support.pointer ? m.on([h.pointerMove, h.pointerUp, h.pointerCancel].join(" "), r, n) : m.on([h.touchMove, h.touchEnd, h.touchCancel].join(" "), r, n), r.$el.trigger(u))
    }

    function a(t) {
        var n = t.data,
            i = "undefined" !== e.type(n.touches) && n.touches.length ? n.touches[0] : null,
            a = i ? i.pageX : t.pageX,
            r = i ? i.pageY : t.pageY,
            s = a - n.startX,
            u = r - n.startY,
            p = s > 0 ? "right" : "left",
            f = u > 0 ? "down" : "up",
            m = Math.abs(s) > n.threshold,
            v = Math.abs(u) > n.threshold;
        if (!n.passedAxis && n.axis && (n.axisX && v || n.axisY && m)) o(t);
        else {
            !n.passedAxis && (!n.axis || n.axis && n.axisX && m || n.axisY && v) && (n.passedAxis = !0), n.passedAxis && (g.killEvent(t), g.killEvent(n.startE));
            var b = !0,
                y = l(n.scale ? h.scale : h.pan, t, a, r, n.scaleD, s, u, p, f);
            if (n.scale)
                if (n.touches && n.touches.length >= 2) {
                    var w = n.touches;
                    n.pinch.endX = c(w[0].pageX, w[1].pageX), n.pinch.endY = c(w[0].pageY, w[1].pageY), n.pinch.endD = d(w[1].pageX - w[0].pageX, w[1].pageY - w[0].pageY), n.scaleD = n.pinch.endD / n.pinch.startD, y.pageX = n.pinch.endX, y.pageY = n.pinch.endY, y.scale = n.scaleD, y.deltaX = n.pinch.endX - n.pinch.startX, y.deltaY = n.pinch.endY - n.pinch.startY
                } else n.pan || (b = !1);
            b && n.$el.trigger(y)
        }
    }

    function o(t) {
        var n = t.data,
            a = "undefined" !== e.type(n.touches) && n.touches.length ? n.touches[0] : null,
            o = a ? a.pageX : t.pageX,
            s = a ? a.pageY : t.pageY,
            c = o - n.startX,
            d = s - n.startY,
            u = (new Date).getTime(),
            p = n.scale ? h.scaleEnd : h.panEnd,
            f = c > 0 ? "right" : "left",
            v = d > 0 ? "down" : "up",
            b = Math.abs(c) > 1,
            y = Math.abs(d) > 1;
        if (n.swipe && u - n.startT < n.time && Math.abs(c) > n.threshold && (p = h.swipe), n.axis && (n.axisX && y || n.axisY && b) || b || y) {
            n.$links = n.$el.find("a");
            for (var w = 0, x = n.$links.length; w < x; w++) r(n.$links.eq(w), n)
        }
        var $ = l(p, t, o, s, n.scaleD, c, d, f, v);
        m.off([h.touchMove, h.touchEnd, h.touchCancel, h.mouseMove, h.mouseUp, h.pointerMove, h.pointerUp, h.pointerCancel].join(" ")), n.$el.trigger($), n.touches = [], n.scale, a && (n.touchTimer = g.startTimer(n.touchTimer, 5, function() {
            n.$el.on(h.mouseDown, n, i)
        })), n.touching = !1
    }

    function r(t, n) {
        t.on(h.click, n, s);
        var i = e._data(t[0], "events").click;
        i.unshift(i.pop())
    }

    function s(e) {
        g.killEvent(e, !0), e.data.$links.off(h.click)
    }

    function l(t, n, i, a, o, r, s, l, c) {
        return e.Event(t, {
            originalEvent: n,
            bubbles: !0,
            pageX: i,
            pageY: a,
            scale: o,
            deltaX: r,
            deltaY: s,
            directionX: l,
            directionY: c
        })
    }

    function c(e, t) {
        return (e + t) / 2
    }

    function d(e, t) {
        return Math.sqrt(e * e + t * t)
    }

    function u(e, t) {
        e.css({
            "-ms-touch-action": t,
            "touch-action": t
        })
    }
    var p = !t.window.PointerEvent,
        f = t.Plugin("touch", {
            widget: !0,
            defaults: {
                axis: !1,
                pan: !1,
                scale: !1,
                swipe: !1,
                threshold: 10,
                time: 50
            },
            methods: {
                _construct: function(e) {
                    if (e.touches = [], e.touching = !1, this.on(h.dragStart, g.killEvent), e.swipe && (e.pan = !0), e.scale && (e.axis = !1), e.axisX = "x" === e.axis, e.axisY = "y" === e.axis, t.support.pointer) {
                        var a = "";
                        !e.axis || e.axisX && e.axisY ? a = "none" : (e.axisX && (a += " pan-y"), e.axisY && (a += " pan-x")), u(this, a), this.on(h.pointerDown, e, n)
                    } else this.on(h.touchStart, e, n).on(h.mouseDown, e, i)
                },
                _destruct: function(e) {
                    this.off(h.namespace), u(this, "")
                }
            },
            events: {
                pointerDown: p ? "MSPointerDown" : "pointerdown",
                pointerUp: p ? "MSPointerUp" : "pointerup",
                pointerMove: p ? "MSPointerMove" : "pointermove",
                pointerCancel: p ? "MSPointerCancel" : "pointercancel"
            }
        }),
        h = f.events,
        g = f.functions,
        m = t.$window;
    h.pan = "pan", h.panStart = "panstart", h.panEnd = "panend", h.scale = "scale", h.scaleStart = "scalestart", h.scaleEnd = "scaleend", h.swipe = "swipe"
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(t) {
        t.stopPropagation(), t.preventDefault();
        var n = t.data,
            a = t.originalEvent,
            o = n.target ? n.$target : n.$el;
        n.property && a.propertyName !== n.property || !e(a.target).is(o) || i(n)
    }

    function i(e) {
        e.always || e.$el[s.namespaceClean]("destroy"), e.callback.apply(e.$el)
    }

    function a(e) {
        var t = o(e.$check);
        r(e.styles, t) || i(e), e.styles = t
    }

    function o(t) {
        var n, i, a, o = {};
        if (t instanceof e && (t = t[0]), d.getComputedStyle)
            for (var r = 0, s = (n = d.getComputedStyle(t, null)).length; r < s; r++) i = n[r], a = n.getPropertyValue(i), o[i] = a;
        else if (t.currentStyle) {
            n = t.currentStyle;
            for (i in n) o[i] = n[i]
        }
        return o
    }

    function r(t, n) {
        if (e.type(t) !== e.type(n)) return !1;
        for (var i in t) {
            if (!t.hasOwnProperty(i)) return !1;
            if (!t.hasOwnProperty(i) || !n.hasOwnProperty(i) || t[i] !== n[i]) return !1
        }
        return !0
    }
    var s = t.Plugin("transition", {
            widget: !0,
            defaults: {
                always: !1,
                property: null,
                target: null
            },
            methods: {
                _construct: function(e, i) {
                    if (i) {
                        e.$target = this.find(e.target), e.$check = e.target ? e.$target : this, e.callback = i, e.styles = o(e.$check), e.timer = null;
                        var r = e.$check.css(t.transition + "-duration"),
                            s = parseFloat(r);
                        t.support.transition && r && s ? this.on(l.transitionEnd, e, n) : e.timer = c.startTimer(e.timer, 50, function() {
                            a(e)
                        }, !0)
                    }
                },
                _destruct: function(e) {
                    c.clearTimer(e.timer, !0), this.off(l.namespace)
                },
                resolve: i
            }
        }),
        l = s.events,
        c = s.functions,
        d = t.window
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n(e, t, n) {
        t.error = !0, e.$el.trigger($.fileError, [t, n]), e.aborting || g(e)
    }

    function i(e, t, i) {
        e.$el.trigger($.chunkError, [t, i]), n(e, t, i)
    }

    function a(e) {
        e.disabled && (this.removeClass(x.disabled), e.$input.prop("disabled", !1), e.disabled = !1)
    }

    function o(e) {
        C.killEvent(e);
        var t = e.data;
        t.disabled || t.$input.trigger($.click)
    }

    function r(e) {
        e.data.$el.addClass(x.focus)
    }

    function s(e) {
        e.data.$el.removeClass(x.focus)
    }

    function l(e) {
        C.killEvent(e);
        var t = e.data,
            n = t.$input[0].files;
        !t.disabled && n.length && f(t, n)
    }

    function c(e) {
        C.killEvent(e), e.data.$el.addClass(x.dropping).trigger($.fileDragEnter)
    }

    function d(e) {
        C.killEvent(e), e.data.$el.addClass(x.dropping).trigger($.fileDragOver)
    }

    function u(e) {
        C.killEvent(e), e.data.$el.removeClass(x.dropping).trigger($.fileDragLeave)
    }

    function p(e) {
        C.killEvent(e);
        var t = e.data,
            n = e.originalEvent.dataTransfer.files;
        t.$el.removeClass(x.dropping), t.disabled || f(t, n)
    }

    function f(e, t) {
        var n = [],
            i = t.length;
        if (e.maxFiles) {
            var a = e.maxFiles - e.uploaded;
            a >= 0 && t.length > a && (i = a)
        }
        if (i > 0) {
            for (var o = 0; o < i; o++) {
                var r = {
                    index: e.total++,
                    file: t[o],
                    name: t[o].name,
                    size: t[o].size,
                    started: !1,
                    complete: !1,
                    error: !1,
                    transfer: null
                };
                n.push(r), e.queue.push(r)
            }
            e.$el.trigger($.queued, [n]), e.autoUpload && h(e)
        }
        e.$input.val("")
    }

    function h(e) {
        e.uploading || (k.on($.beforeUnload, function() {
            return e.leave
        }), e.uploading = !0, e.$el.trigger($.start, [e.queue])), g(e)
    }

    function g(e) {
        var t = 0,
            n = [];
        for (var i in e.queue) !e.queue.hasOwnProperty(i) || e.queue[i].complete || e.queue[i].error || n.push(e.queue[i]);
        e.queue = n;
        for (var a in e.queue)
            if (e.queue.hasOwnProperty(a)) {
                if (e.queue[a].started || m(e, e.queue[a]), ++t >= e.maxConcurrent) return;
                i++
            }
        0 === t && (k.off($.beforeUnload), e.uploading = !1, e.$el.trigger($.complete))
    }

    function m(t, i) {
        if (i.size >= t.maxSize || !0 === i.error) n(t, i, "size");
        else if (t.chunked) i.started = !0, i.chunkSize = 1024 * t.chunkSize, i.totalChunks = Math.ceil(i.size / i.chunkSize), i.currentChunk = 0, t.$el.trigger($.fileStart, [i]), v(t, i);
        else {
            var a = new FormData;
            a.append(t.postKey, i.file), !1 === (a = b(t, a, i)) ? n(t, i, "abort") : (i.started = !0, i.transfer = e.ajax({
                url: t.action,
                data: a,
                dataType: t.dataType,
                headers: t.headers,
                type: "POST",
                contentType: !1,
                processData: !1,
                cache: !1,
                xhr: function() {
                    var n = e.ajaxSettings.xhr();
                    return n.upload && n.upload.addEventListener("progress", function(e) {
                        var n = 0,
                            a = e.loaded || e.position,
                            o = e.total;
                        e.lengthComputable && (n = Math.ceil(a / o * 100)), t.$el.trigger($.fileProgress, [i, n])
                    }, !1), n
                },
                beforeSend: function(e, n) {
                    t.$el.trigger($.fileStart, [i, n, e])
                },
                success: function(e, n, a) {
                    i.complete = !0, t.uploaded++, t.$el.trigger($.fileComplete, [i, e, n, a]), g(t)
                },
                error: function(e, a, o) {
                    n(t, i, o, e)
                }
            }))
        }
    }

    function v(t, a) {
        var o = a.chunkSize * a.currentChunk,
            r = o + a.chunkSize;
        r > a.size && (r = a.size);
        var s = a.file[T](o, r),
            l = new FormData;
        l.append(t.postKey, s, a.file.name), l.append("chunks", a.totalChunks), l.append("chunk", a.currentChunk), !1 === (l = b(t, l, a)) ? n(t, a, "abort") : a.chunkTransfer = e.ajax({
            url: t.action,
            data: l,
            dataType: t.dataType,
            headers: t.headers,
            type: "POST",
            contentType: !1,
            processData: !1,
            cache: !1,
            beforeSend: function(e, n) {
                t.$el.trigger($.chunkStart, [a, n, e])
            },
            success: function(e, n, i) {
                a.currentChunk++, t.$el.trigger($.chunkComplete, [a]);
                var o = Math.ceil(a.currentChunk / a.totalChunks * 100);
                t.$el.trigger($.fileProgress, [a, o, n, i]), a.currentChunk < a.totalChunks ? v(t, a) : (a.complete = !0, t.$el.trigger($.fileComplete, [a, e, n, i]), g(t))
            },
            error: function(e, n, o) {
                i(t, a, o, e)
            }
        })
    }

    function b(e, t, n) {
        for (var i in e.postData) e.postData.hasOwnProperty(i) && t.append(i, e.postData[i]);
        return t = e.beforeSend.call(e.$el, t, n)
    }
    var y = t.Plugin("upload", {
            widget: !0,
            defaults: {
                accept: !1,
                action: "",
                autoUpload: !0,
                beforeSend: function(e) {
                    return e
                },
                chunked: !1,
                chunkSize: 100,
                customClass: "",
                dataType: "html",
                headers: {},
                label: "Drag and drop files or click to select",
                leave: "You have uploads pending, are you sure you want to leave this page?",
                maxConcurrent: 2,
                maxFiles: !1,
                maxSize: 5242880,
                multiple: !0,
                postData: {},
                postKey: "file",
                theme: "fs-light"
            },
            classes: ["input", "target", "multiple", "dropping", "disabled", "focus"],
            methods: {
                _construct: function(e) {
                    if (t.support.file) {
                        var n = "";
                        T || (e.chunked = !1), e.maxQueue && (e.maxConcurrent = e.maxQueue), !1 !== e.label && (n += '<div class="' + x.target + '">', n += e.label, n += "</div>"), n += '<input class="' + x.input + '" type="file"', e.multiple && (n += " multiple"), e.accept && (n += ' accept="' + e.accept + '"'), n += ">", e.baseClasses = [x.base, e.theme, e.customClass].join(" "), this.addClass(e.baseClasses).append(n), e.$input = this.find(w.input), e.queue = [], e.total = 0, e.uploaded = 0, e.uploading = !1, e.disabled = !0, e.aborting = !1, this.on($.click, w.target, e, o).on($.dragEnter, e, c).on($.dragOver, e, d).on($.dragLeave, e, u).on($.drop, e, p), e.$input.on($.focus, e, r).on($.blur, e, s).on($.change, e, l), a.call(this, e)
                    }
                },
                _destruct: function(e) {
                    t.support.file && (e.$input.off($.namespace), this.off($.namespace).removeClass(e.baseClasses).html(""))
                },
                disable: function(e) {
                    e.disabled || (this.addClass(x.disabled), e.$input.prop("disabled", !0), e.disabled = !0)
                },
                enable: a,
                abort: function(t, i) {
                    var a;
                    t.aborting = !0;
                    for (var o in t.queue) t.queue.hasOwnProperty(o) && (a = t.queue[o], ("undefined" === e.type(i) || i >= 0 && a.index === i) && (a.started && !a.complete ? t.chunked ? a.chunkTransfer.abort() : a.transfer.abort() : n(t, a, "abort")));
                    t.aborting = !1, g(t)
                },
                start: h
            }
        }),
        w = y.classes,
        x = w.raw,
        $ = y.events,
        C = y.functions,
        k = (t.window, t.$window),
        T = !1;
    t.Ready(function() {
        var e = ["mozSlice", "webkitSlice", "slice"];
        if (t.support.file) {
            var n = !1;
            try {
                n = new File([""], "f")
            } catch (e) {}
            if (!n) try {
                n = new Blob([""], {})
            } catch (e) {}
            if (n)
                for (var i in e)
                    if (e.hasOwnProperty(i) && e[i] in n) {
                        T = e[i];
                        break
                    }
        }
    }), $.chunkComplete = "chunkcomplete", $.chunkError = "chunkerror", $.chunkStart = "chunkstart", $.complete = "complete", $.fileComplete = "filecomplete", $.fileDragEnter = "filedragenter", $.fileDragLeave = "filedragleave", $.fileDragOver = "filedragover", $.fileError = "fileerror", $.fileProgress = "fileprogress", $.fileStart = "filestart", $.start = "start", $.queued = "queued"
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./transition"], e) : e(jQuery, Formstone)
}(function(e, t) {
    "use strict";

    function n() {
        (R = F.scrollTop() + t.windowHeight) < 0 && (R = 0)
    }

    function i() {
        (X = e(D.base)).length ? N.lockViewport(L) : N.unlockViewport(L)
    }

    function a(t, n, i) {
        t.isAnimating || (t.isAnimating = !0, t.$container = e('<div class="' + O.container + '"><img></div>'), t.$image = t.$container.find("img"), t.$viewport.append(t.$container), t.$image.one(z.load, function() {
            r(t), t.isAnimating = !1, t.$container.fsTransition({
                property: "opacity"
            }, function() {}), t.$el.removeClass(O.loading), t.$container.fsTouch({
                pan: !0,
                scale: !0
            }).on(z.scaleStart, t, w).on(z.scaleEnd, t, $).on(z.scale, t, x), t.$el.trigger(z.loaded)
        }).one(z.error, t, o).attr("src", n).addClass(O.image), (t.$image[0].complete || 4 === t.$image[0].readyState) && t.$image.trigger(z.load), t.source = n)
    }

    function o(e) {
        e.data.$el.trigger(z.error)
    }

    function r(e) {
        s(e), l(e), e.containerTop = e.viewportHeight / 2, e.containerLeft = e.viewportWidth / 2, d(e), e.imageHeight = e.naturalHeight, e.imageWidth = e.naturalWidth, h(e), c(e), u(e), p(e), f(e), y(e, {
            containerTop: e.containerTop,
            containerLeft: e.containerLeft,
            imageHeight: e.imageHeight,
            imageWidth: e.imageWidth,
            imageTop: e.imageTop,
            imageLeft: e.imageLeft
        }), e.isRendering = !0
    }

    function s(e) {
        var t = I(e.$image);
        e.naturalHeight = t.naturalHeight, e.naturalWidth = t.naturalWidth, e.ratioHorizontal = e.naturalHeight / e.naturalWidth, e.ratioVertical = e.naturalWidth / e.naturalHeight, e.isWide = e.naturalWidth > e.naturalHeight
    }

    function l(e) {
        e.viewportHeight = e.$viewport.outerHeight(), e.viewportWidth = e.$viewport.outerWidth()
    }

    function c(e) {
        e.imageHeight <= e.viewportHeight ? (e.containerMinTop = e.viewportHeight / 2, e.containerMaxTop = e.viewportHeight / 2) : (e.containerMinTop = e.viewportHeight - e.imageHeight / 2, e.containerMaxTop = e.imageHeight / 2), e.imageWidth <= e.viewportWidth ? (e.containerMinLeft = e.viewportWidth / 2, e.containerMaxLeft = e.viewportWidth / 2) : (e.containerMinLeft = e.viewportWidth - e.imageWidth / 2, e.containerMaxLeft = e.imageWidth / 2)
    }

    function d(e) {
        e.isWide ? (e.imageMinWidth = e.viewportWidth, e.imageMinHeight = e.imageMinWidth * e.ratioHorizontal, e.imageMinHeight > e.viewportHeight && (e.imageMinHeight = e.viewportHeight, e.imageMinWidth = e.imageMinHeight * e.ratioVertical)) : (e.imageMinHeight = e.viewportHeight, e.imageMinWidth = e.imageMinHeight * e.ratioVertical, e.imageMinWidth > e.viewportWidth && (e.imageMinWidth = e.viewportWidth, e.imageMinHeight = e.imageMinWidth * e.ratioHorizontal)), (e.imageMinWidth > e.naturalWidth || e.imageMinHeight > e.naturalHeight) && (e.imageMinHeight = e.naturalHeight, e.imageMinWidth = e.naturalWidth), e.imageMaxHeight = e.naturalHeight, e.imageMaxWidth = e.naturalWidth
    }

    function u(e) {
        e.imageTop = -e.imageHeight / 2, e.imageLeft = -e.imageWidth / 2
    }

    function p(e) {
        e.lastContainerTop = e.containerTop, e.lastContainerLeft = e.containerLeft, e.lastImageHeight = e.imageHeight, e.lastImageWidth = e.imageWidth, e.lastImageTop = e.imageTop, e.lastImageLeft = e.imageLeft
    }

    function f(e) {
        e.renderContainerTop = e.lastContainerTop, e.renderContainerLeft = e.lastContainerLeft, e.renderImageTop = e.lastImageTop, e.renderImageLeft = e.lastImageLeft, e.renderImageHeight = e.lastImageHeight, e.renderImageWidth = e.lastImageWidth
    }

    function h(e) {
        e.imageHeight = e.imageMinHeight, e.imageWidth = e.imageMinWidth
    }

    function g(e) {
        e.imageHeight < e.imageMinHeight && (e.imageHeight = e.imageMinHeight), e.imageHeight > e.imageMaxHeight && (e.imageHeight = e.imageMaxHeight), e.imageWidth < e.imageMinWidth && (e.imageWidth = e.imageMinWidth), e.imageWidth > e.imageMaxWidth && (e.imageWidth = e.imageMaxWidth)
    }

    function m(e) {
        e.containerTop < e.containerMinTop && (e.containerTop = e.containerMinTop), e.containerTop > e.containerMaxTop && (e.containerTop = e.containerMaxTop), e.containerLeft < e.containerMinLeft && (e.containerLeft = e.containerMinLeft), e.containerLeft > e.containerMaxLeft && (e.containerLeft = e.containerMaxLeft)
    }

    function v(e) {
        null === e.tapTimer ? e.tapTimer = N.startTimer(e.tapTimer, 500, function() {
            b(e)
        }) : (b(e), C(e))
    }

    function b(e) {
        N.clearTimer(e.tapTimer), e.tapTimer = null
    }

    function y(e, n) {
        if (t.transform) {
            var i = n.imageWidth / e.naturalWidth,
                a = n.imageHeight / e.naturalHeight;
            e.$container.css(t.transform, "translate3d(" + n.containerLeft + "px, " + n.containerTop + "px, 0)"), e.$image.css(t.transform, "translate3d(-50%, -50%, 0) scale(" + i + "," + a + ")")
        } else e.$container.css({
            top: n.containerTop,
            left: n.containerLeft
        }), e.$image.css({
            height: n.imageHeight,
            width: n.imageWidth,
            top: n.imageTop,
            left: n.imageLeft
        })
    }

    function w(e) {
        var t = e.data;
        v(t), p(t)
    }

    function x(e) {
        var t = e.data;
        b(t), t.isRendering = !1, t.isZooming = !1, t.imageHeight, t.imageMinHeight, t.containerTop = t.lastContainerTop + e.deltaY, t.containerLeft = t.lastContainerLeft + e.deltaX, t.imageHeight = t.lastImageHeight * e.scale, t.imageWidth = t.lastImageWidth * e.scale, c(t), m(t), g(t), u(t), y(t, {
            containerTop: t.containerTop,
            containerLeft: t.containerLeft,
            imageHeight: t.imageHeight,
            imageWidth: t.imageWidth,
            imageTop: t.imageTop,
            imageLeft: t.imageLeft
        })
    }

    function $(e) {
        var t = e.data;
        t.isZooming || (p(t), f(t), t.isRendering = !0)
    }

    function C(e) {
        var t = e.imageHeight > e.imageMinHeight + 1;
        e.isZooming = !0, p(e), f(e), t ? (e.imageHeight = e.imageMinHeight, e.imageWidth = e.imageMinWidth) : (e.imageHeight = e.imageMaxHeight, e.imageWidth = e.imageMaxWidth), c(e), m(e), u(e), e.isRendering = !0
    }

    function k(t) {
        N.killEvent(t);
        var n = e(t.currentTarget),
            i = t.data;
        "out" == (n.hasClass(O.control_zoom_out) ? "out" : "in") ? H(i): T(i)
    }

    function T(e) {
        e.keyDownTime = 1, e.action = "zoom_in"
    }

    function H(e) {
        e.keyDownTime = 1, e.action = "zoom_out"
    }

    function j(e) {
        e.data.action = !1
    }

    function W(e) {
        if (e.isRendering) {
            if (e.action) {
                e.keyDownTime += e.zoomIncrement;
                var t = ("zoom_out" === e.action ? -1 : 1) * Math.round(e.imageWidth * e.keyDownTime - e.imageWidth);
                t > e.zoomDelta && (t = e.zoomDelta), e.isWide ? (e.imageWidth += t, e.imageHeight = Math.round(e.imageWidth / e.ratioVertical)) : (e.imageHeight += t, e.imageWidth = Math.round(e.imageHeight / e.ratioHorizontal)), g(e), u(e), c(e), m(e)
            }
            e.renderContainerTop += Math.round((e.containerTop - e.renderContainerTop) * e.zoomEnertia), e.renderContainerLeft += Math.round((e.containerLeft - e.renderContainerLeft) * e.zoomEnertia), e.renderImageTop += Math.round((e.imageTop - e.renderImageTop) * e.zoomEnertia), e.renderImageLeft += Math.round((e.imageLeft - e.renderImageLeft) * e.zoomEnertia), e.renderImageHeight += Math.round((e.imageHeight - e.renderImageHeight) * e.zoomEnertia), e.renderImageWidth += Math.round((e.imageWidth - e.renderImageWidth) * e.zoomEnertia), y(e, {
                containerTop: e.renderContainerTop,
                containerLeft: e.renderContainerLeft,
                imageHeight: e.renderImageHeight,
                imageWidth: e.renderImageWidth,
                imageTop: e.renderImageTop,
                imageLeft: e.renderImageLeft
            })
        }
    }

    function _(e, t) {
        e.isAnimating || (b(e), e.isAnimating = !0, e.isRendering = !1, e.isZooming = !1, P(e), e.$container.fsTransition({
            property: "opacity"
        }, function() {
            e.isAnimating = !1, e.$container.remove(), "function" == typeof t && t.call(window, e)
        }), e.$el.addClass(O.loading))
    }

    function S(t) {
        N.killEvent(t);
        var n = e(t.currentTarget),
            i = t.data,
            o = i.index + (n.hasClass(O.control_next) ? 1 : -1);
        i.isAnimating || (o < 0 && (o = 0), o > i.total && (o = i.total), o !== i.index && (i.index = o, _(i, function() {
            a(i, i.images[i.index])
        })), M(i))
    }

    function M(e) {
        e.$controlItems.removeClass(O.control_disabled), 0 === e.index && e.$controlPrevious.addClass(O.control_disabled), e.index === e.images.length - 1 && e.$controlNext.addClass(O.control_disabled)
    }

    function E(e) {
        l(e), c(e), d(e), u(e), c(e), m(e), g(e)
    }

    function P(e) {
        e.$container && e.$container.length && e.$container.fsTouch("destroy").off(z.scaleStart, w).off(z.scaleEnd, $).off(z.scale, x)
    }

    function I(e) {
        var t = e[0],
            n = new Image;
        return void 0 !== t.naturalHeight ? {
            naturalHeight: t.naturalHeight,
            naturalWidth: t.naturalWidth
        } : "img" === t.tagName.toLowerCase() && (n.src = t.src, {
            naturalHeight: n.height,
            naturalWidth: n.width
        })
    }
    var q, A = t.Plugin("viewer", {
            widget: !0,
            defaults: {
                controls: !0,
                customClass: "",
                labels: {
                    count: "of",
                    next: "Next",
                    previous: "Previous",
                    zoom_in: "Zoom In",
                    zoom_out: "Zoom Out"
                },
                theme: "fs-light",
                zoomDelta: 100,
                zoomEnertia: .2,
                zoomIncrement: .01
            },
            classes: ["source", "wrapper", "viewport", "container", "image", "gallery", "loading_icon", "controls", "controls_custom", "control", "control_previous", "control_next", "control_zoom_in", "control_zoom_out", "control_disabled", "loading"],
            events: {
                loaded: "loaded",
                ready: "ready"
            },
            methods: {
                _construct: function(t) {
                    var n, o = "",
                        r = [O.control, O.control_previous].join(" "),
                        s = [O.control, O.control_next].join(" "),
                        l = [O.control, O.control_zoom_in].join(" "),
                        c = [O.control, O.control_zoom_out].join(" ");
                    t.thisClasses = [O.base, O.loading, t.customClass, t.theme], t.images = [], t.source = !1, t.gallery = !1, t.tapTimer = null, t.action = !1, t.isRendering = !1, t.isZooming = !1, t.isAnimating = !1, t.keyDownTime = 1, t.$images = this.find("img").addClass(O.source), t.index = 0, t.total = t.$images.length - 1, t.customControls = "object" === e.type(t.controls) && t.controls.zoom_in && t.controls.zoom_out, t.$images.length > 1 && (t.gallery = !0, t.thisClasses.push(O.gallery), !t.customControls || t.controls.previous && t.controls.next || (t.customControls = !1));
                    for (var d = 0; d < t.$images.length; d++) n = t.$images.eq(d), t.images.push(n.attr("src"));
                    o += '<div class="' + O.wrapper + '">', o += '<div class="' + O.loading_icon + '"></div>', o += '<div class="' + O.viewport + '"></div>', o += "</div>", t.controls && !t.customControls && (o += '<div class="' + O.controls + '">', o += '<button type="button" class="' + r + '">' + t.labels.previous + "</button>", o += '<button type="button" class="' + c + '">' + t.labels.zoom_out + "</button>", o += '<button type="button" class="' + l + '">' + t.labels.zoom_in + "</button>", o += '<button type="button" class="' + s + '">' + t.labels.next + "</button>", o += "</div>"), this.addClass(t.thisClasses.join(" ")).prepend(o), t.$wrapper = this.find(D.wrapper), t.$viewport = this.find(D.viewport), t.customControls ? (t.$controls = e(t.controls.container).addClass([O.controls, O.controls_custom].join(" ")), t.$controlPrevious = e(t.controls.previous).addClass(r), t.$controlNext = e(t.controls.next).addClass(s), t.$controlZoomIn = e(t.controls.zoom_in).addClass(l), t.$controlZoomOut = e(t.controls.zoom_out).addClass(c)) : (t.$controls = this.find(D.controls), t.$controlPrevious = this.find(D.control_previous), t.$controlNext = this.find(D.control_next), t.$controlZoomIn = this.find(D.control_zoom_in), t.$controlZoomOut = this.find(D.control_zoom_out)), t.$controlItems = t.$controlPrevious.add(t.$controlNext), t.$controlZooms = t.$controlZoomIn.add(t.$controlZoomOut), i(), t.$controlItems.on(z.click, t, S), t.$controlZooms.on([z.touchStart, z.mouseDown].join(" "), t, k).on([z.touchEnd, z.mouseUp].join(" "), t, j), a(t, t.images[t.index], !0), M(t)
                },
                _destruct: function(e) {
                    e.$wrapper.remove(), e.$image.removeClass(O.source), e.controls && !e.customControls && e.$controls.remove(), e.customControls && (e.$controls.removeClass([O.controls, O.controls_custom].join(" ")), e.$controlItems.off(z.click).removeClass([O.control, O.control_previous, O.control_next].join(" ")), e.$controlZooms.off([z.touchStart, z.mouseDown].join(" ")).off([z.touchStart, z.mouseDown].join(" ")).off([z.touchEnd, z.mouseUp].join(" ")).removeClass([O.control, O.control_zoom_in, O.control_zoom_out].join(" "))), this.removeClass(e.thisClasses.join(" ")).off(z.namespace), i()
                },
                _resize: function() {
                    N.iterate.call(X, E)
                },
                _raf: function() {
                    N.iterate.call(X, W)
                },
                resize: E,
                load: function(e, t) {
                    e.index = 0, "string" == typeof t ? (e.total = 0, e.images = [t], e.gallery = !1, e.$el.removeClass(O.gallery)) : (e.total = t.length - 1, e.images = t, t.length > 1 && (e.gallery = !0, e.$el.addClass(O.gallery)), t = e.images[e.index]), _(e, function() {
                        a(e, t)
                    })
                },
                unload: function(e) {
                    _(e)
                }
            }
        }),
        L = A.namespace,
        D = A.classes,
        O = D.raw,
        z = A.events,
        N = A.functions,
        F = (t.window, t.$window),
        R = 0,
        X = [];
    t.Ready(function() {
        n(), F.on("scroll", n), q = t.$body
    })
}),
function(e, t) {
    function n() {
        e(".demo_container").each(function(t) {
            var n = "",
                i = e(this),
                a = i.find(".demo_example"),
                o = i.find(".demo_code");
            a.attr("id", "example-" + t), o.attr("id", "code-" + t), n += '<div class="demo_tabs contain">', n += '<a href="#example-' + t + '" class="demo_tab js-demo_tabs" data-tabs-group="demo-' + t + '">Demo</a>', n += '<a href="#code-' + t + '" class="demo_tab js-demo_tabs" data-tabs-group="demo-' + t + '">Code</a>', n += "</div>", i.prepend(n)
        })
    }

    function i(t) {
        var n = {
            theme: t
        };
        e(".js-navigation_elements").appendTo("body"), r.find(".js-background").background("destroy"), r.find(".js-carousel").carousel("destroy"), r.find(".js-checkbox, .js-radio, input[type=checkbox], input[type=radio]").checkbox("destroy"), r.find(".js-checkpoint").checkpoint("destroy"), r.find(".js-dropdown").dropdown("destroy"), r.find(".js-equalize").equalize("destroy"), r.find(".js-lightbox").lightbox("destroy"), r.find(".js-navigation").navigation("destroy"), r.find("input[type=number]").number("destroy"), r.find(".js-pagination").pagination("destroy"), r.find("input[type=range]").range("destroy"), r.find(".js-scrollbar").scrollbar("destroy"), r.find(".js-sticky").sticky("destroy"), r.find(".js-swap").swap("destroy"), r.find(".js-tabs").tabs("destroy"), r.find(".js-tooltip").tooltip("destroy"), r.find(".js-upload").upload("destroy"), r.find(".js-viewer").viewer("destroy"), r.find(".js-background").background(n), r.find(".js-carousel").carousel(n), r.find(".js-checkbox, .js-radio, input[type=checkbox], input[type=radio]").checkbox(n), r.find(".js-checkpoint").checkpoint(), r.find(".js-dropdown").dropdown(n), r.find(".js-equalize").equalize(n), r.find(".js-lightbox").lightbox(n), r.find(".js-navigation").navigation(n), r.find("input[type=number]").number(n), r.find(".js-pagination").pagination(n), r.find("input[type=range]").range(n), r.find(".js-scrollbar").scrollbar(n), r.find(".js-sticky").sticky(n), r.find(".js-swap").swap(n), r.find(".js-tabs").tabs(n), r.find(".js-tooltip").tooltip(n), r.find(".js-upload").upload(n), r.find(".js-viewer").viewer(n), r.find(".js-demo_tabs").off("update.tabs").tabs("destroy"), r.find(".js-demo_tabs").tabs({
            mobileMaxWidth: "0px",
            theme: "fs-demo"
        }).on("update.tabs", a)
    }

    function a() {
        var t = e(this),
            n = e(t.attr("href"));
        n.find(".js-background").background("resize"), n.find(".js-carousel").carousel("resize"), n.find(".js-equalize").equalize("resize"), n.find("input[type=range]").range("resize"), n.find(".js-scrollbar").scrollbar("resize"), r.find(".js-checkpoint").checkpoint("resize"), r.find(".js-sticky").sticky("resize")
    }
    var o, r, s = {};
    s.minXS = parseInt("320", 10), s.minSM = parseInt("500", 10), s.minMD = parseInt("740", 10), s.minLG = parseInt("980", 10), s.minXL = parseInt("1220", 10), s.maxXS = s.minXS - 1, s.maxSM = s.minSM - 1, s.maxMD = s.minMD - 1, s.maxLG = s.minLG - 1, s.maxXL = s.minXL - 1, s.minHTsm = parseInt("500", 10), s.minHT = parseInt("800", 10), s.maxHTsm = s.minHTsm - 1, s.maxHT = s.minHT - 1, t.Ready(function() {
        o = e(window), r = e("body"), e.mediaquery && e.mediaquery({
            minWidth: [s.minXS, s.minSM, s.minMD, s.minLG, s.minXL],
            maxWidth: [s.maxXL, s.maxLG, s.maxMD, s.maxSM, s.maxXS],
            minHeight: [s.minHTsm, s.minHT],
            maxHeight: [s.maxHT, s.maxHTsm]
        }), e.cookie && e.cookie({
            path: "/"
        }), n(), i("fs-light")
    })
}(jQuery, Formstone);
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function() {
        var e = /\blang(?:uage)?-([\w-]+)\b/i,
            t = 0,
            n = _self.Prism = {
                manual: _self.Prism && _self.Prism.manual,
                disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function(e) {
                        return e instanceof i ? new i(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function(e, t) {
                        var i = n.util.type(e);
                        switch (t = t || {}, i) {
                            case "Object":
                                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                                o = {};
                                t[n.util.objId(e)] = o;
                                for (var a in e) e.hasOwnProperty(a) && (o[a] = n.util.clone(e[a], t));
                                return o;
                            case "Array":
                                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                                var o = [];
                                return t[n.util.objId(e)] = o, e.forEach(function(e, i) {
                                    o[i] = n.util.clone(e, t)
                                }), o
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var i = n.util.clone(n.languages[e]);
                        for (var a in t) i[a] = t[a];
                        return i
                    },
                    insertBefore: function(e, t, i, a) {
                        var o = (a = a || n.languages)[e];
                        if (2 == arguments.length) {
                            i = arguments[1];
                            for (var r in i) i.hasOwnProperty(r) && (o[r] = i[r]);
                            return o
                        }
                        var s = {};
                        for (var l in o)
                            if (o.hasOwnProperty(l)) {
                                if (l == t)
                                    for (var r in i) i.hasOwnProperty(r) && (s[r] = i[r]);
                                s[l] = o[l]
                            }
                        return n.languages.DFS(n.languages, function(t, n) {
                            n === a[e] && t != e && (this[t] = s)
                        }), a[e] = s
                    },
                    DFS: function(e, t, i, a) {
                        a = a || {};
                        for (var o in e) e.hasOwnProperty(o) && (t.call(e, o, e[o], i || o), "Object" !== n.util.type(e[o]) || a[n.util.objId(e[o])] ? "Array" !== n.util.type(e[o]) || a[n.util.objId(e[o])] || (a[n.util.objId(e[o])] = !0, n.languages.DFS(e[o], t, o, a)) : (a[n.util.objId(e[o])] = !0, n.languages.DFS(e[o], t, null, a)))
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    n.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, i) {
                    var a = {
                        callback: i,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var o, r = a.elements || e.querySelectorAll(a.selector), s = 0; o = r[s++];) n.highlightElement(o, !0 === t, a.callback)
                },
                highlightElement: function(t, i, a) {
                    for (var o, r, s = t; s && !e.test(s.className);) s = s.parentNode;
                    s && (o = (s.className.match(e) || [, ""])[1].toLowerCase(), r = n.languages[o]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o, t.parentNode && (s = t.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o));
                    var l = {
                        element: t,
                        language: o,
                        grammar: r,
                        code: t.textContent
                    };
                    if (n.hooks.run("before-sanity-check", l), !l.code || !l.grammar) return l.code && (n.hooks.run("before-highlight", l), l.element.textContent = l.code, n.hooks.run("after-highlight", l)), void n.hooks.run("complete", l);
                    if (n.hooks.run("before-highlight", l), i && _self.Worker) {
                        var c = new Worker(n.filename);
                        c.onmessage = function(e) {
                            l.highlightedCode = e.data, n.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, a && a.call(l.element), n.hooks.run("after-highlight", l), n.hooks.run("complete", l)
                        }, c.postMessage(JSON.stringify({
                            language: l.language,
                            code: l.code,
                            immediateClose: !0
                        }))
                    } else l.highlightedCode = n.highlight(l.code, l.grammar, l.language), n.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", l), n.hooks.run("complete", l)
                },
                highlight: function(e, t, a) {
                    var o = {
                        code: e,
                        grammar: t,
                        language: a
                    };
                    return n.hooks.run("before-tokenize", o), o.tokens = n.tokenize(o.code, o.grammar), n.hooks.run("after-tokenize", o), i.stringify(n.util.encode(o.tokens), o.language)
                },
                matchGrammar: function(e, t, i, a, o, r, s) {
                    var l = n.Token;
                    for (var c in i)
                        if (i.hasOwnProperty(c) && i[c]) {
                            if (c == s) return;
                            var d = i[c];
                            d = "Array" === n.util.type(d) ? d : [d];
                            for (var u = 0; u < d.length; ++u) {
                                var p = d[u],
                                    f = p.inside,
                                    h = !!p.lookbehind,
                                    g = !!p.greedy,
                                    m = 0,
                                    v = p.alias;
                                if (g && !p.pattern.global) {
                                    var b = p.pattern.toString().match(/[imuy]*$/)[0];
                                    p.pattern = RegExp(p.pattern.source, b + "g")
                                }
                                p = p.pattern || p;
                                for (var y = a, w = o; y < t.length; w += t[y].length, ++y) {
                                    var x = t[y];
                                    if (t.length > e.length) return;
                                    if (!(x instanceof l)) {
                                        if (g && y != t.length - 1) {
                                            if (p.lastIndex = w, !(j = p.exec(e))) break;
                                            for (var $ = j.index + (h ? j[1].length : 0), C = j.index + j[0].length, k = y, T = w, H = t.length; k < H && (T < C || !t[k].type && !t[k - 1].greedy); ++k) $ >= (T += t[k].length) && (++y, w = T);
                                            if (t[y] instanceof l) continue;
                                            W = k - y, x = e.slice(w, T), j.index -= w
                                        } else {
                                            p.lastIndex = 0;
                                            var j = p.exec(x),
                                                W = 1
                                        }
                                        if (j) {
                                            h && (m = j[1] ? j[1].length : 0);
                                            var C = ($ = j.index + m) + (j = j[0].slice(m)).length,
                                                _ = x.slice(0, $),
                                                S = x.slice(C),
                                                M = [y, W];
                                            _ && (++y, w += _.length, M.push(_));
                                            var E = new l(c, f ? n.tokenize(j, f) : j, v, j, g);
                                            if (M.push(E), S && M.push(S), Array.prototype.splice.apply(t, M), 1 != W && n.matchGrammar(e, t, i, y, w, !0, c), r) break
                                        } else if (r) break
                                    }
                                }
                            }
                        }
                },
                tokenize: function(e, t, i) {
                    var a = [e],
                        o = t.rest;
                    if (o) {
                        for (var r in o) t[r] = o[r];
                        delete t.rest
                    }
                    return n.matchGrammar(e, a, t, 0, 0, !1), a
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var i = n.hooks.all;
                        i[e] = i[e] || [], i[e].push(t)
                    },
                    run: function(e, t) {
                        var i = n.hooks.all[e];
                        if (i && i.length)
                            for (var a, o = 0; a = i[o++];) a(t)
                    }
                }
            },
            i = n.Token = function(e, t, n, i, a) {
                this.type = e, this.content = t, this.alias = n, this.length = 0 | (i || "").length, this.greedy = !!a
            };
        if (i.stringify = function(e, t, a) {
                if ("string" == typeof e) return e;
                if ("Array" === n.util.type(e)) return e.map(function(n) {
                    return i.stringify(n, t, e)
                }).join("");
                var o = {
                    type: e.type,
                    content: i.stringify(e.content, t, a),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: a
                };
                if (e.alias) {
                    var r = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(o.classes, r)
                }
                n.hooks.run("wrap", o);
                var s = Object.keys(o.attributes).map(function(e) {
                    return e + '="' + (o.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + o.tag + ' class="' + o.classes.join(" ") + '"' + (s ? " " + s : "") + ">" + o.content + "</" + o.tag + ">"
            }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data),
                i = t.language,
                a = t.code,
                o = t.immediateClose;
            _self.postMessage(n.highlight(a, n.languages[i], i)), o && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism), Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                inside: {
                    punctuation: [/^=/, {
                        pattern: /(^|[^\\])["']/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function(e) {
    "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
        pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag)), Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
}, Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
        alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0
    }
}), Prism.languages.js = Prism.languages.javascript, "undefined" != typeof self && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function() {
    var e = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
    };
    Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t) {
        for (var n, i = t.getAttribute("data-src"), a = t, o = /\blang(?:uage)?-(?!\*)([\w-]+)\b/i; a && !o.test(a.className);) a = a.parentNode;
        if (a && (n = (t.className.match(o) || [, ""])[1]), !n) {
            var r = (i.match(/\.(\w+)$/) || [, ""])[1];
            n = e[r] || r
        }
        var s = document.createElement("code");
        s.className = "language-" + n, t.textContent = "", s.textContent = "Loading???", t.appendChild(s);
        var l = new XMLHttpRequest;
        l.open("GET", i, !0), l.onreadystatechange = function() {
            4 == l.readyState && (l.status < 400 && l.responseText ? (s.textContent = l.responseText, Prism.highlightElement(s)) : l.status >= 400 ? s.textContent = "??? Error " + l.status + " while fetching file: " + l.statusText : s.textContent = "??? Error: File does not exist or is empty")
        }, t.hasAttribute("data-download-link") && Prism.plugins.toolbar && Prism.plugins.toolbar.registerButton("download-file", function() {
            var e = document.createElement("a");
            return e.textContent = t.getAttribute("data-download-link-label") || "Download", e.setAttribute("download", ""), e.href = i, e
        }), l.send(null)
    })
}, document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight));