var gs = Object.defineProperty;
var ys = (e, t, r) => t in e ? gs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var P = (e, t, r) => ys(e, typeof t != "symbol" ? t + "" : t, r);
function ws(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
function Qr() {
}
function Vt(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function Xt(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Ps(e) {
  if (Vt(e))
    return e;
  if (Array.isArray(e) || Xt(e) || e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer)
    return e.slice(0);
  const t = Object.getPrototypeOf(e);
  if (t == null)
    return Object.assign(Object.create(t), e);
  const r = t.constructor;
  if (e instanceof Date || e instanceof Map || e instanceof Set)
    return new r(e);
  if (e instanceof RegExp) {
    const n = new r(e);
    return n.lastIndex = e.lastIndex, n;
  }
  if (e instanceof DataView)
    return new r(e.buffer.slice(0));
  if (e instanceof Error) {
    let n;
    return e instanceof AggregateError ? n = new r(e.errors, e.message, { cause: e.cause }) : n = new r(e.message, { cause: e.cause }), n.stack = e.stack, Object.assign(n, e), n;
  }
  if (typeof File < "u" && e instanceof File)
    return new r([e], e.name, { type: e.type, lastModified: e.lastModified });
  if (typeof e == "object") {
    const n = Object.create(t);
    return Object.assign(n, e);
  }
  return e;
}
function rt(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function Ie(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const Gr = "[object RegExp]", Jt = "[object String]", Qt = "[object Number]", Gt = "[object Boolean]", nt = "[object Arguments]", Yr = "[object Symbol]", Zr = "[object Date]", en = "[object Map]", tn = "[object Set]", rn = "[object Array]", bs = "[object Function]", nn = "[object ArrayBuffer]", Fe = "[object Object]", Ss = "[object Error]", sn = "[object DataView]", on = "[object Uint8Array]", an = "[object Uint8ClampedArray]", cn = "[object Uint16Array]", ln = "[object Uint32Array]", Es = "[object BigUint64Array]", un = "[object Int8Array]", fn = "[object Int16Array]", dn = "[object Int32Array]", Os = "[object BigInt64Array]", hn = "[object Float32Array]", pn = "[object Float64Array]";
function Rs(e, t) {
  return ue(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function ue(e, t, r, n = /* @__PURE__ */ new Map(), s = void 0) {
  const o = s == null ? void 0 : s(e, t, r, n);
  if (o !== void 0)
    return o;
  if (Vt(e))
    return e;
  if (n.has(e))
    return n.get(e);
  if (Array.isArray(e)) {
    const i = new Array(e.length);
    n.set(e, i);
    for (let a = 0; a < e.length; a++)
      i[a] = ue(e[a], a, r, n, s);
    return Object.hasOwn(e, "index") && (i.index = e.index), Object.hasOwn(e, "input") && (i.input = e.input), i;
  }
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp) {
    const i = new RegExp(e.source, e.flags);
    return i.lastIndex = e.lastIndex, i;
  }
  if (e instanceof Map) {
    const i = /* @__PURE__ */ new Map();
    n.set(e, i);
    for (const [a, u] of e)
      i.set(a, ue(u, a, r, n, s));
    return i;
  }
  if (e instanceof Set) {
    const i = /* @__PURE__ */ new Set();
    n.set(e, i);
    for (const a of e)
      i.add(ue(a, void 0, r, n, s));
    return i;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(e))
    return e.subarray();
  if (Xt(e)) {
    const i = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, i);
    for (let a = 0; a < e.length; a++)
      i[a] = ue(e[a], a, r, n, s);
    return i;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer)
    return e.slice(0);
  if (e instanceof DataView) {
    const i = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (typeof File < "u" && e instanceof File) {
    const i = new File([e], e.name, {
      type: e.type
    });
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const i = new Blob([e], { type: e.type });
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (e instanceof Error) {
    const i = structuredClone(e);
    return n.set(e, i), i.message = e.message, i.name = e.name, i.stack = e.stack, i.cause = e.cause, i.constructor = e.constructor, G(i, e, r, n, s), i;
  }
  if (e instanceof Boolean) {
    const i = new Boolean(e.valueOf());
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (e instanceof Number) {
    const i = new Number(e.valueOf());
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (e instanceof String) {
    const i = new String(e.valueOf());
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  if (typeof e == "object" && As(e)) {
    const i = Object.create(Object.getPrototypeOf(e));
    return n.set(e, i), G(i, e, r, n, s), i;
  }
  return e;
}
function G(e, t, r = e, n, s) {
  const o = [...Object.keys(t), ...rt(t)];
  for (let i = 0; i < o.length; i++) {
    const a = o[i], u = Object.getOwnPropertyDescriptor(e, a);
    (u == null || u.writable) && (e[a] = ue(t[a], a, r, n, s));
  }
}
function As(e) {
  switch (Ie(e)) {
    case nt:
    case rn:
    case nn:
    case sn:
    case Gt:
    case Zr:
    case hn:
    case pn:
    case un:
    case fn:
    case dn:
    case en:
    case Qt:
    case Fe:
    case Gr:
    case tn:
    case Jt:
    case Yr:
    case on:
    case an:
    case cn:
    case ln:
      return !0;
    default:
      return !1;
  }
}
function Y(e) {
  return ue(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function mr(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" : !1;
}
function Le(e) {
  return e === "__proto__";
}
function Et(e) {
  var r;
  if (typeof e != "object" || e == null)
    return !1;
  if (Object.getPrototypeOf(e) === null)
    return !0;
  if (Object.prototype.toString.call(e) !== "[object Object]") {
    const n = e[Symbol.toStringTag];
    return n == null || !((r = Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)) != null && r.writable) ? !1 : e.toString() === `[object ${n}]`;
  }
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function mn(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function vs(e, t, r) {
  return Te(e, t, void 0, void 0, void 0, void 0, r);
}
function Te(e, t, r, n, s, o, i) {
  const a = i(e, t, r, n, s, o);
  if (a !== void 0)
    return a;
  if (typeof e == typeof t)
    switch (typeof e) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return e === t;
      case "number":
        return e === t || Object.is(e, t);
      case "function":
        return e === t;
      case "object":
        return Ne(e, t, o, i);
    }
  return Ne(e, t, o, i);
}
function Ne(e, t, r, n) {
  if (Object.is(e, t))
    return !0;
  let s = Ie(e), o = Ie(t);
  if (s === nt && (s = Fe), o === nt && (o = Fe), s !== o)
    return !1;
  switch (s) {
    case Jt:
      return e.toString() === t.toString();
    case Qt: {
      const u = e.valueOf(), c = t.valueOf();
      return mn(u, c);
    }
    case Gt:
    case Zr:
    case Yr:
      return Object.is(e.valueOf(), t.valueOf());
    case Gr:
      return e.source === t.source && e.flags === t.flags;
    case bs:
      return e === t;
  }
  r = r ?? /* @__PURE__ */ new Map();
  const i = r.get(e), a = r.get(t);
  if (i != null && a != null)
    return i === t;
  r.set(e, t), r.set(t, e);
  try {
    switch (s) {
      case en: {
        if (e.size !== t.size)
          return !1;
        for (const [u, c] of e.entries())
          if (!t.has(u) || !Te(c, t.get(u), u, e, t, r, n))
            return !1;
        return !0;
      }
      case tn: {
        if (e.size !== t.size)
          return !1;
        const u = Array.from(e.values()), c = Array.from(t.values());
        for (let l = 0; l < u.length; l++) {
          const f = u[l], y = c.findIndex((S) => Te(f, S, void 0, e, t, r, n));
          if (y === -1)
            return !1;
          c.splice(y, 1);
        }
        return !0;
      }
      case rn:
      case on:
      case an:
      case cn:
      case ln:
      case Es:
      case un:
      case fn:
      case dn:
      case Os:
      case hn:
      case pn: {
        if (typeof Buffer < "u" && Buffer.isBuffer(e) !== Buffer.isBuffer(t) || e.length !== t.length)
          return !1;
        for (let u = 0; u < e.length; u++)
          if (!Te(e[u], t[u], u, e, t, r, n))
            return !1;
        return !0;
      }
      case nn:
        return e.byteLength !== t.byteLength ? !1 : Ne(new Uint8Array(e), new Uint8Array(t), r, n);
      case sn:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : Ne(new Uint8Array(e), new Uint8Array(t), r, n);
      case Ss:
        return e.name === t.name && e.message === t.message;
      case Fe: {
        if (!(Ne(e.constructor, t.constructor, r, n) || mr(e) && mr(t)))
          return !1;
        const c = [...Object.keys(e), ...rt(e)], l = [...Object.keys(t), ...rt(t)];
        if (c.length !== l.length)
          return !1;
        for (let f = 0; f < c.length; f++) {
          const y = c[f], S = e[y];
          if (!Object.hasOwn(t, y))
            return !1;
          const h = t[y];
          if (!Te(S, h, y, e, t, r, n))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(e), r.delete(t);
  }
}
function de(e, t) {
  return vs(e, t, Qr);
}
function xs(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function Ts(e) {
  return e != null && typeof e != "function" && xs(e.length);
}
function gn(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e.includes(".") || e.includes("[") || e.includes("]");
  }
}
function Yt(e) {
  var t;
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is((t = e == null ? void 0 : e.valueOf) == null ? void 0 : t.call(e), -0) ? "-0" : String(e);
}
function yn(e) {
  if (e == null)
    return "";
  if (typeof e == "string")
    return e;
  if (Array.isArray(e))
    return e.map(yn).join(",");
  const t = String(e);
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function Zt(e) {
  if (Array.isArray(e))
    return e.map(Yt);
  if (typeof e == "symbol")
    return [e];
  e = yn(e);
  const t = [], r = e.length;
  if (r === 0)
    return t;
  let n = 0, s = "", o = "", i = !1;
  for (e.charCodeAt(0) === 46 && (t.push(""), n++); n < r; ) {
    const a = e[n];
    o ? a === "\\" && n + 1 < r ? (n++, s += e[n]) : a === o ? o = "" : s += a : i ? a === '"' || a === "'" ? o = a : a === "]" ? (i = !1, t.push(s), s = "") : s += a : a === "[" ? (i = !0, s && (t.push(s), s = "")) : a === "." ? s && (t.push(s), s = "") : s += a, n++;
  }
  return s && t.push(s), t;
}
function H(e, t, r) {
  if (e == null)
    return r;
  switch (typeof t) {
    case "string": {
      if (Le(t))
        return r;
      const n = e[t];
      return n === void 0 ? gn(t) ? H(e, Zt(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = Yt(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t))
        return Cs(e, t, r);
      if (Object.is(t == null ? void 0 : t.valueOf(), -0) ? t = "-0" : t = String(t), Le(t))
        return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function Cs(e, t, r) {
  if (t.length === 0)
    return r;
  let n = e;
  for (let s = 0; s < t.length; s++) {
    if (n == null || Le(t[s]))
      return r;
    n = n[t[s]];
  }
  return n === void 0 ? r : n;
}
function gr(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function Fs(e, t) {
  return Rs(e, (r, n, s, o) => {
    if (typeof e == "object") {
      if (Ie(e) === Fe && typeof e.constructor != "function") {
        const i = {};
        return o.set(e, i), G(i, e, s, o), i;
      }
      switch (Object.prototype.toString.call(e)) {
        case Qt:
        case Jt:
        case Gt: {
          const i = new e.constructor(e == null ? void 0 : e.valueOf());
          return G(i, e), i;
        }
        case nt: {
          const i = {};
          return G(i, e), i.length = e.length, i[Symbol.iterator] = e[Symbol.iterator], i;
        }
        default:
          return;
      }
    }
  });
}
function yr(e) {
  return Fs(e);
}
const Ns = /^(?:0|[1-9]\d*)$/;
function wn(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return Ns.test(e);
  }
}
function Lt(e) {
  return e !== null && typeof e == "object" && Ie(e) === "[object Arguments]";
}
function qs(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && gn(t) && (e == null ? void 0 : e[t]) == null ? r = Zt(t) : r = [t], r.length === 0)
    return !1;
  let n = e;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if ((n == null || !Object.hasOwn(n, o)) && !((Array.isArray(n) || Lt(n)) && wn(o) && o < n.length))
      return !1;
    n = n[o];
  }
  return !0;
}
function Ht(e) {
  return typeof e == "object" && e !== null;
}
function Is(e) {
  return Ht(e) && Ts(e);
}
const Ls = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Hs = /^\w*$/;
function Us(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || ws(e) ? !0 : typeof e == "string" && (Hs.test(e) || !Ls.test(e)) || t != null && Object.hasOwn(t, e);
}
const Ds = (e, t, r) => {
  const n = e[t];
  (!(Object.hasOwn(e, t) && mn(n, r)) || r === void 0 && !(t in e)) && (e[t] = r);
};
function js(e, t, r, n) {
  if (e == null && !gr(e))
    return e;
  let s;
  Us(t, e) ? s = [t] : Array.isArray(t) ? s = t : s = Zt(t);
  const o = r(H(e, s));
  let i = e;
  for (let a = 0; a < s.length && i != null; a++) {
    const u = Yt(s[a]);
    if (Le(u))
      continue;
    let c;
    if (a === s.length - 1)
      c = o;
    else {
      const l = i[u], f = n == null ? void 0 : n(l, u, e);
      c = f !== void 0 ? f : gr(l) ? l : wn(s[a + 1]) ? [] : {};
    }
    Ds(i, u, c), i = i[u];
  }
  return e;
}
function ne(e, t, r) {
  return js(e, t, () => r, () => {
  });
}
function Ot(e) {
  return Xt(e);
}
function Bs(e, ...t) {
  const r = t.slice(0, -1), n = t[t.length - 1];
  let s = e;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    s = Xe(s, i, n, /* @__PURE__ */ new Map());
  }
  return s;
}
function Xe(e, t, r, n) {
  if (Vt(e) && (e = Object(e)), t == null || typeof t != "object")
    return e;
  if (n.has(t))
    return Ps(n.get(t));
  if (n.set(t, e), Array.isArray(t)) {
    t = t.slice();
    for (let o = 0; o < t.length; o++)
      t[o] = t[o] ?? void 0;
  }
  const s = [...Object.keys(t), ...rt(t)];
  for (let o = 0; o < s.length; o++) {
    const i = s[o];
    if (Le(i))
      continue;
    let a = t[i], u = e[i];
    if (Lt(a) && (a = { ...a }), Lt(u) && (u = { ...u }), typeof Buffer < "u" && Buffer.isBuffer(a) && (a = yr(a)), Array.isArray(a))
      if (Array.isArray(u)) {
        const l = [], f = Reflect.ownKeys(u);
        for (let y = 0; y < f.length; y++) {
          const S = f[y];
          l[S] = u[S];
        }
        u = l;
      } else if (Is(u)) {
        const l = [];
        for (let f = 0; f < u.length; f++)
          l[f] = u[f];
        u = l;
      } else
        u = [];
    const c = r(u, a, i, e, t, n);
    c !== void 0 ? e[i] = c : Array.isArray(a) || Ht(u) && Ht(a) && (Et(u) || Et(a) || Ot(u) || Ot(a)) ? e[i] = Xe(u, a, r, n) : u == null && Et(a) ? e[i] = Xe({}, a, r, n) : u == null && Ot(a) ? e[i] = yr(a) : (u === void 0 || a !== void 0) && (e[i] = a);
  }
  return e;
}
function wr(e, ...t) {
  return Bs(e, ...t, Qr);
}
const ks = (e) => typeof File < "u" && e instanceof File || e instanceof Blob || typeof FileList < "u" && e instanceof FileList && e.length > 0, ht = (e) => e instanceof FormData ? !0 : ks(e) || typeof e == "object" && e !== null && Object.values(e).some((t) => ht(t));
let Ut = class extends Error {
  constructor(r) {
    super(`HTTP error ${r.status}`);
    P(this, "response");
    this.name = "HttpResponseError", this.response = r;
  }
}, _s = class extends Error {
  constructor(t = "Request was cancelled") {
    super(t), this.name = "HttpCancelledError";
  }
}, $s = class extends Error {
  constructor(t = "Network error") {
    super(t), this.name = "HttpNetworkError";
  }
};
function Ms(e) {
  const t = new URLSearchParams();
  return Object.entries(e).forEach(([r, n]) => {
    n != null && (Array.isArray(n) ? n.forEach((s) => t.append(`${r}[]`, String(s))) : typeof n == "object" ? t.append(r, JSON.stringify(n)) : t.append(r, String(n)));
  }), t.toString();
}
function Ws(e, t, r) {
  if (t && !e.startsWith("http://") && !e.startsWith("https://") && (e = t.replace(/\/$/, "") + "/" + e.replace(/^\//, "")), r && Object.keys(r).length > 0) {
    const n = Ms(r);
    n && (e += (e.includes("?") ? "&" : "?") + n);
  }
  return e;
}
function Ks() {
  var e, t, r, n;
  return typeof window > "u" ? null : ((n = (r = (t = (e = window.axios) == null ? void 0 : e.defaults) == null ? void 0 : t.headers) == null ? void 0 : r.common) == null ? void 0 : n["X-Requested-With"]) ?? null;
}
function Pn(e, t = new FormData(), r = null) {
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && bn(t, r ? `${r}[${n}]` : n, e[n]);
  return t;
}
function bn(e, t, r) {
  if (Array.isArray(r))
    return r.forEach((n, s) => bn(e, `${t}[${s}]`, n));
  if (r instanceof Date)
    return e.append(t, r.toISOString());
  if (typeof File < "u" && r instanceof File)
    return e.append(t, r, r.name);
  if (r instanceof Blob)
    return e.append(t, r);
  if (typeof r == "boolean")
    return e.append(t, r ? "1" : "0");
  if (typeof r == "string")
    return e.append(t, r);
  if (typeof r == "number")
    return e.append(t, `${r}`);
  if (r == null)
    return e.append(t, "");
  Pn(r, e, t);
}
function zs(e, t) {
  var r;
  if (e != null)
    return e instanceof FormData ? e : typeof e == "object" && ht(e) ? Pn(e) : typeof e == "object" || (r = t["Content-Type"]) != null && r.includes("application/json") ? JSON.stringify(e) : String(e);
}
function Vs(e) {
  const t = {};
  return e.forEach((r, n) => {
    t[n.toLowerCase()] = r;
  }), t;
}
function Xs(e = {}) {
  let t = e.xsrfCookieName ?? "XSRF-TOKEN", r = e.xsrfHeaderName ?? "X-XSRF-TOKEN";
  function n() {
    if (typeof document > "u")
      return null;
    const s = document.cookie.match(new RegExp("(^|;\\s*)" + t + "=([^;]*)"));
    return s ? decodeURIComponent(s[2]) : null;
  }
  return {
    setXsrfCookieName(s) {
      t = s;
    },
    setXsrfHeaderName(s) {
      r = s;
    },
    async request(s) {
      const o = Ws(s.url, s.baseURL, s.params), i = s.method.toUpperCase(), a = {}, u = Ks();
      u && (a["X-Requested-With"] = u), s.data !== void 0 && !["GET", "DELETE"].includes(i) && !(s.data instanceof FormData) && !ht(s.data) && (a["Content-Type"] = "application/json"), s.headers && Object.entries(s.headers).forEach(([h, m]) => {
        m !== void 0 && (a[h] = String(m));
      });
      const c = n();
      c && !["GET", "HEAD", "OPTIONS"].includes(i) && (a[r] = c);
      let l = s.signal, f;
      const y = s.timeout ?? 3e4;
      if (y > 0 && !l) {
        const h = new AbortController();
        l = h.signal, f = setTimeout(() => h.abort(), y);
      }
      const S = ["GET", "DELETE"].includes(i) ? void 0 : zs(s.data, a);
      S instanceof FormData && delete a["Content-Type"];
      try {
        const h = await fetch(o, {
          method: i,
          headers: a,
          body: S,
          signal: l,
          credentials: s.credentials ?? "same-origin"
        });
        f && clearTimeout(f);
        let m;
        const g = h.headers.get("content-type");
        g != null && g.includes("application/json") ? m = await h.json() : m = await h.text();
        const w = {
          status: h.status,
          data: m,
          headers: Vs(h.headers)
        };
        if (!h.ok)
          throw new Ut(w);
        return w;
      } catch (h) {
        throw f && clearTimeout(f), h instanceof Ut ? h : h instanceof DOMException && h.name === "AbortError" ? new _s() : h instanceof TypeError ? new $s(h.message) : h;
      }
    }
  };
}
const Dt = Xs();
let er = Dt, tr, Sn, En = "same-origin", On = (e) => `${e.method}:${e.baseURL ?? tr ?? ""}${e.url}`, Rn = (e) => e.status === 204 && e.headers["precognition-success"] === "true";
const st = {}, ee = {
  get: (e, t = {}, r = {}) => Ae(Re("get", e, t, r)),
  post: (e, t = {}, r = {}) => Ae(Re("post", e, t, r)),
  patch: (e, t = {}, r = {}) => Ae(Re("patch", e, t, r)),
  put: (e, t = {}, r = {}) => Ae(Re("put", e, t, r)),
  delete: (e, t = {}, r = {}) => Ae(Re("delete", e, t, r)),
  useHttpClient(e) {
    return er = e, ee;
  },
  withBaseURL(e) {
    return tr = e, ee;
  },
  withTimeout(e) {
    return Sn = e, ee;
  },
  withCredentials(e) {
    return En = typeof e == "string" ? e : e ? "include" : "omit", ee;
  },
  fingerprintRequestsUsing(e) {
    return On = e === null ? () => null : e, ee;
  },
  determineSuccessUsing(e) {
    return Rn = e, ee;
  },
  withXsrfCookieName(e) {
    return Dt.setXsrfCookieName(e), ee;
  },
  withXsrfHeaderName(e) {
    return Dt.setXsrfHeaderName(e), ee;
  }
}, Re = (e, t, r, n) => ({
  url: t,
  method: e,
  ...n,
  ...["get", "delete"].includes(e) ? {
    params: wr({}, r, n == null ? void 0 : n.params)
  } : {
    data: wr({}, r, n == null ? void 0 : n.data)
  }
}), Ae = (e = {}) => {
  const t = [
    Js,
    Gs,
    Ys
  ].reduce((r, n) => n(r), e);
  return (t.onBefore ?? (() => !0))() === !1 ? Promise.resolve(null) : ((t.onStart ?? (() => null))(), er.request({
    method: t.method,
    url: t.url,
    baseURL: t.baseURL ?? tr,
    data: t.data,
    params: t.params,
    headers: t.headers,
    signal: t.signal,
    timeout: t.timeout,
    credentials: En
  }).then(async (r) => {
    t.precognitive && Pr(r);
    const n = r.status;
    let s = r;
    return t.precognitive && t.onPrecognitionSuccess && Rn(r) && (s = await Promise.resolve(t.onPrecognitionSuccess(r) ?? s)), t.onSuccess && Qs(n) && (s = await Promise.resolve(t.onSuccess(s) ?? s)), (br(t, n) ?? ((i) => i))(s) ?? s;
  }, (r) => {
    if (Zs(r))
      return Promise.reject(r);
    const n = r;
    return t.precognitive && Pr(n.response), (br(t, n.response.status) ?? ((o, i) => Promise.reject(i)))(n.response, n);
  }).finally(t.onFinish ?? (() => null)));
}, Js = (e) => {
  const t = e.only ?? e.validate;
  return {
    ...e,
    timeout: e.timeout ?? Sn,
    precognitive: e.precognitive !== !1,
    fingerprint: typeof e.fingerprint > "u" ? On(e, er) : e.fingerprint,
    headers: {
      ...e.headers,
      Accept: "application/json",
      "Content-Type": ei(e),
      ...e.precognitive !== !1 ? {
        Precognition: !0
      } : {},
      ...t ? {
        "Precognition-Validate-Only": Array.from(t).join()
      } : {}
    }
  };
}, Qs = (e) => e >= 200 && e < 300, Gs = (e) => {
  var t;
  return typeof e.fingerprint != "string" || ((t = st[e.fingerprint]) == null || t.abort(), delete st[e.fingerprint]), e;
}, Ys = (e) => typeof e.fingerprint != "string" || e.signal || !e.precognitive ? e : (st[e.fingerprint] = new AbortController(), {
  ...e,
  signal: st[e.fingerprint].signal
}), Pr = (e) => {
  var t;
  if (((t = e.headers) == null ? void 0 : t.precognition) !== "true")
    throw Error("Did not receive a Precognition response. Ensure you have the Precognition middleware in place for the route.");
}, Zs = (e) => {
  var t;
  return !(e instanceof Ut) || typeof ((t = e.response) == null ? void 0 : t.status) != "number";
}, br = (e, t) => ({
  401: e.onUnauthorized,
  403: e.onForbidden,
  404: e.onNotFound,
  409: e.onConflict,
  422: e.onValidationError,
  423: e.onLocked
})[t], ei = (e) => {
  var t, r, n;
  return ((t = e.headers) == null ? void 0 : t["Content-Type"]) ?? ((r = e.headers) == null ? void 0 : r["Content-type"]) ?? ((n = e.headers) == null ? void 0 : n["content-type"]) ?? (ht(e.data) ? "multipart/form-data" : "application/json");
};
var ti = class {
  constructor(e) {
    P(this, "config", {});
    P(this, "defaults");
    this.defaults = e;
  }
  extend(e) {
    return e && (this.defaults = { ...this.defaults, ...e }), this;
  }
  replace(e) {
    this.config = e;
  }
  get(e) {
    return qs(this.config, e) ? H(this.config, e) : H(this.defaults, e);
  }
  set(e, t) {
    typeof e == "string" ? ne(this.config, e, t) : Object.entries(e).forEach(([r, n]) => {
      ne(this.config, r, n);
    });
  }
}, jt = new ti({
  form: {
    recentlySuccessfulDuration: 2e3,
    forceIndicesArrayFormatInFormData: !0,
    withAllErrors: !1
  },
  prefetch: {
    cacheFor: 3e4,
    hoverDelay: 75
  }
});
function He(e, t) {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => e.apply(this, n), t);
  };
}
function K(e, t) {
  return document.dispatchEvent(new CustomEvent(`inertia:${e}`, t));
}
var Sr = (e) => K("before", { cancelable: !0, detail: { visit: e } }), ri = (e) => K("error", { detail: { errors: e } }), ni = (e) => K("networkError", { cancelable: !0, detail: { error: e } }), si = (e) => K("finish", { detail: { visit: e } }), Er = (e) => K("httpException", { cancelable: !0, detail: { response: e } }), ii = (e) => K("beforeUpdate", { detail: { page: e } }), it = (e) => K("navigate", { detail: { page: e } }), oi = (e) => K("progress", { detail: { progress: e } }), ai = (e) => K("start", { detail: { visit: e } }), ci = (e) => K("success", { detail: { page: e } }), li = (e, t) => K("prefetched", { detail: { fetchedAt: Date.now(), response: e, visit: t } }), ui = (e) => K("prefetching", { detail: { visit: e } }), ot = (e) => K("flash", { detail: { flash: e } }), It, B = (It = class {
  static set(e, t) {
    typeof window < "u" && window.sessionStorage.setItem(e, JSON.stringify(t));
  }
  static get(e) {
    if (typeof window < "u")
      return JSON.parse(window.sessionStorage.getItem(e) || "null");
  }
  static merge(e, t) {
    const r = this.get(e);
    r === null ? this.set(e, t) : this.set(e, { ...r, ...t });
  }
  static remove(e) {
    typeof window < "u" && window.sessionStorage.removeItem(e);
  }
  static removeNested(e, t) {
    const r = this.get(e);
    r !== null && (delete r[t], this.set(e, r));
  }
  static exists(e) {
    try {
      return this.get(e) !== null;
    } catch {
      return !1;
    }
  }
  static clear() {
    typeof window < "u" && window.sessionStorage.clear();
  }
}, P(It, "locationVisitKey", "inertiaLocationVisit"), It), fi = async (e) => {
  if (typeof window > "u")
    throw new Error("Unable to encrypt history");
  const t = An(), r = await vn(), n = await yi(r);
  if (!n)
    throw new Error("Unable to encrypt history");
  return await hi(t, n, e);
}, Se = {
  key: "historyKey",
  iv: "historyIv"
}, di = async (e) => {
  const t = An(), r = await vn();
  if (!r)
    throw new Error("Unable to decrypt history");
  return await pi(t, r, e);
}, hi = async (e, t, r) => {
  if (typeof window > "u")
    throw new Error("Unable to encrypt history");
  if (typeof window.crypto.subtle > "u")
    return console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve(r);
  const n = new TextEncoder(), s = JSON.stringify(r), o = new Uint8Array(s.length * 3), i = n.encodeInto(s, o);
  return window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: e
    },
    t,
    o.subarray(0, i.written)
  );
}, pi = async (e, t, r) => {
  if (typeof window.crypto.subtle > "u")
    return console.warn("Decryption is not supported in this environment. SSL is required."), Promise.resolve(r);
  const n = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: e
    },
    t,
    r
  );
  return JSON.parse(new TextDecoder().decode(n));
}, An = () => {
  const e = B.get(Se.iv);
  if (e)
    return new Uint8Array(e);
  const t = window.crypto.getRandomValues(new Uint8Array(12));
  return B.set(Se.iv, Array.from(t)), t;
}, mi = async () => typeof window.crypto.subtle > "u" ? (console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve(null)) : window.crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), gi = async (e) => {
  if (typeof window.crypto.subtle > "u")
    return console.warn("Encryption is not supported in this environment. SSL is required."), Promise.resolve();
  const t = await window.crypto.subtle.exportKey("raw", e);
  B.set(Se.key, Array.from(new Uint8Array(t)));
}, yi = async (e) => {
  if (e)
    return e;
  const t = await mi();
  return t ? (await gi(t), t) : null;
}, vn = async () => {
  const e = B.get(Se.key);
  return e ? await window.crypto.subtle.importKey(
    "raw",
    new Uint8Array(e),
    {
      name: "AES-GCM",
      length: 256
    },
    !0,
    ["encrypt", "decrypt"]
  ) : null;
}, xn = (e, t, r) => {
  if (e === t)
    return !0;
  for (const n in e)
    if (!r.includes(n) && e[n] !== t[n] && !wi(e[n], t[n]))
      return !1;
  for (const n in t)
    if (!r.includes(n) && !(n in e))
      return !1;
  return !0;
}, wi = (e, t) => {
  switch (typeof e) {
    case "object":
      return xn(e, t, []);
    case "function":
      return e.toString() === t.toString();
    default:
      return e === t;
  }
}, Pi = {
  ms: 1,
  s: 1e3,
  m: 1e3 * 60,
  h: 1e3 * 60 * 60,
  d: 1e3 * 60 * 60 * 24
}, Or = (e) => {
  if (typeof e == "number")
    return e;
  for (const [t, r] of Object.entries(Pi))
    if (e.endsWith(t))
      return parseFloat(e) * r;
  return parseInt(e);
}, bi = class {
  constructor() {
    P(this, "cached", []);
    P(this, "inFlightRequests", []);
    P(this, "removalTimers", []);
    P(this, "currentUseId", null);
  }
  add(e, t, { cacheFor: r, cacheTags: n }) {
    if (this.findInFlight(e))
      return Promise.resolve();
    const o = this.findCached(e);
    if (!e.fresh && o && o.staleTimestamp > Date.now())
      return Promise.resolve();
    const [i, a] = this.extractStaleValues(r), u = new Promise((c, l) => {
      t({
        ...e,
        onCancel: () => {
          this.remove(e), e.onCancel(), l();
        },
        onError: (f) => {
          this.remove(e), e.onError(f), l();
        },
        onPrefetching(f) {
          e.onPrefetching(f);
        },
        onPrefetched(f, y) {
          e.onPrefetched(f, y);
        },
        onPrefetchResponse(f) {
          c(f);
        },
        onPrefetchError(f) {
          te.removeFromInFlight(e), l(f);
        }
      });
    }).then((c) => {
      this.remove(e);
      const l = c.getPageResponse();
      p.mergeOncePropsIntoResponse(l), this.cached.push({
        params: { ...e },
        staleTimestamp: Date.now() + i,
        expiresAt: Date.now() + a,
        response: u,
        singleUse: a === 0,
        timestamp: Date.now(),
        inFlight: !1,
        tags: Array.isArray(n) ? n : [n]
      });
      const f = this.getShortestOncePropTtl(l);
      return this.scheduleForRemoval(
        e,
        f ? Math.min(a, f) : a
      ), this.removeFromInFlight(e), c.handlePrefetch(), c;
    });
    return this.inFlightRequests.push({
      params: { ...e },
      response: u,
      staleTimestamp: null,
      inFlight: !0
    }), u;
  }
  removeAll() {
    this.cached = [], this.removalTimers.forEach((e) => {
      clearTimeout(e.timer);
    }), this.removalTimers = [];
  }
  removeByTags(e) {
    this.cached = this.cached.filter((t) => !t.tags.some((r) => e.includes(r)));
  }
  remove(e) {
    this.cached = this.cached.filter((t) => !this.paramsAreEqual(t.params, e)), this.clearTimer(e);
  }
  removeFromInFlight(e) {
    this.inFlightRequests = this.inFlightRequests.filter((t) => !this.paramsAreEqual(t.params, e));
  }
  extractStaleValues(e) {
    const [t, r] = this.cacheForToStaleAndExpires(e);
    return [Or(t), Or(r)];
  }
  cacheForToStaleAndExpires(e) {
    if (!Array.isArray(e))
      return [e, e];
    switch (e.length) {
      case 0:
        return [0, 0];
      case 1:
        return [e[0], e[0]];
      default:
        return [e[0], e[1]];
    }
  }
  clearTimer(e) {
    const t = this.removalTimers.find((r) => this.paramsAreEqual(r.params, e));
    t && (clearTimeout(t.timer), this.removalTimers = this.removalTimers.filter((r) => r !== t));
  }
  scheduleForRemoval(e, t) {
    if (!(typeof window > "u") && (this.clearTimer(e), t > 0)) {
      const r = window.setTimeout(() => this.remove(e), t);
      this.removalTimers.push({
        params: e,
        timer: r
      });
    }
  }
  get(e) {
    return this.findCached(e) || this.findInFlight(e);
  }
  use(e, t) {
    const r = `${t.url.pathname}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    return this.currentUseId = r, e.response.then((n) => {
      if (this.currentUseId === r)
        return n.mergeParams({ ...t, onPrefetched: () => {
        } }), this.removeSingleUseItems(t), n.handle();
    });
  }
  removeSingleUseItems(e) {
    this.cached = this.cached.filter((t) => this.paramsAreEqual(t.params, e) ? !t.singleUse : !0);
  }
  findCached(e) {
    return this.cached.find((t) => this.paramsAreEqual(t.params, e)) || null;
  }
  findInFlight(e) {
    return this.inFlightRequests.find((t) => this.paramsAreEqual(t.params, e)) || null;
  }
  withoutPurposePrefetchHeader(e) {
    const t = Y(e);
    return t.headers.Purpose === "prefetch" && delete t.headers.Purpose, t;
  }
  paramsAreEqual(e, t) {
    return xn(
      this.withoutPurposePrefetchHeader(e),
      this.withoutPurposePrefetchHeader(t),
      [
        "showProgress",
        "replace",
        "prefetch",
        "preserveScroll",
        "preserveState",
        "onBefore",
        "onBeforeUpdate",
        "onStart",
        "onProgress",
        "onFinish",
        "onCancel",
        "onSuccess",
        "onError",
        "onFlash",
        "onPrefetched",
        "onCancelToken",
        "onPrefetching",
        "async",
        "viewTransition",
        "optimistic",
        "component",
        "pageProps"
      ]
    );
  }
  updateCachedOncePropsFromCurrentPage() {
    this.cached.forEach((e) => {
      e.response.then((t) => {
        const r = t.getPageResponse();
        p.mergeOncePropsIntoResponse(r, { force: !0 });
        for (const [i, a] of Object.entries(r.deferredProps ?? {})) {
          const u = a.filter((c) => H(r.props, c) === void 0);
          u.length > 0 ? r.deferredProps[i] = u : delete r.deferredProps[i];
        }
        const n = this.getShortestOncePropTtl(r);
        if (n === null)
          return;
        const s = e.expiresAt - Date.now(), o = Math.min(s, n);
        o > 0 ? this.scheduleForRemoval(e.params, o) : this.remove(e.params);
      });
    });
  }
  getShortestOncePropTtl(e) {
    const t = Object.values(e.onceProps ?? {}).map((r) => r.expiresAt).filter((r) => !!r);
    return t.length === 0 ? null : Math.min(...t) - Date.now();
  }
}, te = new bi(), Rt = (e) => {
  if (e.offsetParent === null)
    return !1;
  const t = e.getBoundingClientRect(), r = t.top < window.innerHeight && t.bottom >= 0, n = t.left < window.innerWidth && t.right >= 0;
  return r && n;
}, Cc = (e) => {
  const t = (i) => {
    const a = window.getComputedStyle(i);
    return a.overflowY === "scroll" ? !0 : a.overflowY !== "auto" ? !1 : ["visible", "clip"].includes(a.overflowX) ? !0 : n(a.maxHeight, i.style.height) || s(i, "height");
  }, r = (i) => {
    const a = window.getComputedStyle(i);
    return a.overflowX === "scroll" ? !0 : a.overflowX !== "auto" ? !1 : ["visible", "clip"].includes(a.overflowY) ? !0 : n(a.maxWidth, i.style.width) || s(i, "width");
  }, n = (i, a) => !!(i && i !== "none" && i !== "0px" || a && a !== "auto" && a !== "0"), s = (i, a) => {
    const u = i.parentElement;
    if (!u)
      return !1;
    const c = window.getComputedStyle(u);
    if (["flex", "inline-flex"].includes(c.display)) {
      const l = ["column", "column-reverse"].includes(c.flexDirection);
      return a === "height" ? l : !l;
    }
    return ["grid", "inline-grid"].includes(c.display);
  };
  let o = e == null ? void 0 : e.parentElement;
  for (; o; ) {
    const i = t(o) || r(o);
    if (window.getComputedStyle(o).display !== "contents" && i)
      return o;
    o = o.parentElement;
  }
  return null;
}, Tn = (e, t) => {
  if (!t)
    return e.filter((o) => Rt(o));
  const r = e.indexOf(t), n = [], s = [];
  for (let o = r; o >= 0; o--) {
    const i = e[o];
    if (Rt(i))
      n.push(i);
    else
      break;
  }
  for (let o = r + 1; o < e.length; o++) {
    const i = e[o];
    if (Rt(i))
      s.push(i);
    else
      break;
  }
  return [...n.reverse(), ...s];
}, qe = (e, t = 1) => {
  window.requestAnimationFrame(() => {
    t > 1 ? qe(e, t - 1) : e();
  });
}, Fc = (e) => {
  if (typeof window > "u")
    return null;
  const t = document.querySelector(`script[data-page="${e}"][type="application/json"]`);
  return t != null && t.textContent ? JSON.parse(t.textContent) : null;
}, Ce = typeof window > "u", Si = !Ce && /Firefox/i.test(window.navigator.userAgent), k = class {
  static save() {
    R.saveScrollPositions(this.getScrollRegions());
  }
  static getScrollRegions() {
    return Array.from(this.regions()).map((e) => ({
      top: e.scrollTop,
      left: e.scrollLeft
    }));
  }
  static regions() {
    return document.querySelectorAll("[scroll-region]");
  }
  static scrollToTop() {
    if (Si && getComputedStyle(document.documentElement).scrollBehavior === "smooth")
      return qe(() => window.scrollTo(0, 0), 2);
    window.scrollTo(0, 0);
  }
  static reset() {
    (Ce ? null : window.location.hash) || this.scrollToTop(), this.regions().forEach((t) => {
      typeof t.scrollTo == "function" ? t.scrollTo(0, 0) : (t.scrollTop = 0, t.scrollLeft = 0);
    }), this.save(), this.scrollToAnchor();
  }
  static scrollToAnchor() {
    const e = Ce ? null : window.location.hash;
    e && setTimeout(() => {
      const t = document.getElementById(e.slice(1));
      t ? t.scrollIntoView() : this.scrollToTop();
    });
  }
  static restore(e) {
    Ce || window.requestAnimationFrame(() => {
      this.restoreDocument(), this.restoreScrollRegions(e);
    });
  }
  static restoreScrollRegions(e) {
    Ce || this.regions().forEach((t, r) => {
      const n = e[r];
      n && (typeof t.scrollTo == "function" ? t.scrollTo(n.left, n.top) : (t.scrollTop = n.top, t.scrollLeft = n.left));
    });
  }
  static restoreDocument() {
    const e = R.getDocumentScrollPosition();
    window.scrollTo(e.left, e.top);
  }
  static onScroll(e) {
    const t = e.target;
    typeof t.hasAttribute == "function" && t.hasAttribute("scroll-region") && this.save();
  }
  static onWindowScroll() {
    R.saveDocumentScrollPosition({
      top: window.scrollY,
      left: window.scrollX
    });
  }
}, rr = (e) => typeof File < "u" && e instanceof File || e instanceof Blob || typeof FileList < "u" && e instanceof FileList && e.length > 0;
function Bt(e) {
  return rr(e) || e instanceof FormData && Array.from(e.values()).some((t) => Bt(t)) || typeof e == "object" && e !== null && Object.values(e).some((t) => Bt(t));
}
var kt = (e) => e instanceof FormData;
function Cn(e, t = new FormData(), r = null, n = "brackets") {
  e = e || {};
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) && Nn(t, Fn(r, s, "indices"), e[s], n);
  return t;
}
function Fn(e, t, r) {
  return e ? r === "brackets" ? `${e}[]` : `${e}[${t}]` : t;
}
function Nn(e, t, r, n) {
  if (Array.isArray(r))
    return Array.from(r.keys()).forEach(
      (s) => Nn(e, Fn(t, s.toString(), n), r[s], n)
    );
  if (r instanceof Date)
    return e.append(t, r.toISOString());
  if (r instanceof File)
    return e.append(t, r, r.name);
  if (r instanceof Blob)
    return e.append(t, r);
  if (typeof r == "boolean")
    return e.append(t, r ? "1" : "0");
  if (typeof r == "string")
    return e.append(t, r);
  if (typeof r == "number")
    return e.append(t, `${r}`);
  if (r == null)
    return e.append(t, "");
  Cn(r, e, t, n);
}
function Ei(e) {
  return /\[\d+\]/.test(decodeURIComponent(e.search));
}
function Oi(e) {
  if (!e || e === "?")
    return {};
  const t = {};
  return e.replace(/^\?/, "").split("&").filter(Boolean).forEach((r) => {
    const [n, s] = Ai(r);
    vi(t, Rr(n), Rr(s));
  }), t;
}
function Ri(e, t) {
  const r = [];
  return _t(e, "", r, t), r.length ? "?" + r.join("&") : "";
}
function Ai(e) {
  const t = e.indexOf("=");
  return t === -1 ? [e, ""] : [e.substring(0, t), e.substring(t + 1)];
}
function Rr(e) {
  return decodeURIComponent(e.replace(/\+/g, " "));
}
function vi(e, t, r) {
  const n = xi(t);
  let s = e;
  for (; n.length > 1; ) {
    const i = n.shift(), a = n[0] === "";
    (typeof s[i] != "object" || s[i] === null) && (s[i] = a ? [] : {}), s = s[i];
  }
  const o = n.shift();
  o === "" && Array.isArray(s) ? s.push(r) : s[o] = r;
}
function xi(e) {
  const t = [], r = e.split("[")[0];
  r && t.push(r);
  let n;
  const s = /\[([^\]]*)\]/g;
  for (; (n = s.exec(e)) !== null; )
    t.push(n[1]);
  return t;
}
function _t(e, t, r, n) {
  if (e !== void 0) {
    if (e === null) {
      r.push(`${t}=`);
      return;
    }
    if (Array.isArray(e)) {
      e.forEach((s, o) => {
        const i = n === "indices" ? `${t}[${o}]` : `${t}[]`;
        _t(s, i, r, n);
      });
      return;
    }
    if (typeof e == "object") {
      Object.keys(e).forEach((s) => {
        _t(e[s], t ? `${t}[${s}]` : s, r, n);
      });
      return;
    }
    r.push(`${t}=${encodeURIComponent(String(e))}`);
  }
}
function X(e) {
  return new URL(e.toString(), typeof window > "u" ? void 0 : window.location.toString());
}
var Ti = (e, t, r, n, s) => {
  let o = typeof e == "string" ? X(e) : e;
  if ((Bt(t) || n) && !kt(t) && (jt.get("form.forceIndicesArrayFormatInFormData") && (s = "indices"), t = Cn(t, new FormData(), null, s)), kt(t))
    return [o, t];
  const [i, a] = qn(r, o, t, s);
  return [X(i), a];
};
function qn(e, t, r, n = "brackets") {
  const s = e === "get" && !kt(r) && Object.keys(r).length > 0, o = In(t.toString()), i = o || t.toString().startsWith("/") || t.toString() === "", a = !i && !t.toString().startsWith("#") && !t.toString().startsWith("?"), u = /^[.]{1,2}([/]|$)/.test(t.toString()), c = t.toString().includes("?") || s, l = t.toString().includes("#"), f = new URL(t.toString(), typeof window > "u" ? "http://localhost" : window.location.toString());
  if (s) {
    const y = Ei(f) ? "indices" : n;
    f.search = Ri({ ...Oi(f.search), ...r }, y);
  }
  return [
    [
      o ? `${f.protocol}//${f.host}` : "",
      i ? f.pathname : "",
      a ? f.pathname.substring(u ? 0 : 1) : "",
      c ? f.search : "",
      l ? f.hash : ""
    ].join(""),
    s ? {} : r
  ];
}
function at(e) {
  return e = new URL(e.href), e.hash = "", e;
}
var Ar = (e, t) => {
  e.hash && !t.hash && at(e).href === t.href && (t.hash = e.hash);
}, ct = (e, t) => at(e).href === at(t).href, Ci = (e, t) => e.origin === t.origin && e.pathname === t.pathname;
function lt(e) {
  return e !== null && typeof e == "object" && e !== void 0 && "url" in e && "method" in e;
}
function Nc(e) {
  return e.component ? typeof e.component != "string" ? (console.error(
    `The "component" property on the URL method pair received multiple components (${Object.keys(e.component).join(", ")}), but only a single component string is supported for instant visits. Use the withComponent() method to specify which component to use.`
  ), null) : e.component : null;
}
function In(e) {
  return /^([a-z][a-z0-9+.-]*:)?\/\/[^/]/i.test(e);
}
function Fi(e, t) {
  const r = typeof e == "string" ? X(e) : e;
  return t ? `${r.protocol}//${r.host}${r.pathname}${r.search}${r.hash}` : `${r.pathname}${r.search}${r.hash}`;
}
var Ni = class {
  constructor() {
    P(this, "page");
    P(this, "swapComponent");
    P(this, "resolveComponent");
    P(this, "onFlashCallback");
    P(this, "componentId", {});
    P(this, "listeners", []);
    P(this, "isFirstPageLoad", !0);
    P(this, "cleared", !1);
    P(this, "pendingDeferredProps", null);
    P(this, "historyQuotaExceeded", !1);
    P(this, "optimisticBaseline", {});
    P(this, "pendingOptimistics", []);
    P(this, "optimisticCounter", 0);
  }
  init({
    initialPage: e,
    swapComponent: t,
    resolveComponent: r,
    onFlash: n
  }) {
    return this.page = { ...e, flash: e.flash ?? {} }, this.swapComponent = t, this.resolveComponent = r, this.onFlashCallback = n, re.on("historyQuotaExceeded", () => {
      this.historyQuotaExceeded = !0;
    }), this;
  }
  set(e, {
    replace: t = !1,
    preserveScroll: r = !1,
    preserveState: n = !1,
    viewTransition: s = !1
  } = {}) {
    Object.keys(e.deferredProps || {}).length && (this.pendingDeferredProps = {
      deferredProps: e.deferredProps,
      component: e.component,
      url: e.url
    }, e.initialDeferredProps === void 0 && (e.initialDeferredProps = e.deferredProps)), this.componentId = {};
    const o = this.componentId;
    return e.clearHistory && R.clear(), this.resolve(e.component, e).then((i) => {
      if (o !== this.componentId)
        return;
      e.rememberedState ?? (e.rememberedState = {});
      const a = typeof window > "u", u = a ? new URL(e.url) : window.location, c = !a && r ? k.getScrollRegions() : [];
      t = t || ct(X(e.url), u);
      const l = { ...e, flash: {} };
      return new Promise(
        (f) => t ? R.replaceState(l, f) : R.pushState(l, f)
      ).then(() => {
        const f = !this.isTheSame(e);
        if (!f && Object.keys(e.props.errors || {}).length > 0 && (s = !1), this.page = e, this.cleared = !1, this.hasOnceProps() && te.updateCachedOncePropsFromCurrentPage(), f && this.fireEventsFor("newComponent"), this.isFirstPageLoad && this.fireEventsFor("firstLoad"), this.isFirstPageLoad = !1, this.historyQuotaExceeded) {
          this.historyQuotaExceeded = !1;
          return;
        }
        return this.swap({
          component: i,
          page: e,
          preserveState: n,
          viewTransition: s
        }).then(() => {
          r ? window.requestAnimationFrame(() => k.restoreScrollRegions(c)) : k.reset(), this.pendingDeferredProps && this.pendingDeferredProps.component === e.component && this.pendingDeferredProps.url === e.url && re.fireInternalEvent("loadDeferredProps", this.pendingDeferredProps.deferredProps), this.pendingDeferredProps = null, t || it(e);
        });
      });
    });
  }
  setQuietly(e, {
    preserveState: t = !1
  } = {}) {
    return this.resolve(e.component, e).then((r) => (this.page = e, this.cleared = !1, R.setCurrent(e), this.swap({ component: r, page: e, preserveState: t, viewTransition: !1 })));
  }
  clear() {
    this.cleared = !0;
  }
  isCleared() {
    return this.cleared;
  }
  get() {
    return this.page;
  }
  getWithoutFlashData() {
    return { ...this.page, flash: {} };
  }
  hasOnceProps() {
    return Object.keys(this.page.onceProps ?? {}).length > 0;
  }
  merge(e) {
    this.page = { ...this.page, ...e };
  }
  setPropsQuietly(e) {
    return this.page = { ...this.page, props: e }, this.resolve(this.page.component, this.page).then((t) => this.swap({ component: t, page: this.page, preserveState: !0, viewTransition: !1 }));
  }
  setFlash(e) {
    var t;
    this.page = { ...this.page, flash: e }, (t = this.onFlashCallback) == null || t.call(this, e);
  }
  setUrlHash(e) {
    this.page.url.includes(e) || (this.page.url += e);
  }
  remember(e) {
    this.page.rememberedState = e;
  }
  swap({
    component: e,
    page: t,
    preserveState: r,
    viewTransition: n
  }) {
    const s = () => this.swapComponent({ component: e, page: t, preserveState: r });
    if (!n || !(document != null && document.startViewTransition) || document.visibilityState === "hidden")
      return s();
    const o = typeof n == "boolean" ? () => null : n;
    return new Promise((i) => {
      const a = document.startViewTransition(() => s().then(i));
      o(a);
    });
  }
  resolve(e, t) {
    return Promise.resolve(this.resolveComponent(e, t));
  }
  nextOptimisticId() {
    return ++this.optimisticCounter;
  }
  setBaseline(e, t) {
    e in this.optimisticBaseline || (this.optimisticBaseline[e] = t);
  }
  updateBaseline(e, t) {
    e in this.optimisticBaseline && (this.optimisticBaseline[e] = t);
  }
  hasBaseline(e) {
    return e in this.optimisticBaseline;
  }
  registerOptimistic(e, t) {
    this.pendingOptimistics.push({ id: e, callback: t });
  }
  unregisterOptimistic(e) {
    this.pendingOptimistics = this.pendingOptimistics.filter((t) => t.id !== e);
  }
  replayOptimistics() {
    const e = Object.keys(this.optimisticBaseline);
    if (e.length === 0)
      return {};
    const t = Y(this.page.props);
    for (const n of e)
      t[n] = Y(this.optimisticBaseline[n]);
    for (const { callback: n } of this.pendingOptimistics) {
      const s = n(Y(t));
      s && Object.assign(t, s);
    }
    const r = {};
    for (const n of e)
      r[n] = t[n];
    return r;
  }
  pendingOptimisticCount() {
    return this.pendingOptimistics.length;
  }
  clearOptimisticState() {
    this.optimisticBaseline = {}, this.pendingOptimistics = [];
  }
  isTheSame(e) {
    return this.page.component === e.component;
  }
  on(e, t) {
    return this.listeners.push({ event: e, callback: t }), () => {
      this.listeners = this.listeners.filter((r) => r.event !== e && r.callback !== t);
    };
  }
  fireEventsFor(e) {
    this.listeners.filter((t) => t.event === e).forEach((t) => t.callback());
  }
  mergeOncePropsIntoResponse(e, { force: t = !1 } = {}) {
    Object.entries(e.onceProps ?? {}).forEach(([r, n]) => {
      var o;
      const s = (o = this.page.onceProps) == null ? void 0 : o[r];
      s !== void 0 && (t || H(e.props, n.prop) === void 0) && (ne(e.props, n.prop, H(this.page.props, s.prop)), e.onceProps[r].expiresAt = s.expiresAt);
    });
  }
}, p = new Ni(), pt = class {
  constructor() {
    P(this, "items", []);
    P(this, "processingPromise", null);
  }
  add(e) {
    return this.items.push(e), this.process();
  }
  process() {
    return this.processingPromise ?? (this.processingPromise = this.processNext().finally(() => {
      this.processingPromise = null;
    })), this.processingPromise;
  }
  processNext() {
    const e = this.items.shift();
    return e ? Promise.resolve(e()).then(() => this.processNext()) : Promise.resolve();
  }
}, be = typeof window > "u", ve = new pt(), vr = !be && /CriOS/.test(window.navigator.userAgent), qi = class {
  constructor() {
    P(this, "rememberedState", "rememberedState");
    P(this, "scrollRegions", "scrollRegions");
    P(this, "preserveUrl", !1);
    P(this, "current", {});
    // We need initialState for `restore`
    P(this, "initialState", null);
  }
  remember(e, t) {
    var r;
    this.replaceState({
      ...p.getWithoutFlashData(),
      rememberedState: {
        ...((r = p.get()) == null ? void 0 : r.rememberedState) ?? {},
        [t]: e
      }
    });
  }
  restore(e) {
    var t, r, n, s;
    if (!be)
      return ((t = this.current[this.rememberedState]) == null ? void 0 : t[e]) !== void 0 ? (r = this.current[this.rememberedState]) == null ? void 0 : r[e] : (s = (n = this.initialState) == null ? void 0 : n[this.rememberedState]) == null ? void 0 : s[e];
  }
  pushState(e, t = null) {
    if (!be) {
      if (this.preserveUrl) {
        t && t();
        return;
      }
      this.current = e, ve.add(() => this.getPageData(e).then((r) => {
        const n = () => this.doPushState({ page: r }, e.url).then(() => t == null ? void 0 : t());
        return vr ? new Promise((s) => {
          setTimeout(() => n().then(s));
        }) : n();
      }));
    }
  }
  clonePageProps(e) {
    try {
      return structuredClone(e.props), e;
    } catch {
      return {
        ...e,
        props: Y(e.props)
      };
    }
  }
  getPageData(e) {
    const t = this.clonePageProps(e);
    return new Promise((r) => e.encryptHistory ? fi(t).then(r) : r(t));
  }
  processQueue() {
    return ve.process();
  }
  decrypt(e = null) {
    var r;
    if (be)
      return Promise.resolve(e ?? p.get());
    const t = e ?? ((r = window.history.state) == null ? void 0 : r.page);
    return this.decryptPageData(t).then((n) => {
      if (!n)
        throw new Error("Unable to decrypt history");
      return this.initialState === null ? this.initialState = n ?? void 0 : this.current = n ?? {}, n;
    });
  }
  decryptPageData(e) {
    return e instanceof ArrayBuffer ? di(e) : Promise.resolve(e);
  }
  saveScrollPositions(e) {
    ve.add(() => Promise.resolve().then(() => {
      var t;
      if ((t = window.history.state) != null && t.page && !de(this.getScrollRegions(), e))
        return this.doReplaceState({
          page: window.history.state.page,
          scrollRegions: e
        });
    }));
  }
  saveDocumentScrollPosition(e) {
    ve.add(() => Promise.resolve().then(() => {
      var t;
      if ((t = window.history.state) != null && t.page && !de(this.getDocumentScrollPosition(), e))
        return this.doReplaceState({
          page: window.history.state.page,
          documentScrollPosition: e
        });
    }));
  }
  getScrollRegions() {
    var e;
    return ((e = window.history.state) == null ? void 0 : e.scrollRegions) || [];
  }
  getDocumentScrollPosition() {
    var e;
    return ((e = window.history.state) == null ? void 0 : e.documentScrollPosition) || { top: 0, left: 0 };
  }
  replaceState(e, t = null) {
    if (de(this.current, e)) {
      t && t();
      return;
    }
    const { flash: r, ...n } = e;
    if (p.merge(n), !be) {
      if (this.preserveUrl) {
        t && t();
        return;
      }
      this.current = e, ve.add(() => this.getPageData(e).then((s) => {
        const o = () => this.doReplaceState({ page: s }, e.url).then(() => t == null ? void 0 : t());
        return vr ? new Promise((i) => {
          setTimeout(() => o().then(i));
        }) : o();
      }));
    }
  }
  isHistoryThrottleError(e) {
    return e instanceof Error && e.name === "SecurityError" && (e.message.includes("history.pushState") || e.message.includes("history.replaceState"));
  }
  isQuotaExceededError(e) {
    return e instanceof Error && e.name === "QuotaExceededError";
  }
  withThrottleProtection(e) {
    return Promise.resolve().then(() => {
      try {
        return e();
      } catch (t) {
        if (!this.isHistoryThrottleError(t))
          throw t;
        console.error(t.message);
      }
    });
  }
  doReplaceState(e, t) {
    return this.withThrottleProtection(() => {
      var r, n;
      window.history.replaceState(
        {
          ...e,
          scrollRegions: e.scrollRegions ?? ((r = window.history.state) == null ? void 0 : r.scrollRegions),
          documentScrollPosition: e.documentScrollPosition ?? ((n = window.history.state) == null ? void 0 : n.documentScrollPosition)
        },
        "",
        t
      );
    });
  }
  doPushState(e, t) {
    return this.withThrottleProtection(() => {
      try {
        window.history.pushState(e, "", t);
      } catch (r) {
        if (!this.isQuotaExceededError(r))
          throw r;
        re.fireInternalEvent("historyQuotaExceeded", t);
      }
    });
  }
  getState(e, t) {
    var r;
    return ((r = this.current) == null ? void 0 : r[e]) ?? t;
  }
  deleteState(e) {
    this.current[e] !== void 0 && (delete this.current[e], this.replaceState(this.current));
  }
  clearInitialState(e) {
    this.initialState && this.initialState[e] !== void 0 && delete this.initialState[e];
  }
  browserHasHistoryEntry() {
    var e;
    return !be && !!((e = window.history.state) != null && e.page);
  }
  clear() {
    B.remove(Se.key), B.remove(Se.iv);
  }
  setCurrent(e) {
    this.current = e;
  }
  isValidState(e) {
    return !!e.page;
  }
  getAllState() {
    return this.current;
  }
};
typeof window < "u" && window.history.scrollRestoration && (window.history.scrollRestoration = "manual");
var R = new qi(), Ii = class {
  constructor() {
    P(this, "internalListeners", []);
  }
  init() {
    typeof window < "u" && (window.addEventListener("popstate", this.handlePopstateEvent.bind(this)), window.addEventListener("pageshow", this.handlePageshowEvent.bind(this)), window.addEventListener("scroll", He(k.onWindowScroll.bind(k), 100), !0)), typeof document < "u" && document.addEventListener("scroll", He(k.onScroll.bind(k), 100), !0);
  }
  onGlobalEvent(e, t) {
    const r = ((n) => {
      const s = t(n);
      n.cancelable && !n.defaultPrevented && s === !1 && n.preventDefault();
    });
    return this.registerListener(`inertia:${e}`, r);
  }
  on(e, t) {
    return this.internalListeners.push({ event: e, listener: t }), () => {
      this.internalListeners = this.internalListeners.filter((r) => r.listener !== t);
    };
  }
  onMissingHistoryItem() {
    p.clear(), this.fireInternalEvent("missingHistoryItem");
  }
  fireInternalEvent(e, ...t) {
    this.internalListeners.filter((r) => r.event === e).forEach((r) => r.listener(...t));
  }
  registerListener(e, t) {
    return document.addEventListener(e, t), () => document.removeEventListener(e, t);
  }
  // bfcache restores pages without firing `popstate`, so we use `pageshow` to
  // re-validate encrypted history entries after `clearHistory` removed the keys.
  // https://web.dev/articles/bfcache
  handlePageshowEvent(e) {
    e.persisted && R.decrypt().catch(() => this.onMissingHistoryItem());
  }
  handlePopstateEvent(e) {
    const t = e.state || null;
    if (t === null) {
      const r = X(p.get().url);
      r.hash = window.location.hash, R.replaceState({ ...p.getWithoutFlashData(), url: r.href }), k.reset();
      return;
    }
    if (!R.isValidState(t))
      return this.onMissingHistoryItem();
    R.decrypt(t.page).then((r) => {
      if (p.get().version !== r.version) {
        this.onMissingHistoryItem();
        return;
      }
      W.cancelAll({ prefetch: !1 }), p.setQuietly(r, { preserveState: !1 }).then(() => {
        k.restore(R.getScrollRegions()), it(p.get());
        const n = {}, s = p.get().props;
        for (const [o, i] of Object.entries(r.initialDeferredProps ?? r.deferredProps ?? {})) {
          const a = i.filter((u) => H(s, u) === void 0);
          a.length > 0 && (n[o] = a);
        }
        Object.keys(n).length > 0 && this.fireInternalEvent("loadDeferredProps", n);
      });
    }).catch(() => {
      this.onMissingHistoryItem();
    });
  }
}, re = new Ii(), Li = class {
  constructor() {
    P(this, "type");
    this.type = this.resolveType();
  }
  resolveType() {
    var t;
    if (typeof window > "u")
      return "navigate";
    const e = (t = window.performance) == null ? void 0 : t.getEntriesByType("navigation")[0];
    return (e == null ? void 0 : e.type) ?? "navigate";
  }
  get() {
    return this.type;
  }
  isBackForward() {
    return this.type === "back_forward";
  }
  isReload() {
    return this.type === "reload";
  }
}, At = new Li(), Hi = class {
  static handle() {
    this.clearRememberedStateOnReload(), [this.handleBackForward, this.handleLocation, this.handleDefault].find((t) => t.bind(this)());
  }
  static clearRememberedStateOnReload() {
    At.isReload() && (R.deleteState(R.rememberedState), R.clearInitialState(R.rememberedState));
  }
  static handleBackForward() {
    if (!At.isBackForward() || !R.browserHasHistoryEntry())
      return !1;
    const e = R.getScrollRegions();
    return R.decrypt().then((t) => {
      p.set(t, { preserveScroll: !0, preserveState: !0 }).then(() => {
        k.restore(e), it(p.get());
      });
    }).catch(() => {
      re.onMissingHistoryItem();
    }), !0;
  }
  /**
   * @link https://inertiajs.com/redirects#external-redirects
   */
  static handleLocation() {
    if (!B.exists(B.locationVisitKey))
      return !1;
    const e = B.get(B.locationVisitKey) || {};
    return B.remove(B.locationVisitKey), typeof window < "u" && p.setUrlHash(window.location.hash), R.decrypt(p.get()).then(() => {
      const t = R.getState(R.rememberedState, {}), r = R.getScrollRegions();
      p.remember(t), p.set(p.get(), {
        preserveScroll: e.preserveScroll,
        preserveState: !0
      }).then(() => {
        e.preserveScroll && k.restore(r), this.fireInitialEvents();
      });
    }).catch(() => {
      re.onMissingHistoryItem();
    }), !0;
  }
  static handleDefault() {
    typeof window < "u" && p.setUrlHash(window.location.hash), p.set(p.get(), { preserveScroll: !0, preserveState: !0 }).then(() => {
      At.isReload() ? k.restore(R.getScrollRegions()) : k.scrollToAnchor(), this.fireInitialEvents();
    });
  }
  static fireInitialEvents() {
    const e = p.get();
    it(e), Object.keys(e.flash).length > 0 && queueMicrotask(() => ot(e.flash));
  }
}, Ui = class {
  constructor(e, t, r) {
    P(this, "id", null);
    P(this, "throttle", !1);
    P(this, "keepAlive", !1);
    P(this, "cb");
    P(this, "interval");
    P(this, "cbCount", 0);
    this.keepAlive = r.keepAlive ?? !1, this.cb = t, this.interval = e, (r.autoStart ?? !0) && this.start();
  }
  stop() {
    this.id && clearInterval(this.id);
  }
  start() {
    typeof window > "u" || (this.stop(), this.id = window.setInterval(() => {
      (!this.throttle || this.cbCount % 10 === 0) && this.cb(), this.throttle && this.cbCount++;
    }, this.interval));
  }
  isInBackground(e) {
    this.throttle = this.keepAlive ? !1 : e, this.throttle && (this.cbCount = 0);
  }
}, Di = class {
  constructor() {
    P(this, "polls", []);
    this.setupVisibilityListener();
  }
  add(e, t, r) {
    const n = new Ui(e, t, r);
    return this.polls.push(n), {
      stop: () => n.stop(),
      start: () => n.start()
    };
  }
  clear() {
    this.polls.forEach((e) => e.stop()), this.polls = [];
  }
  setupVisibilityListener() {
    typeof document > "u" || document.addEventListener(
      "visibilitychange",
      () => {
        this.polls.forEach((e) => e.isInBackground(document.hidden));
      },
      !1
    );
  }
}, ji = new Di(), Bi = class {
  constructor() {
    P(this, "requestHandlers", []);
    P(this, "responseHandlers", []);
    P(this, "errorHandlers", []);
  }
  onRequest(e) {
    return this.requestHandlers.push(e), () => {
      this.requestHandlers = this.requestHandlers.filter((t) => t !== e);
    };
  }
  onResponse(e) {
    return this.responseHandlers.push(e), () => {
      this.responseHandlers = this.responseHandlers.filter((t) => t !== e);
    };
  }
  onError(e) {
    return this.errorHandlers.push(e), () => {
      this.errorHandlers = this.errorHandlers.filter((t) => t !== e);
    };
  }
  async processRequest(e) {
    let t = e;
    for (const r of this.requestHandlers)
      t = await r(t);
    return t;
  }
  async processResponse(e) {
    let t = e;
    for (const r of this.responseHandlers)
      t = await r(t);
    return t;
  }
  async processError(e) {
    for (const t of this.errorHandlers)
      await t(e);
  }
}, I = new Bi(), nr = class extends Error {
  constructor(t, r, n) {
    super(n ? `${t} (${n})` : t);
    P(this, "code");
    P(this, "url");
    this.name = "HttpError", this.code = r, this.url = n;
  }
}, Ue = class extends nr {
  constructor(t, r, n) {
    super(t, "ERR_HTTP_RESPONSE", n);
    P(this, "response");
    this.name = "HttpResponseError", this.response = r;
  }
}, De = class extends nr {
  constructor(e = "Request was cancelled", t) {
    super(e, "ERR_CANCELLED", t), this.name = "HttpCancelledError";
  }
}, ut = class extends nr {
  constructor(t, r, n) {
    super(t, "ERR_NETWORK", r);
    P(this, "cause");
    this.name = "HttpNetworkError", this.cause = n;
  }
};
function ki(e) {
  const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
  return t ? decodeURIComponent(t[3]) : null;
}
function _i(e) {
  const t = {};
  return e.getAllResponseHeaders().split(`\r
`).forEach((r) => {
    const n = r.indexOf(":");
    n > 0 && (t[r.slice(0, n).toLowerCase().trim()] = r.slice(n + 1).trim());
  }), t;
}
function $i(e, t) {
  if (!t.headers)
    return;
  const r = t.data instanceof FormData;
  Object.entries(t.headers).forEach(([n, s]) => {
    (n.toLowerCase() !== "content-type" || !r) && e.setRequestHeader(n, String(s));
  });
}
function Mi(e, t) {
  if (!t || Object.keys(t).length === 0)
    return e;
  const [r] = qn("get", e, t);
  return r;
}
var Ln = class {
  constructor(e = {}) {
    P(this, "xsrfCookieName");
    P(this, "xsrfHeaderName");
    this.xsrfCookieName = e.xsrfCookieName ?? "XSRF-TOKEN", this.xsrfHeaderName = e.xsrfHeaderName ?? "X-XSRF-TOKEN";
  }
  async request(e) {
    const t = await I.processRequest(e);
    try {
      const r = await this.doRequest(t);
      return await I.processResponse(r);
    } catch (r) {
      throw (r instanceof Ue || r instanceof ut || r instanceof De) && await I.processError(r), r;
    }
  }
  doRequest(e) {
    return new Promise((t, r) => {
      var a, u;
      const n = new XMLHttpRequest(), s = Mi(e.url, e.params);
      n.open(e.method.toUpperCase(), s, !0);
      const o = ki(this.xsrfCookieName);
      o && n.setRequestHeader(this.xsrfHeaderName, o);
      let i = null;
      e.data !== null && e.data !== void 0 && (e.data instanceof FormData ? i = e.data : typeof e.data == "object" ? (i = JSON.stringify(e.data), !((a = e.headers) != null && a["Content-Type"]) && !((u = e.headers) != null && u["content-type"]) && n.setRequestHeader("Content-Type", "application/json")) : i = String(e.data)), $i(n, e), e.onUploadProgress && (n.upload.onprogress = (c) => {
        const l = c.lengthComputable ? c.loaded / c.total : void 0;
        e.onUploadProgress({
          progress: l,
          percentage: l ? Math.round(l * 100) : 0,
          loaded: c.loaded,
          total: c.lengthComputable ? c.total : void 0
        });
      }), e.signal && e.signal.addEventListener("abort", () => n.abort()), n.onabort = () => r(new De("Request was cancelled", e.url)), n.onerror = () => r(new ut("Network error", e.url)), n.onload = () => {
        const c = {
          status: n.status,
          data: n.responseText,
          headers: _i(n)
        };
        n.status >= 400 ? r(new Ue(`Request failed with status ${n.status}`, c, e.url)) : t(c);
      }, n.send(i);
    });
  }
}, Wi = new Ln(), vt = Wi;
function Ki(e) {
  return !("request" in e);
}
var zi = {
  /**
   * Get the current HTTP client
   */
  getClient() {
    return vt;
  },
  /**
   * Set the HTTP client to use for all Inertia requests
   */
  setClient(e) {
    if (!Ki(e)) {
      vt = e;
      return;
    }
    vt = new Ln(e), e.xsrfCookieName && ee.withXsrfCookieName(e.xsrfCookieName), e.xsrfHeaderName && ee.withXsrfHeaderName(e.xsrfHeaderName);
  },
  /**
   * Register a request handler that runs before each request
   */
  onRequest: I.onRequest.bind(I),
  /**
   * Register a response handler that runs after each successful response
   */
  onResponse: I.onResponse.bind(I),
  /**
   * Register an error handler that runs when a request fails
   */
  onError: I.onError.bind(I),
  /**
   * Process a request config through all registered request handlers.
   * For use by custom HttpClient implementations.
   */
  processRequest: I.processRequest.bind(I),
  /**
   * Process a response through all registered response handlers.
   * For use by custom HttpClient implementations.
   */
  processResponse: I.processResponse.bind(I),
  /**
   * Process an error through all registered error handlers.
   * For use by custom HttpClient implementations.
   */
  processError: I.processError.bind(I)
}, Je = class Qe {
  constructor(t) {
    P(this, "callbacks", []);
    P(this, "params");
    if (!t.prefetch)
      this.params = t;
    else {
      const r = {
        onBefore: this.wrapCallback(t, "onBefore"),
        onBeforeUpdate: this.wrapCallback(t, "onBeforeUpdate"),
        onStart: this.wrapCallback(t, "onStart"),
        onProgress: this.wrapCallback(t, "onProgress"),
        onFinish: this.wrapCallback(t, "onFinish"),
        onCancel: this.wrapCallback(t, "onCancel"),
        onSuccess: this.wrapCallback(t, "onSuccess"),
        onError: this.wrapCallback(t, "onError"),
        onHttpException: this.wrapCallback(t, "onHttpException"),
        onNetworkError: this.wrapCallback(t, "onNetworkError"),
        onFlash: this.wrapCallback(t, "onFlash"),
        onCancelToken: this.wrapCallback(t, "onCancelToken"),
        onPrefetched: this.wrapCallback(t, "onPrefetched"),
        onPrefetching: this.wrapCallback(t, "onPrefetching")
      };
      this.params = {
        ...t,
        ...r,
        onPrefetchResponse: t.onPrefetchResponse || (() => {
        }),
        onPrefetchError: t.onPrefetchError || (() => {
        })
      };
    }
  }
  static create(t) {
    return new Qe(t);
  }
  data() {
    return this.params.method === "get" ? null : this.params.data;
  }
  queryParams() {
    return this.params.method === "get" ? this.params.data : {};
  }
  isPartial() {
    return this.params.only.length > 0 || this.params.except.length > 0 || this.params.reset.length > 0;
  }
  isPrefetch() {
    return this.params.prefetch === !0;
  }
  isDeferredPropsRequest() {
    return this.params.deferredProps === !0;
  }
  onCancelToken(t) {
    this.params.onCancelToken({
      cancel: t
    });
  }
  markAsFinished() {
    this.params.completed = !0, this.params.cancelled = !1, this.params.interrupted = !1;
  }
  markAsCancelled({ cancelled: t = !0, interrupted: r = !1 }) {
    this.params.onCancel(), this.params.completed = !1, this.params.cancelled = t, this.params.interrupted = r;
  }
  wasCancelledAtAll() {
    return this.params.cancelled || this.params.interrupted;
  }
  onFinish() {
    this.params.onFinish(this.params);
  }
  onStart() {
    this.params.onStart(this.params);
  }
  onPrefetching() {
    this.params.onPrefetching(this.params);
  }
  onPrefetchResponse(t) {
    this.params.onPrefetchResponse && this.params.onPrefetchResponse(t);
  }
  onPrefetchError(t) {
    this.params.onPrefetchError && this.params.onPrefetchError(t);
  }
  all() {
    return this.params;
  }
  headers() {
    const t = {
      ...this.params.headers
    };
    this.isPartial() && (t["X-Inertia-Partial-Component"] = p.get().component);
    const r = this.params.only.concat(this.params.reset);
    return r.length > 0 && (t["X-Inertia-Partial-Data"] = r.join(",")), this.params.except.length > 0 && (t["X-Inertia-Partial-Except"] = this.params.except.join(",")), this.params.reset.length > 0 && (t["X-Inertia-Reset"] = this.params.reset.join(",")), this.params.errorBag && this.params.errorBag.length > 0 && (t["X-Inertia-Error-Bag"] = this.params.errorBag), t;
  }
  setPreserveOptions(t) {
    this.params.preserveScroll = Qe.resolvePreserveOption(this.params.preserveScroll, t), this.params.preserveState = Qe.resolvePreserveOption(this.params.preserveState, t);
  }
  runCallbacks() {
    this.callbacks.forEach(({ name: t, args: r }) => {
      this.params[t](...r);
    });
  }
  merge(t) {
    this.params = {
      ...this.params,
      ...t
    };
  }
  wrapCallback(t, r) {
    return (...n) => {
      this.recordCallback(r, n), t[r](...n);
    };
  }
  recordCallback(t, r) {
    this.callbacks.push({ name: t, args: r });
  }
  static resolvePreserveOption(t, r) {
    return typeof t == "function" ? t(r) : t === "errors" ? Object.keys(r.props.errors || {}).length > 0 : t;
  }
}, Vi = {
  createIframeAndPage(e) {
    typeof e == "object" && (e = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(
      e
    )}`);
    const t = document.createElement("html");
    t.innerHTML = e, t.querySelectorAll("a").forEach((n) => n.setAttribute("target", "_top"));
    const r = document.createElement("iframe");
    return r.style.backgroundColor = "white", r.style.borderRadius = "5px", r.style.width = "100%", r.style.height = "100%", { iframe: r, page: t };
  },
  show(e) {
    const { iframe: t, page: r } = this.createIframeAndPage(e);
    t.style.boxSizing = "border-box", t.style.display = "block";
    const n = document.createElement("dialog");
    n.id = "inertia-error-dialog", Object.assign(n.style, {
      width: "calc(100vw - 100px)",
      height: "calc(100vh - 100px)",
      padding: "0",
      margin: "auto",
      border: "none",
      backgroundColor: "transparent"
    });
    const s = document.createElement("style");
    if (s.textContent = `
      dialog#inertia-error-dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
      }

      dialog#inertia-error-dialog:focus {
        outline: none;
      }
    `, document.head.appendChild(s), n.addEventListener("click", (o) => {
      o.target === n && n.close();
    }), n.addEventListener("close", () => {
      s.remove(), n.remove();
    }), n.appendChild(t), document.body.prepend(n), n.showModal(), n.focus(), !t.contentWindow)
      throw new Error("iframe not yet ready.");
    t.contentWindow.document.open(), t.contentWindow.document.write(r.outerHTML), t.contentWindow.document.close();
  }
}, Xi = new pt(), xr = class Hn {
  constructor(t, r, n) {
    P(this, "wasPrefetched", !1);
    P(this, "processed", !1);
    this.requestParams = t, this.response = r, this.originatingPage = n;
  }
  static create(t, r, n) {
    return new Hn(t, r, n);
  }
  isProcessed() {
    return this.processed;
  }
  async handlePrefetch() {
    ct(this.requestParams.all().url, window.location) && this.handle();
  }
  async handle() {
    return Xi.add(() => this.process());
  }
  async process() {
    if (this.requestParams.all().prefetch)
      return this.wasPrefetched = !0, this.requestParams.all().prefetch = !1, this.requestParams.all().onPrefetched(this.response, this.requestParams.all()), li(this.response, this.requestParams.all()), Promise.resolve();
    if (this.requestParams.runCallbacks(), this.processed = !0, !this.isInertiaResponse())
      return this.handleNonInertiaResponse();
    if (this.isHttpException()) {
      const n = {
        ...this.response,
        data: this.getDataFromResponse(this.response.data)
      };
      if (this.requestParams.all().onHttpException(n) === !1 || !Er(n))
        return;
    }
    await R.processQueue(), R.preserveUrl = this.requestParams.all().preserveUrl, await this.setPage();
    const { flash: t } = p.get();
    Object.keys(t).length > 0 && !this.requestParams.isDeferredPropsRequest() && (ot(t), this.requestParams.all().onFlash(t));
    const r = p.get().props.errors || {};
    if (Object.keys(r).length > 0) {
      const n = this.getScopedErrors(r);
      return ri(n), this.requestParams.all().onError(n);
    }
    W.flushByCacheTags(this.requestParams.all().invalidateCacheTags || []), this.wasPrefetched || W.flush(p.get().url), ci(p.get()), await this.requestParams.all().onSuccess(p.get()), R.preserveUrl = !1;
  }
  mergeParams(t) {
    this.requestParams.merge(t);
  }
  getPageResponse() {
    const t = this.getDataFromResponse(this.response.data);
    return typeof t == "object" ? this.response.data = { ...t, flash: t.flash ?? {} } : this.response.data = t;
  }
  async handleNonInertiaResponse() {
    if (this.isInertiaRedirect()) {
      W.visit(this.getHeader("x-inertia-redirect"), {
        ...this.requestParams.all(),
        method: "get",
        data: {}
      });
      return;
    }
    if (this.isLocationVisit()) {
      const r = X(this.getHeader("x-inertia-location"));
      return Ar(this.requestParams.all().url, r), this.locationVisit(r);
    }
    const t = {
      ...this.response,
      data: this.getDataFromResponse(this.response.data)
    };
    if (this.requestParams.all().onHttpException(t) !== !1 && Er(t))
      return Vi.show(t.data);
  }
  isInertiaResponse() {
    return this.hasHeader("x-inertia");
  }
  isHttpException() {
    return this.response.status >= 400;
  }
  hasStatus(t) {
    return this.response.status === t;
  }
  getHeader(t) {
    return this.response.headers[t];
  }
  hasHeader(t) {
    return this.getHeader(t) !== void 0;
  }
  isInertiaRedirect() {
    return this.hasStatus(409) && this.hasHeader("x-inertia-redirect");
  }
  isLocationVisit() {
    return this.hasStatus(409) && this.hasHeader("x-inertia-location");
  }
  /**
   * @link https://inertiajs.com/redirects#external-redirects
   */
  locationVisit(t) {
    try {
      if (B.set(B.locationVisitKey, {
        preserveScroll: this.requestParams.all().preserveScroll === !0
      }), typeof window > "u")
        return;
      ct(window.location, t) ? window.location.reload() : window.location.href = t.href;
    } catch {
      return !1;
    }
  }
  async setPage() {
    const t = this.getPageResponse();
    return this.shouldSetPage(t) ? (this.mergeProps(t), p.mergeOncePropsIntoResponse(t), this.preserveOptimisticProps(t), this.preserveEqualProps(t), await this.setRememberedState(t), this.requestParams.setPreserveOptions(t), t.url = R.preserveUrl ? p.get().url : this.pageUrl(t), this.requestParams.all().onBeforeUpdate(t), ii(t), p.set(t, {
      replace: this.requestParams.all().replace,
      preserveScroll: this.requestParams.all().preserveScroll,
      preserveState: this.requestParams.all().preserveState,
      viewTransition: this.requestParams.all().viewTransition
    })) : Promise.resolve();
  }
  getDataFromResponse(t) {
    if (typeof t != "string")
      return t;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  shouldSetPage(t) {
    if (!this.requestParams.all().async || this.originatingPage.component !== t.component)
      return !0;
    if (this.originatingPage.component !== p.get().component)
      return !1;
    const r = X(this.originatingPage.url), n = X(p.get().url);
    return r.origin === n.origin && r.pathname === n.pathname;
  }
  pageUrl(t) {
    const r = X(t.url);
    return t.preserveFragment ? r.hash = this.requestParams.all().url.hash : Ar(this.requestParams.all().url, r), r.pathname + r.search + r.hash;
  }
  preserveOptimisticProps(t) {
    if (W.hasPendingOptimistic())
      for (const r of Object.keys(t.props))
        p.hasBaseline(r) && (p.updateBaseline(r, t.props[r]), t.props[r] = p.get().props[r]);
  }
  preserveEqualProps(t) {
    if (t.component !== p.get().component)
      return;
    const r = p.get().props;
    Object.entries(t.props).forEach(([n, s]) => {
      de(s, r[n]) && (t.props[n] = r[n]);
    });
  }
  mergeProps(t) {
    if (!this.requestParams.isPartial() || t.component !== p.get().component)
      return;
    const r = t.mergeProps || [], n = t.prependProps || [], s = t.deepMergeProps || [], o = t.matchPropsOn || [], i = (c, l) => {
      const f = H(p.get().props, c), y = H(t.props, c);
      if (Array.isArray(y)) {
        const S = this.mergeOrMatchItems(
          f || [],
          y,
          c,
          o,
          l
        );
        ne(t.props, c, S);
      } else if (typeof y == "object" && y !== null) {
        const S = {
          ...f || {},
          ...y
        };
        ne(t.props, c, S);
      }
    };
    r.forEach((c) => i(c, !0)), n.forEach((c) => i(c, !1)), s.forEach((c) => {
      const l = H(p.get().props, c), f = H(t.props, c), y = (S, h, m) => Array.isArray(h) ? this.mergeOrMatchItems(S, h, m, o) : typeof h == "object" && h !== null ? Object.keys(h).reduce(
        (g, w) => (g[w] = y(S ? S[w] : void 0, h[w], `${m}.${w}`), g),
        { ...S }
      ) : h;
      ne(t.props, c, y(l, f, c));
    });
    const a = new Set(
      [...this.requestParams.all().only, ...this.requestParams.all().except].filter((c) => c.includes(".")).map((c) => c.split(".")[0])
    );
    for (const c of a) {
      const l = p.get().props[c];
      this.isObject(l) && this.isObject(t.props[c]) && (t.props[c] = this.deepMergeObjects(l, t.props[c]));
    }
    t.props = { ...p.get().props, ...t.props }, this.shouldPreserveErrors(t) && (t.props.errors = p.get().props.errors), p.get().scrollProps && (t.scrollProps = {
      ...p.get().scrollProps || {},
      ...t.scrollProps || {}
    }), p.hasOnceProps() && (t.onceProps = {
      ...p.get().onceProps || {},
      ...t.onceProps || {}
    }), this.requestParams.isDeferredPropsRequest() && (t.flash = { ...p.get().flash });
    const u = p.get().initialDeferredProps;
    u && Object.keys(u).length > 0 && (t.initialDeferredProps = u);
  }
  /**
   * By default, the Laravel adapter shares validation errors via Inertia::always(),
   * so responses always include errors, even when empty. Components like
   * InfiniteScroll and WhenVisible, as well as loading deferred props,
   * perform async requests that should practically never reset errors.
   */
  shouldPreserveErrors(t) {
    if (!this.requestParams.all().preserveErrors)
      return !1;
    const r = p.get().props.errors;
    if (!r || Object.keys(r).length === 0)
      return !1;
    const n = t.props.errors;
    return !(n && Object.keys(n).length > 0);
  }
  isObject(t) {
    return t && typeof t == "object" && !Array.isArray(t);
  }
  deepMergeObjects(t, r) {
    const n = { ...t };
    for (const s of Object.keys(r)) {
      const o = t[s], i = r[s];
      this.isObject(o) && this.isObject(i) ? n[s] = this.deepMergeObjects(o, i) : n[s] = i;
    }
    return n;
  }
  mergeOrMatchItems(t, r, n, s, o = !0) {
    const i = Array.isArray(t) ? t : [], a = s.find((l) => l.split(".").slice(0, -1).join(".") === n);
    if (!a)
      return o ? [...i, ...r] : [...r, ...i];
    const u = a.split(".").pop() || "", c = /* @__PURE__ */ new Map();
    return r.forEach((l) => {
      this.hasUniqueProperty(l, u) && c.set(l[u], l);
    }), o ? this.appendWithMatching(i, r, c, u) : this.prependWithMatching(i, r, c, u);
  }
  appendWithMatching(t, r, n, s) {
    const o = t.map((a) => this.hasUniqueProperty(a, s) && n.has(a[s]) ? n.get(a[s]) : a), i = r.filter((a) => this.hasUniqueProperty(a, s) ? !t.some(
      (u) => this.hasUniqueProperty(u, s) && u[s] === a[s]
    ) : !0);
    return [...o, ...i];
  }
  prependWithMatching(t, r, n, s) {
    const o = t.filter((i) => this.hasUniqueProperty(i, s) ? !n.has(i[s]) : !0);
    return [...r, ...o];
  }
  hasUniqueProperty(t, r) {
    return t && typeof t == "object" && r in t;
  }
  async setRememberedState(t) {
    const r = await R.getState(R.rememberedState, {});
    this.requestParams.all().preserveState && r && t.component === p.get().component && (t.rememberedState = r);
  }
  getScopedErrors(t) {
    return this.requestParams.all().errorBag ? t[this.requestParams.all().errorBag || ""] || {} : t;
  }
}, Tr = class Un {
  constructor(t, r, { optimistic: n = !1 } = {}) {
    P(this, "response");
    P(this, "cancelToken");
    P(this, "requestParams");
    P(this, "requestHasFinished", !1);
    P(this, "optimistic");
    this.page = r, this.requestParams = Je.create(t), this.cancelToken = new AbortController(), this.optimistic = n;
  }
  static create(t, r, n) {
    return new Un(t, r, n);
  }
  isPrefetch() {
    return this.requestParams.isPrefetch();
  }
  isOptimistic() {
    return this.optimistic;
  }
  isPendingOptimistic() {
    return this.isOptimistic() && (!this.response || !this.response.isProcessed());
  }
  async send() {
    this.requestParams.onCancelToken(() => this.cancel({ cancelled: !0 })), ai(this.requestParams.all()), this.requestParams.onStart(), this.requestParams.all().prefetch && (this.requestParams.onPrefetching(), ui(this.requestParams.all()));
    const t = this.requestParams.all().prefetch;
    return zi.getClient().request({
      method: this.requestParams.all().method,
      url: at(this.requestParams.all().url).href,
      data: this.requestParams.data(),
      signal: this.cancelToken.signal,
      headers: this.getHeaders(),
      onUploadProgress: this.onProgress.bind(this)
    }).then((r) => (this.response = xr.create(this.requestParams, r, this.page), this.response.handle())).catch((r) => r instanceof Ue ? (this.response = xr.create(this.requestParams, r.response, this.page), this.response.handle()) : Promise.reject(r)).catch((r) => {
      if (!(r instanceof De) && this.requestParams.all().onNetworkError(r) !== !1 && ni(r))
        return t && this.requestParams.onPrefetchError(r), Promise.reject(r);
    }).finally(() => {
      this.finish(), t && this.response && this.requestParams.onPrefetchResponse(this.response);
    });
  }
  finish() {
    this.requestParams.wasCancelledAtAll() || (this.requestParams.markAsFinished(), this.fireFinishEvents());
  }
  fireFinishEvents() {
    this.requestHasFinished || (this.requestHasFinished = !0, si(this.requestParams.all()), this.requestParams.onFinish());
  }
  cancel({ cancelled: t = !1, interrupted: r = !1 }) {
    this.requestHasFinished || (this.cancelToken.abort(), this.requestParams.markAsCancelled({ cancelled: t, interrupted: r }), this.fireFinishEvents());
  }
  onProgress(t) {
    this.requestParams.data() instanceof FormData && (oi(t), this.requestParams.all().onProgress(t));
  }
  getHeaders() {
    const t = {
      ...this.requestParams.headers(),
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0
    }, r = p.get();
    r.version && (t["X-Inertia-Version"] = r.version);
    const n = Object.entries(r.onceProps || {}).filter(([, s]) => H(r.props, s.prop) === void 0 ? !1 : !s.expiresAt || s.expiresAt > Date.now()).map(([s]) => s);
    return n.length > 0 && (t["X-Inertia-Except-Once-Props"] = n.join(",")), t;
  }
}, Cr = class {
  constructor({ maxConcurrent: e, interruptible: t }) {
    P(this, "requests", []);
    P(this, "maxConcurrent");
    P(this, "interruptible");
    this.maxConcurrent = e, this.interruptible = t;
  }
  send(e) {
    this.requests.push(e), e.send().finally(() => {
      this.requests = this.requests.filter((t) => t !== e);
    });
  }
  interruptInFlight() {
    this.cancel({ interrupted: !0 }, !1);
  }
  cancelInFlight({ prefetch: e = !0, optimistic: t = !0 } = {}) {
    this.requests.filter((r) => e || !r.isPrefetch()).filter((r) => t || !r.isOptimistic()).forEach((r) => r.cancel({ cancelled: !0 }));
  }
  cancel({ cancelled: e = !1, interrupted: t = !1 } = {}, r = !1) {
    if (!r && !this.shouldCancel())
      return;
    const n = this.requests.shift();
    n == null || n.cancel({ cancelled: e, interrupted: t });
  }
  shouldCancel() {
    return this.interruptible && this.requests.length >= this.maxConcurrent;
  }
  hasPendingOptimistic() {
    return this.requests.some((e) => e.isPendingOptimistic());
  }
}, j = () => {
}, Ji = class {
  constructor() {
    P(this, "syncRequestStream", new Cr({
      maxConcurrent: 1,
      interruptible: !0
    }));
    P(this, "asyncRequestStream", new Cr({
      maxConcurrent: 1 / 0,
      interruptible: !1
    }));
    P(this, "clientVisitQueue", new pt());
    P(this, "pendingOptimisticCallback");
  }
  init({
    initialPage: e,
    resolveComponent: t,
    swapComponent: r,
    onFlash: n
  }) {
    p.init({
      initialPage: e,
      resolveComponent: t,
      swapComponent: r,
      onFlash: n
    }), Hi.handle(), re.init(), re.on("missingHistoryItem", () => {
      typeof window < "u" && this.visit(window.location.href, { preserveState: !0, preserveScroll: !0, replace: !0 });
    }), re.on("loadDeferredProps", (s) => {
      this.loadDeferredProps(s);
    }), re.on("historyQuotaExceeded", (s) => {
      window.location.href = s;
    });
  }
  optimistic(e) {
    return this.pendingOptimisticCallback = e, this;
  }
  get(e, t = {}, r = {}) {
    return this.visit(e, { ...r, method: "get", data: t });
  }
  post(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "post", data: t });
  }
  put(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "put", data: t });
  }
  patch(e, t = {}, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "patch", data: t });
  }
  delete(e, t = {}) {
    return this.visit(e, { preserveState: !0, ...t, method: "delete" });
  }
  reload(e = {}) {
    return this.doReload(e);
  }
  doReload(e = {}) {
    if (!(typeof window > "u"))
      return this.visit(window.location.href, {
        ...e,
        preserveScroll: !0,
        preserveState: !0,
        async: !0,
        headers: {
          ...e.headers || {},
          "Cache-Control": "no-cache"
        }
      });
  }
  remember(e, t = "default") {
    R.remember(e, t);
  }
  restore(e = "default") {
    return R.restore(e);
  }
  on(e, t) {
    return typeof window > "u" ? () => {
    } : re.onGlobalEvent(e, t);
  }
  hasPendingOptimistic() {
    return this.asyncRequestStream.hasPendingOptimistic();
  }
  cancelAll({ async: e = !0, prefetch: t = !0, sync: r = !0 } = {}) {
    e && this.asyncRequestStream.cancelInFlight({ prefetch: t }), r && this.syncRequestStream.cancelInFlight();
  }
  poll(e, t = {}, r = {}) {
    return ji.add(e, () => this.reload({ preserveErrors: !0, ...t }), {
      autoStart: r.autoStart ?? !0,
      keepAlive: r.keepAlive ?? !1
    });
  }
  visit(e, t = {}) {
    t.optimistic = t.optimistic ?? this.pendingOptimisticCallback, this.pendingOptimisticCallback = void 0, t.optimistic && (t.async = t.async ?? !0);
    const r = this.getPendingVisit(e, {
      ...t,
      showProgress: t.showProgress ?? (!t.async || !!t.optimistic)
    }), n = this.getVisitEvents(t);
    if (n.onBefore(r) === !1 || !Sr(r))
      return;
    const s = X(p.get().url);
    (r.only.length > 0 || r.except.length > 0 || r.reset.length > 0 ? Ci(r.url, s) : ct(r.url, s)) || this.asyncRequestStream.cancelInFlight({ prefetch: !1, optimistic: !1 }), r.async || this.syncRequestStream.interruptInFlight(), t.optimistic && this.applyOptimisticUpdate(t.optimistic, n), !p.isCleared() && !r.preserveUrl && k.save();
    const a = {
      ...r,
      ...n
    }, u = () => {
      const c = te.get(a);
      c ? (J.reveal(c.inFlight), te.use(c, a)) : (J.reveal(!0), (r.async ? this.asyncRequestStream : this.syncRequestStream).send(Tr.create(a, p.get(), { optimistic: !!t.optimistic })));
    };
    Array.isArray(r.component) && (console.error(
      `The "component" prop received an array of components (${r.component.join(", ")}), but only a single component string is supported for instant visits. Pass an explicit component name instead.`
    ), r.component = null), r.component ? R.processQueue().then(() => {
      this.performInstantSwap(r).then(() => {
        a.preserveState = !0, a.replace = !0, a.viewTransition = !1, u();
      });
    }) : u();
  }
  getCached(e, t = {}) {
    return te.findCached(this.getPrefetchParams(e, t));
  }
  flush(e, t = {}) {
    te.remove(this.getPrefetchParams(e, t));
  }
  flushAll() {
    te.removeAll();
  }
  flushByCacheTags(e) {
    te.removeByTags(Array.isArray(e) ? e : [e]);
  }
  getPrefetching(e, t = {}) {
    return te.findInFlight(this.getPrefetchParams(e, t));
  }
  prefetch(e, t = {}, r = {}) {
    if ((t.method ?? (lt(e) ? e.method : "get")) !== "get")
      throw new Error("Prefetch requests must use the GET method");
    const s = this.getPendingVisit(e, {
      ...t,
      async: !0,
      showProgress: !1,
      prefetch: !0,
      viewTransition: !1
    }), o = s.url.origin + s.url.pathname + s.url.search, i = window.location.origin + window.location.pathname + window.location.search;
    if (o === i)
      return;
    const a = this.getVisitEvents(t);
    if (a.onBefore(s) === !1 || !Sr(s))
      return;
    J.hide(), this.asyncRequestStream.interruptInFlight();
    const u = {
      ...s,
      ...a
    };
    new Promise((l) => {
      const f = () => {
        p.get() ? l() : setTimeout(f, 50);
      };
      f();
    }).then(() => {
      te.add(
        u,
        (l) => {
          this.asyncRequestStream.send(Tr.create(l, p.get()));
        },
        {
          cacheFor: jt.get("prefetch.cacheFor"),
          cacheTags: [],
          ...r
        }
      );
    });
  }
  clearHistory() {
    R.clear();
  }
  decryptHistory() {
    return R.decrypt();
  }
  resolveComponent(e, t) {
    return p.resolve(e, t);
  }
  replace(e) {
    this.clientVisit(e, { replace: !0 });
  }
  replaceProp(e, t, r) {
    this.replace({
      preserveScroll: !0,
      preserveState: !0,
      props(n) {
        const s = typeof t == "function" ? t(H(n, e), n) : t;
        return ne(Y(n), e, s);
      },
      ...r || {}
    });
  }
  appendToProp(e, t, r) {
    this.replaceProp(
      e,
      (n, s) => {
        const o = typeof t == "function" ? t(n, s) : t;
        return Array.isArray(n) || (n = n !== void 0 ? [n] : []), [...n, o];
      },
      r
    );
  }
  prependToProp(e, t, r) {
    this.replaceProp(
      e,
      (n, s) => {
        const o = typeof t == "function" ? t(n, s) : t;
        return Array.isArray(n) || (n = n !== void 0 ? [n] : []), [o, ...n];
      },
      r
    );
  }
  push(e) {
    this.clientVisit(e);
  }
  flash(e, t) {
    const r = p.get().flash;
    let n;
    if (typeof e == "function")
      n = e(r);
    else if (typeof e == "string")
      n = { ...r, [e]: t };
    else if (e && Object.keys(e).length)
      n = { ...r, ...e };
    else
      return;
    p.setFlash(n), Object.keys(n).length && ot(n);
  }
  clientVisit(e, { replace: t = !1 } = {}) {
    this.clientVisitQueue.add(() => this.performClientVisit(e, { replace: t }));
  }
  performClientVisit(e, { replace: t = !1 } = {}) {
    const r = p.get(), n = typeof e.props == "function" ? Object.fromEntries(
      Object.values(r.onceProps ?? {}).map((m) => [
        m.prop,
        H(r.props, m.prop)
      ])
    ) : {}, s = typeof e.props == "function" ? e.props(r.props, n) : e.props ?? r.props, o = typeof e.flash == "function" ? e.flash(r.flash) : e.flash, { viewTransition: i, onError: a, onFinish: u, onFlash: c, onSuccess: l, ...f } = e, y = {
      ...r,
      ...f,
      flash: o ?? {},
      props: s
    }, S = Je.resolvePreserveOption(e.preserveScroll ?? !1, y), h = Je.resolvePreserveOption(e.preserveState ?? !1, y);
    return p.set(y, {
      replace: t,
      preserveScroll: S,
      preserveState: h,
      viewTransition: i
    }).then(() => {
      const m = p.get().flash;
      Object.keys(m).length > 0 && (ot(m), c == null || c(m));
      const g = p.get().props.errors || {};
      if (Object.keys(g).length === 0) {
        l == null || l(p.get());
        return;
      }
      const w = e.errorBag ? g[e.errorBag || ""] || {} : g;
      a == null || a(w);
    }).finally(() => u == null ? void 0 : u(e));
  }
  performInstantSwap(e) {
    const t = p.get(), r = Object.fromEntries(
      (t.sharedProps ?? []).filter((i) => i in t.props).map((i) => [i, t.props[i]])
    ), n = typeof e.pageProps == "function" ? e.pageProps(Y(t.props), Y(r)) : e.pageProps, s = n !== null ? { ...n } : { ...r }, o = {
      component: e.component,
      url: e.url.pathname + e.url.search + e.url.hash,
      version: t.version,
      props: {
        ...s,
        errors: {}
      },
      flash: {},
      clearHistory: !1,
      encryptHistory: t.encryptHistory,
      sharedProps: t.sharedProps,
      rememberedState: {}
    };
    return p.set(o, {
      replace: e.replace,
      preserveScroll: Je.resolvePreserveOption(e.preserveScroll, o),
      preserveState: !1,
      viewTransition: e.viewTransition
    });
  }
  getPrefetchParams(e, t) {
    return {
      ...this.getPendingVisit(e, {
        ...t,
        async: !0,
        showProgress: !1,
        prefetch: !0,
        viewTransition: !1
      }),
      ...this.getVisitEvents(t)
    };
  }
  getPendingVisit(e, t) {
    if (lt(e)) {
      const u = e;
      e = u.url, t.method = t.method ?? u.method;
    }
    const r = jt.get("visitOptions"), n = r ? r(e.toString(), Y(t)) || {} : {}, s = {
      method: "get",
      data: {},
      replace: !1,
      preserveScroll: !1,
      preserveState: !1,
      only: [],
      except: [],
      headers: {},
      errorBag: "",
      forceFormData: !1,
      queryStringArrayFormat: "brackets",
      async: !1,
      showProgress: !0,
      fresh: !1,
      reset: [],
      preserveUrl: !1,
      preserveErrors: !1,
      prefetch: !1,
      invalidateCacheTags: [],
      viewTransition: !1,
      component: null,
      pageProps: null,
      ...t,
      ...n
    }, [o, i] = Ti(
      e,
      s.data,
      s.method,
      s.forceFormData,
      s.queryStringArrayFormat
    ), a = {
      cancelled: !1,
      completed: !1,
      interrupted: !1,
      ...s,
      url: o,
      data: i
    };
    return a.prefetch && (a.headers.Purpose = "prefetch"), a;
  }
  getVisitEvents(e) {
    return {
      onCancelToken: e.onCancelToken || j,
      onBefore: e.onBefore || j,
      onBeforeUpdate: e.onBeforeUpdate || j,
      onStart: e.onStart || j,
      onProgress: e.onProgress || j,
      onFinish: e.onFinish || j,
      onCancel: e.onCancel || j,
      onSuccess: e.onSuccess || j,
      onError: e.onError || j,
      onHttpException: e.onHttpException || j,
      onNetworkError: e.onNetworkError || j,
      onFlash: e.onFlash || j,
      onPrefetched: e.onPrefetched || j,
      onPrefetching: e.onPrefetching || j
    };
  }
  applyOptimisticUpdate(e, t) {
    const r = p.get().props, n = e(Y(r));
    if (!n)
      return;
    const s = [];
    for (const l of Object.keys(n))
      de(r[l], n[l]) || s.push(l);
    if (s.length === 0)
      return;
    const o = p.nextOptimisticId(), i = p.get().component;
    for (const l of s)
      p.setBaseline(l, Y(r[l]));
    p.registerOptimistic(o, e), p.setPropsQuietly({ ...r, ...n });
    let a = !0;
    const u = t.onSuccess;
    t.onSuccess = (l) => (a = !1, u(l));
    const c = t.onFinish;
    t.onFinish = (l) => {
      if (p.unregisterOptimistic(o), a && p.get().component === i) {
        const f = p.replayOptimistics();
        Object.keys(f).length > 0 && p.setPropsQuietly({ ...p.get().props, ...f });
      }
      return p.pendingOptimisticCount() === 0 && p.clearOptimisticState(), c(l);
    };
  }
  loadDeferredProps(e) {
    e && Object.values(e).forEach((t) => {
      this.doReload({ only: t, deferredProps: !0, preserveErrors: !0 });
    });
  }
}, qc = class {
  /**
   * Creates a callback that returns a UrlMethodPair.
   *
   * createWayfinderCallback(urlMethodPair)
   * createWayfinderCallback(method, url)
   * createWayfinderCallback(() => urlMethodPair)
   * createWayfinderCallback(() => method, () => url)
   */
  static createWayfinderCallback(...e) {
    return () => e.length === 1 ? lt(e[0]) ? e[0] : e[0]() : {
      method: typeof e[0] == "function" ? e[0]() : e[0],
      url: typeof e[1] == "function" ? e[1]() : e[1]
    };
  }
  /**
   * Parses all useForm() arguments into { rememberKey, data, precognitionEndpoint }.
   *
   * useForm()
   * useForm(data)
   * useForm(rememberKey, data)
   * useForm(method, url, data)
   * useForm(urlMethodPair, data)
   *
   */
  static parseUseFormArguments(...e) {
    return e.length === 0 ? {
      rememberKey: null,
      data: {},
      precognitionEndpoint: null
    } : e.length === 1 ? {
      rememberKey: null,
      data: e[0],
      precognitionEndpoint: null
    } : e.length === 2 ? typeof e[0] == "string" ? {
      rememberKey: e[0],
      data: e[1],
      precognitionEndpoint: null
    } : {
      rememberKey: null,
      data: e[1],
      precognitionEndpoint: this.createWayfinderCallback(e[0])
    } : {
      rememberKey: null,
      data: e[2],
      precognitionEndpoint: this.createWayfinderCallback(e[0], e[1])
    };
  }
  /**
   * Parses all submission arguments into { method, url, options }.
   * It uses the Precognition endpoint if no explicit method/url are provided.
   *
   * form.submit(method, url)
   * form.submit(method, url, options)
   * form.submit(urlMethodPair)
   * form.submit(urlMethodPair, options)
   * form.submit()
   * form.submit(options)
   */
  static parseSubmitArguments(e, t) {
    return e.length === 3 || e.length === 2 && typeof e[0] == "string" ? { method: e[0], url: e[1], options: e[2] ?? {} } : lt(e[0]) ? { ...e[0], options: e[1] ?? {} } : { ...t(), options: e[0] ?? {} };
  }
  /**
   * Merges headers into the Precognition validate() arguments.
   */
  static mergeHeadersForValidation(e, t, r) {
    const n = (s) => (s.headers = {
      ...r ?? {},
      ...s.headers ?? {}
    }, s);
    return e && typeof e == "object" && !("target" in e) ? e = n(e) : t && typeof t == "object" ? t = n(t) : typeof e == "string" ? t = n(t ?? {}) : e = n(e ?? {}), [e, t];
  }
};
function Fr(e) {
  if (!e || typeof e != "object")
    return {};
  const t = {}, r = typeof e.entries == "function" ? Array.from(e.entries()) : Object.entries(e);
  for (const [n, s] of r)
    typeof s == "string" ? t[n.toLowerCase()] = s : Array.isArray(s) && (t[n.toLowerCase()] = s.join(", "));
  return t;
}
function Qi(e) {
  return {
    progress: e.progress,
    percentage: e.progress ? Math.round(e.progress * 100) : 0,
    loaded: e.loaded,
    total: e.total
  };
}
var Ke;
function Nr() {
  return Ke || (Ke = Promise.resolve().then(() => Rc).catch((e) => {
    throw Ke = void 0, e;
  })), Ke;
}
var Gi = class {
  constructor(e) {
    P(this, "axiosInstance");
    this.axiosInstance = e ? Promise.resolve(e) : Nr().then((t) => t.default);
  }
  async getAxios() {
    return this.axiosInstance;
  }
  async request(e) {
    const t = await I.processRequest(e);
    try {
      const r = await this.doRequest(t);
      return await I.processResponse(r);
    } catch (r) {
      throw (r instanceof Ue || r instanceof ut || r instanceof De) && await I.processError(r), r;
    }
  }
  async doRequest(e) {
    const t = await this.getAxios();
    try {
      const r = await t({
        method: e.method,
        url: e.url,
        data: e.data,
        params: e.params,
        headers: e.headers,
        signal: e.signal,
        responseType: "text",
        onUploadProgress: e.onUploadProgress ? (n) => e.onUploadProgress(Qi(n)) : void 0
      });
      return {
        status: r.status,
        data: r.data,
        headers: Fr(r.headers)
      };
    } catch (r) {
      if ((await Nr()).default.isCancel(r))
        throw new De("Request was cancelled", e.url);
      if (r && typeof r == "object" && "response" in r) {
        const s = r, o = {
          status: s.response.status,
          data: s.response.data,
          headers: Fr(s.response.headers)
        };
        throw new Ue(
          `Request failed with status ${s.response.status}`,
          o,
          e.url
        );
      }
      throw new ut(
        r instanceof Error ? r.message : "Network error",
        e.url,
        r instanceof Error ? r : void 0
      );
    }
  }
};
function Ic(e) {
  return new Gi(e);
}
function Yi(e) {
  if (!e.includes("."))
    return e;
  const t = (r) => r.startsWith("[") && r.endsWith("]") ? r : r.split(".").reduce((n, s, o) => o === 0 ? s : `${n}[${s}]`);
  return e.replace(/\\\./g, "__ESCAPED_DOT__").split(/(\[[^\]]*\])/).filter(Boolean).map(t).join("").replace(/__ESCAPED_DOT__/g, ".");
}
function Zi(e) {
  const t = [], r = /([^\[\]]+)|\[(\d*)\]/g;
  let n;
  for (; (n = r.exec(e)) !== null; )
    n[1] !== void 0 ? t.push(n[1]) : n[2] !== void 0 && t.push(n[2] === "" ? "" : Number(n[2]));
  return t;
}
function eo(e, t, r) {
  let n = e;
  for (let s = 0; s < t.length - 1; s++)
    t[s] in n || (n[t[s]] = {}), n = n[t[s]];
  n[t[t.length - 1]] = r;
}
function to(e) {
  const t = Object.keys(e), r = t.filter((n) => /^\d+$/.test(n)).map(Number).sort((n, s) => n - s);
  return t.length === r.length && r.length > 0 && r[0] === 0 && r.every((n, s) => n === s);
}
function Ge(e) {
  if (Array.isArray(e))
    return e.map(Ge);
  if (typeof e != "object" || e === null || rr(e))
    return e;
  if (to(e)) {
    const r = [];
    for (let n = 0; n < Object.keys(e).length; n++)
      r[n] = Ge(e[n]);
    return r;
  }
  const t = {};
  for (const r in e)
    t[r] = Ge(e[r]);
  return t;
}
function Lc(e) {
  const t = {};
  for (const [r, n] of e.entries()) {
    if (n instanceof File && n.size === 0 && n.name === "")
      continue;
    const s = Zi(Yi(r));
    if (s[s.length - 1] === "") {
      const o = s.slice(0, -1), i = H(t, o);
      if (Array.isArray(i))
        i.push(n);
      else if (i && typeof i == "object" && !rr(i)) {
        const a = Object.keys(i).filter((u) => /^\d+$/.test(u)).map(Number).sort((u, c) => u - c);
        ne(t, o, a.length > 0 ? [...a.map((u) => i[u]), n] : [n]);
      } else
        ne(t, o, [n]);
      continue;
    }
    eo(t, s.map(String), n);
  }
  return Ge(t);
}
var ro = {
  buildDOMElement(e) {
    const t = document.createElement("template");
    t.innerHTML = e;
    const r = t.content.firstChild;
    if (!e.startsWith("<script "))
      return r;
    const n = document.createElement("script");
    return n.innerHTML = r.innerHTML, r.getAttributeNames().forEach((s) => {
      n.setAttribute(s, r.getAttribute(s) || "");
    }), n;
  },
  isInertiaManagedElement(e) {
    return e.nodeType === Node.ELEMENT_NODE && e.getAttribute("data-inertia") !== null;
  },
  findMatchingElementIndex(e, t) {
    const r = e.getAttribute("data-inertia");
    return r !== null ? t.findIndex((n) => n.getAttribute("data-inertia") === r) : -1;
  },
  update: He(function(e) {
    const t = e.map((n) => this.buildDOMElement(n)), r = Array.from(document.head.childNodes).filter(
      (n) => this.isInertiaManagedElement(n)
    );
    t.some((n) => n instanceof HTMLTitleElement) && document.head.querySelectorAll("title:not([data-inertia])").forEach((n) => n.remove()), r.forEach((n) => {
      const s = this.findMatchingElementIndex(n, t);
      if (s === -1) {
        n.remove();
        return;
      }
      const o = t.splice(s, 1)[0];
      o && !n.isEqualNode(o) && n.replaceWith(o);
    }), t.forEach((n) => {
      document.head.appendChild(n);
    });
  }, 1)
};
function Hc(e, t, r) {
  const n = {};
  let s = 0;
  function o() {
    const f = s += 1;
    return n[f] = [], f.toString();
  }
  function i(f) {
    f === null || Object.keys(n).indexOf(f) === -1 || (delete n[f], l());
  }
  function a(f) {
    Object.keys(n).indexOf(f) === -1 && (n[f] = []);
  }
  function u(f, y = []) {
    f !== null && Object.keys(n).indexOf(f) > -1 && (n[f] = y), l();
  }
  function c() {
    const f = t(""), y = {
      ...f ? { title: `<title data-inertia="">${f}</title>` } : {}
    }, S = Object.values(n).reduce((h, m) => h.concat(m), []).reduce((h, m) => {
      if (m.indexOf("<") === -1)
        return h;
      if (m.indexOf("<title ") === 0) {
        const w = m.match(/(<title [^>]+>)(.*?)(<\/title>)/);
        return h.title = w ? `${w[1]}${t(w[2])}${w[3]}` : m, h;
      }
      const g = m.match(/ data-inertia="[^"]+"/);
      return g ? h[g[0]] = m : h[Object.keys(h).length] = m, h;
    }, y);
    return Object.values(S);
  }
  function l() {
    e ? r(c()) : ro.update(c());
  }
  return l(), {
    forceUpdate: l,
    createProvider: function() {
      const f = o();
      return {
        reconnect: () => a(f),
        update: (y) => u(f, y),
        disconnect: () => i(f)
      };
    }
  };
}
var no = "X-Inertia-Infinite-Scroll-Merge-Intent", so = (e) => {
  const t = () => {
    var E;
    const w = (E = p.get().scrollProps) == null ? void 0 : E[e.getPropName()];
    if (w)
      return w;
    throw new Error(`The page object does not contain a scroll prop named "${e.getPropName()}".`);
  }, r = {
    component: null,
    loading: !1,
    previousPage: null,
    nextPage: null,
    lastLoadedPage: null,
    requestCount: 0
  }, n = () => {
    const w = t();
    r.component = p.get().component, r.loading = !1, r.previousPage = w.previousPage, r.nextPage = w.nextPage, r.lastLoadedPage = w.currentPage, r.requestCount = 0;
  }, s = () => `inertia:infinite-scroll-data:${e.getPropName()}`;
  if (typeof window < "u") {
    n();
    const w = W.restore(s());
    w && typeof w == "object" && w.lastLoadedPage === t().currentPage && (r.previousPage = w.previousPage, r.nextPage = w.nextPage, r.lastLoadedPage = w.lastLoadedPage, r.requestCount = w.requestCount || 0);
  }
  const o = W.on("success", (w) => {
    var E;
    r.component === w.detail.page.component && t().reset && (n(), (E = e.onReset) == null || E.call(e));
  }), i = (w) => w === "next" ? "nextPage" : "previousPage", a = (w) => {
    const E = i(w);
    return r[E];
  }, u = (w) => {
    const E = t(), x = i(w);
    r.lastLoadedPage = E.currentPage, r[x] = E[x], r.requestCount += 1, W.remember(
      {
        previousPage: r.previousPage,
        nextPage: r.nextPage,
        lastLoadedPage: r.lastLoadedPage,
        requestCount: r.requestCount
      },
      s()
    );
  }, c = () => t().pageName, l = () => r.requestCount, f = (w, E = {}) => {
    const x = a(w);
    r.loading || x === null || (r.loading = !0, W.reload({
      preserveErrors: !0,
      ...E,
      data: { ...E.data || {}, [c()]: x },
      only: [...E.only || [], e.getPropName()],
      preserveUrl: !0,
      // we handle URL updates manually via useInfiniteScrollQueryString()
      headers: {
        [no]: w === "previous" ? "prepend" : "append",
        ...E.headers
      },
      onBefore: (C) => {
        var T;
        w === "next" ? e.onBeforeNextRequest() : e.onBeforePreviousRequest(), (T = E.onBefore) == null || T.call(E, C);
      },
      onBeforeUpdate: (C) => {
        var T;
        e.onBeforeUpdate(), (T = E.onBeforeUpdate) == null || T.call(E, C);
      },
      onSuccess: (C) => {
        var T;
        u(w), (T = E.onSuccess) == null || T.call(E, C);
      },
      onFinish: (C) => {
        var T;
        r.loading = !1, w === "next" ? e.onCompleteNextRequest(r.lastLoadedPage) : e.onCompletePreviousRequest(r.lastLoadedPage), (T = E.onFinish) == null || T.call(E, C);
      }
    }));
  };
  return {
    getLastLoadedPage: () => r.lastLoadedPage,
    getPageName: c,
    getRequestCount: l,
    hasPrevious: () => !!r.previousPage,
    hasNext: () => !!r.nextPage,
    fetchNext: (w) => f("next", w),
    fetchPrevious: (w) => f("previous", w),
    removeEventListener: o
  };
}, io = () => {
  const e = [];
  return {
    new: (n, s = {}) => {
      const o = new IntersectionObserver((i) => {
        for (const a of i)
          a.isIntersecting && n(a);
      }, s);
      return e.push(o), o;
    },
    flushAll: () => {
      e.forEach((n) => n.disconnect()), e.length = 0;
    }
  };
}, Ye = "infiniteScrollPage", xt = "infiniteScrollIgnore", Dn = (e) => e.dataset[Ye], oo = (e) => {
  const t = io();
  let r, n, s, o, i = !1;
  const a = () => {
    o = new MutationObserver((A) => {
      A.forEach((q) => {
        q.addedNodes.forEach((M) => {
          M.nodeType === Node.ELEMENT_NODE && y.add(M);
        });
      }), C();
    }), o.observe(e.getItemsElement(), { childList: !0 }), r = t.new(
      (A) => e.onItemIntersected(A.target)
    );
    const O = {
      root: e.getScrollableParent(),
      rootMargin: `${Math.max(1, e.getTriggerMargin())}px`
    };
    n = t.new(e.onPreviousTriggered, O), s = t.new(e.onNextTriggered, O);
  }, u = () => {
    i && c();
    const O = e.getStartElement(), A = e.getEndElement();
    O && e.shouldFetchPrevious() && n.observe(O), A && e.shouldFetchNext() && s.observe(A), i = !0;
  }, c = () => {
    i && (n.disconnect(), s.disconnect(), i = !1);
  }, l = () => {
    i && u();
  }, f = () => {
    c(), t.flushAll(), o == null || o.disconnect();
  }, y = /* @__PURE__ */ new Set(), S = (O) => !(Ye in O.dataset) && !(xt in O.dataset), h = () => {
    Array.from(y).forEach((O) => {
      S(O) && (O.dataset[xt] = "true"), r.observe(O);
    }), y.clear();
  }, m = (O) => Array.from(
    O.querySelectorAll(
      ":scope > *:not([data-infinite-scroll-page]):not([data-infinite-scroll-ignore])"
    )
  );
  let g = !1;
  const w = (O) => {
    !g && (g = !0, T()) || (m(e.getItemsElement()).forEach((A) => {
      S(A) && (A.dataset[Ye] = (O == null ? void 0 : O.toString()) || "1"), r.observe(A);
    }), x());
  }, E = () => `inertia:infinite-scroll-elements:${e.getPropName()}`, x = () => {
    const O = {}, A = e.getItemsElement().childNodes;
    for (let q = 0; q < A.length; q++) {
      const M = A[q];
      if (M.nodeType !== Node.ELEMENT_NODE)
        continue;
      const z = Dn(M);
      typeof z > "u" || (z in O ? O[z].to = q : O[z] = { from: q, to: q });
    }
    W.remember(O, E());
  }, C = He(x, 250), T = () => {
    const O = W.restore(E());
    if (!O || typeof O != "object")
      return !1;
    const A = e.getItemsElement().childNodes;
    for (let q = 0; q < A.length; q++) {
      const M = A[q];
      if (M.nodeType !== Node.ELEMENT_NODE)
        continue;
      const z = M;
      let ge;
      for (const [ye, se] of Object.entries(O))
        if (q >= se.from && q <= se.to) {
          ge = ye;
          break;
        }
      if (ge)
        z.dataset[Ye] = ge;
      else if (S(z))
        z.dataset[xt] = "true";
      else
        continue;
      r.observe(z);
    }
    return !0;
  };
  return {
    setupObservers: a,
    enableTriggers: u,
    disableTriggers: c,
    refreshTriggers: l,
    flushAll: f,
    processManuallyAddedElements: h,
    processServerLoadedElements: w
  };
}, ao = new pt(), Pe, ae, ze = null, co = (e) => {
  let t = !0;
  const r = (s) => {
    ao.add(() => new Promise((o) => {
      if (!t)
        return Pe = ae = null, o();
      if (!Pe || !ae) {
        const u = p.get().url;
        Pe = X(u), ae = X(u), ze = In(u);
      }
      const i = e.getPageName(), a = ae.searchParams;
      s === "1" ? a.delete(i) : a.set(i, s), setTimeout(() => o());
    })).finally(() => {
      t && Pe && ae && Pe.href !== ae.href && ze !== null && W.replace({
        url: Fi(ae, ze),
        preserveScroll: !0,
        preserveState: !0
      }), Pe = ae = ze = null;
    });
  };
  return {
    onItemIntersected: He((s) => {
      var l;
      const o = e.getItemsElement();
      if (!t || e.shouldPreserveUrl() || !s || !o)
        return;
      const i = /* @__PURE__ */ new Map(), a = [...o.children];
      Tn(a, s).forEach((f) => {
        const y = Dn(f) ?? "1";
        i.has(y) ? i.set(y, i.get(y) + 1) : i.set(y, 1);
      });
      const c = (l = Array.from(i.entries()).sort((f, y) => y[1] - f[1])[0]) == null ? void 0 : l[0];
      c !== void 0 && r(c);
    }, 250),
    cancel: () => t = !1
  };
}, lo = (e) => ({
  createCallbacks: () => {
    let r, n = null, s = 0;
    return {
      captureScrollPosition: () => {
        const a = e.getScrollableParent(), u = e.getItemsElement();
        r = (a == null ? void 0 : a.scrollTop) || window.scrollY;
        const c = Tn([...u.children]);
        if (c.length > 0) {
          n = c[0];
          const l = (a == null ? void 0 : a.getBoundingClientRect()) || { top: 0 }, f = a ? l.top : 0;
          s = n.getBoundingClientRect().top - f;
        }
      },
      restoreScrollPosition: () => {
        if (!n)
          return;
        let a = 0, u = !1;
        const c = () => {
          if (a++, u || a > 10)
            return !1;
          const l = e.getScrollableParent(), f = (l == null ? void 0 : l.getBoundingClientRect()) || { top: 0 }, y = l ? f.top : 0, m = n.getBoundingClientRect().top - y - s;
          if (m === 0) {
            window.requestAnimationFrame(c);
            return;
          }
          l ? l.scrollTo({ top: r + m }) : window.scrollTo(0, window.scrollY + m), u = !0;
        };
        window.requestAnimationFrame(c);
      }
    };
  }
});
function Uc(e) {
  const t = co({ ...e, getPageName: () => s.getPageName() }), r = lo(e), n = oo({
    ...e,
    // As items enter viewport, update URL to reflect the most visible page
    onItemIntersected: t.onItemIntersected,
    onPreviousTriggered: () => s.fetchPrevious(),
    onNextTriggered: () => s.fetchNext()
  }), s = so({
    ...e,
    // Before updating page data, tag any manually added DOM elements
    // so they don't get confused with server-loaded content
    onBeforeUpdate: n.processManuallyAddedElements,
    // After successful request, tag new server content
    onCompletePreviousRequest: (c) => {
      e.onCompletePreviousRequest(), qe(() => n.processServerLoadedElements(c), 2);
    },
    onCompleteNextRequest: (c) => {
      e.onCompleteNextRequest(), qe(() => n.processServerLoadedElements(c), 2);
    },
    onReset: e.onDataReset
  }), o = (c) => {
    const { captureScrollPosition: l, restoreScrollPosition: f } = r.createCallbacks(), y = c.onBeforeUpdate || (() => {
    }), S = c.onSuccess || (() => {
    });
    return c.onBeforeUpdate = (h) => {
      y(h), l();
    }, c.onSuccess = (h) => {
      S(h), f();
    }, c;
  }, i = s.fetchNext;
  s.fetchNext = (c = {}) => {
    var l;
    c = { ...(l = e.getReloadOptions) == null ? void 0 : l.call(e), ...c }, e.inReverseMode() && (c = o(c)), i(c);
  };
  const a = s.fetchPrevious;
  s.fetchPrevious = (c = {}) => {
    var l;
    c = { ...(l = e.getReloadOptions) == null ? void 0 : l.call(e), ...c }, e.inReverseMode() || (c = o(c)), a(c);
  };
  const u = W.on("success", () => qe(n.refreshTriggers, 2));
  return {
    dataManager: s,
    elementManager: n,
    flush: () => {
      u(), s.removeEventListener(), n.flushAll(), t.cancel();
    }
  };
}
function Dc() {
  let e = {}, t = {}, r = { shared: e, named: t };
  const n = /* @__PURE__ */ new Set();
  let s = !1;
  const o = () => {
    r = { shared: e, named: t };
  }, i = () => {
    s || (s = !0, queueMicrotask(() => {
      s = !1, n.forEach((a) => a());
    }));
  };
  return {
    set(a) {
      const u = { ...e, ...a };
      de(e, u) || (e = u, o(), i());
    },
    setFor(a, u) {
      const c = t[a] || {}, l = { ...c, ...u };
      de(c, l) || (t = { ...t, [a]: l }, o(), i());
    },
    reset() {
      e = {}, t = {}, o(), i();
    },
    subscribe(a) {
      return n.add(a), () => n.delete(a);
    },
    get: () => r
  };
}
function je(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function sr(e) {
  return je(e) && "component" in e;
}
function ir(e, t) {
  return "component" in e && t(e.component);
}
function jn(e, t) {
  return !je(e) || t(e) || ir(e, t) ? !1 : Object.values(e).every(
    (r) => t(r) || Array.isArray(r) && t(r[0]) || sr(r) && t(r.component)
  );
}
function uo(e, t) {
  return je(e) && !t(e) && !ir(e, t) && !jn(e, t);
}
function jc(e, t) {
  if (uo(e, t))
    return !0;
  if (!je(e) || t(e) || ir(e, t))
    return !1;
  const r = Object.values(e);
  return r.length > 0 && r.every((n) => typeof n == "function");
}
function fo(e, t) {
  return Array.isArray(e) && e.length === 2 && t(e[0]) && je(e[1]) && !t(e[1]);
}
function qr(e, t) {
  if (Array.isArray(e) && t(e[0]))
    return { component: e[0], props: e[1] ?? {} };
  if (sr(e) && t(e.component))
    return { component: e.component, props: e.props ?? {} };
  if (t(e))
    return { component: e, props: {} };
  throw new Error(`Invalid layout definition: received ${typeof e}`);
}
function Bc(e, t, r) {
  return !e || r && r(e) ? [] : jn(e, t) ? Object.entries(e).map(([n, s]) => ({ ...qr(s, t), name: n })) : fo(e, t) ? [{ component: e[0], props: e[1] ?? {} }] : Array.isArray(e) ? e.map((n) => qr(n, t)) : sr(e) && t(e.component) ? [{ component: e.component, props: e.props ?? {} }] : t(e) ? [{ component: e, props: {} }] : [];
}
function Bn(e) {
  return e.target instanceof HTMLElement && e.target.isContentEditable || e.defaultPrevented;
}
function kc(e) {
  const t = e.currentTarget.tagName.toLowerCase() === "a";
  return !(Bn(e) || t && e.altKey || t && e.ctrlKey || t && e.metaKey || t && e.shiftKey || t && "button" in e && e.button !== 0);
}
function _c(e) {
  const t = e.currentTarget.tagName.toLowerCase() === "button";
  return !Bn(e) && (e.key === "Enter" || t && e.key === " ");
}
var N = "nprogress", pe, v, U = {
  minimum: 0.08,
  easing: "linear",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  showSpinner: !0,
  barSelector: '[role="bar"]',
  spinnerSelector: '[role="spinner"]',
  parent: "body",
  color: "#29d",
  includeCSS: !0,
  popover: null,
  template: [
    '<div class="bar" role="bar">',
    '<div class="peg"></div>',
    "</div>",
    '<div class="spinner" role="spinner">',
    '<div class="spinner-icon"></div>',
    "</div>"
  ].join("")
}, ce = null, ft = !1, ho = (e) => {
  Object.assign(U, e), pe = U.popover ?? "popover" in HTMLElement.prototype, U.includeCSS && wo(U.color), v = document.createElement("div"), v.id = N, v.innerHTML = U.template, pe && (v.popover = "manual");
}, mt = (e) => {
  const t = kn();
  e = Kn(e, U.minimum, 1), ce = e === 1 ? null : e;
  const r = mo(!t), n = r.querySelector(U.barSelector), s = U.speed, o = U.easing;
  r.offsetWidth, yo((i) => {
    const a = {
      transition: `all ${s}ms ${o}`,
      transform: `translate3d(${zn(e)}%,0,0)`
    };
    for (const u in a)
      n.style[u] = a[u];
    if (e !== 1)
      return setTimeout(i, s);
    r.style.transition = "none", r.style.opacity = "1", r.offsetWidth, setTimeout(() => {
      r.style.transition = `all ${s}ms linear`, r.style.opacity = "0", setTimeout(() => {
        Wn(), r.style.transition = "", r.style.opacity = "", i();
      }, s);
    }, s);
  });
}, kn = () => typeof ce == "number", _n = () => {
  ce || mt(0);
  const e = function() {
    setTimeout(function() {
      ce && ($n(), e());
    }, U.trickleSpeed);
  };
  U.trickle && e();
}, po = (e) => {
  !e && !ce || ($n(0.3 + 0.5 * Math.random()), mt(1));
}, $n = (e) => {
  const t = ce;
  if (t === null)
    return _n();
  if (!(t > 1))
    return e = typeof e == "number" ? e : (() => {
      const r = {
        0.1: [0, 0.2],
        0.04: [0.2, 0.5],
        0.02: [0.5, 0.8],
        5e-3: [0.8, 0.99]
      };
      for (const n in r)
        if (t >= r[n][0] && t < r[n][1])
          return parseFloat(n);
      return 0;
    })(), mt(Kn(t + e, 0, 0.994));
}, mo = (e) => {
  var n;
  if (go())
    return document.getElementById(N);
  document.documentElement.classList.add(`${N}-busy`);
  const t = v.querySelector(U.barSelector), r = e ? "-100" : zn(ce || 0);
  if (t.style.transition = "all 0 linear", t.style.transform = `translate3d(${r}%,0,0)`, U.showSpinner || (n = v.querySelector(U.spinnerSelector)) == null || n.remove(), pe)
    document.body.appendChild(v), ft || v.showPopover();
  else {
    const s = Mn();
    s !== document.body && s.classList.add(`${N}-custom-parent`), s.appendChild(v), ft && (v.style.display = "none");
  }
  return v;
}, Mn = () => document.querySelector(U.parent), Wn = () => {
  if (document.documentElement.classList.remove(`${N}-busy`), pe && (v != null && v.isConnected))
    try {
      v.hidePopover();
    } catch {
    }
  pe || Mn().classList.remove(`${N}-custom-parent`), v == null || v.remove();
}, go = () => document.getElementById(N) !== null;
function Kn(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
var zn = (e) => (-1 + e) * 100, yo = /* @__PURE__ */ (() => {
  const e = [], t = () => {
    const r = e.shift();
    r && r(t);
  };
  return (r) => {
    e.push(r), e.length === 1 && t();
  };
})(), wo = (e) => {
  const t = document.createElement("style");
  t.textContent = `
    #${N} {
      pointer-events: none;
      background: none;
      border: none;
      margin: 0;
      padding: 0;
      overflow: visible;
      inset: unset;
      width: 100%;
      height: 0;
      position: fixed;
      top: 0;
      left: 0;
    }

    #${N}::backdrop {
      display: none;
    }

    #${N} .bar {
      background: ${e};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #${N} .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${e}, 0 0 5px ${e};
      opacity: 1.0;

      transform: rotate(3deg) translate(0px, -4px);
    }

    #${N} .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #${N} .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${e};
      border-left-color: ${e};
      border-radius: 50%;

      animation: ${N}-spinner 400ms linear infinite;
    }

    .${N}-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .${N}-custom-parent #${N} .spinner,
    .${N}-custom-parent #${N} .bar {
      position: absolute;
    }

    @keyframes ${N}-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, document.head.appendChild(t);
}, Po = () => {
  if (ft = !1, !!(v != null && v.isConnected))
    if (pe)
      try {
        v.showPopover();
      } catch {
      }
    else
      v.style.display = "";
}, bo = () => {
  if (ft = !0, !!(v != null && v.isConnected))
    if (pe)
      try {
        v.hidePopover();
      } catch {
      }
    else
      v.style.display = "none";
}, Q = {
  configure: ho,
  isStarted: kn,
  done: po,
  set: mt,
  remove: Wn,
  start: _n,
  status: ce,
  show: Po,
  hide: bo
}, So = class {
  constructor() {
    P(this, "hideCount", 0);
  }
  start() {
    Q.start();
  }
  reveal(e = !1) {
    this.hideCount = Math.max(0, this.hideCount - 1), (e || this.hideCount === 0) && Q.show();
  }
  hide() {
    this.hideCount++, Q.hide();
  }
  set(e) {
    Q.set(Math.max(0, Math.min(1, e)));
  }
  finish() {
    Q.done();
  }
  reset() {
    Q.set(0);
  }
  remove() {
    Q.done(), Q.remove();
  }
  isStarted() {
    return Q.isStarted();
  }
  getStatus() {
    return Q.status;
  }
}, J = new So();
function Eo(e) {
  document.addEventListener("inertia:start", (t) => Oo(t, e)), document.addEventListener("inertia:progress", Ro);
}
function Oo(e, t) {
  e.detail.visit.showProgress || J.hide();
  const r = setTimeout(() => J.start(), t);
  document.addEventListener("inertia:finish", (n) => Ao(n, r), { once: !0 });
}
function Ro(e) {
  var t;
  J.isStarted() && ((t = e.detail.progress) != null && t.percentage) && J.set(Math.max(J.getStatus(), e.detail.progress.percentage / 100 * 0.9));
}
function Ao(e, t) {
  clearTimeout(t), J.isStarted() && (e.detail.visit.completed ? J.finish() : e.detail.visit.interrupted ? J.reset() : e.detail.visit.cancelled && J.remove());
}
function $c({
  delay: e = 250,
  color: t = "#29d",
  includeCSS: r = !0,
  showSpinner: n = !1,
  popover: s = null
} = {}) {
  Eo(e), Q.configure({ showSpinner: n, includeCSS: r, color: t, popover: s });
}
var vo = /* @__PURE__ */ Symbol("FormComponentReset");
function $t(e) {
  return e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement;
}
function xo(e, t) {
  const r = e.value, n = e.checked;
  switch (e.type.toLowerCase()) {
    case "checkbox":
      e.checked = t.includes(e.value);
      break;
    case "radio":
      e.checked = t[0] === e.value;
      break;
    case "file":
      e.value = "";
      break;
    case "button":
    case "submit":
    case "reset":
    case "image":
      break;
    default:
      e.value = t[0] !== null && t[0] !== void 0 ? String(t[0]) : "";
  }
  return e.value !== r || e.checked !== n;
}
function To(e, t) {
  const r = e.value, n = Array.from(e.selectedOptions).map((i) => i.value);
  if (e.multiple) {
    const i = t.map((a) => String(a));
    Array.from(e.options).forEach((a) => {
      a.selected = i.includes(a.value);
    });
  } else
    e.value = t[0] !== void 0 ? String(t[0]) : "";
  const s = Array.from(e.selectedOptions).map((i) => i.value);
  return e.multiple ? JSON.stringify(n.sort()) !== JSON.stringify(s.sort()) : e.value !== r;
}
function Tt(e, t) {
  if (e.disabled) {
    if (e instanceof HTMLInputElement) {
      const r = e.value, n = e.checked;
      switch (e.type.toLowerCase()) {
        case "checkbox":
        case "radio":
          return e.checked = e.defaultChecked, e.checked !== n;
        case "file":
          return e.value = "", r !== "";
        case "button":
        case "submit":
        case "reset":
        case "image":
          return !1;
        default:
          return e.value = e.defaultValue, e.value !== r;
      }
    } else if (e instanceof HTMLSelectElement) {
      const r = Array.from(e.selectedOptions).map((s) => s.value);
      Array.from(e.options).forEach((s) => {
        s.selected = s.defaultSelected;
      });
      const n = Array.from(e.selectedOptions).map((s) => s.value);
      return JSON.stringify(r.sort()) !== JSON.stringify(n.sort());
    } else if (e instanceof HTMLTextAreaElement) {
      const r = e.value;
      return e.value = e.defaultValue, e.value !== r;
    }
    return !1;
  }
  if (e instanceof HTMLInputElement)
    return xo(e, t);
  if (e instanceof HTMLSelectElement)
    return To(e, t);
  if (e instanceof HTMLTextAreaElement) {
    const r = e.value;
    return e.value = t[0] !== void 0 ? String(t[0]) : "", e.value !== r;
  }
  return !1;
}
function Co(e, t) {
  let r = !1;
  return e instanceof RadioNodeList || e instanceof HTMLCollection ? Array.from(e).forEach((n, s) => {
    if (n instanceof Element && $t(n))
      if (n instanceof HTMLInputElement && ["checkbox", "radio"].includes(n.type.toLowerCase()))
        Tt(n, t) && (r = !0);
      else {
        const o = t[s] !== void 0 ? [t[s]] : [t[0] ?? null].filter(Boolean);
        Tt(n, o) && (r = !0);
      }
  }) : $t(e) && (r = Tt(e, t)), r;
}
function Mc(e, t, r) {
  if (!e)
    return;
  const n = !r || r.length === 0;
  if (n) {
    const o = new FormData(e), i = Array.from(e.elements).map((a) => $t(a) ? a.name : "").filter(Boolean);
    r = [.../* @__PURE__ */ new Set([...t.keys(), ...o.keys(), ...i])];
  }
  let s = !1;
  r.forEach((o) => {
    const i = e.elements.namedItem(o);
    i && Co(i, t.getAll(o)) && (s = !0);
  }), s && n && e.dispatchEvent(
    new CustomEvent("reset", { bubbles: !0, cancelable: !0, detail: { [vo]: !0 } })
  );
}
function Wc(e, t, r) {
  const n = JSON.stringify(t).replace(/\//g, "\\/");
  return `<script data-page="${e}" type="application/json">${n}<\/script><div data-server-rendered="true" id="${e}">${r}</div>`;
}
var W = new Ji();
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
function Vn(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Fo } = Object.prototype, { getPrototypeOf: or } = Object, { iterator: gt, toStringTag: Xn } = Symbol, yt = /* @__PURE__ */ ((e) => (t) => {
  const r = Fo.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Z = (e) => (e = e.toLowerCase(), (t) => yt(t) === e), wt = (e) => (t) => typeof t === e, { isArray: Oe } = Array, Ee = wt("undefined");
function Be(e) {
  return e !== null && !Ee(e) && e.constructor !== null && !Ee(e.constructor) && _(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Jn = Z("ArrayBuffer");
function No(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Jn(e.buffer), t;
}
const qo = wt("string"), _ = wt("function"), Qn = wt("number"), ke = (e) => e !== null && typeof e == "object", Io = (e) => e === !0 || e === !1, Ze = (e) => {
  if (yt(e) !== "object")
    return !1;
  const t = or(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Xn in e) && !(gt in e);
}, Lo = (e) => {
  if (!ke(e) || Be(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Ho = Z("Date"), Uo = Z("File"), Do = (e) => !!(e && typeof e.uri < "u"), jo = (e) => e && typeof e.getParts < "u", Bo = Z("Blob"), ko = Z("FileList"), _o = (e) => ke(e) && _(e.pipe);
function $o() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Ir = $o(), Lr = typeof Ir.FormData < "u" ? Ir.FormData : void 0, Mo = (e) => {
  let t;
  return e && (Lr && e instanceof Lr || _(e.append) && ((t = yt(e)) === "formdata" || // detect form-data instance
  t === "object" && _(e.toString) && e.toString() === "[object FormData]"));
}, Wo = Z("URLSearchParams"), [Ko, zo, Vo, Xo] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(Z), Jo = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function _e(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, s;
  if (typeof e != "object" && (e = [e]), Oe(e))
    for (n = 0, s = e.length; n < s; n++)
      t.call(null, e[n], n, e);
  else {
    if (Be(e))
      return;
    const o = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (n = 0; n < i; n++)
      a = o[n], t.call(null, e[a], a, e);
  }
}
function Gn(e, t) {
  if (Be(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], t === s.toLowerCase())
      return s;
  return null;
}
const fe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Yn = (e) => !Ee(e) && e !== fe;
function Mt() {
  const { caseless: e, skipUndefined: t } = Yn(this) && this || {}, r = {}, n = (s, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const i = e && Gn(r, o) || o;
    Ze(r[i]) && Ze(s) ? r[i] = Mt(r[i], s) : Ze(s) ? r[i] = Mt({}, s) : Oe(s) ? r[i] = s.slice() : (!t || !Ee(s)) && (r[i] = s);
  };
  for (let s = 0, o = arguments.length; s < o; s++)
    arguments[s] && _e(arguments[s], n);
  return r;
}
const Qo = (e, t, r, { allOwnKeys: n } = {}) => (_e(
  t,
  (s, o) => {
    r && _(s) ? Object.defineProperty(e, o, {
      value: Vn(s, r),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, o, {
      value: s,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: n }
), e), Go = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Yo = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Zo = (e, t, r, n) => {
  let s, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!n || n(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = r !== !1 && or(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, ea = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, ta = (e) => {
  if (!e) return null;
  if (Oe(e)) return e;
  let t = e.length;
  if (!Qn(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, ra = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && or(Uint8Array)), na = (e, t) => {
  const n = (e && e[gt]).call(e);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, sa = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, ia = Z("HTMLFormElement"), oa = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), Hr = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), aa = Z("RegExp"), Zn = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  _e(r, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (n[o] = i || s);
  }), Object.defineProperties(e, n);
}, ca = (e) => {
  Zn(e, (t, r) => {
    if (_(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (_(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, la = (e, t) => {
  const r = {}, n = (s) => {
    s.forEach((o) => {
      r[o] = !0;
    });
  };
  return Oe(e) ? n(e) : n(String(e).split(t)), r;
}, ua = () => {
}, fa = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function da(e) {
  return !!(e && _(e.append) && e[Xn] === "FormData" && e[gt]);
}
const ha = (e) => {
  const t = new Array(10), r = (n, s) => {
    if (ke(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (Be(n))
        return n;
      if (!("toJSON" in n)) {
        t[s] = n;
        const o = Oe(n) ? [] : {};
        return _e(n, (i, a) => {
          const u = r(i, s + 1);
          !Ee(u) && (o[a] = u);
        }), t[s] = void 0, o;
      }
    }
    return n;
  };
  return r(e, 0);
}, pa = Z("AsyncFunction"), ma = (e) => e && (ke(e) || _(e)) && _(e.then) && _(e.catch), es = ((e, t) => e ? setImmediate : t ? ((r, n) => (fe.addEventListener(
  "message",
  ({ source: s, data: o }) => {
    s === fe && o === r && n.length && n.shift()();
  },
  !1
), (s) => {
  n.push(s), fe.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", _(fe.postMessage)), ga = typeof queueMicrotask < "u" ? queueMicrotask.bind(fe) : typeof process < "u" && process.nextTick || es, ya = (e) => e != null && _(e[gt]), d = {
  isArray: Oe,
  isArrayBuffer: Jn,
  isBuffer: Be,
  isFormData: Mo,
  isArrayBufferView: No,
  isString: qo,
  isNumber: Qn,
  isBoolean: Io,
  isObject: ke,
  isPlainObject: Ze,
  isEmptyObject: Lo,
  isReadableStream: Ko,
  isRequest: zo,
  isResponse: Vo,
  isHeaders: Xo,
  isUndefined: Ee,
  isDate: Ho,
  isFile: Uo,
  isReactNativeBlob: Do,
  isReactNative: jo,
  isBlob: Bo,
  isRegExp: aa,
  isFunction: _,
  isStream: _o,
  isURLSearchParams: Wo,
  isTypedArray: ra,
  isFileList: ko,
  forEach: _e,
  merge: Mt,
  extend: Qo,
  trim: Jo,
  stripBOM: Go,
  inherits: Yo,
  toFlatObject: Zo,
  kindOf: yt,
  kindOfTest: Z,
  endsWith: ea,
  toArray: ta,
  forEachEntry: na,
  matchAll: sa,
  isHTMLForm: ia,
  hasOwnProperty: Hr,
  hasOwnProp: Hr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Zn,
  freezeMethods: ca,
  toObjectSet: la,
  toCamelCase: oa,
  noop: ua,
  toFiniteNumber: fa,
  findKey: Gn,
  global: fe,
  isContextDefined: Yn,
  isSpecCompliantForm: da,
  toJSONObject: ha,
  isAsyncFn: pa,
  isThenable: ma,
  setImmediate: es,
  asap: ga,
  isIterable: ya
};
let b = class ts extends Error {
  static from(t, r, n, s, o, i) {
    const a = new ts(t.message, r || t.code, n, s, o);
    return a.cause = t, a.name = t.name, t.status != null && a.status == null && (a.status = t.status), i && Object.assign(a, i), a;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, r, n, s, o) {
    super(t), Object.defineProperty(this, "message", {
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, r && (this.code = r), n && (this.config = n), s && (this.request = s), o && (this.response = o, this.status = o.status);
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: d.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
b.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
b.ERR_BAD_OPTION = "ERR_BAD_OPTION";
b.ECONNABORTED = "ECONNABORTED";
b.ETIMEDOUT = "ETIMEDOUT";
b.ERR_NETWORK = "ERR_NETWORK";
b.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
b.ERR_DEPRECATED = "ERR_DEPRECATED";
b.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
b.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
b.ERR_CANCELED = "ERR_CANCELED";
b.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
b.ERR_INVALID_URL = "ERR_INVALID_URL";
const wa = null;
function Wt(e) {
  return d.isPlainObject(e) || d.isArray(e);
}
function rs(e) {
  return d.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ct(e, t, r) {
  return e ? e.concat(t).map(function(s, o) {
    return s = rs(s), !r && o ? "[" + s + "]" : s;
  }).join(r ? "." : "") : t;
}
function Pa(e) {
  return d.isArray(e) && !e.some(Wt);
}
const ba = d.toFlatObject(d, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Pt(e, t, r) {
  if (!d.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = d.toFlatObject(
    r,
    {
      metaTokens: !0,
      dots: !1,
      indexes: !1
    },
    !1,
    function(m, g) {
      return !d.isUndefined(g[m]);
    }
  );
  const n = r.metaTokens, s = r.visitor || l, o = r.dots, i = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && d.isSpecCompliantForm(t);
  if (!d.isFunction(s))
    throw new TypeError("visitor must be a function");
  function c(h) {
    if (h === null) return "";
    if (d.isDate(h))
      return h.toISOString();
    if (d.isBoolean(h))
      return h.toString();
    if (!u && d.isBlob(h))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return d.isArrayBuffer(h) || d.isTypedArray(h) ? u && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function l(h, m, g) {
    let w = h;
    if (d.isReactNative(t) && d.isReactNativeBlob(h))
      return t.append(Ct(g, m, o), c(h)), !1;
    if (h && !g && typeof h == "object") {
      if (d.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (d.isArray(h) && Pa(h) || (d.isFileList(h) || d.endsWith(m, "[]")) && (w = d.toArray(h)))
        return m = rs(m), w.forEach(function(x, C) {
          !(d.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Ct([m], C, o) : i === null ? m : m + "[]",
            c(x)
          );
        }), !1;
    }
    return Wt(h) ? !0 : (t.append(Ct(g, m, o), c(h)), !1);
  }
  const f = [], y = Object.assign(ba, {
    defaultVisitor: l,
    convertValue: c,
    isVisitable: Wt
  });
  function S(h, m) {
    if (!d.isUndefined(h)) {
      if (f.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(h), d.forEach(h, function(w, E) {
        (!(d.isUndefined(w) || w === null) && s.call(t, w, d.isString(E) ? E.trim() : E, m, y)) === !0 && S(w, m ? m.concat(E) : [E]);
      }), f.pop();
    }
  }
  if (!d.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function Ur(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function ar(e, t) {
  this._pairs = [], e && Pt(e, this, t);
}
const ns = ar.prototype;
ns.append = function(t, r) {
  this._pairs.push([t, r]);
};
ns.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Ur);
  } : Ur;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Sa(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ss(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Sa, s = d.isFunction(r) ? {
    serialize: r
  } : r, o = s && s.serialize;
  let i;
  if (o ? i = o(t, s) : i = d.isURLSearchParams(t) ? t.toString() : new ar(t, s).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Dr {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    d.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const cr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, Ea = typeof URLSearchParams < "u" ? URLSearchParams : ar, Oa = typeof FormData < "u" ? FormData : null, Ra = typeof Blob < "u" ? Blob : null, Aa = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ea,
    FormData: Oa,
    Blob: Ra
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, lr = typeof window < "u" && typeof document < "u", Kt = typeof navigator == "object" && navigator || void 0, va = lr && (!Kt || ["ReactNative", "NativeScript", "NS"].indexOf(Kt.product) < 0), xa = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ta = lr && window.location.href || "http://localhost", Ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: lr,
  hasStandardBrowserEnv: va,
  hasStandardBrowserWebWorkerEnv: xa,
  navigator: Kt,
  origin: Ta
}, Symbol.toStringTag, { value: "Module" })), L = {
  ...Ca,
  ...Aa
};
function Fa(e, t) {
  return Pt(e, new L.classes.URLSearchParams(), {
    visitor: function(r, n, s, o) {
      return L.isNode && d.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Na(e) {
  return d.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function qa(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++)
    o = r[n], t[o] = e[o];
  return t;
}
function is(e) {
  function t(r, n, s, o) {
    let i = r[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), u = o >= r.length;
    return i = !i && d.isArray(s) ? s.length : i, u ? (d.hasOwnProp(s, i) ? s[i] = [s[i], n] : s[i] = n, !a) : ((!s[i] || !d.isObject(s[i])) && (s[i] = []), t(r, n, s[i], o) && d.isArray(s[i]) && (s[i] = qa(s[i])), !a);
  }
  if (d.isFormData(e) && d.isFunction(e.entries)) {
    const r = {};
    return d.forEachEntry(e, (n, s) => {
      t(Na(n), s, r, 0);
    }), r;
  }
  return null;
}
function Ia(e, t, r) {
  if (d.isString(e))
    try {
      return (t || JSON.parse)(e), d.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const $e = {
  transitional: cr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, r) {
      const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, o = d.isObject(t);
      if (o && d.isHTMLForm(t) && (t = new FormData(t)), d.isFormData(t))
        return s ? JSON.stringify(is(t)) : t;
      if (d.isArrayBuffer(t) || d.isBuffer(t) || d.isStream(t) || d.isFile(t) || d.isBlob(t) || d.isReadableStream(t))
        return t;
      if (d.isArrayBufferView(t))
        return t.buffer;
      if (d.isURLSearchParams(t))
        return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let a;
      if (o) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return Fa(t, this.formSerializer).toString();
        if ((a = d.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return Pt(
            a ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || s ? (r.setContentType("application/json", !1), Ia(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const r = this.transitional || $e.transitional, n = r && r.forcedJSONParsing, s = this.responseType === "json";
      if (d.isResponse(t) || d.isReadableStream(t))
        return t;
      if (t && d.isString(t) && (n && !this.responseType || s)) {
        const i = !(r && r.silentJSONParsing) && s;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (a) {
          if (i)
            throw a.name === "SyntaxError" ? b.from(a, b.ERR_BAD_RESPONSE, this, null, this.response) : a;
        }
      }
      return t;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: L.classes.FormData,
    Blob: L.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
d.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  $e.headers[e] = {};
});
const La = d.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Ha = (e) => {
  const t = {};
  let r, n, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || t[r] && La[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, jr = Symbol("internals");
function xe(e) {
  return e && String(e).trim().toLowerCase();
}
function et(e) {
  return e === !1 || e == null ? e : d.isArray(e) ? e.map(et) : String(e).replace(/[\r\n]+$/, "");
}
function Ua(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Da = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ft(e, t, r, n, s) {
  if (d.isFunction(n))
    return n.call(this, t, r);
  if (s && (t = r), !!d.isString(t)) {
    if (d.isString(n))
      return t.indexOf(n) !== -1;
    if (d.isRegExp(n))
      return n.test(t);
  }
}
function ja(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Ba(e, t) {
  const r = d.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(s, o, i) {
        return this[n].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
let $ = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const s = this;
    function o(a, u, c) {
      const l = xe(u);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = d.findKey(s, l);
      (!f || s[f] === void 0 || c === !0 || c === void 0 && s[f] !== !1) && (s[f || u] = et(a));
    }
    const i = (a, u) => d.forEach(a, (c, l) => o(c, l, u));
    if (d.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (d.isString(t) && (t = t.trim()) && !Da(t))
      i(Ha(t), r);
    else if (d.isObject(t) && d.isIterable(t)) {
      let a = {}, u, c;
      for (const l of t) {
        if (!d.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        a[c = l[0]] = (u = a[c]) ? d.isArray(u) ? [...u, l[1]] : [u, l[1]] : l[1];
      }
      i(a, r);
    } else
      t != null && o(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = xe(t), t) {
      const n = d.findKey(this, t);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return Ua(s);
        if (d.isFunction(r))
          return r.call(this, s, n);
        if (d.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = xe(t), t) {
      const n = d.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Ft(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let s = !1;
    function o(i) {
      if (i = xe(i), i) {
        const a = d.findKey(n, i);
        a && (!r || Ft(n, n[a], a, r)) && (delete n[a], s = !0);
      }
    }
    return d.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const o = r[n];
      (!t || Ft(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const r = this, n = {};
    return d.forEach(this, (s, o) => {
      const i = d.findKey(n, o);
      if (i) {
        r[i] = et(s), delete r[o];
        return;
      }
      const a = t ? ja(o) : String(o).trim();
      a !== o && delete r[o], r[a] = et(s), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = t && d.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(t) {
    const n = (this[jr] = this[jr] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const a = xe(i);
      n[a] || (Ba(s, i), n[a] = !0);
    }
    return d.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
$.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
d.reduceDescriptors($.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
d.freezeMethods($);
function Nt(e, t) {
  const r = this || $e, n = t || r, s = $.from(n.headers);
  let o = n.data;
  return d.forEach(e, function(a) {
    o = a.call(r, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function os(e) {
  return !!(e && e.__CANCEL__);
}
let Me = class extends b {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, r, n) {
    super(t ?? "canceled", b.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function as(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(
    new b(
      "Request failed with status code " + r.status,
      [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
      r.config,
      r.request,
      r
    )
  );
}
function ka(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function _a(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const c = Date.now(), l = n[o];
    i || (i = c), r[s] = u, n[s] = c;
    let f = o, y = 0;
    for (; f !== s; )
      y += r[f++], f = f % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), c - i < t)
      return;
    const S = l && c - l;
    return S ? Math.round(y * 1e3 / S) : void 0;
  };
}
function $a(e, t) {
  let r = 0, n = 1e3 / t, s, o;
  const i = (c, l = Date.now()) => {
    r = l, s = null, o && (clearTimeout(o), o = null), e(...c);
  };
  return [(...c) => {
    const l = Date.now(), f = l - r;
    f >= n ? i(c, l) : (s = c, o || (o = setTimeout(() => {
      o = null, i(s);
    }, n - f)));
  }, () => s && i(s)];
}
const dt = (e, t, r = 3) => {
  let n = 0;
  const s = _a(50, 250);
  return $a((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, u = i - n, c = s(u), l = i <= a;
    n = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: u,
      rate: c || void 0,
      estimated: c && a && l ? (a - i) / c : void 0,
      event: o,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(f);
  }, r);
}, Br = (e, t) => {
  const r = e != null;
  return [
    (n) => t[0]({
      lengthComputable: r,
      total: e,
      loaded: n
    }),
    t[1]
  ];
}, kr = (e) => (...t) => d.asap(() => e(...t)), Ma = L.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, L.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(L.origin),
  L.navigator && /(msie|trident)/i.test(L.navigator.userAgent)
) : () => !0, Wa = L.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, s, o, i) {
      if (typeof document > "u") return;
      const a = [`${e}=${encodeURIComponent(t)}`];
      d.isNumber(r) && a.push(`expires=${new Date(r).toUTCString()}`), d.isString(n) && a.push(`path=${n}`), d.isString(s) && a.push(`domain=${s}`), o === !0 && a.push("secure"), d.isString(i) && a.push(`SameSite=${i}`), document.cookie = a.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Ka(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function za(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function cs(e, t, r) {
  let n = !Ka(t);
  return e && (n || r == !1) ? za(e, t) : t;
}
const _r = (e) => e instanceof $ ? { ...e } : e;
function me(e, t) {
  t = t || {};
  const r = {};
  function n(c, l, f, y) {
    return d.isPlainObject(c) && d.isPlainObject(l) ? d.merge.call({ caseless: y }, c, l) : d.isPlainObject(l) ? d.merge({}, l) : d.isArray(l) ? l.slice() : l;
  }
  function s(c, l, f, y) {
    if (d.isUndefined(l)) {
      if (!d.isUndefined(c))
        return n(void 0, c, f, y);
    } else return n(c, l, f, y);
  }
  function o(c, l) {
    if (!d.isUndefined(l))
      return n(void 0, l);
  }
  function i(c, l) {
    if (d.isUndefined(l)) {
      if (!d.isUndefined(c))
        return n(void 0, c);
    } else return n(void 0, l);
  }
  function a(c, l, f) {
    if (f in t)
      return n(c, l);
    if (f in e)
      return n(void 0, c);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (c, l, f) => s(_r(c), _r(l), f, !0)
  };
  return d.forEach(Object.keys({ ...e, ...t }), function(l) {
    if (l === "__proto__" || l === "constructor" || l === "prototype") return;
    const f = d.hasOwnProp(u, l) ? u[l] : s, y = f(e[l], t[l], l);
    d.isUndefined(y) && f !== a || (r[l] = y);
  }), r;
}
const ls = (e) => {
  const t = me({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: s, xsrfCookieName: o, headers: i, auth: a } = t;
  if (t.headers = i = $.from(i), t.url = ss(
    cs(t.baseURL, t.url, t.allowAbsoluteUrls),
    e.params,
    e.paramsSerializer
  ), a && i.set(
    "Authorization",
    "Basic " + btoa(
      (a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")
    )
  ), d.isFormData(r)) {
    if (L.hasStandardBrowserEnv || L.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if (d.isFunction(r.getHeaders)) {
      const u = r.getHeaders(), c = ["content-type", "content-length"];
      Object.entries(u).forEach(([l, f]) => {
        c.includes(l.toLowerCase()) && i.set(l, f);
      });
    }
  }
  if (L.hasStandardBrowserEnv && (n && d.isFunction(n) && (n = n(t)), n || n !== !1 && Ma(t.url))) {
    const u = s && o && Wa.read(o);
    u && i.set(s, u);
  }
  return t;
}, Va = typeof XMLHttpRequest < "u", Xa = Va && function(e) {
  return new Promise(function(r, n) {
    const s = ls(e);
    let o = s.data;
    const i = $.from(s.headers).normalize();
    let { responseType: a, onUploadProgress: u, onDownloadProgress: c } = s, l, f, y, S, h;
    function m() {
      S && S(), h && h(), s.cancelToken && s.cancelToken.unsubscribe(l), s.signal && s.signal.removeEventListener("abort", l);
    }
    let g = new XMLHttpRequest();
    g.open(s.method.toUpperCase(), s.url, !0), g.timeout = s.timeout;
    function w() {
      if (!g)
        return;
      const x = $.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), T = {
        data: !a || a === "text" || a === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: x,
        config: e,
        request: g
      };
      as(
        function(A) {
          r(A), m();
        },
        function(A) {
          n(A), m();
        },
        T
      ), g = null;
    }
    "onloadend" in g ? g.onloadend = w : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, g.onabort = function() {
      g && (n(new b("Request aborted", b.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function(C) {
      const T = C && C.message ? C.message : "Network Error", O = new b(T, b.ERR_NETWORK, e, g);
      O.event = C || null, n(O), g = null;
    }, g.ontimeout = function() {
      let C = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const T = s.transitional || cr;
      s.timeoutErrorMessage && (C = s.timeoutErrorMessage), n(
        new b(
          C,
          T.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
          e,
          g
        )
      ), g = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in g && d.forEach(i.toJSON(), function(C, T) {
      g.setRequestHeader(T, C);
    }), d.isUndefined(s.withCredentials) || (g.withCredentials = !!s.withCredentials), a && a !== "json" && (g.responseType = s.responseType), c && ([y, h] = dt(c, !0), g.addEventListener("progress", y)), u && g.upload && ([f, S] = dt(u), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", S)), (s.cancelToken || s.signal) && (l = (x) => {
      g && (n(!x || x.type ? new Me(null, e, g) : x), g.abort(), g = null);
    }, s.cancelToken && s.cancelToken.subscribe(l), s.signal && (s.signal.aborted ? l() : s.signal.addEventListener("abort", l)));
    const E = ka(s.url);
    if (E && L.protocols.indexOf(E) === -1) {
      n(
        new b(
          "Unsupported protocol " + E + ":",
          b.ERR_BAD_REQUEST,
          e
        )
      );
      return;
    }
    g.send(o || null);
  });
}, Ja = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), s;
    const o = function(c) {
      if (!s) {
        s = !0, a();
        const l = c instanceof Error ? c : this.reason;
        n.abort(
          l instanceof b ? l : new Me(l instanceof Error ? l.message : l)
        );
      }
    };
    let i = t && setTimeout(() => {
      i = null, o(new b(`timeout of ${t}ms exceeded`, b.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(o) : c.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", o));
    const { signal: u } = n;
    return u.unsubscribe = () => d.asap(a), u;
  }
}, Qa = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, s;
  for (; n < r; )
    s = n + t, yield e.slice(n, s), n = s;
}, Ga = async function* (e, t) {
  for await (const r of Ya(e))
    yield* Qa(r, t);
}, Ya = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, $r = (e, t, r, n) => {
  const s = Ga(e, t);
  let o = 0, i, a = (u) => {
    i || (i = !0, n && n(u));
  };
  return new ReadableStream(
    {
      async pull(u) {
        try {
          const { done: c, value: l } = await s.next();
          if (c) {
            a(), u.close();
            return;
          }
          let f = l.byteLength;
          if (r) {
            let y = o += f;
            r(y);
          }
          u.enqueue(new Uint8Array(l));
        } catch (c) {
          throw a(c), c;
        }
      },
      cancel(u) {
        return a(u), s.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, Mr = 64 * 1024, { isFunction: Ve } = d, Za = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(d.global), { ReadableStream: Wr, TextEncoder: Kr } = d.global, zr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, ec = (e) => {
  e = d.merge.call(
    {
      skipUndefined: !0
    },
    Za,
    e
  );
  const { fetch: t, Request: r, Response: n } = e, s = t ? Ve(t) : typeof fetch == "function", o = Ve(r), i = Ve(n);
  if (!s)
    return !1;
  const a = s && Ve(Wr), u = s && (typeof Kr == "function" ? /* @__PURE__ */ ((h) => (m) => h.encode(m))(new Kr()) : async (h) => new Uint8Array(await new r(h).arrayBuffer())), c = o && a && zr(() => {
    let h = !1;
    const m = new Wr(), g = new r(L.origin, {
      body: m,
      method: "POST",
      get duplex() {
        return h = !0, "half";
      }
    }).headers.has("Content-Type");
    return m.cancel(), h && !g;
  }), l = i && a && zr(() => d.isReadableStream(new n("").body)), f = {
    stream: l && ((h) => h.body)
  };
  s && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((h) => {
    !f[h] && (f[h] = (m, g) => {
      let w = m && m[h];
      if (w)
        return w.call(m);
      throw new b(
        `Response type '${h}' is not supported`,
        b.ERR_NOT_SUPPORT,
        g
      );
    });
  });
  const y = async (h) => {
    if (h == null)
      return 0;
    if (d.isBlob(h))
      return h.size;
    if (d.isSpecCompliantForm(h))
      return (await new r(L.origin, {
        method: "POST",
        body: h
      }).arrayBuffer()).byteLength;
    if (d.isArrayBufferView(h) || d.isArrayBuffer(h))
      return h.byteLength;
    if (d.isURLSearchParams(h) && (h = h + ""), d.isString(h))
      return (await u(h)).byteLength;
  }, S = async (h, m) => {
    const g = d.toFiniteNumber(h.getContentLength());
    return g ?? y(m);
  };
  return async (h) => {
    let {
      url: m,
      method: g,
      data: w,
      signal: E,
      cancelToken: x,
      timeout: C,
      onDownloadProgress: T,
      onUploadProgress: O,
      responseType: A,
      headers: q,
      withCredentials: M = "same-origin",
      fetchOptions: z
    } = ls(h), ge = t || fetch;
    A = A ? (A + "").toLowerCase() : "text";
    let ye = Ja(
      [E, x && x.toAbortSignal()],
      C
    ), se = null;
    const le = ye && ye.unsubscribe && (() => {
      ye.unsubscribe();
    });
    let fr;
    try {
      if (O && c && g !== "get" && g !== "head" && (fr = await S(q, w)) !== 0) {
        let oe = new r(m, {
          method: "POST",
          body: w,
          duplex: "half"
        }), we;
        if (d.isFormData(w) && (we = oe.headers.get("content-type")) && q.setContentType(we), oe.body) {
          const [St, We] = Br(
            fr,
            dt(kr(O))
          );
          w = $r(oe.body, Mr, St, We);
        }
      }
      d.isString(M) || (M = M ? "include" : "omit");
      const D = o && "credentials" in r.prototype, dr = {
        ...z,
        signal: ye,
        method: g.toUpperCase(),
        headers: q.normalize().toJSON(),
        body: w,
        duplex: "half",
        credentials: D ? M : void 0
      };
      se = o && new r(m, dr);
      let ie = await (o ? ge(se, z) : ge(m, dr));
      const hr = l && (A === "stream" || A === "response");
      if (l && (T || hr && le)) {
        const oe = {};
        ["status", "statusText", "headers"].forEach((pr) => {
          oe[pr] = ie[pr];
        });
        const we = d.toFiniteNumber(ie.headers.get("content-length")), [St, We] = T && Br(
          we,
          dt(kr(T), !0)
        ) || [];
        ie = new n(
          $r(ie.body, Mr, St, () => {
            We && We(), le && le();
          }),
          oe
        );
      }
      A = A || "text";
      let ms = await f[d.findKey(f, A) || "text"](
        ie,
        h
      );
      return !hr && le && le(), await new Promise((oe, we) => {
        as(oe, we, {
          data: ms,
          headers: $.from(ie.headers),
          status: ie.status,
          statusText: ie.statusText,
          config: h,
          request: se
        });
      });
    } catch (D) {
      throw le && le(), D && D.name === "TypeError" && /Load failed|fetch/i.test(D.message) ? Object.assign(
        new b(
          "Network Error",
          b.ERR_NETWORK,
          h,
          se,
          D && D.response
        ),
        {
          cause: D.cause || D
        }
      ) : b.from(D, D && D.code, h, se, D && D.response);
    }
  };
}, tc = /* @__PURE__ */ new Map(), us = (e) => {
  let t = e && e.env || {};
  const { fetch: r, Request: n, Response: s } = t, o = [n, s, r];
  let i = o.length, a = i, u, c, l = tc;
  for (; a--; )
    u = o[a], c = l.get(u), c === void 0 && l.set(u, c = a ? /* @__PURE__ */ new Map() : ec(t)), l = c;
  return c;
};
us();
const ur = {
  http: wa,
  xhr: Xa,
  fetch: {
    get: us
  }
};
d.forEach(ur, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Vr = (e) => `- ${e}`, rc = (e) => d.isFunction(e) || e === null || e === !1;
function nc(e, t) {
  e = d.isArray(e) ? e : [e];
  const { length: r } = e;
  let n, s;
  const o = {};
  for (let i = 0; i < r; i++) {
    n = e[i];
    let a;
    if (s = n, !rc(n) && (s = ur[(a = String(n)).toLowerCase()], s === void 0))
      throw new b(`Unknown adapter '${a}'`);
    if (s && (d.isFunction(s) || (s = s.get(t))))
      break;
    o[a || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(o).map(
      ([u, c]) => `adapter ${u} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let a = r ? i.length > 1 ? `since :
` + i.map(Vr).join(`
`) : " " + Vr(i[0]) : "as no adapter specified";
    throw new b(
      "There is no suitable adapter to dispatch the request " + a,
      "ERR_NOT_SUPPORT"
    );
  }
  return s;
}
const fs = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: nc,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: ur
};
function qt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Me(null, e);
}
function Xr(e) {
  return qt(e), e.headers = $.from(e.headers), e.data = Nt.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), fs.getAdapter(e.adapter || $e.adapter, e)(e).then(
    function(n) {
      return qt(e), n.data = Nt.call(e, e.transformResponse, n), n.headers = $.from(n.headers), n;
    },
    function(n) {
      return os(n) || (qt(e), n && n.response && (n.response.data = Nt.call(
        e,
        e.transformResponse,
        n.response
      ), n.response.headers = $.from(n.response.headers))), Promise.reject(n);
    }
  );
}
const ds = "1.14.0", bt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  bt[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Jr = {};
bt.transitional = function(t, r, n) {
  function s(o, i) {
    return "[Axios v" + ds + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new b(
        s(i, " has been removed" + (r ? " in " + r : "")),
        b.ERR_DEPRECATED
      );
    return r && !Jr[i] && (Jr[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
bt.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function sc(e, t, r) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], i = t[o];
    if (i) {
      const a = e[o], u = a === void 0 || i(a, o, e);
      if (u !== !0)
        throw new b(
          "option " + o + " must be " + u,
          b.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (r !== !0)
      throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const tt = {
  assertOptions: sc,
  validators: bt
}, V = tt.validators;
let he = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Dr(),
      response: new Dr()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? o && !String(n.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + o) : n.stack = o;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = me(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 && tt.assertOptions(
      n,
      {
        silentJSONParsing: V.transitional(V.boolean),
        forcedJSONParsing: V.transitional(V.boolean),
        clarifyTimeoutError: V.transitional(V.boolean),
        legacyInterceptorReqResOrdering: V.transitional(V.boolean)
      },
      !1
    ), s != null && (d.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : tt.assertOptions(
      s,
      {
        encode: V.function,
        serialize: V.function
      },
      !0
    )), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), tt.assertOptions(
      r,
      {
        baseUrl: V.spelling("baseURL"),
        withXsrfToken: V.spelling("withXSRFToken")
      },
      !0
    ), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = o && d.merge(o.common, o[r.method]);
    o && d.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (h) => {
      delete o[h];
    }), r.headers = $.concat(i, o);
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function(m) {
      if (typeof m.runWhen == "function" && m.runWhen(r) === !1)
        return;
      u = u && m.synchronous;
      const g = r.transitional || cr;
      g && g.legacyInterceptorReqResOrdering ? a.unshift(m.fulfilled, m.rejected) : a.push(m.fulfilled, m.rejected);
    });
    const c = [];
    this.interceptors.response.forEach(function(m) {
      c.push(m.fulfilled, m.rejected);
    });
    let l, f = 0, y;
    if (!u) {
      const h = [Xr.bind(this), void 0];
      for (h.unshift(...a), h.push(...c), y = h.length, l = Promise.resolve(r); f < y; )
        l = l.then(h[f++], h[f++]);
      return l;
    }
    y = a.length;
    let S = r;
    for (; f < y; ) {
      const h = a[f++], m = a[f++];
      try {
        S = h(S);
      } catch (g) {
        m.call(this, g);
        break;
      }
    }
    try {
      l = Xr.call(this, S);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, y = c.length; f < y; )
      l = l.then(c[f++], c[f++]);
    return l;
  }
  getUri(t) {
    t = me(this.defaults, t);
    const r = cs(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ss(r, t.params, t.paramsSerializer);
  }
};
d.forEach(["delete", "get", "head", "options"], function(t) {
  he.prototype[t] = function(r, n) {
    return this.request(
      me(n || {}, {
        method: t,
        url: r,
        data: (n || {}).data
      })
    );
  };
});
d.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(o, i, a) {
      return this.request(
        me(a || {}, {
          method: t,
          headers: n ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: o,
          data: i
        })
      );
    };
  }
  he.prototype[t] = r(), he.prototype[t + "Form"] = r(!0);
});
let ic = class hs {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; )
        n._listeners[o](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((a) => {
        n.subscribe(a), o = a;
      }).then(s);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, t(function(o, i, a) {
      n.reason || (n.reason = new Me(o, i, a), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new hs(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
};
function oc(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function ac(e) {
  return d.isObject(e) && e.isAxiosError === !0;
}
const zt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(zt).forEach(([e, t]) => {
  zt[t] = e;
});
function ps(e) {
  const t = new he(e), r = Vn(he.prototype.request, t);
  return d.extend(r, he.prototype, t, { allOwnKeys: !0 }), d.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(s) {
    return ps(me(e, s));
  }, r;
}
const F = ps($e);
F.Axios = he;
F.CanceledError = Me;
F.CancelToken = ic;
F.isCancel = os;
F.VERSION = ds;
F.toFormData = Pt;
F.AxiosError = b;
F.Cancel = F.CanceledError;
F.all = function(t) {
  return Promise.all(t);
};
F.spread = oc;
F.isAxiosError = ac;
F.mergeConfig = me;
F.AxiosHeaders = $;
F.formToJSON = (e) => is(d.isHTMLForm(e) ? new FormData(e) : e);
F.getAdapter = fs.getAdapter;
F.HttpStatusCode = zt;
F.default = F;
const {
  Axios: cc,
  AxiosError: lc,
  CanceledError: uc,
  isCancel: fc,
  CancelToken: dc,
  VERSION: hc,
  all: pc,
  Cancel: mc,
  isAxiosError: gc,
  spread: yc,
  toFormData: wc,
  AxiosHeaders: Pc,
  HttpStatusCode: bc,
  formToJSON: Sc,
  getAdapter: Ec,
  mergeConfig: Oc
} = F, Rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Axios: cc,
  AxiosError: lc,
  AxiosHeaders: Pc,
  Cancel: mc,
  CancelToken: dc,
  CanceledError: uc,
  HttpStatusCode: bc,
  VERSION: hc,
  all: pc,
  default: F,
  formToJSON: Sc,
  getAdapter: Ec,
  isAxiosError: gc,
  isCancel: fc,
  mergeConfig: Oc,
  spread: yc,
  toFormData: wc
}, Symbol.toStringTag, { value: "Module" }));
export {
  vo as FormComponentResetSymbol,
  De as HttpCancelledError,
  nr as HttpError,
  ut as HttpNetworkError,
  Ue as HttpResponseError,
  qc as UseFormUtils,
  Ln as XhrHttpClient,
  Ic as axiosAdapter,
  Wc as buildSSRBody,
  jt as config,
  Hc as createHeadManager,
  Dc as createLayoutPropsStore,
  Lc as formDataToObject,
  Fc as getInitialPageFromDOM,
  Cc as getScrollableParent,
  Bt as hasFiles,
  X as hrefToUrl,
  zi as http,
  uo as isPropsObject,
  jc as isPropsObjectOrCallback,
  Ci as isSameUrlWithoutQueryOrHash,
  lt as isUrlMethodPair,
  qn as mergeDataIntoQueryString,
  Bc as normalizeLayouts,
  Cn as objectToFormData,
  J as progress,
  Mc as resetFormFields,
  Nc as resolveUrlMethodPairComponent,
  W as router,
  $c as setupProgress,
  kc as shouldIntercept,
  _c as shouldNavigate,
  In as urlHasProtocol,
  Fi as urlToString,
  at as urlWithoutHash,
  Uc as useInfiniteScroll,
  Wi as xhrHttpClient
};
