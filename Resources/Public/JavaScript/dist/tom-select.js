var He = Object.defineProperty;
var Me = (s, e, t) => e in s ? He(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var H = (s, e, t) => Me(s, typeof e != "symbol" ? e + "" : e, t);
function ee(s, e) {
  s.split(/\s+/).forEach((t) => {
    e(t);
  });
}
class Ve {
  constructor() {
    this._events = {};
  }
  on(e, t) {
    ee(e, (i) => {
      const n = this._events[i] || [];
      n.push(t), this._events[i] = n;
    });
  }
  off(e, t) {
    var i = arguments.length;
    if (i === 0) {
      this._events = {};
      return;
    }
    ee(e, (n) => {
      if (i === 1) {
        delete this._events[n];
        return;
      }
      const o = this._events[n];
      o !== void 0 && (o.splice(o.indexOf(t), 1), this._events[n] = o);
    });
  }
  trigger(e, ...t) {
    var i = this;
    ee(e, (n) => {
      const o = i._events[n];
      o !== void 0 && o.forEach((r) => {
        r.apply(i, t);
      });
    });
  }
}
function Ne(s) {
  return s.plugins = {}, class extends s {
    constructor() {
      super(...arguments), this.plugins = {
        names: [],
        settings: {},
        requested: {},
        loaded: {}
      };
    }
    /**
     * Registers a plugin.
     *
     * @param {function} fn
     */
    static define(e, t) {
      s.plugins[e] = {
        name: e,
        fn: t
      };
    }
    /**
     * Initializes the listed plugins (with options).
     * Acceptable formats:
     *
     * List (without options):
     *   ['a', 'b', 'c']
     *
     * List (with options):
     *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
     *
     * Hash (with options):
     *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
     *
     * @param {array|object} plugins
     */
    initializePlugins(e) {
      var t, i;
      const n = this, o = [];
      if (Array.isArray(e))
        e.forEach((r) => {
          typeof r == "string" ? o.push(r) : (n.plugins.settings[r.name] = r.options, o.push(r.name));
        });
      else if (e)
        for (t in e)
          e.hasOwnProperty(t) && (n.plugins.settings[t] = e[t], o.push(t));
      for (; i = o.shift(); )
        n.require(i);
    }
    loadPlugin(e) {
      var t = this, i = t.plugins, n = s.plugins[e];
      if (!s.plugins.hasOwnProperty(e))
        throw new Error('Unable to find "' + e + '" plugin');
      i.requested[e] = !0, i.loaded[e] = n.fn.apply(t, [t.plugins.settings[e] || {}]), i.names.push(e);
    }
    /**
     * Initializes a plugin.
     *
     */
    require(e) {
      var t = this, i = t.plugins;
      if (!t.plugins.loaded.hasOwnProperty(e)) {
        if (i.requested[e])
          throw new Error('Plugin has circular dependency ("' + e + '")');
        t.loadPlugin(e);
      }
      return i.loaded[e];
    }
  };
}
const Z = (s) => (s = s.filter(Boolean), s.length < 2 ? s[0] || "" : Ke(s) == 1 ? "[" + s.join("") + "]" : "(?:" + s.join("|") + ")"), Ie = (s) => {
  if (!Re(s))
    return s.join("");
  let e = "", t = 0;
  const i = () => {
    t > 1 && (e += "{" + t + "}");
  };
  return s.forEach((n, o) => {
    if (n === s[o - 1]) {
      t++;
      return;
    }
    i(), e += n, t = 1;
  }), i(), e;
}, Ee = (s) => {
  let e = Array.from(s);
  return Z(e);
}, Re = (s) => new Set(s).size !== s.length, K = (s) => (s + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1"), Ke = (s) => s.reduce((e, t) => Math.max(e, Be(t)), 0), Be = (s) => Array.from(s).length, Le = (s) => {
  if (s.length === 1)
    return [[s]];
  let e = [];
  const t = s.substring(1);
  return Le(t).forEach(function(n) {
    let o = n.slice(0);
    o[0] = s.charAt(0) + o[0], e.push(o), o = n.slice(0), o.unshift(s.charAt(0)), e.push(o);
  }), e;
}, je = [[0, 65535]], ze = "[̀-ͯ·ʾʼ]";
let q, $e;
const Ye = 3, ae = {}, ce = {
  "/": "⁄∕",
  0: "߀",
  a: "ⱥɐɑ",
  aa: "ꜳ",
  ae: "æǽǣ",
  ao: "ꜵ",
  au: "ꜷ",
  av: "ꜹꜻ",
  ay: "ꜽ",
  b: "ƀɓƃ",
  c: "ꜿƈȼↄ",
  d: "đɗɖᴅƌꮷԁɦ",
  e: "ɛǝᴇɇ",
  f: "ꝼƒ",
  g: "ǥɠꞡᵹꝿɢ",
  h: "ħⱨⱶɥ",
  i: "ɨı",
  j: "ɉȷ",
  k: "ƙⱪꝁꝃꝅꞣ",
  l: "łƚɫⱡꝉꝇꞁɭ",
  m: "ɱɯϻ",
  n: "ꞥƞɲꞑᴎлԉ",
  o: "øǿɔɵꝋꝍᴑ",
  oe: "œ",
  oi: "ƣ",
  oo: "ꝏ",
  ou: "ȣ",
  p: "ƥᵽꝑꝓꝕρ",
  q: "ꝗꝙɋ",
  r: "ɍɽꝛꞧꞃ",
  s: "ßȿꞩꞅʂ",
  t: "ŧƭʈⱦꞇ",
  th: "þ",
  tz: "ꜩ",
  u: "ʉ",
  v: "ʋꝟʌ",
  vy: "ꝡ",
  w: "ⱳ",
  y: "ƴɏỿ",
  z: "ƶȥɀⱬꝣ",
  hv: "ƕ"
};
for (let s in ce) {
  let e = ce[s] || "";
  for (let t = 0; t < e.length; t++) {
    let i = e.substring(t, t + 1);
    ae[i] = s;
  }
}
const Ge = new RegExp(Object.keys(ae).join("|") + "|" + ze, "gu"), Qe = (s) => {
  q === void 0 && (q = Je(je));
}, ue = (s, e = "NFKD") => s.normalize(e), J = (s) => Array.from(s).reduce(
  /**
   * @param {string} result
   * @param {string} char
   */
  (e, t) => e + Ue(t),
  ""
), Ue = (s) => (s = ue(s).toLowerCase().replace(Ge, (e) => ae[e] || ""), ue(s, "NFC"));
function* We(s) {
  for (const [e, t] of s)
    for (let i = e; i <= t; i++) {
      let n = String.fromCharCode(i), o = J(n);
      o != n.toLowerCase() && (o.length > Ye || o.length != 0 && (yield { folded: o, composed: n, code_point: i }));
    }
}
const qe = (s) => {
  const e = {}, t = (i, n) => {
    const o = e[i] || /* @__PURE__ */ new Set(), r = new RegExp("^" + Ee(o) + "$", "iu");
    n.match(r) || (o.add(K(n)), e[i] = o);
  };
  for (let i of We(s))
    t(i.folded, i.folded), t(i.folded, i.composed);
  return e;
}, Je = (s) => {
  const e = qe(s), t = {};
  let i = [];
  for (let o in e) {
    let r = e[o];
    r && (t[o] = Ee(r)), o.length > 1 && i.push(K(o));
  }
  i.sort((o, r) => r.length - o.length);
  const n = Z(i);
  return $e = new RegExp("^" + n, "u"), t;
}, Xe = (s, e = 1) => {
  let t = 0;
  return s = s.map((i) => (q[i] && (t += i.length), q[i] || i)), t >= e ? Ie(s) : "";
}, Ze = (s, e = 1) => (e = Math.max(e, s.length - 1), Z(Le(s).map((t) => Xe(t, e)))), de = (s, e = !0) => {
  let t = s.length > 1 ? 1 : 0;
  return Z(s.map((i) => {
    let n = [];
    const o = e ? i.length() : i.length() - 1;
    for (let r = 0; r < o; r++)
      n.push(Ze(i.substrs[r] || "", t));
    return Ie(n);
  }));
}, et = (s, e) => {
  for (const t of e) {
    if (t.start != s.start || t.end != s.end || t.substrs.join("") !== s.substrs.join(""))
      continue;
    let i = s.parts;
    const n = (r) => {
      for (const l of i) {
        if (l.start === r.start && l.substr === r.substr)
          return !1;
        if (!(r.length == 1 || l.length == 1) && (r.start < l.start && r.end > l.start || l.start < r.start && l.end > r.start))
          return !0;
      }
      return !1;
    };
    if (!(t.parts.filter(n).length > 0))
      return !0;
  }
  return !1;
};
class X {
  constructor() {
    H(this, "parts");
    H(this, "substrs");
    H(this, "start");
    H(this, "end");
    this.parts = [], this.substrs = [], this.start = 0, this.end = 0;
  }
  add(e) {
    e && (this.parts.push(e), this.substrs.push(e.substr), this.start = Math.min(e.start, this.start), this.end = Math.max(e.end, this.end));
  }
  last() {
    return this.parts[this.parts.length - 1];
  }
  length() {
    return this.parts.length;
  }
  clone(e, t) {
    let i = new X(), n = JSON.parse(JSON.stringify(this.parts)), o = n.pop();
    for (const a of n)
      i.add(a);
    let r = t.substr.substring(0, e - o.start), l = r.length;
    return i.add({ start: o.start, end: o.start + l, length: l, substr: r }), i;
  }
}
const tt = (s) => {
  Qe(), s = J(s);
  let e = "", t = [new X()];
  for (let i = 0; i < s.length; i++) {
    let o = s.substring(i).match($e);
    const r = s.substring(i, i + 1), l = o ? o[0] : null;
    let a = [], c = /* @__PURE__ */ new Set();
    for (const d of t) {
      const u = d.last();
      if (!u || u.length == 1 || u.end <= i)
        if (l) {
          const p = l.length;
          d.add({ start: i, end: i + p, length: p, substr: l }), c.add("1");
        } else
          d.add({ start: i, end: i + 1, length: 1, substr: r }), c.add("2");
      else if (l) {
        let p = d.clone(i, u);
        const y = l.length;
        p.add({ start: i, end: i + y, length: y, substr: l }), a.push(p);
      } else
        c.add("3");
    }
    if (a.length > 0) {
      a = a.sort((d, u) => d.length() - u.length());
      for (let d of a)
        et(d, t) || t.push(d);
      continue;
    }
    if (i > 0 && c.size == 1 && !c.has("3")) {
      e += de(t, !1);
      let d = new X();
      const u = t[0];
      u && d.add(u.last()), t = [d];
    }
  }
  return e += de(t, !0), e;
}, st = (s, e) => {
  if (s)
    return s[e];
}, it = (s, e) => {
  if (s) {
    for (var t, i = e.split("."); (t = i.shift()) && (s = s[t]); )
      ;
    return s;
  }
}, te = (s, e, t) => {
  var i, n;
  return !s || (s = s + "", e.regex == null) || (n = s.search(e.regex), n === -1) ? 0 : (i = e.string.length / s.length, n === 0 && (i += 0.5), i * t);
}, se = (s, e) => {
  var t = s[e];
  if (typeof t == "function")
    return t;
  t && !Array.isArray(t) && (s[e] = [t]);
}, Y = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, nt = (s, e) => typeof s == "number" && typeof e == "number" ? s > e ? 1 : s < e ? -1 : 0 : (s = J(s + "").toLowerCase(), e = J(e + "").toLowerCase(), s > e ? 1 : e > s ? -1 : 0);
class rt {
  /**
   * Textually searches arrays and hashes of objects
   * by property (or multiple properties). Designed
   * specifically for autocomplete.
   *
   */
  constructor(e, t) {
    H(this, "items");
    // []|{};
    H(this, "settings");
    this.items = e, this.settings = t || { diacritics: !0 };
  }
  /**
   * Splits a search string into an array of individual
   * regexps to be used to match results.
   *
   */
  tokenize(e, t, i) {
    if (!e || !e.length)
      return [];
    const n = [], o = e.split(/\s+/);
    var r;
    return i && (r = new RegExp("^(" + Object.keys(i).map(K).join("|") + "):(.*)$")), o.forEach((l) => {
      let a, c = null, d = null;
      r && (a = l.match(r)) && (c = a[1], l = a[2]), l.length > 0 && (this.settings.diacritics ? d = tt(l) || null : d = K(l), d && t && (d = "\\b" + d)), n.push({
        string: l,
        regex: d ? new RegExp(d, "iu") : null,
        field: c
      });
    }), n;
  }
  /**
   * Returns a function to be used to score individual results.
   *
   * Good matches will have a higher score than poor matches.
   * If an item is not a match, 0 will be returned by the function.
   *
   * @returns {T.ScoreFn}
   */
  getScoreFunction(e, t) {
    var i = this.prepareSearch(e, t);
    return this._getScoreFunction(i);
  }
  /**
   * @returns {T.ScoreFn}
   *
   */
  _getScoreFunction(e) {
    const t = e.tokens, i = t.length;
    if (!i)
      return function() {
        return 0;
      };
    const n = e.options.fields, o = e.weights, r = n.length, l = e.getAttrFn;
    if (!r)
      return function() {
        return 1;
      };
    const a = /* @__PURE__ */ (function() {
      return r === 1 ? function(c, d) {
        const u = n[0].field;
        return te(l(d, u), c, o[u] || 1);
      } : function(c, d) {
        var u = 0;
        if (c.field) {
          const p = l(d, c.field);
          !c.regex && p ? u += 1 / r : u += te(p, c, 1);
        } else
          Y(o, (p, y) => {
            u += te(l(d, y), c, p);
          });
        return u / r;
      };
    })();
    return i === 1 ? function(c) {
      return a(t[0], c);
    } : e.options.conjunction === "and" ? function(c) {
      var d, u = 0;
      for (let p of t) {
        if (d = a(p, c), d <= 0)
          return 0;
        u += d;
      }
      return u / i;
    } : function(c) {
      var d = 0;
      return Y(t, (u) => {
        d += a(u, c);
      }), d / i;
    };
  }
  /**
   * Returns a function that can be used to compare two
   * results, for sorting purposes. If no sorting should
   * be performed, `null` will be returned.
   *
   * @return function(a,b)
   */
  getSortFunction(e, t) {
    var i = this.prepareSearch(e, t);
    return this._getSortFunction(i);
  }
  _getSortFunction(e) {
    var t, i = [];
    const n = this, o = e.options, r = !e.query && o.sort_empty ? o.sort_empty : o.sort;
    if (typeof r == "function")
      return r.bind(this);
    const l = function(c, d) {
      return c === "$score" ? d.score : e.getAttrFn(n.items[d.id], c);
    };
    if (r)
      for (let c of r)
        (e.query || c.field !== "$score") && i.push(c);
    if (e.query) {
      t = !0;
      for (let c of i)
        if (c.field === "$score") {
          t = !1;
          break;
        }
      t && i.unshift({ field: "$score", direction: "desc" });
    } else
      i = i.filter((c) => c.field !== "$score");
    return i.length ? function(c, d) {
      var u, p;
      for (let y of i)
        if (p = y.field, u = (y.direction === "desc" ? -1 : 1) * nt(l(p, c), l(p, d)), u)
          return u;
      return 0;
    } : null;
  }
  /**
   * Parses a search query and returns an object
   * with tokens and fields ready to be populated
   * with results.
   *
   */
  prepareSearch(e, t) {
    const i = {};
    var n = Object.assign({}, t);
    if (se(n, "sort"), se(n, "sort_empty"), n.fields) {
      se(n, "fields");
      const o = [];
      n.fields.forEach((r) => {
        typeof r == "string" && (r = { field: r, weight: 1 }), o.push(r), i[r.field] = "weight" in r ? r.weight : 1;
      }), n.fields = o;
    }
    return {
      options: n,
      query: e.toLowerCase().trim(),
      tokens: this.tokenize(e, n.respect_word_boundaries, i),
      total: 0,
      items: [],
      weights: i,
      getAttrFn: n.nesting ? it : st
    };
  }
  /**
   * Searches through all items and returns a sorted array of matches.
   *
   */
  search(e, t) {
    var i = this, n, o;
    o = this.prepareSearch(e, t), t = o.options, e = o.query;
    const r = t.score || i._getScoreFunction(o);
    e.length ? Y(i.items, (a, c) => {
      n = r(a), (t.filter === !1 || n > 0) && o.items.push({ score: n, id: c });
    }) : Y(i.items, (a, c) => {
      o.items.push({ score: 1, id: c });
    });
    const l = i._getSortFunction(o);
    return l && o.items.sort(l), o.total = o.items.length, typeof t.limit == "number" && (o.items = o.items.slice(0, t.limit)), o;
  }
}
const T = (s) => typeof s > "u" || s === null ? null : W(s), W = (s) => typeof s == "boolean" ? s ? "1" : "0" : s + "", ie = (s) => (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), ot = (s, e) => e > 0 ? window.setTimeout(s, e) : (s.call(null), null), lt = (s, e) => {
  var t;
  return function(i, n) {
    var o = this;
    t && (o.loading = Math.max(o.loading - 1, 0), clearTimeout(t)), t = setTimeout(function() {
      t = null, o.loadedSearches[i] = !0, s.call(o, i, n);
    }, e);
  };
}, fe = (s, e, t) => {
  var i, n = s.trigger, o = {};
  s.trigger = function() {
    var r = arguments[0];
    if (e.indexOf(r) !== -1)
      o[r] = arguments;
    else
      return n.apply(s, arguments);
  }, t.apply(s, []), s.trigger = n;
  for (i of e)
    i in o && n.apply(s, o[i]);
}, at = (s) => ({
  start: s.selectionStart || 0,
  length: (s.selectionEnd || 0) - (s.selectionStart || 0)
}), x = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, $ = (s, e, t, i) => {
  s.addEventListener(e, t, i);
}, M = (s, e) => {
  if (!e || !e[s])
    return !1;
  var t = (e.altKey ? 1 : 0) + (e.ctrlKey ? 1 : 0) + (e.shiftKey ? 1 : 0) + (e.metaKey ? 1 : 0);
  return t === 1;
}, ne = (s, e) => {
  const t = s.getAttribute("id");
  return t || (s.setAttribute("id", e), e);
}, pe = (s) => s.replace(/[\\"']/g, "\\$&"), V = (s, e) => {
  e && s.append(e);
}, E = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, P = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (Fe(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, Fe = (s) => typeof s == "string" && s.indexOf("<") > -1, ct = (s) => s.replace(/['"\\]/g, "\\$&"), re = (s, e) => {
  var t = document.createEvent("HTMLEvents");
  t.initEvent(e, !0, !1), s.dispatchEvent(t);
}, G = (s, e) => {
  Object.assign(s.style, e);
}, k = (s, ...e) => {
  var t = ke(e);
  s = Te(s), s.map((i) => {
    t.map((n) => {
      i.classList.add(n);
    });
  });
}, D = (s, ...e) => {
  var t = ke(e);
  s = Te(s), s.map((i) => {
    t.map((n) => {
      i.classList.remove(n);
    });
  });
}, ke = (s) => {
  var e = [];
  return E(s, (t) => {
    typeof t == "string" && (t = t.trim().split(/[\t\n\f\r\s]/)), Array.isArray(t) && (e = e.concat(t));
  }), e.filter(Boolean);
}, Te = (s) => (Array.isArray(s) || (s = [s]), s), oe = (s, e, t) => {
  if (!(t && !t.contains(s)))
    for (; s && s.matches; ) {
      if (s.matches(e))
        return s;
      s = s.parentNode;
    }
}, he = (s, e = 0) => e > 0 ? s[s.length - 1] : s[0], ut = (s) => Object.keys(s).length === 0, ge = (s, e) => {
  if (!s)
    return -1;
  e = e || s.nodeName;
  for (var t = 0; s = s.previousElementSibling; )
    s.matches(e) && t++;
  return t;
}, b = (s, e) => {
  E(e, (t, i) => {
    t == null ? s.removeAttribute(i) : s.setAttribute(i, "" + t);
  });
}, le = (s, e) => {
  s.parentNode && s.parentNode.replaceChild(e, s);
}, dt = (s, e) => {
  if (e === null)
    return;
  if (typeof e == "string") {
    if (!e.length)
      return;
    e = new RegExp(e, "i");
  }
  const t = (o) => {
    var r = o.data.match(e);
    if (r && o.data.length > 0) {
      var l = document.createElement("span");
      l.className = "highlight";
      var a = o.splitText(r.index);
      a.splitText(r[0].length);
      var c = a.cloneNode(!0);
      return l.appendChild(c), le(a, l), 1;
    }
    return 0;
  }, i = (o) => {
    o.nodeType === 1 && o.childNodes && !/(script|style)/i.test(o.tagName) && (o.className !== "highlight" || o.tagName !== "SPAN") && Array.from(o.childNodes).forEach((r) => {
      n(r);
    });
  }, n = (o) => o.nodeType === 3 ? t(o) : (i(o), 0);
  n(s);
}, ft = (s) => {
  var e = s.querySelectorAll("span.highlight");
  Array.prototype.forEach.call(e, function(t) {
    var i = t.parentNode;
    i.replaceChild(t.firstChild, t), i.normalize();
  });
}, pt = 65, ht = 13, gt = 27, mt = 37, vt = 38, _t = 39, yt = 40, me = 8, Ot = 46, ve = 9, bt = typeof navigator > "u" ? !1 : /Mac/.test(navigator.userAgent), Q = bt ? "metaKey" : "ctrlKey", _e = {
  options: [],
  optgroups: [],
  plugins: [],
  delimiter: ",",
  splitOn: null,
  // regexp or string for splitting up values from a paste command
  persist: !0,
  diacritics: !0,
  create: null,
  createOnBlur: !1,
  createFilter: null,
  clearAfterSelect: !1,
  highlight: !0,
  openOnFocus: !0,
  shouldOpen: null,
  maxOptions: 50,
  maxItems: null,
  hideSelected: null,
  duplicates: !1,
  addPrecedence: !1,
  selectOnTab: !1,
  preload: null,
  allowEmptyOption: !1,
  //closeAfterSelect: false,
  refreshThrottle: 300,
  loadThrottle: 300,
  loadingClass: "loading",
  dataAttr: null,
  //'data-data',
  optgroupField: "optgroup",
  valueField: "value",
  labelField: "text",
  disabledField: "disabled",
  optgroupLabelField: "label",
  optgroupValueField: "value",
  lockOptgroupOrder: !1,
  sortField: "$order",
  searchField: ["text"],
  searchConjunction: "and",
  mode: null,
  wrapperClass: "ts-wrapper",
  controlClass: "ts-control",
  dropdownClass: "ts-dropdown",
  dropdownContentClass: "ts-dropdown-content",
  itemClass: "item",
  optionClass: "option",
  dropdownParent: null,
  controlInput: '<input type="text" autocomplete="off" size="1" />',
  copyClassesToDropdown: !1,
  placeholder: null,
  hidePlaceholder: null,
  shouldLoad: function(s) {
    return s.length > 0;
  },
  /*
  load                 : null, // function(query, callback) { ... }
  score                : null, // function(search) { ... }
  onInitialize         : null, // function() { ... }
  onChange             : null, // function(value) { ... }
  onItemAdd            : null, // function(value, $item) { ... }
  onItemRemove         : null, // function(value) { ... }
  onClear              : null, // function() { ... }
  onOptionAdd          : null, // function(value, data) { ... }
  onOptionRemove       : null, // function(value) { ... }
  onOptionClear        : null, // function() { ... }
  onOptionGroupAdd     : null, // function(id, data) { ... }
  onOptionGroupRemove  : null, // function(id) { ... }
  onOptionGroupClear   : null, // function() { ... }
  onDropdownOpen       : null, // function(dropdown) { ... }
  onDropdownClose      : null, // function(dropdown) { ... }
  onType               : null, // function(str) { ... }
  onDelete             : null, // function(values) { ... }
  */
  render: {
    /*
    item: null,
    optgroup: null,
    optgroup_header: null,
    option: null,
    option_create: null
    */
  }
};
function ye(s, e) {
  var t = Object.assign({}, _e, e), i = t.dataAttr, n = t.labelField, o = t.valueField, r = t.disabledField, l = t.optgroupField, a = t.optgroupLabelField, c = t.optgroupValueField, d = s.tagName.toLowerCase(), u = s.getAttribute("placeholder") || s.getAttribute("data-placeholder");
  if (!u && !t.allowEmptyOption) {
    let m = s.querySelector('option[value=""]');
    m && (u = m.textContent);
  }
  var p = {
    placeholder: u,
    options: [],
    optgroups: [],
    items: [],
    maxItems: null
  }, y = () => {
    var m, O = p.options, _ = {}, S = 1;
    let h = 0;
    var w = (C) => {
      var v = Object.assign({}, C.dataset), g = i && v[i];
      return typeof g == "string" && g.length && (v = Object.assign(v, JSON.parse(g))), v;
    }, B = (C, v) => {
      var g = T(C.value);
      if (g != null && !(!g && !t.allowEmptyOption)) {
        if (_.hasOwnProperty(g)) {
          if (v) {
            var I = _[g][l];
            I ? Array.isArray(I) ? I.push(v) : _[g][l] = [I, v] : _[g][l] = v;
          }
        } else {
          var A = w(C);
          A[n] = A[n] || C.textContent, A[o] = A[o] || g, A[r] = A[r] || C.disabled, A[l] = A[l] || v, A.$option = C, A.$order = A.$order || ++h, _[g] = A, O.push(A);
        }
        C.selected && p.items.push(g);
      }
    }, j = (C) => {
      var v, g;
      g = w(C), g[a] = g[a] || C.getAttribute("label") || "", g[c] = g[c] || S++, g[r] = g[r] || C.disabled, g.$order = g.$order || ++h, p.optgroups.push(g), v = g[c], E(C.children, (I) => {
        B(I, v);
      });
    };
    p.maxItems = s.hasAttribute("multiple") ? null : 1, E(s.children, (C) => {
      m = C.tagName.toLowerCase(), m === "optgroup" ? j(C) : m === "option" && B(C);
    });
  }, f = () => {
    const m = s.getAttribute(i);
    if (m)
      p.options = JSON.parse(m), E(p.options, (_) => {
        p.items.push(_[o]);
      });
    else {
      var O = s.value.trim() || "";
      if (!t.allowEmptyOption && !O.length)
        return;
      const _ = O.split(t.delimiter);
      E(_, (S) => {
        const h = {};
        h[n] = S, h[o] = S, p.options.push(h);
      }), p.items = _;
    }
  };
  return d === "select" ? y() : f(), Object.assign({}, _e, p, e);
}
var Oe = 0;
class F extends Ne(Ve) {
  constructor(e, t) {
    super(), this.order = 0, this.isOpen = !1, this.isDisabled = !1, this.isReadOnly = !1, this.isInvalid = !1, this.isValid = !0, this.isLocked = !1, this.isFocused = !1, this.isInputHidden = !1, this.isSetup = !1, this.ignoreFocus = !1, this.ignoreHover = !1, this.hasOptions = !1, this.lastValue = "", this.caretPos = 0, this.loading = 0, this.loadedSearches = {}, this.activeOption = null, this.activeItems = [], this.optgroups = {}, this.options = {}, this.userOptions = {}, this.items = [], this.refreshTimeout = null, Oe++;
    var i, n = P(e);
    if (n.tomselect)
      throw new Error("Tom Select already initialized on this element");
    n.tomselect = this;
    var o = window.getComputedStyle && window.getComputedStyle(n, null);
    i = o.getPropertyValue("direction");
    const r = ye(n, t);
    this.settings = r, this.input = n, this.tabIndex = n.tabIndex || 0, this.is_select_tag = n.tagName.toLowerCase() === "select", this.rtl = /rtl/i.test(i), this.inputId = ne(n, "tomselect-" + Oe), this.isRequired = n.required, this.sifter = new rt(this.options, { diacritics: r.diacritics }), r.mode = r.mode || (r.maxItems === 1 ? "single" : "multi"), typeof r.hideSelected != "boolean" && (r.hideSelected = r.mode === "multi"), typeof r.hidePlaceholder != "boolean" && (r.hidePlaceholder = r.mode !== "multi");
    var l = r.createFilter;
    typeof l != "function" && (typeof l == "string" && (l = new RegExp(l)), l instanceof RegExp ? r.createFilter = (O) => l.test(O) : r.createFilter = (O) => this.settings.duplicates || !this.options[O]), this.initializePlugins(r.plugins), this.setupCallbacks(), this.setupTemplates();
    const a = P("<div>"), c = P("<div>"), d = this._render("dropdown"), u = P('<div role="listbox" tabindex="-1">'), p = this.input.getAttribute("class") || "", y = r.mode;
    var f;
    if (k(a, r.wrapperClass, p, y), k(c, r.controlClass), V(a, c), k(d, r.dropdownClass, y), r.copyClassesToDropdown && k(d, p), k(u, r.dropdownContentClass), V(d, u), P(r.dropdownParent || a).appendChild(d), Fe(r.controlInput)) {
      f = P(r.controlInput);
      var m = ["autocorrect", "autocapitalize", "autocomplete", "spellcheck", "aria-label"];
      E(m, (O) => {
        n.getAttribute(O) && b(f, { [O]: n.getAttribute(O) });
      }), f.tabIndex = -1, c.appendChild(f), this.focus_node = f;
    } else r.controlInput ? (f = P(r.controlInput), this.focus_node = f) : (f = P("<input/>"), this.focus_node = c);
    this.wrapper = a, this.dropdown = d, this.dropdown_content = u, this.control = c, this.control_input = f, this.setup();
  }
  /**
   * set up event bindings.
   *
   */
  setup() {
    const e = this, t = e.settings, i = e.control_input, n = e.dropdown, o = e.dropdown_content, r = e.wrapper, l = e.control, a = e.input, c = e.focus_node, d = { passive: !0 }, u = e.inputId + "-ts-dropdown";
    b(o, {
      id: u
    }), b(c, {
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-expanded": "false",
      "aria-controls": u
    });
    const p = ne(c, e.inputId + "-ts-control"), y = "label[for='" + ct(e.inputId) + "']", f = document.querySelector(y), m = e.focus.bind(e);
    if (f) {
      $(f, "click", m), b(f, { for: p });
      const h = ne(f, e.inputId + "-ts-label");
      b(c, { "aria-labelledby": h }), b(o, { "aria-labelledby": h });
    }
    if (r.style.width = a.style.width, r.style.minWidth = a.style.minWidth, r.style.maxWidth = a.style.maxWidth, e.plugins.names.length) {
      const h = "plugin-" + e.plugins.names.join(" plugin-");
      k([r, n], h);
    }
    (t.maxItems === null || t.maxItems > 1) && e.is_select_tag && b(a, { multiple: "multiple" }), t.placeholder && b(i, { placeholder: t.placeholder }), !t.splitOn && t.delimiter && (t.splitOn = new RegExp("\\s*" + K(t.delimiter) + "+\\s*")), t.load && t.loadThrottle && (t.load = lt(t.load, t.loadThrottle)), $(n, "mousemove", () => {
      e.ignoreHover = !1;
    }), $(n, "mouseenter", (h) => {
      var w = oe(h.target, "[data-selectable]", n);
      w && e.onOptionHover(h, w);
    }, { capture: !0 }), $(n, "click", (h) => {
      const w = oe(h.target, "[data-selectable]");
      w && (e.onOptionSelect(h, w), x(h, !0));
    }), $(l, "click", (h) => {
      var w = oe(h.target, "[data-ts-item]", l);
      if (w && e.onItemSelect(h, w)) {
        x(h, !0);
        return;
      }
      i.value == "" && (e.onClick(), x(h, !0));
    }), $(c, "keydown", (h) => e.onKeyDown(h)), $(i, "keypress", (h) => e.onKeyPress(h)), $(i, "input", (h) => e.onInput(h)), $(c, "blur", (h) => e.onBlur(h)), $(c, "focus", (h) => e.onFocus(h)), $(i, "paste", (h) => e.onPaste(h));
    const O = (h) => {
      const w = h.composedPath()[0];
      if (!r.contains(w) && !n.contains(w)) {
        e.isFocused && e.blur(), e.inputState();
        return;
      }
      w == i && e.isOpen ? h.stopPropagation() : x(h, !0);
    }, _ = () => {
      e.isOpen && e.positionDropdown();
    }, S = () => {
      e.isValid && (e.isValid = !1, e.isInvalid = !0, e.refreshState());
    };
    $(a, "invalid", S), $(document, "mousedown", O), $(window, "scroll", _, d), $(window, "resize", _, d), this._destroy = () => {
      a.removeEventListener("invalid", S), document.removeEventListener("mousedown", O), window.removeEventListener("scroll", _), window.removeEventListener("resize", _), f && f.removeEventListener("click", m);
    }, this.revertSettings = {
      innerHTML: a.innerHTML,
      tabIndex: a.tabIndex
    }, a.tabIndex = -1, a.insertAdjacentElement("afterend", e.wrapper), e.sync(!1), t.items = [], delete t.optgroups, delete t.options, e.refreshItems(), e.close(!1), e.inputState(), e.isSetup = !0, a.disabled ? e.disable() : a.readOnly ? e.setReadOnly(!0) : e.enable(), e.on("change", this.onChange), k(a, "tomselected", "ts-hidden-accessible"), e.trigger("initialize"), t.preload === !0 && e.preload();
  }
  /**
   * Register options and optgroups
   *
   */
  setupOptions(e = [], t = []) {
    this.addOptions(e), E(t, (i) => {
      this.registerOptionGroup(i);
    });
  }
  /**
   * Sets up default rendering functions.
   */
  setupTemplates() {
    var e = this, t = e.settings.labelField, i = e.settings.optgroupLabelField, n = {
      optgroup: (o) => {
        let r = document.createElement("div");
        return r.className = "optgroup", r.appendChild(o.options), r;
      },
      optgroup_header: (o, r) => '<div class="optgroup-header">' + r(o[i]) + "</div>",
      option: (o, r) => "<div>" + r(o[t]) + "</div>",
      item: (o, r) => "<div>" + r(o[t]) + "</div>",
      option_create: (o, r) => '<div class="create">Add <strong>' + r(o.input) + "</strong>&hellip;</div>",
      no_results: () => '<div class="no-results">No results found</div>',
      loading: () => '<div class="spinner"></div>',
      not_loading: () => {
      },
      dropdown: () => "<div></div>"
    };
    e.settings.render = Object.assign({}, n, e.settings.render);
  }
  /**
   * Maps fired events to callbacks provided
   * in the settings used when creating the control.
   */
  setupCallbacks() {
    var e, t, i = {
      initialize: "onInitialize",
      change: "onChange",
      item_add: "onItemAdd",
      item_remove: "onItemRemove",
      item_select: "onItemSelect",
      clear: "onClear",
      option_add: "onOptionAdd",
      option_remove: "onOptionRemove",
      option_clear: "onOptionClear",
      optgroup_add: "onOptionGroupAdd",
      optgroup_remove: "onOptionGroupRemove",
      optgroup_clear: "onOptionGroupClear",
      dropdown_open: "onDropdownOpen",
      dropdown_close: "onDropdownClose",
      type: "onType",
      load: "onLoad",
      focus: "onFocus",
      blur: "onBlur"
    };
    for (e in i)
      t = this.settings[i[e]], t && this.on(e, t);
  }
  /**
   * Sync the Tom Select instance with the original input or select
   *
   */
  sync(e = !0) {
    const t = this, i = e ? ye(t.input, { delimiter: t.settings.delimiter, allowEmptyOption: t.settings.allowEmptyOption }) : t.settings;
    t.setupOptions(i.options, i.optgroups), t.setValue(i.items || [], !0), t.lastQuery = null;
  }
  /**
   * Triggered when the main control element
   * has a click event.
   *
   */
  onClick() {
    var e = this;
    if (e.activeItems.length > 0) {
      e.clearActiveItems(), e.focus();
      return;
    }
    e.isFocused && e.isOpen ? e.blur() : e.focus();
  }
  /**
   * @deprecated v1.7
   *
   */
  onMouseDown() {
  }
  /**
   * Triggered when the value of the control has been changed.
   * This should propagate the event to the original DOM
   * input / select element.
   */
  onChange() {
    re(this.input, "input"), re(this.input, "change");
  }
  /**
   * Triggered on <input> paste.
   *
   */
  onPaste(e) {
    var t = this;
    if (t.isInputHidden || t.isLocked) {
      x(e);
      return;
    }
    t.settings.splitOn && setTimeout(() => {
      var i = t.inputValue();
      if (i.match(t.settings.splitOn)) {
        var n = i.trim().split(t.settings.splitOn);
        E(n, (o) => {
          T(o) && (this.options[o] ? t.addItem(o) : t.createItem(o));
        });
      }
    }, 0);
  }
  /**
   * Triggered on <input> keypress.
   *
   */
  onKeyPress(e) {
    var t = this;
    if (t.isLocked) {
      x(e);
      return;
    }
    var i = String.fromCharCode(e.keyCode || e.which);
    if (t.settings.create && t.settings.mode === "multi" && i === t.settings.delimiter) {
      t.createItem(), x(e);
      return;
    }
  }
  /**
   * Triggered on <input> keydown.
   *
   */
  onKeyDown(e) {
    var t = this;
    if (t.ignoreHover = !0, t.isLocked) {
      e.keyCode !== ve && x(e);
      return;
    }
    switch (e.keyCode) {
      // ctrl+A: select all
      case pt:
        if (M(Q, e) && t.control_input.value == "") {
          x(e), t.selectAll();
          return;
        }
        break;
      // esc: close dropdown
      case gt:
        t.isOpen && (x(e, !0), t.close()), t.clearActiveItems();
        return;
      // down: open dropdown or move selection down
      case yt:
        if (!t.isOpen && t.hasOptions)
          t.open();
        else if (t.activeOption) {
          let i = t.getAdjacent(t.activeOption, 1);
          i && t.setActiveOption(i);
        }
        x(e);
        return;
      // up: move selection up
      case vt:
        if (t.activeOption) {
          let i = t.getAdjacent(t.activeOption, -1);
          i && t.setActiveOption(i);
        }
        x(e);
        return;
      // return: select active option
      case ht:
        t.canSelect(t.activeOption) ? (t.onOptionSelect(e, t.activeOption), x(e)) : (t.settings.create && t.createItem() || document.activeElement == t.control_input && t.isOpen) && x(e);
        return;
      // left: modifiy item selection to the left
      case mt:
        t.advanceSelection(-1, e);
        return;
      // right: modifiy item selection to the right
      case _t:
        t.advanceSelection(1, e);
        return;
      // tab: select active option and/or create item
      case ve:
        t.settings.selectOnTab && (t.canSelect(t.activeOption) ? (t.onOptionSelect(e, t.activeOption), x(e)) : t.settings.create && t.createItem() && x(e));
        return;
      // delete|backspace: delete items
      case me:
      case Ot:
        t.deleteSelection(e);
        return;
    }
    t.isInputHidden && !M(Q, e) && x(e);
  }
  /**
   * Triggered on <input> keyup.
   *
   */
  onInput(e) {
    if (this.isLocked)
      return;
    const t = this.inputValue();
    if (this.lastValue !== t) {
      if (this.lastValue = t, t == "") {
        this._onInput();
        return;
      }
      this.refreshTimeout && window.clearTimeout(this.refreshTimeout), this.refreshTimeout = ot(() => {
        this.refreshTimeout = null, this._onInput();
      }, this.settings.refreshThrottle);
    }
  }
  _onInput() {
    const e = this.lastValue;
    this.settings.shouldLoad.call(this, e) && this.load(e), this.refreshOptions(), this.trigger("type", e);
  }
  /**
   * Triggered when the user rolls over
   * an option in the autocomplete dropdown menu.
   *
   */
  onOptionHover(e, t) {
    this.ignoreHover || this.setActiveOption(t, !1);
  }
  /**
   * Triggered on <input> focus.
   *
   */
  onFocus(e) {
    var t = this, i = t.isFocused;
    if (t.isDisabled || t.isReadOnly) {
      t.blur(), x(e);
      return;
    }
    t.ignoreFocus || (t.isFocused = !0, t.settings.preload === "focus" && t.preload(), i || t.trigger("focus"), t.activeItems.length || (t.inputState(), t.refreshOptions(!!t.settings.openOnFocus)), t.refreshState());
  }
  /**
   * Triggered on <input> blur.
   *
   */
  onBlur(e) {
    if (document.hasFocus() !== !1) {
      var t = this;
      if (t.isFocused) {
        t.isFocused = !1, t.ignoreFocus = !1;
        var i = () => {
          t.close(), t.setActiveItem(), t.setCaret(t.items.length), t.trigger("blur");
        };
        t.settings.create && t.settings.createOnBlur ? t.createItem(null, i) : i();
      }
    }
  }
  /**
   * Triggered when the user clicks on an option
   * in the autocomplete dropdown menu.
   *
   */
  onOptionSelect(e, t) {
    var i, n = this;
    t.parentElement && t.parentElement.matches("[data-disabled]") || (t.classList.contains("create") ? n.createItem(null, () => {
      n.settings.closeAfterSelect ? n.close() : n.settings.clearAfterSelect && n.setTextboxValue();
    }) : (i = t.dataset.value, typeof i < "u" && (n.lastQuery = null, n.addItem(i), n.settings.closeAfterSelect ? n.close() : n.settings.clearAfterSelect && n.setTextboxValue(), !n.settings.hideSelected && e.type && /click/.test(e.type) && n.setActiveOption(t))));
  }
  /**
   * Return true if the given option can be selected
   *
   */
  canSelect(e) {
    return !!(this.isOpen && e && this.dropdown_content.contains(e));
  }
  /**
   * Triggered when the user clicks on an item
   * that has been selected.
   *
   */
  onItemSelect(e, t) {
    var i = this;
    return !i.isLocked && i.settings.mode === "multi" ? (x(e), i.setActiveItem(t, e), !0) : !1;
  }
  /**
   * Determines whether or not to invoke
   * the user-provided option provider / loader
   *
   * Note, there is a subtle difference between
   * this.canLoad() and this.settings.shouldLoad();
   *
   *	- settings.shouldLoad() is a user-input validator.
   *	When false is returned, the not_loading template
   *	will be added to the dropdown
   *
   *	- canLoad() is lower level validator that checks
   * 	the Tom Select instance. There is no inherent user
   *	feedback when canLoad returns false
   *
   */
  canLoad(e) {
    return !(!this.settings.load || this.loadedSearches.hasOwnProperty(e));
  }
  /**
   * Invokes the user-provided option provider / loader.
   *
   */
  load(e) {
    const t = this;
    if (!t.canLoad(e))
      return;
    k(t.wrapper, t.settings.loadingClass), t.loading++;
    const i = t.loadCallback.bind(t);
    t.settings.load.call(t, e, i);
  }
  /**
   * Invoked by the user-provided option provider
   *
   */
  loadCallback(e, t) {
    const i = this;
    i.loading = Math.max(i.loading - 1, 0), i.lastQuery = null, i.clearActiveOption(), i.setupOptions(e, t), i.refreshOptions(i.isFocused && !i.isInputHidden), i.loading || D(i.wrapper, i.settings.loadingClass), i.trigger("load", e, t);
  }
  preload() {
    var e = this.wrapper.classList;
    e.contains("preloaded") || (e.add("preloaded"), this.load(""));
  }
  /**
   * Sets the input field of the control to the specified value.
   *
   */
  setTextboxValue(e = "") {
    var t = this.control_input, i = t.value !== e;
    i && (t.value = e, re(t, "update"), this.lastValue = e);
  }
  /**
   * Returns the value of the control. If multiple items
   * can be selected (e.g. <select multiple>), this returns
   * an array. If only one item can be selected, this
   * returns a string.
   *
   */
  getValue() {
    return this.is_select_tag && this.input.hasAttribute("multiple") ? this.items : this.items.join(this.settings.delimiter);
  }
  /**
   * Resets the selected items to the given value.
   *
   */
  setValue(e, t) {
    var i = t ? [] : ["change"];
    fe(this, i, () => {
      this.clear(t), this.addItems(e, t);
    });
  }
  /**
   * Resets the number of max items to the given value
   *
   */
  setMaxItems(e) {
    e === 0 && (e = null), this.settings.maxItems = e, this.refreshState();
  }
  /**
   * Sets the selected item.
   *
   */
  setActiveItem(e, t) {
    var i = this, n, o, r, l, a, c;
    if (i.settings.mode !== "single") {
      if (!e) {
        i.clearActiveItems(), i.isFocused && i.inputState();
        return;
      }
      if (n = t && t.type.toLowerCase(), n === "click" && M("shiftKey", t) && i.activeItems.length) {
        for (c = i.getLastActive(), r = Array.prototype.indexOf.call(i.control.children, c), l = Array.prototype.indexOf.call(i.control.children, e), r > l && (a = r, r = l, l = a), o = r; o <= l; o++)
          e = i.control.children[o], i.activeItems.indexOf(e) === -1 && i.setActiveItemClass(e);
        x(t);
      } else n === "click" && M(Q, t) || n === "keydown" && M("shiftKey", t) ? e.classList.contains("active") ? i.removeActiveItem(e) : i.setActiveItemClass(e) : (i.clearActiveItems(), i.setActiveItemClass(e));
      i.inputState(), i.isFocused || i.focus();
    }
  }
  /**
   * Set the active and last-active classes
   *
   */
  setActiveItemClass(e) {
    const t = this, i = t.control.querySelector(".last-active");
    i && D(i, "last-active"), k(e, "active last-active"), t.trigger("item_select", e), t.activeItems.indexOf(e) == -1 && t.activeItems.push(e);
  }
  /**
   * Remove active item
   *
   */
  removeActiveItem(e) {
    var t = this.activeItems.indexOf(e);
    this.activeItems.splice(t, 1), D(e, "active");
  }
  /**
   * Clears all the active items
   *
   */
  clearActiveItems() {
    D(this.activeItems, "active"), this.activeItems = [];
  }
  /**
   * Sets the selected item in the dropdown menu
   * of available options.
   *
   */
  setActiveOption(e, t = !0) {
    e !== this.activeOption && (this.clearActiveOption(), e && (this.activeOption = e, b(this.focus_node, { "aria-activedescendant": e.getAttribute("id") }), b(e, { "aria-selected": "true" }), k(e, "active"), t && this.scrollToOption(e)));
  }
  /**
   * Sets the dropdown_content scrollTop to display the option
   *
   */
  scrollToOption(e, t) {
    if (!e)
      return;
    const i = this.dropdown_content, n = i.clientHeight, o = i.scrollTop || 0, r = e.offsetHeight, l = e.getBoundingClientRect().top - i.getBoundingClientRect().top + o;
    l + r > n + o ? this.scroll(l - n + r, t) : l < o && this.scroll(l, t);
  }
  /**
   * Scroll the dropdown to the given position
   *
   */
  scroll(e, t) {
    const i = this.dropdown_content;
    t && (i.style.scrollBehavior = t), i.scrollTop = e, i.style.scrollBehavior = "";
  }
  /**
   * Clears the active option
   *
   */
  clearActiveOption() {
    this.activeOption && (D(this.activeOption, "active"), b(this.activeOption, { "aria-selected": null })), this.activeOption = null, b(this.focus_node, { "aria-activedescendant": null });
  }
  /**
   * Selects all items (CTRL + A).
   */
  selectAll() {
    const e = this;
    if (e.settings.mode === "single")
      return;
    const t = e.controlChildren();
    t.length && (e.inputState(), e.close(), e.activeItems = t, E(t, (i) => {
      e.setActiveItemClass(i);
    }));
  }
  /**
   * Determines if the control_input should be in a hidden or visible state
   *
   */
  inputState() {
    var e = this;
    e.control.contains(e.control_input) && (b(e.control_input, { placeholder: e.settings.placeholder }), e.activeItems.length > 0 || !e.isFocused && e.settings.hidePlaceholder && e.items.length > 0 ? (e.setTextboxValue(), e.isInputHidden = !0) : (e.settings.hidePlaceholder && e.items.length > 0 && b(e.control_input, { placeholder: "" }), e.isInputHidden = !1), e.wrapper.classList.toggle("input-hidden", e.isInputHidden));
  }
  /**
   * Get the input value
   */
  inputValue() {
    return this.control_input.value.trim();
  }
  /**
   * Gives the control focus.
   */
  focus() {
    var e = this;
    e.isDisabled || e.isReadOnly || (e.ignoreFocus = !0, e.control_input.offsetWidth ? e.control_input.focus() : e.focus_node.focus(), setTimeout(() => {
      e.ignoreFocus = !1, e.onFocus();
    }, 0));
  }
  /**
   * Forces the control out of focus.
   *
   */
  blur() {
    this.focus_node.blur(), this.onBlur();
  }
  /**
   * Returns a function that scores an object
   * to show how good of a match it is to the
   * provided query.
   *
   * @return {function}
   */
  getScoreFunction(e) {
    return this.sifter.getScoreFunction(e, this.getSearchOptions());
  }
  /**
   * Returns search options for sifter (the system
   * for scoring and sorting results).
   *
   * @see https://github.com/orchidjs/sifter.js
   * @return {object}
   */
  getSearchOptions() {
    var e = this.settings, t = e.sortField;
    return typeof e.sortField == "string" && (t = [{ field: e.sortField }]), {
      fields: e.searchField,
      conjunction: e.searchConjunction,
      sort: t,
      nesting: e.nesting
    };
  }
  /**
   * Searches through available options and returns
   * a sorted array of matches.
   *
   */
  search(e) {
    var t, i, n = this, o = this.getSearchOptions();
    if (n.settings.score && (i = n.settings.score.call(n, e), typeof i != "function"))
      throw new Error('Tom Select "score" setting must be a function that returns a function');
    return e !== n.lastQuery ? (n.lastQuery = e, /(.)\1{15,}/.test(e) && (e = ""), t = n.sifter.search(e, Object.assign(o, { score: i })), n.currentResults = t) : t = Object.assign({}, n.currentResults), n.settings.hideSelected && (t.items = t.items.filter((r) => {
      let l = T(r.id);
      return !(l !== null && n.items.indexOf(l) !== -1);
    })), t;
  }
  /**
   * Refreshes the list of available options shown
   * in the autocomplete dropdown menu.
   *
   */
  refreshOptions(e = !0) {
    var t, i, n, o, r, l, a, c, d, u;
    const p = {}, y = [];
    var f = this, m = f.inputValue();
    const O = m === f.lastQuery || m == "" && f.lastQuery == null;
    var _ = f.search(m), S = null, h = f.settings.shouldOpen || !1, w = f.dropdown_content;
    O && (S = f.activeOption, S && (d = S.closest("[data-group]"))), o = _.items.length, typeof f.settings.maxOptions == "number" && (o = Math.min(o, f.settings.maxOptions)), o > 0 && (h = !0);
    const B = (v, g) => {
      let I = p[v];
      if (I !== void 0) {
        let L = y[I];
        if (L !== void 0)
          return [I, L.fragment];
      }
      let A = document.createDocumentFragment();
      return I = y.length, y.push({ fragment: A, order: g, optgroup: v }), [I, A];
    };
    for (t = 0; t < o; t++) {
      let v = _.items[t];
      if (!v)
        continue;
      let g = v.id, I = f.options[g];
      if (I === void 0)
        continue;
      let A = W(g), L = f.getOption(A, !0);
      for (f.settings.hideSelected || L.classList.toggle("selected", f.items.includes(A)), r = I[f.settings.optgroupField] || "", l = Array.isArray(r) ? r : [r], i = 0, n = l && l.length; i < n; i++) {
        r = l[i];
        let z = I.$order, N = f.optgroups[r];
        if (N === void 0 && typeof f.settings.optionGroupRegister == "function") {
          var j;
          (j = f.settings.optionGroupRegister.apply(f, [r])) && f.registerOptionGroup(j);
        }
        N = f.optgroups[r], N === void 0 ? r = "" : z = N.$order;
        const [Pe, De] = B(r, z);
        i > 0 && (L = L.cloneNode(!0), b(L, { id: I.$id + "-clone-" + i, "aria-selected": null }), L.classList.add("ts-cloned"), D(L, "active"), f.activeOption && f.activeOption.dataset.value == g && d && d.dataset.group === r.toString() && (S = L)), De.appendChild(L), r != "" && (p[r] = Pe);
      }
    }
    f.settings.lockOptgroupOrder && y.sort((v, g) => v.order - g.order), a = document.createDocumentFragment(), E(y, (v) => {
      let g = v.fragment, I = v.optgroup;
      if (!g || !g.children.length)
        return;
      let A = f.optgroups[I];
      if (A !== void 0) {
        let L = document.createDocumentFragment(), z = f.render("optgroup_header", A);
        V(L, z), V(L, g);
        let N = f.render("optgroup", { group: A, options: L });
        V(a, N);
      } else
        V(a, g);
    }), w.innerHTML = "", V(w, a), f.settings.highlight && (ft(w), _.query.length && _.tokens.length && E(_.tokens, (v) => {
      dt(w, v.regex);
    }));
    var C = (v) => {
      let g = f.render(v, { input: m });
      return g && (h = !0, w.insertBefore(g, w.firstChild)), g;
    };
    if (f.loading ? C("loading") : f.settings.shouldLoad.call(f, m) ? _.items.length === 0 && C("no_results") : C("not_loading"), c = f.canCreate(m), c && (u = C("option_create")), f.hasOptions = _.items.length > 0 || c, h) {
      if (_.items.length > 0) {
        if (!S && f.settings.mode === "single" && f.items[0] != null && (S = f.getOption(f.items[0])), !w.contains(S)) {
          let v = 0;
          u && !f.settings.addPrecedence && (v = 1), S = f.selectable()[v];
        }
      } else u && (S = u);
      e && !f.isOpen && (f.open(), f.scrollToOption(S, "auto")), f.setActiveOption(S);
    } else
      f.clearActiveOption(), e && f.isOpen && f.close(!1);
  }
  /**
   * Return list of selectable options
   *
   */
  selectable() {
    return this.dropdown_content.querySelectorAll("[data-selectable]");
  }
  /**
   * Adds an available option. If it already exists,
   * nothing will happen. Note: this does not refresh
   * the options list dropdown (use `refreshOptions`
   * for that).
   *
   * Usage:
   *
   *   this.addOption(data)
   *
   */
  addOption(e, t = !1) {
    const i = this;
    if (Array.isArray(e))
      return i.addOptions(e, t), !1;
    const n = T(e[i.settings.valueField]);
    return n === null || i.options.hasOwnProperty(n) ? !1 : (e.$order = e.$order || ++i.order, e.$id = i.inputId + "-opt-" + e.$order, i.options[n] = e, i.lastQuery = null, t && (i.userOptions[n] = t, i.trigger("option_add", n, e)), n);
  }
  /**
   * Add multiple options
   *
   */
  addOptions(e, t = !1) {
    E(e, (i) => {
      this.addOption(i, t);
    });
  }
  /**
   * @deprecated 1.7.7
   */
  registerOption(e) {
    return this.addOption(e);
  }
  /**
   * Registers an option group to the pool of option groups.
   *
   * @return {boolean|string}
   */
  registerOptionGroup(e) {
    var t = T(e[this.settings.optgroupValueField]);
    return t === null ? !1 : (e.$order = e.$order || ++this.order, this.optgroups[t] = e, t);
  }
  /**
   * Registers a new optgroup for options
   * to be bucketed into.
   *
   */
  addOptionGroup(e, t) {
    var i;
    t[this.settings.optgroupValueField] = e, (i = this.registerOptionGroup(t)) && this.trigger("optgroup_add", i, t);
  }
  /**
   * Removes an existing option group.
   *
   */
  removeOptionGroup(e) {
    this.optgroups.hasOwnProperty(e) && (delete this.optgroups[e], this.clearCache(), this.trigger("optgroup_remove", e));
  }
  /**
   * Clears all existing option groups.
   */
  clearOptionGroups() {
    this.optgroups = {}, this.clearCache(), this.trigger("optgroup_clear");
  }
  /**
   * Updates an option available for selection. If
   * it is visible in the selected items or options
   * dropdown, it will be re-rendered automatically.
   *
   */
  updateOption(e, t) {
    const i = this;
    var n, o;
    const r = T(e), l = T(t[i.settings.valueField]);
    if (r === null)
      return;
    const a = i.options[r];
    if (a == null)
      return;
    if (typeof l != "string")
      throw new Error("Value must be set in option data");
    const c = i.getOption(r), d = i.getItem(r);
    if (t.$order = t.$order || a.$order, delete i.options[r], i.uncacheValue(l), i.options[l] = t, c) {
      if (i.dropdown_content.contains(c)) {
        const u = i._render("option", t);
        le(c, u), i.activeOption === c && i.setActiveOption(u);
      }
      c.remove();
    }
    d && (o = i.items.indexOf(r), o !== -1 && i.items.splice(o, 1, l), n = i._render("item", t), d.classList.contains("active") && k(n, "active"), le(d, n)), i.lastQuery = null;
  }
  /**
   * Removes a single option.
   *
   */
  removeOption(e, t) {
    const i = this;
    e = W(e), i.uncacheValue(e), delete i.userOptions[e], delete i.options[e], i.lastQuery = null, i.trigger("option_remove", e), i.removeItem(e, t);
  }
  /**
   * Clears all options.
   */
  clearOptions(e) {
    const t = (e || this.clearFilter).bind(this);
    this.loadedSearches = {}, this.userOptions = {}, this.clearCache();
    const i = {};
    E(this.options, (n, o) => {
      t(n, o) && (i[o] = n);
    }), this.options = this.sifter.items = i, this.lastQuery = null, this.trigger("option_clear");
  }
  /**
   * Used by clearOptions() to decide whether or not an option should be removed
   * Return true to keep an option, false to remove
   *
   */
  clearFilter(e, t) {
    return this.items.indexOf(t) >= 0;
  }
  /**
   * Returns the dom element of the option
   * matching the given value.
   *
   */
  getOption(e, t = !1) {
    const i = T(e);
    if (i === null)
      return null;
    const n = this.options[i];
    if (n != null) {
      if (n.$div)
        return n.$div;
      if (t)
        return this._render("option", n);
    }
    return null;
  }
  /**
   * Returns the dom element of the next or previous dom element of the same type
   * Note: adjacent options may not be adjacent DOM elements (optgroups)
   *
   */
  getAdjacent(e, t, i = "option") {
    var n = this, o;
    if (!e)
      return null;
    i == "item" ? o = n.controlChildren() : o = n.dropdown_content.querySelectorAll("[data-selectable]");
    for (let r = 0; r < o.length; r++)
      if (o[r] == e)
        return t > 0 ? o[r + 1] : o[r - 1];
    return null;
  }
  /**
   * Returns the dom element of the item
   * matching the given value.
   *
   */
  getItem(e) {
    if (typeof e == "object")
      return e;
    var t = T(e);
    return t !== null ? this.control.querySelector(`[data-value="${pe(t)}"]`) : null;
  }
  /**
   * "Selects" multiple items at once. Adds them to the list
   * at the current caret position.
   *
   */
  addItems(e, t) {
    var i = this, n = Array.isArray(e) ? e : [e];
    n = n.filter((r) => i.items.indexOf(r) === -1);
    const o = n[n.length - 1];
    n.forEach((r) => {
      i.isPending = r !== o, i.addItem(r, t);
    });
  }
  /**
   * "Selects" an item. Adds it to the list
   * at the current caret position.
   *
   */
  addItem(e, t) {
    var i = t ? [] : ["change", "dropdown_close"];
    fe(this, i, () => {
      var n, o;
      const r = this, l = r.settings.mode, a = T(e);
      if (!(a && r.items.indexOf(a) !== -1 && (l === "single" && r.close(), l === "single" || !r.settings.duplicates)) && !(a === null || !r.options.hasOwnProperty(a)) && (l === "single" && r.clear(t), !(l === "multi" && r.isFull()))) {
        if (n = r._render("item", r.options[a]), r.control.contains(n) && (n = n.cloneNode(!0)), o = r.isFull(), r.items.splice(r.caretPos, 0, a), r.insertAtCaret(n), r.isSetup) {
          if (!r.isPending && r.settings.hideSelected) {
            let c = r.getOption(a), d = r.getAdjacent(c, 1);
            d && r.setActiveOption(d);
          }
          r.settings.clearAfterSelect && r.setTextboxValue(), !r.isPending && !r.settings.closeAfterSelect && r.refreshOptions(r.isFocused && l !== "single"), r.settings.closeAfterSelect != !1 && r.isFull() ? r.close() : r.isPending || r.positionDropdown(), r.trigger("item_add", a, n), r.isPending || r.updateOriginalInput({ silent: t });
        }
        (!r.isPending || !o && r.isFull()) && (r.inputState(), r.refreshState());
      }
    });
  }
  /**
   * Removes the selected item matching
   * the provided value.
   *
   */
  removeItem(e = null, t) {
    const i = this;
    if (e = i.getItem(e), !e)
      return;
    var n, o;
    const r = e.dataset.value;
    n = ge(e), e.remove(), e.classList.contains("active") && (o = i.activeItems.indexOf(e), i.activeItems.splice(o, 1), D(e, "active")), i.items.splice(n, 1), i.lastQuery = null, !i.settings.persist && i.userOptions.hasOwnProperty(r) && i.removeOption(r, t), n < i.caretPos && i.setCaret(i.caretPos - 1), i.updateOriginalInput({ silent: t }), i.refreshState(), i.positionDropdown(), i.trigger("item_remove", r, e);
  }
  /**
   * Invokes the `create` method provided in the
   * TomSelect options that should provide the data
   * for the new item, given the user input.
   *
   * Once this completes, it will be added
   * to the item list.
   *
   */
  createItem(e = null, t = () => {
  }) {
    arguments.length === 3 && (t = arguments[2]), typeof t != "function" && (t = () => {
    });
    var i = this, n = i.caretPos, o;
    if (e = e || i.inputValue(), !i.canCreate(e))
      return T(e) && this.options[e] && i.addItem(e), t(), !1;
    i.lock();
    var r = !1, l = (a) => {
      if (i.unlock(), !a || typeof a != "object")
        return t();
      var c = T(a[i.settings.valueField]);
      if (typeof c != "string")
        return t();
      i.setTextboxValue(), i.addOption(a, !0), i.setCaret(n), i.addItem(c), t(a), r = !0;
    };
    return typeof i.settings.create == "function" ? o = i.settings.create.call(this, e, l) : o = {
      [i.settings.labelField]: e,
      [i.settings.valueField]: e
    }, r || l(o), !0;
  }
  /**
   * Re-renders the selected item lists.
   */
  refreshItems() {
    var e = this;
    e.lastQuery = null, e.isSetup && e.addItems(e.items), e.updateOriginalInput(), e.refreshState();
  }
  /**
   * Updates all state-dependent attributes
   * and CSS classes.
   */
  refreshState() {
    const e = this;
    e.refreshValidityState();
    const t = e.isFull(), i = e.isLocked;
    e.wrapper.classList.toggle("rtl", e.rtl);
    const n = e.wrapper.classList;
    n.toggle("focus", e.isFocused), n.toggle("disabled", e.isDisabled), n.toggle("readonly", e.isReadOnly), n.toggle("required", e.isRequired), n.toggle("invalid", !e.isValid), n.toggle("locked", i), n.toggle("full", t), n.toggle("input-active", e.isFocused && !e.isInputHidden), n.toggle("dropdown-active", e.isOpen), n.toggle("has-options", ut(e.options)), n.toggle("has-items", e.items.length > 0);
  }
  /**
   * Update the `required` attribute of both input and control input.
   *
   * The `required` property needs to be activated on the control input
   * for the error to be displayed at the right place. `required` also
   * needs to be temporarily deactivated on the input since the input is
   * hidden and can't show errors.
   */
  refreshValidityState() {
    var e = this;
    e.input.validity && (e.isValid = e.input.validity.valid, e.isInvalid = !e.isValid);
  }
  /**
   * Determines whether or not more items can be added
   * to the control without exceeding the user-defined maximum.
   *
   * @returns {boolean}
   */
  isFull() {
    return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
  }
  /**
   * Refreshes the original <select> or <input>
   * element to reflect the current state.
   *
   */
  updateOriginalInput(e = {}) {
    const t = this;
    var i, n;
    const o = t.input.querySelector('option[value=""]');
    if (t.is_select_tag) {
      let a = function(c, d, u) {
        return c || (c = P('<option value="' + ie(d) + '">' + ie(u) + "</option>")), c != o && t.input.append(c), r.push(c), (c != o || l > 0) && (c.selected = !0), c;
      };
      const r = [], l = t.input.querySelectorAll("option:checked").length;
      t.input.querySelectorAll("option:checked").forEach((c) => {
        c.selected = !1;
      }), t.items.length == 0 && t.settings.mode == "single" ? a(o, "", "") : t.items.forEach((c) => {
        if (i = t.options[c], n = i[t.settings.labelField] || "", r.includes(i.$option)) {
          const d = t.input.querySelector(`option[value="${pe(c)}"]:not(:checked)`);
          a(d, c, n);
        } else
          i.$option = a(i.$option, c, n);
      });
    } else
      t.input.value = t.getValue();
    t.isSetup && (e.silent || t.trigger("change", t.getValue()));
  }
  /**
   * Shows the autocomplete dropdown containing
   * the available options.
   */
  open() {
    var e = this;
    e.isLocked || e.isOpen || e.settings.mode === "multi" && e.isFull() || (e.isOpen = !0, b(e.focus_node, { "aria-expanded": "true" }), e.refreshState(), G(e.dropdown, { visibility: "hidden", display: "block" }), e.positionDropdown(), G(e.dropdown, { visibility: "visible", display: "block" }), e.focus(), e.trigger("dropdown_open", e.dropdown));
  }
  /**
   * Closes the autocomplete dropdown menu.
   */
  close(e = !0) {
    var t = this, i = t.isOpen;
    e && (t.setTextboxValue(), t.settings.mode === "single" && t.items.length && t.inputState()), t.isOpen = !1, b(t.focus_node, { "aria-expanded": "false" }), G(t.dropdown, { display: "none" }), t.settings.hideSelected && t.clearActiveOption(), t.refreshState(), i && t.trigger("dropdown_close", t.dropdown);
  }
  /**
   * Calculates and applies the appropriate
   * position of the dropdown if dropdownParent = 'body'.
   * Otherwise, position is determined by css
   */
  positionDropdown() {
    if (this.settings.dropdownParent === "body") {
      var e = this.control, t = e.getBoundingClientRect(), i = e.offsetHeight + t.top + window.scrollY, n = t.left + window.scrollX;
      G(this.dropdown, {
        width: t.width + "px",
        top: i + "px",
        left: n + "px"
      });
    }
  }
  /**
   * Resets / clears all selected items
   * from the control.
   *
   */
  clear(e) {
    var t = this;
    if (t.items.length) {
      var i = t.controlChildren();
      E(i, (n) => {
        t.removeItem(n, !0);
      }), t.inputState(), e || t.updateOriginalInput(), t.trigger("clear");
    }
  }
  /**
   * A helper method for inserting an element
   * at the current caret position.
   *
   */
  insertAtCaret(e) {
    const t = this, i = t.caretPos, n = t.control;
    n.insertBefore(e, n.children[i] || null), t.setCaret(i + 1);
  }
  /**
   * Removes the current selected item(s).
   *
   */
  deleteSelection(e) {
    var t, i, n, o, r = this;
    t = e && e.keyCode === me ? -1 : 1, i = at(r.control_input);
    const l = [];
    if (r.activeItems.length)
      o = he(r.activeItems, t), n = ge(o), t > 0 && n++, E(r.activeItems, (a) => l.push(a));
    else if ((r.isFocused || r.settings.mode === "single") && r.items.length) {
      const a = r.controlChildren();
      let c;
      t < 0 && i.start === 0 && i.length === 0 ? c = a[r.caretPos - 1] : t > 0 && i.start === r.inputValue().length && (c = a[r.caretPos]), c !== void 0 && l.push(c);
    }
    if (!r.shouldDelete(l, e))
      return !1;
    for (x(e, !0), typeof n < "u" && r.setCaret(n); l.length; )
      r.removeItem(l.pop());
    return r.inputState(), r.positionDropdown(), r.refreshOptions(!1), !0;
  }
  /**
   * Return true if the items should be deleted
   */
  shouldDelete(e, t) {
    const i = e.map((n) => n.dataset.value);
    return !(!i.length || typeof this.settings.onDelete == "function" && this.settings.onDelete.call(this, i, t) === !1);
  }
  /**
   * Selects the previous / next item (depending on the `direction` argument).
   *
   * > 0 - right
   * < 0 - left
   *
   */
  advanceSelection(e, t) {
    var i, n, o = this;
    o.rtl && (e *= -1), !o.inputValue().length && (M(Q, t) || M("shiftKey", t) ? (i = o.getLastActive(e), i ? i.classList.contains("active") ? n = o.getAdjacent(i, e, "item") : n = i : e > 0 ? n = o.control_input.nextElementSibling : n = o.control_input.previousElementSibling, n && (n.classList.contains("active") && o.removeActiveItem(i), o.setActiveItemClass(n))) : o.moveCaret(e));
  }
  moveCaret(e) {
  }
  /**
   * Get the last active item
   *
   */
  getLastActive(e) {
    let t = this.control.querySelector(".last-active");
    if (t)
      return t;
    var i = this.control.querySelectorAll(".active");
    if (i)
      return he(i, e);
  }
  /**
   * Moves the caret to the specified index.
   *
   * The input must be moved by leaving it in place and moving the
   * siblings, due to the fact that focus cannot be restored once lost
   * on mobile webkit devices
   *
   */
  setCaret(e) {
    this.caretPos = this.items.length;
  }
  /**
   * Return list of item dom elements
   *
   */
  controlChildren() {
    return Array.from(this.control.querySelectorAll("[data-ts-item]"));
  }
  /**
   * Disables user input on the control. Used while
   * items are being asynchronously created.
   */
  lock() {
    this.setLocked(!0);
  }
  /**
   * Re-enables user input on the control.
   */
  unlock() {
    this.setLocked(!1);
  }
  /**
   * Disable or enable user input on the control
   */
  setLocked(e = this.isReadOnly || this.isDisabled) {
    this.isLocked = e, this.refreshState();
  }
  /**
   * Disables user input on the control completely.
   * While disabled, it cannot receive focus.
   */
  disable() {
    this.setDisabled(!0), this.close();
  }
  /**
   * Enables the control so that it can respond
   * to focus and user input.
   */
  enable() {
    this.setDisabled(!1);
  }
  setDisabled(e) {
    this.focus_node.tabIndex = e ? -1 : this.tabIndex, this.isDisabled = e, this.input.disabled = e, this.control_input.disabled = e, this.setLocked();
  }
  setReadOnly(e) {
    this.isReadOnly = e, this.input.readOnly = e, this.control_input.readOnly = e, this.setLocked();
  }
  /**
   * Completely destroys the control and
   * unbinds all event listeners so that it can
   * be garbage collected.
   */
  destroy() {
    var e = this, t = e.revertSettings;
    e.trigger("destroy"), e.off(), e.wrapper.remove(), e.dropdown.remove(), e.input.innerHTML = t.innerHTML, e.input.tabIndex = t.tabIndex, D(e.input, "tomselected", "ts-hidden-accessible"), e._destroy(), delete e.input.tomselect;
  }
  /**
   * A helper method for rendering "item" and
   * "option" templates, given the data.
   *
   */
  render(e, t) {
    var i, n;
    const o = this;
    if (typeof this.settings.render[e] != "function" || (n = o.settings.render[e].call(this, t, ie), !n))
      return null;
    if (n = P(n), e === "option" || e === "option_create" ? t[o.settings.disabledField] ? b(n, { "aria-disabled": "true" }) : b(n, { "data-selectable": "" }) : e === "optgroup" && (i = t.group[o.settings.optgroupValueField], b(n, { "data-group": i }), t.group[o.settings.disabledField] && b(n, { "data-disabled": "" })), e === "option" || e === "item") {
      const r = W(t[o.settings.valueField]);
      b(n, { "data-value": r }), e === "item" ? (k(n, o.settings.itemClass), b(n, { "data-ts-item": "" })) : (k(n, o.settings.optionClass), b(n, {
        role: "option",
        id: t.$id
      }), t.$div = n, o.options[r] = t);
    }
    return n;
  }
  /**
   * Type guarded rendering
   *
   */
  _render(e, t) {
    const i = this.render(e, t);
    if (i == null)
      throw "HTMLElement expected";
    return i;
  }
  /**
   * Clears the render cache for a template. If
   * no template is given, clears all render
   * caches.
   *
   */
  clearCache() {
    E(this.options, (e) => {
      e.$div && (e.$div.remove(), delete e.$div);
    });
  }
  /**
   * Removes a value from item and option caches
   *
   */
  uncacheValue(e) {
    const t = this.getOption(e);
    t && t.remove();
  }
  /**
   * Determines whether or not to display the
   * create item prompt, given a user input.
   *
   */
  canCreate(e) {
    return this.settings.create && e.length > 0 && this.settings.createFilter.call(this, e);
  }
  /**
   * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
   *
   * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
   *
   * });
   */
  hook(e, t, i) {
    var n = this, o = n[t];
    n[t] = function() {
      var r, l;
      return e === "after" && (r = o.apply(n, arguments)), l = i.apply(n, arguments), e === "instead" ? l : (e === "before" && (r = o.apply(n, arguments)), r);
    };
  }
}
const wt = (s, e, t, i) => {
  s.addEventListener(e, t, i);
};
function At() {
  wt(this.input, "change", () => {
    this.sync();
  });
}
const St = (s) => typeof s > "u" || s === null ? null : Ct(s), Ct = (s) => typeof s == "boolean" ? s ? "1" : "0" : s + "", be = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, xt = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (It(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, It = (s) => typeof s == "string" && s.indexOf("<") > -1;
function Et(s) {
  var e = this, t = e.onOptionSelect;
  e.settings.hideSelected = !1;
  const i = Object.assign({
    // so that the user may add different ones as well
    className: "tomselect-checkbox",
    // the following default to the historic plugin's values
    checkedClassNames: void 0,
    uncheckedClassNames: void 0
  }, s);
  var n = function(l, a) {
    a ? (l.checked = !0, i.uncheckedClassNames && l.classList.remove(...i.uncheckedClassNames), i.checkedClassNames && l.classList.add(...i.checkedClassNames)) : (l.checked = !1, i.checkedClassNames && l.classList.remove(...i.checkedClassNames), i.uncheckedClassNames && l.classList.add(...i.uncheckedClassNames));
  }, o = function(l) {
    setTimeout(() => {
      var a = l.querySelector("input." + i.className);
      a instanceof HTMLInputElement && n(a, l.classList.contains("selected"));
    }, 1);
  };
  e.hook("after", "setupTemplates", () => {
    var r = e.settings.render.option;
    e.settings.render.option = (l, a) => {
      var c = xt(r.call(e, l, a)), d = document.createElement("input");
      i.className && d.classList.add(i.className), d.addEventListener("click", function(p) {
        be(p);
      }), d.type = "checkbox";
      const u = St(l[e.settings.valueField]);
      return n(d, !!(u && e.items.indexOf(u) > -1)), c.prepend(d), c;
    };
  }), e.on("item_remove", (r) => {
    var l = e.getOption(r);
    l && (l.classList.remove("selected"), o(l));
  }), e.on("item_add", (r) => {
    var l = e.getOption(r);
    l && o(l);
  }), e.hook("instead", "onOptionSelect", (r, l) => {
    if (l.classList.contains("selected")) {
      l.classList.remove("selected"), e.removeItem(l.dataset.value), e.refreshOptions(), be(r, !0);
      return;
    }
    t.call(e, r, l), o(l);
  });
}
const Lt = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if ($t(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, $t = (s) => typeof s == "string" && s.indexOf("<") > -1;
function Ft(s) {
  const e = this, t = Object.assign({
    className: "clear-button",
    title: "Clear All",
    role: "button",
    tabindex: 0,
    html: (i) => `<div class="${i.className}" title="${i.title}" role="${i.role}" tabindex="${i.tabindex}">&times;</div>`
  }, s);
  e.on("initialize", () => {
    var i = Lt(t.html(t));
    i.addEventListener("click", (n) => {
      e.isLocked || (e.clear(), e.settings.mode === "single" && e.settings.allowEmptyOption && e.addItem(""), e.refreshOptions(!1), n.preventDefault(), n.stopPropagation());
    }), e.control.appendChild(i);
  });
}
const kt = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, R = (s, e, t, i) => {
  s.addEventListener(e, t, i);
}, Tt = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, Pt = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (Dt(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, Dt = (s) => typeof s == "string" && s.indexOf("<") > -1, Ht = (s, e) => {
  Tt(e, (t, i) => {
    t == null ? s.removeAttribute(i) : s.setAttribute(i, "" + t);
  });
}, Mt = (s, e) => {
  var t;
  (t = s.parentNode) == null || t.insertBefore(e, s.nextSibling);
}, Vt = (s, e) => {
  var t;
  (t = s.parentNode) == null || t.insertBefore(e, s);
}, Nt = (s, e) => {
  do {
    var t;
    if (e = (t = e) == null ? void 0 : t.previousElementSibling, s == e)
      return !0;
  } while (e && e.previousElementSibling);
  return !1;
};
function Rt() {
  var s = this;
  if (s.settings.mode !== "multi") return;
  var e = s.lock, t = s.unlock;
  let i = !0, n;
  s.hook("after", "setupTemplates", () => {
    var o = s.settings.render.item;
    s.settings.render.item = (r, l) => {
      const a = Pt(o.call(s, r, l));
      Ht(a, {
        draggable: "true"
      });
      const c = (m) => {
        i || kt(m), m.stopPropagation();
      }, d = (m) => {
        n = a, setTimeout(() => {
          a.classList.add("ts-dragging");
        }, 0);
      }, u = (m) => {
        m.preventDefault(), a.classList.add("ts-drag-over"), y(a, n);
      }, p = () => {
        a.classList.remove("ts-drag-over");
      }, y = (m, O) => {
        O !== void 0 && (Nt(O, a) ? Mt(m, O) : Vt(m, O));
      }, f = () => {
        var m;
        document.querySelectorAll(".ts-drag-over").forEach((_) => _.classList.remove("ts-drag-over")), (m = n) == null || m.classList.remove("ts-dragging"), n = void 0;
        var O = [];
        s.control.querySelectorAll("[data-value]").forEach((_) => {
          if (_.dataset.value) {
            let S = _.dataset.value;
            S && O.push(S);
          }
        }), s.setValue(O);
      };
      return R(a, "mousedown", c), R(a, "dragstart", d), R(a, "dragenter", u), R(a, "dragover", u), R(a, "dragleave", p), R(a, "dragend", f), a;
    };
  }), s.hook("instead", "lock", () => (i = !1, e.call(s))), s.hook("instead", "unlock", () => (i = !0, t.call(s)));
}
const Kt = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, Bt = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (jt(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, jt = (s) => typeof s == "string" && s.indexOf("<") > -1;
function zt(s) {
  const e = this, t = Object.assign({
    title: "Untitled",
    headerClass: "dropdown-header",
    titleRowClass: "dropdown-header-title",
    labelClass: "dropdown-header-label",
    closeClass: "dropdown-header-close",
    html: (i) => '<div class="' + i.headerClass + '"><div class="' + i.titleRowClass + '"><span class="' + i.labelClass + '">' + i.title + '</span><a class="' + i.closeClass + '">&times;</a></div></div>'
  }, s);
  e.on("initialize", () => {
    var i = Bt(t.html(t)), n = i.querySelector("." + t.closeClass);
    n && n.addEventListener("click", (o) => {
      Kt(o, !0), e.close();
    }), e.dropdown.insertBefore(i, e.dropdown.firstChild);
  });
}
const Yt = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, Gt = (s, ...e) => {
  var t = Qt(e);
  s = Ut(s), s.map((i) => {
    t.map((n) => {
      i.classList.remove(n);
    });
  });
}, Qt = (s) => {
  var e = [];
  return Yt(s, (t) => {
    typeof t == "string" && (t = t.trim().split(/[\t\n\f\r\s]/)), Array.isArray(t) && (e = e.concat(t));
  }), e.filter(Boolean);
}, Ut = (s) => (Array.isArray(s) || (s = [s]), s), Wt = (s, e) => {
  if (!s) return -1;
  e = e || s.nodeName;
  for (var t = 0; s = s.previousElementSibling; )
    s.matches(e) && t++;
  return t;
};
function qt() {
  var s = this;
  s.hook("instead", "setCaret", (e) => {
    s.settings.mode === "single" || !s.control.contains(s.control_input) ? e = s.items.length : (e = Math.max(0, Math.min(s.items.length, e)), e != s.caretPos && !s.isPending && s.controlChildren().forEach((t, i) => {
      i < e ? s.control_input.insertAdjacentElement("beforebegin", t) : s.control.appendChild(t);
    })), s.caretPos = e;
  }), s.hook("instead", "moveCaret", (e) => {
    if (!s.isFocused) return;
    const t = s.getLastActive(e);
    if (t) {
      const i = Wt(t);
      s.setCaret(e > 0 ? i + 1 : i), s.setActiveItem(), Gt(t, "last-active");
    } else
      s.setCaret(s.caretPos + e);
  });
}
const Jt = 27, Xt = 9, Zt = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, es = (s, e, t, i) => {
  s.addEventListener(e, t, i);
}, ts = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, we = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (ss(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, ss = (s) => typeof s == "string" && s.indexOf("<") > -1, is = (s, ...e) => {
  var t = ns(e);
  s = rs(s), s.map((i) => {
    t.map((n) => {
      i.classList.add(n);
    });
  });
}, ns = (s) => {
  var e = [];
  return ts(s, (t) => {
    typeof t == "string" && (t = t.trim().split(/[\t\n\f\r\s]/)), Array.isArray(t) && (e = e.concat(t));
  }), e.filter(Boolean);
}, rs = (s) => (Array.isArray(s) || (s = [s]), s);
function os() {
  const s = this;
  s.settings.shouldOpen = !0, s.hook("before", "setup", () => {
    var e;
    s.focus_node = s.control, is(s.control_input, "dropdown-input");
    const t = we('<div class="dropdown-input-wrap">');
    t.append(s.control_input), s.dropdown.insertBefore(t, s.dropdown.firstChild);
    const i = we('<input class="items-placeholder" tabindex="-1" />');
    i.placeholder = s.settings.placeholder || "", s.control.append(i);
    const n = (e = s.input) == null ? void 0 : e.getAttribute("aria-label");
    n && i.setAttribute("aria-label", n);
  }), s.on("initialize", () => {
    s.control_input.addEventListener("keydown", (t) => {
      switch (t.keyCode) {
        case Jt:
          s.isOpen && (Zt(t, !0), s.close()), s.clearActiveItems();
          return;
        case Xt:
          s.focus_node.tabIndex = -1;
          break;
      }
      return s.onKeyDown.call(s, t);
    }), s.on("blur", () => {
      s.focus_node.tabIndex = s.isDisabled ? -1 : s.tabIndex;
    }), s.on("dropdown_open", () => {
      s.control_input.focus();
    });
    const e = s.onBlur;
    s.hook("instead", "onBlur", (t) => {
      if (!(t && t.relatedTarget == s.control_input))
        return e.call(s);
    }), es(s.control_input, "blur", () => s.onBlur()), s.hook("before", "close", () => {
      s.isOpen && s.focus_node.focus({
        preventScroll: !0
      });
    });
  });
}
const U = (s, e, t, i) => {
  s.addEventListener(e, t, i);
};
function ls() {
  var s = this;
  s.on("initialize", () => {
    var e = document.createElement("span"), t = s.control_input;
    e.style.cssText = "position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ", s.wrapper.appendChild(e);
    var i = ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"];
    for (const o of i)
      e.style[o] = t.style[o];
    var n = () => {
      e.textContent = t.value, t.style.width = e.clientWidth + "px";
    };
    n(), s.on("update item_add item_remove", n), U(t, "input", n), U(t, "keyup", n), U(t, "blur", n), U(t, "update", n);
  });
}
function as() {
  var s = this, e = s.deleteSelection;
  this.hook("instead", "deleteSelection", (t) => s.activeItems.length ? e.call(s, t) : !1);
}
function cs() {
  this.hook("instead", "setActiveItem", () => {
  }), this.hook("instead", "selectAll", () => {
  });
}
const Ae = 37, us = 39, ds = (s, e, t) => {
  for (; s && s.matches; ) {
    if (s.matches(e))
      return s;
    s = s.parentNode;
  }
}, fs = (s, e) => {
  if (!s) return -1;
  e = e || s.nodeName;
  for (var t = 0; s = s.previousElementSibling; )
    s.matches(e) && t++;
  return t;
};
function ps() {
  var s = this, e = s.onKeyDown;
  s.hook("instead", "onKeyDown", (t) => {
    var i, n, o, r;
    if (!s.isOpen || !(t.keyCode === Ae || t.keyCode === us))
      return e.call(s, t);
    s.ignoreHover = !0, r = ds(s.activeOption, "[data-group]"), i = fs(s.activeOption, "[data-selectable]"), r && (t.keyCode === Ae ? r = r.previousSibling : r = r.nextSibling, r && (o = r.querySelectorAll("[data-selectable]"), n = o[Math.min(o.length - 1, i)], n && s.setActiveOption(n)));
  });
}
const hs = (s) => (s + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Se = (s, e = !1) => {
  s && (s.preventDefault(), e && s.stopPropagation());
}, Ce = (s, e, t, i) => {
  s.addEventListener(e, t, i);
}, xe = (s) => {
  if (s.jquery)
    return s[0];
  if (s instanceof HTMLElement)
    return s;
  if (gs(s)) {
    var e = document.createElement("template");
    return e.innerHTML = s.trim(), e.content.firstChild;
  }
  return document.querySelector(s);
}, gs = (s) => typeof s == "string" && s.indexOf("<") > -1;
function ms(s) {
  const e = Object.assign({
    label: "&times;",
    title: "Remove",
    className: "remove",
    append: !0
  }, s);
  var t = this;
  if (e.append) {
    var i = '<a href="javascript:void(0)" class="' + e.className + '" tabindex="-1" title="' + hs(e.title) + '">' + e.label + "</a>";
    t.hook("after", "setupTemplates", () => {
      var n = t.settings.render.item;
      t.settings.render.item = (o, r) => {
        var l = xe(n.call(t, o, r)), a = xe(i);
        return l.appendChild(a), Ce(a, "mousedown", (c) => {
          Se(c, !0);
        }), Ce(a, "click", (c) => {
          t.isLocked || (Se(c, !0), !t.isLocked && t.shouldDelete([l], c) && (t.removeItem(l), t.refreshOptions(!1), t.inputState()));
        }), l;
      };
    });
  }
}
function vs(s) {
  const e = this, t = Object.assign({
    text: (i) => i[e.settings.labelField]
  }, s);
  e.on("item_remove", function(i) {
    if (e.isFocused && e.control_input.value.trim() === "") {
      var n = e.options[i];
      n && e.setTextboxValue(t.text.call(e, n));
    }
  });
}
const _s = (s, e) => {
  if (Array.isArray(s))
    s.forEach(e);
  else
    for (var t in s)
      s.hasOwnProperty(t) && e(s[t], t);
}, ys = (s, ...e) => {
  var t = Os(e);
  s = bs(s), s.map((i) => {
    t.map((n) => {
      i.classList.add(n);
    });
  });
}, Os = (s) => {
  var e = [];
  return _s(s, (t) => {
    typeof t == "string" && (t = t.trim().split(/[\t\n\f\r\s]/)), Array.isArray(t) && (e = e.concat(t));
  }), e.filter(Boolean);
}, bs = (s) => (Array.isArray(s) || (s = [s]), s);
function ws() {
  const s = this, e = s.canLoad, t = s.clearActiveOption, i = s.loadCallback;
  var n = {}, o, r = !1, l, a = [];
  if (s.settings.shouldLoadMore || (s.settings.shouldLoadMore = () => {
    if (o.clientHeight / (o.scrollHeight - o.scrollTop) > 0.9)
      return !0;
    if (s.activeOption) {
      var p = s.selectable(), y = Array.from(p).indexOf(s.activeOption);
      if (y >= p.length - 2)
        return !0;
    }
    return !1;
  }), !s.settings.firstUrl)
    throw "virtual_scroll plugin requires a firstUrl() method";
  s.settings.sortField = [{
    field: "$order"
  }, {
    field: "$score"
  }];
  const c = (u) => typeof s.settings.maxOptions == "number" && o.children.length >= s.settings.maxOptions ? !1 : !!(u in n && n[u]), d = (u, p) => s.items.indexOf(p) >= 0 || a.indexOf(p) >= 0;
  s.setNextUrl = (u, p) => {
    n[u] = p;
  }, s.getUrl = (u) => {
    if (u in n) {
      const p = n[u];
      return n[u] = !1, p;
    }
    return s.clearPagination(), s.settings.firstUrl.call(s, u);
  }, s.clearPagination = () => {
    n = {};
  }, s.hook("instead", "clearActiveOption", () => {
    if (!r)
      return t.call(s);
  }), s.hook("instead", "canLoad", (u) => u in n ? c(u) : e.call(s, u)), s.hook("instead", "loadCallback", (u, p) => {
    if (!r)
      s.clearOptions(d);
    else if (l) {
      const y = u[0];
      y !== void 0 && (l.dataset.value = y[s.settings.valueField]);
    }
    i.call(s, u, p), r = !1;
  }), s.hook("after", "refreshOptions", () => {
    const u = s.lastValue;
    var p;
    c(u) ? (p = s.render("loading_more", {
      query: u
    }), p && (p.setAttribute("data-selectable", ""), l = p)) : u in n && !o.querySelector(".no-results") && (p = s.render("no_more_results", {
      query: u
    })), p && (ys(p, s.settings.optionClass), o.append(p));
  }), s.on("initialize", () => {
    a = Object.keys(s.options), o = s.dropdown_content, s.settings.render = Object.assign({}, {
      loading_more: () => '<div class="loading-more-results">Loading more results ... </div>',
      no_more_results: () => '<div class="no-more-results">No more results</div>'
    }, s.settings.render), o.addEventListener("scroll", () => {
      s.settings.shouldLoadMore.call(s) && c(s.lastValue) && (r || (r = !0, s.load.call(s, s.lastValue)));
    });
  });
}
F.define("change_listener", At);
F.define("checkbox_options", Et);
F.define("clear_button", Ft);
F.define("drag_drop", Rt);
F.define("dropdown_header", zt);
F.define("caret_position", qt);
F.define("dropdown_input", os);
F.define("input_autogrow", ls);
F.define("no_backspace_delete", as);
F.define("no_active_items", cs);
F.define("optgroup_columns", ps);
F.define("remove_button", ms);
F.define("restore_on_backspace", vs);
F.define("virtual_scroll", ws);
export {
  F as default
};
