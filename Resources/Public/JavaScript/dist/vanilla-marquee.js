function u(s, i = document) {
  return i.getElementsByClassName(s);
}
function g(s, i = document) {
  return i.querySelector(s);
}
function y(s, i = document) {
  return i.querySelectorAll(s);
}
function f(s, i, t) {
  for (let e = 0, n = s.length; e < n; e++) i.call(t, s[e], e);
}
function W(s, ...i) {
  s.length === void 0 ? t(s, ...i) : f(s, (e) => {
    t(e, ...i);
  });
  function t(e, ...n) {
    n.forEach((r) => {
      e.classList.add(r);
    });
  }
}
function o(s, i, t, e) {
  s.addEventListener(i, t, e);
}
function l(s, i, t, e) {
  s.removeEventListener(i, t, e);
}
function q(s, i) {
  return s.getAttribute(i);
}
function _(s, i, t) {
  s.setAttribute(i, t);
}
function H(s, i) {
  s.removeAttribute(i);
}
const c = {
  css3easing: "linear",
  delayBeforeStart: 1e3,
  direction: "left",
  duplicated: !1,
  duration: 5e3,
  gap: 20,
  pauseOnHover: !1,
  recalcResize: !1,
  speed: 0,
  startVisible: !1
};
let p = 0;
class S {
  /**
   * Constructor
   *
   * @param {Element} el - The element where the marquee is applied
   * @param {defaultOptions} opts - the options
   */
  constructor(i, t) {
    if (typeof i > "u")
      throw new Error("el cannot be undefined");
    if (typeof i == "string")
      throw new Error("el cannot be just a selector");
    if (i === null)
      throw new Error("el cannot be null");
    t = {
      ...c,
      ...t
    }, this.el = i, this._loopCount = 3;
    for (const m in c) {
      let h = q(i, `data-${c[m]}`);
      h !== null && h !== "" && ((h === "true" || h === "false") && (h = !!h), t[m] = h);
    }
    t.speed && (t.duration = parseInt(i.clientWidth) / t.speed * 1e3), t.gap = t.duplicated ? parseInt(t.gap) : 0, i.innerHTML = `<div class="js-marquee">${i.innerHTML}</div>`;
    const e = u("js-marquee", i)[0];
    e.style.marginRight = `${t.gap}px`, e.style.willChange = "transform", e.style.float = "left", t.duplicated && i.appendChild(e.cloneNode(!0)), i.innerHTML = `<div style="width:100000px" class="js-marquee-wrapper">${i.innerHTML}</div>`;
    const n = u("js-marquee-wrapper", i)[0], r = t.direction === "up" || t.direction === "down";
    this._marqWrap = n, this._vertical = r, this._duration = t.duration, this._opts = t, this._calcSizes();
    const a = `marqueeAnimation-${Math.floor(Math.random() * 1e7)}`, d = this._animationStr(
      a,
      t.duration / 1e3,
      t.delayBeforeStart / 1e3,
      "infinite"
    );
    this._animName = a, this._animStr = d, t.duplicated ? (r ? t.startVisible ? this._marqWrap.style.transform = "translateY(0px)" : this._marqWrap.style.transform = `translateY(${t.direction === "up" ? this._contHeight : -1 * (this._elHeight * 2 - t.gap)}px)` : t.startVisible ? this._marqWrap.style.transform = "translateX(0px)" : this._marqWrap.style.transform = `translateX(${t.direction === "left" ? this._contWidth : -1 * (this._elWidth * 2 - t.gap)}px)`, t.startVisible || (this._loopCount = 1)) : t.startVisible ? this._loopCount = 2 : r ? this._repositionVert() : this._repositionHor(), o(this.el, "pause", this.pause.bind(this)), o(this.el, "resume", this.resume.bind(this)), t.pauseOnHover && (o(this.el, "mouseover", this.pause.bind(this)), o(this.el, "mouseout", this.resume.bind(this))), this._animEnd = () => {
      this._animate(r), this.el.dispatchEvent(new CustomEvent("finished"));
    }, this._instance = p, p++, this._animate(r), t.recalcResize && o(window, "resize", this._recalcResize.bind(this));
  }
  /**
   * Build the css string for the animation
   *
   * @privte
   * @param {String} [name=''] - animation name
   * @param {Number} [duration=0] - Animation duration (in s)
   * @param {Number} [delay=0] - Animation delay before starting (in s)
   * @param {String} [loops=''] - Animation iterations
   *
   * @returns {String} css animation string
   */
  _animationStr(i = "", t = 0, e = 0, n = "") {
    return `${i} ${t}s ${e}s ${n} ${this._opts.css3easing}`;
  }
  /**
   * Animation of the marquee
   *
   * @private
   * @param {Boolean} vertical - Vertical direction
   */
  _animate(i = !1) {
    const t = this._opts;
    if (t.duplicated) {
      if (this._loopCount === 1) {
        let a = t.duration;
        i ? a = t.direction === "up" ? a + this._contHeight / (this._elHeight / a) : a * 2 : a = t.direction === "left" ? a + this._contWidth / (this._elWidth / a) : a * 2, this._animStr = this._animationStr(
          this._animName,
          a / 1e3,
          t.delayBeforeStart / 1e3
        );
      } else this._loopCount === 2 && (this._animName = `${this._animName}0`, this._animStr = this._animationStr(
        this._animName,
        t.duration / 1e3,
        0,
        "infinite"
      ));
      this._loopCount++;
    }
    let e = "";
    i ? t.duplicated ? (this._loopCount > 2 && (this._marqWrap.style.transform = `translateY(${t.direction === "up" ? 0 : -1 * this._elHeight}px)`), e = `translateY(${t.direction === "up" ? -1 * this._elHeight : 0}px)`) : t.startVisible ? this._loopCount === 2 ? (this._animStr = this._animationStr(
      this._animName,
      t.duration / 1e3,
      t.delayBeforeStart / 1e3
    ), e = `translateY(${t.direction === "up" ? -1 * this._elHeight : this._contHeight}px)`, this._loopCount++) : this._loopCount === 3 && (this._animName = `${this._animName}0`, this._animStr = this._animationStr(
      this._animName,
      this._completeDuration / 1e3,
      0,
      "infinite"
    ), this._repositionVert()) : (this._repositionVert(), e = `translateY(${t.direction === "up" ? -1 * this._marqWrap.clientHeight : this._contHeight}px)`) : t.duplicated ? (this._loopCount > 2 && (this._marqWrap.style.transform = `translateX(${t.direction === "left" ? 0 : -1 * this._elWidth}px)`), e = `translateX(${t.direction === "left" ? -1 * this._elWidth : 0}px)`) : t.startVisible ? this._loopCount === 2 ? (this._animStr = this._animationStr(
      this._animName,
      t.duration / 1e3,
      t.delayBeforeStart / 1e3
    ), e = `translateX(${t.direction === "left" ? -1 * this._elWidth : this._contWidth}px)`, this._loopCount++) : this._loopCount === 3 && (this._animName = `${this._animName}0`, this._animStr = this._animationStr(
      this._animName,
      t.duration / 1e3,
      0,
      "infinite"
    ), this._repositionHor()) : (this._repositionHor(), e = `translateX(${t.direction === "left" ? -1 * this._elWidth : this._contWidth}px)`), this.el.dispatchEvent(new CustomEvent("beforeStarting")), this._marqWrap.style.animation = this._animStr;
    const n = `@keyframes ${this._animName} {
        100% {
          transform: ${e};
        }
      }`, r = y("style", this._marqWrap);
    if (r.length)
      r[r.length - 1].innerHTML = n;
    else if (u(`marq-wrap-style-${this._instance}`).length)
      u(`marq-wrap-style-${this._instance}`)[0].innerHTML = n;
    else {
      const a = document.createElement("style");
      W(a, `marq-wrap-style-${this._instance}`), a.innerHTML = n, g("head").appendChild(a);
    }
    o(this._marqWrap, "animationiteration", this._animIter.bind(this), {
      once: !0
    }), o(this._marqWrap, "animationend", this._animEnd.bind(this), {
      once: !0
    }), this._status = "running", _(this.el, "data-runningStatus", "resumed");
  }
  /**
   * Event fired on Animation iteration
   *
   * @private
   */
  _animIter() {
    this.el.dispatchEvent(new CustomEvent("finished"));
  }
  /**
   * Reposition the Wrapper vertically
   *
   * @private
   */
  _repositionVert() {
    this._marqWrap.style.transform = `translateY(${this._opts.direction === "up" ? this._contHeight : this._elHeight * -1}px)`;
  }
  /**
   * Reposition the Wrapper horizontally
   *
   * @private
   */
  _repositionHor() {
    this._marqWrap.style.transform = `translateX(${this._opts.direction === "left" ? this._contWidth : this._elWidth * -1}px)`;
  }
  /**
   * Calculates the speed and the dimension of the marquee
   *
   * @private
   */
  _calcSizes() {
    const i = this.el, t = this._opts;
    if (this._vertical) {
      const e = i.clientHeight;
      this._contHeight = e, H(this._marqWrap, "style"), i.style.clientHeight = `${e}px`;
      const n = u("js-marquee", i), r = n.length - 1;
      f(n, (d, m) => {
        d.style.float = "none", d.style.marginRight = "0px", t.duplicated && m === r ? d.style.marginBottom = "0px" : d.style.marginBottom = `${t.gap}px`;
      });
      const a = parseInt(n[0].clientHeight + t.gap);
      this._elHeight = a, t.startVisible && !t.duplicated ? (this._completeDuration = (a + e) / parseInt(e) * this._duration, t.duration = a / parseInt(e) * this._duration) : t.duration = a / parseInt(e) / parseInt(e) * this._duration;
    } else {
      const e = parseInt(u("js-marquee", i)[0].clientWidth + t.gap), n = i.clientWidth;
      this._contWidth = n, this._elWidth = e, t.startVisible && !t.duplicated ? (this._completeDuration = (e + n) / parseInt(n) * this._duration, t.duration = e / parseInt(n) * this._duration) : t.duration = (e + parseInt(n)) / parseInt(n) * this._duration;
    }
    t.duplicated && (t.duration = t.duration / 2);
  }
  /**
   * Recalculates the dimensions and positon of the marquee on page resize
   *
   * @private
   */
  _recalcResize() {
    this._calcSizes(), this._loopCount = 2, this._animEnd();
  }
  /**
   * Pause the animation
   */
  pause() {
    this._marqWrap.style.animationPlayState = "paused", this._status = "paused", _(this.el, "data-runningStatus", "paused"), this.el.dispatchEvent(new CustomEvent("paused"));
  }
  /**
   * Resume the animation
   */
  resume() {
    this._marqWrap.style.animationPlayState = "running", this._status = "running", _(this.el, "data-runningStatus", "resumed"), this.el.dispatchEvent(new CustomEvent("resumed"));
  }
  /**
   * Toggle animation playing status
   */
  toggle() {
    this._status === "paused" ? this.resume() : this._status === "running" && this.pause();
  }
  /**
   * Destorys the instance and removes events
   */
  destroy() {
    l(this.el, "pause", this.pause.bind(this)), l(this.el, "resume", this.resume.bind(this)), this._opts.pauseOnHover && (l(this.el, "mouseover", this.pause.bind(this)), l(this.el, "mouseout", this.resume.bind(this))), l(this._marqWrap, "animationiteration", this._animIter.bind(this), {
      once: !0
    }), l(this._marqWrap, "animationend", this._animEnd.bind(this), {
      once: !0
    }), this._opts.recalcResize && l(window, "resize", this._recalcResize.bind(this));
  }
  /**
   * Forces a refresh (like recalcResize) but done manually
   */
  refresh() {
    this._recalcResize();
  }
}
export {
  S as default
};
