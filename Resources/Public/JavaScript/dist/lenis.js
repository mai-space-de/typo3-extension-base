var x = Object.defineProperty;
var k = (t, i, e) => i in t ? x(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var r = (t, i, e) => k(t, typeof i != "symbol" ? i + "" : i, e);
var N = "1.3.21";
function R(t, i, e) {
  return Math.max(t, Math.min(i, e));
}
function D(t, i, e) {
  return (1 - e) * t + e * i;
}
function X(t, i, e, o) {
  return D(t, i, 1 - Math.exp(-e * o));
}
function Y(t, i) {
  return (t % i + i) % i;
}
var P = class {
  constructor() {
    r(this, "isRunning", !1);
    r(this, "value", 0);
    r(this, "from", 0);
    r(this, "to", 0);
    r(this, "currentTime", 0);
    r(this, "lerp");
    r(this, "duration");
    r(this, "easing");
    r(this, "onUpdate");
  }
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(t) {
    var e;
    if (!this.isRunning) return;
    let i = !1;
    if (this.duration && this.easing) {
      this.currentTime += t;
      const o = R(0, this.currentTime / this.duration, 1);
      i = o >= 1;
      const s = i ? 1 : this.easing(o);
      this.value = this.from + (this.to - this.from) * s;
    } else this.lerp ? (this.value = X(this.value, this.to, this.lerp * 60, t), Math.round(this.value) === this.to && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
    i && this.stop(), (e = this.onUpdate) == null || e.call(this, this.value, i);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = !1;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(t, i, { lerp: e, duration: o, easing: s, onStart: h, onUpdate: p }) {
    this.from = this.value = t, this.to = i, this.lerp = e, this.duration = o, this.easing = s, this.currentTime = 0, this.isRunning = !0, h == null || h(), this.onUpdate = p;
  }
};
function V(t, i) {
  let e;
  return function(...o) {
    clearTimeout(e), e = setTimeout(() => {
      e = void 0, t.apply(this, o);
    }, i);
  };
}
var A = class {
  constructor(t, i, { autoResize: e = !0, debounce: o = 250 } = {}) {
    r(this, "width", 0);
    r(this, "height", 0);
    r(this, "scrollHeight", 0);
    r(this, "scrollWidth", 0);
    r(this, "debouncedResize");
    r(this, "wrapperResizeObserver");
    r(this, "contentResizeObserver");
    r(this, "resize", () => {
      this.onWrapperResize(), this.onContentResize();
    });
    r(this, "onWrapperResize", () => {
      this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    });
    r(this, "onContentResize", () => {
      this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    });
    this.wrapper = t, this.content = i, e && (this.debouncedResize = V(this.resize, o), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var t, i;
    (t = this.wrapperResizeObserver) == null || t.disconnect(), (i = this.contentResizeObserver) == null || i.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
  }
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, H = class {
  constructor() {
    r(this, "events", {});
  }
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(t, ...i) {
    var o;
    const e = this.events[t] || [];
    for (let s = 0, h = e.length; s < h; s++) (o = e[s]) == null || o.call(e, ...i);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(t, i) {
    return this.events[t] ? this.events[t].push(i) : this.events[t] = [i], () => {
      var e;
      this.events[t] = (e = this.events[t]) == null ? void 0 : e.filter((o) => i !== o);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(t, i) {
    var e;
    this.events[t] = (e = this.events[t]) == null ? void 0 : e.filter((o) => i !== o);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const I = 100 / 6, b = { passive: !1 };
function L(t, i) {
  return t === 1 ? I : t === 2 ? i : 1;
}
var B = class {
  constructor(t, i = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    r(this, "touchStart", {
      x: 0,
      y: 0
    });
    r(this, "lastDelta", {
      x: 0,
      y: 0
    });
    r(this, "window", {
      width: 0,
      height: 0
    });
    r(this, "emitter", new H());
    /**
    * Event handler for 'touchstart' event
    *
    * @param event Touch event
    */
    r(this, "onTouchStart", (t) => {
      const { clientX: i, clientY: e } = t.targetTouches ? t.targetTouches[0] : t;
      this.touchStart.x = i, this.touchStart.y = e, this.lastDelta = {
        x: 0,
        y: 0
      }, this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event: t
      });
    });
    /** Event handler for 'touchmove' event */
    r(this, "onTouchMove", (t) => {
      const { clientX: i, clientY: e } = t.targetTouches ? t.targetTouches[0] : t, o = -(i - this.touchStart.x) * this.options.touchMultiplier, s = -(e - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = i, this.touchStart.y = e, this.lastDelta = {
        x: o,
        y: s
      }, this.emitter.emit("scroll", {
        deltaX: o,
        deltaY: s,
        event: t
      });
    });
    r(this, "onTouchEnd", (t) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: t
      });
    });
    /** Event handler for 'wheel' event */
    r(this, "onWheel", (t) => {
      let { deltaX: i, deltaY: e, deltaMode: o } = t;
      const s = L(o, this.window.width), h = L(o, this.window.height);
      i *= s, e *= h, i *= this.options.wheelMultiplier, e *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
        deltaX: i,
        deltaY: e,
        event: t
      });
    });
    r(this, "onWindowResize", () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    });
    this.element = t, this.options = i, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, b), this.element.addEventListener("touchstart", this.onTouchStart, b), this.element.addEventListener("touchmove", this.onTouchMove, b), this.element.addEventListener("touchend", this.onTouchEnd, b);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(t, i) {
    return this.emitter.on(t, i);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, b), this.element.removeEventListener("touchstart", this.onTouchStart, b), this.element.removeEventListener("touchmove", this.onTouchMove, b), this.element.removeEventListener("touchend", this.onTouchEnd, b);
  }
};
const O = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var U = class {
  constructor({ wrapper: t = window, content: i = document.documentElement, eventsTarget: e = t, smoothWheel: o = !0, syncTouch: s = !1, syncTouchLerp: h = 0.075, touchInertiaExponent: p = 1.7, duration: u, easing: a, lerp: c = 0.1, infinite: S = !1, orientation: d = "vertical", gestureOrientation: n = d === "horizontal" ? "both" : "vertical", touchMultiplier: f = 1, wheelMultiplier: l = 1, autoResize: m = !0, prevent: v, virtualScroll: w, overscroll: g = !0, autoRaf: y = !1, anchors: E = !1, autoToggle: z = !1, allowNestedScroll: T = !1, __experimental__naiveDimensions: W = !1, naiveDimensions: M = W, stopInertiaOnNavigate: _ = !1 } = {}) {
    r(this, "_isScrolling", !1);
    r(this, "_isStopped", !1);
    r(this, "_isLocked", !1);
    r(this, "_preventNextNativeScrollEvent", !1);
    r(this, "_resetVelocityTimeout", null);
    r(this, "_rafId", null);
    /**
    * Whether or not the user is touching the screen
    */
    r(this, "isTouching");
    /**
    * The time in ms since the lenis instance was created
    */
    r(this, "time", 0);
    /**
    * User data that will be forwarded through the scroll event
    *
    * @example
    * lenis.scrollTo(100, {
    *   userData: {
    *     foo: 'bar'
    *   }
    * })
    */
    r(this, "userData", {});
    /**
    * The last velocity of the scroll
    */
    r(this, "lastVelocity", 0);
    /**
    * The current velocity of the scroll
    */
    r(this, "velocity", 0);
    /**
    * The direction of the scroll
    */
    r(this, "direction", 0);
    /**
    * The options passed to the lenis instance
    */
    r(this, "options");
    /**
    * The target scroll value
    */
    r(this, "targetScroll");
    /**
    * The animated scroll value
    */
    r(this, "animatedScroll");
    r(this, "animate", new P());
    r(this, "emitter", new H());
    r(this, "dimensions");
    r(this, "virtualScroll");
    r(this, "onScrollEnd", (t) => {
      t instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && t.stopPropagation();
    });
    r(this, "dispatchScrollendEvent", () => {
      this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
        bubbles: this.options.wrapper === window,
        detail: { lenisScrollEnd: !0 }
      }));
    });
    r(this, "onTransitionEnd", (t) => {
      var i;
      (i = t.propertyName) != null && i.includes("overflow") && t.target === this.rootElement && this.checkOverflow();
    });
    r(this, "onClick", (t) => {
      const i = t.composedPath().filter((o) => o instanceof HTMLAnchorElement && o.href).map((o) => new URL(o.href)), e = new URL(window.location.href);
      if (this.options.anchors) {
        const o = i.find((s) => e.host === s.host && e.pathname === s.pathname && s.hash);
        if (o) {
          const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, h = `#${o.hash.split("#")[1]}`;
          this.scrollTo(h, s);
          return;
        }
      }
      if (this.options.stopInertiaOnNavigate && i.some((o) => e.host === o.host && e.pathname !== o.pathname)) {
        this.reset();
        return;
      }
    });
    r(this, "onPointerDown", (t) => {
      t.button === 1 && this.reset();
    });
    r(this, "onVirtualScroll", (t) => {
      if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(t) === !1) return;
      const { deltaX: i, deltaY: e, event: o } = t;
      if (this.emitter.emit("virtual-scroll", {
        deltaX: i,
        deltaY: e,
        event: o
      }), o.ctrlKey || o.lenisStopPropagation) return;
      const s = o.type.includes("touch"), h = o.type.includes("wheel");
      this.isTouching = o.type === "touchstart" || o.type === "touchmove";
      const p = i === 0 && e === 0;
      if (this.options.syncTouch && s && o.type === "touchstart" && p && !this.isStopped && !this.isLocked) {
        this.reset();
        return;
      }
      const u = this.options.gestureOrientation === "vertical" && e === 0 || this.options.gestureOrientation === "horizontal" && i === 0;
      if (p || u) return;
      let a = o.composedPath();
      a = a.slice(0, a.indexOf(this.rootElement));
      const c = this.options.prevent, S = Math.abs(i) >= Math.abs(e) ? "horizontal" : "vertical";
      if (a.find((l) => {
        var m, v, w, g, y;
        return l instanceof HTMLElement && (typeof c == "function" && (c == null ? void 0 : c(l)) || ((m = l.hasAttribute) == null ? void 0 : m.call(l, "data-lenis-prevent")) || S === "vertical" && ((v = l.hasAttribute) == null ? void 0 : v.call(l, "data-lenis-prevent-vertical")) || S === "horizontal" && ((w = l.hasAttribute) == null ? void 0 : w.call(l, "data-lenis-prevent-horizontal")) || s && ((g = l.hasAttribute) == null ? void 0 : g.call(l, "data-lenis-prevent-touch")) || h && ((y = l.hasAttribute) == null ? void 0 : y.call(l, "data-lenis-prevent-wheel")) || this.options.allowNestedScroll && this.hasNestedScroll(l, {
          deltaX: i,
          deltaY: e
        }));
      })) return;
      if (this.isStopped || this.isLocked) {
        o.cancelable && o.preventDefault();
        return;
      }
      if (!(this.options.syncTouch && s || this.options.smoothWheel && h)) {
        this.isScrolling = "native", this.animate.stop(), o.lenisStopPropagation = !0;
        return;
      }
      let d = e;
      this.options.gestureOrientation === "both" ? d = Math.abs(e) > Math.abs(i) ? e : i : this.options.gestureOrientation === "horizontal" && (d = i), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && e > 0 || this.animatedScroll === this.limit && e < 0)) && (o.lenisStopPropagation = !0), o.cancelable && o.preventDefault();
      const n = s && this.options.syncTouch, f = s && o.type === "touchend";
      f && (d = Math.sign(this.velocity) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d, {
        programmatic: !1,
        ...n ? { lerp: f ? this.options.syncTouchLerp : 1 } : {
          lerp: this.options.lerp,
          duration: this.options.duration,
          easing: this.options.easing
        }
      });
    });
    r(this, "onNativeScroll", () => {
      if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = !1;
        return;
      }
      if (this.isScrolling === !1 || this.isScrolling === "native") {
        const t = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t, this.direction = Math.sign(this.animatedScroll - t), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
        }, 400));
      }
    });
    /**
    * RequestAnimationFrame for lenis
    *
    * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
    */
    r(this, "raf", (t) => {
      const i = t - (this.time || t);
      this.time = t, this.animate.advance(i * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
    });
    window.lenisVersion = N, window.lenis || (window.lenis = {}), window.lenis.version = N, d === "horizontal" && (window.lenis.horizontal = !0), s === !0 && (window.lenis.touch = !0), (!t || t === document.documentElement) && (t = window), typeof u == "number" && typeof a != "function" ? a = O : typeof a == "function" && typeof u != "number" && (u = 1), this.options = {
      wrapper: t,
      content: i,
      eventsTarget: e,
      smoothWheel: o,
      syncTouch: s,
      syncTouchLerp: h,
      touchInertiaExponent: p,
      duration: u,
      easing: a,
      lerp: c,
      infinite: S,
      gestureOrientation: n,
      orientation: d,
      touchMultiplier: f,
      wheelMultiplier: l,
      autoResize: m,
      prevent: v,
      virtualScroll: w,
      overscroll: g,
      autoRaf: y,
      anchors: E,
      autoToggle: z,
      allowNestedScroll: T,
      naiveDimensions: M,
      stopInertiaOnNavigate: _
    }, this.dimensions = new A(t, i, { autoResize: m }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new B(e, {
      touchMultiplier: f,
      wheelMultiplier: l
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(t, i) {
    return this.emitter.on(t, i);
  }
  off(t, i) {
    return this.emitter.off(t, i);
  }
  get overflow() {
    const t = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[t];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  setScroll(t) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: t,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: t,
      behavior: "instant"
    });
  }
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(t, { offset: i = 0, immediate: e = !1, lock: o = !1, programmatic: s = !0, lerp: h = s ? this.options.lerp : void 0, duration: p = s ? this.options.duration : void 0, easing: u = s ? this.options.easing : void 0, onStart: a, onComplete: c, force: S = !1, userData: d } = {}) {
    if ((this.isStopped || this.isLocked) && !S) return;
    let n = t, f = i;
    if (typeof n == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(n)) n = 0;
    else if (typeof n == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(n)) n = this.limit;
    else {
      let l = null;
      if (typeof n == "string" ? (l = document.querySelector(n), l || (n === "#top" ? n = 0 : console.warn("Lenis: Target not found", n))) : n instanceof HTMLElement && (n != null && n.nodeType) && (l = n), l) {
        if (this.options.wrapper !== window) {
          const E = this.rootElement.getBoundingClientRect();
          f -= this.isHorizontal ? E.left : E.top;
        }
        const m = l.getBoundingClientRect(), v = getComputedStyle(l), w = this.isHorizontal ? Number.parseFloat(v.scrollMarginLeft) : Number.parseFloat(v.scrollMarginTop), g = getComputedStyle(this.rootElement), y = this.isHorizontal ? Number.parseFloat(g.scrollPaddingLeft) : Number.parseFloat(g.scrollPaddingTop);
        n = (this.isHorizontal ? m.left : m.top) + this.animatedScroll - (Number.isNaN(w) ? 0 : w) - (Number.isNaN(y) ? 0 : y);
      }
    }
    if (typeof n == "number") {
      if (n += f, n = Math.round(n), this.options.infinite) {
        if (s) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const l = n - this.animatedScroll;
          l > this.limit / 2 ? n -= this.limit : l < -this.limit / 2 && (n += this.limit);
        }
      } else n = R(0, n, this.limit);
      if (n === this.targetScroll) {
        a == null || a(this), c == null || c(this);
        return;
      }
      if (this.userData = d ?? {}, e) {
        this.animatedScroll = this.targetScroll = n, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), c == null || c(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      s || (this.targetScroll = n), typeof p == "number" && typeof u != "function" ? u = O : typeof u == "function" && typeof p != "number" && (p = 1), this.animate.fromTo(this.animatedScroll, n, {
        duration: p,
        easing: u,
        lerp: h,
        onStart: () => {
          o && (this.isLocked = !0), this.isScrolling = "smooth", a == null || a(this);
        },
        onUpdate: (l, m) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = l - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = l, this.setScroll(this.scroll), s && (this.targetScroll = l), m || this.emit(), m && (this.reset(), this.emit(), c == null || c(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        }
      });
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    });
  }
  hasNestedScroll(t, { deltaX: i, deltaY: e }) {
    const o = Date.now();
    t._lenis || (t._lenis = {});
    const s = t._lenis;
    let h, p, u, a, c, S, d, n, f, l;
    if (o - (s.time ?? 0) > 2e3) {
      s.time = Date.now();
      const T = window.getComputedStyle(t);
      if (s.computedStyle = T, h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(T.overflowX), p = [
        "auto",
        "overlay",
        "scroll"
      ].includes(T.overflowY), c = ["auto"].includes(T.overscrollBehaviorX), S = ["auto"].includes(T.overscrollBehaviorY), s.hasOverflowX = h, s.hasOverflowY = p, !(h || p)) return !1;
      d = t.scrollWidth, n = t.scrollHeight, f = t.clientWidth, l = t.clientHeight, u = d > f, a = n > l, s.isScrollableX = u, s.isScrollableY = a, s.scrollWidth = d, s.scrollHeight = n, s.clientWidth = f, s.clientHeight = l, s.hasOverscrollBehaviorX = c, s.hasOverscrollBehaviorY = S;
    } else
      u = s.isScrollableX, a = s.isScrollableY, h = s.hasOverflowX, p = s.hasOverflowY, d = s.scrollWidth, n = s.scrollHeight, f = s.clientWidth, l = s.clientHeight, c = s.hasOverscrollBehaviorX, S = s.hasOverscrollBehaviorY;
    if (!(h && u || p && a)) return !1;
    const m = Math.abs(i) >= Math.abs(e) ? "horizontal" : "vertical";
    let v, w, g, y, E, z;
    if (m === "horizontal")
      v = Math.round(t.scrollLeft), w = d - f, g = i, y = h, E = u, z = c;
    else if (m === "vertical")
      v = Math.round(t.scrollTop), w = n - l, g = e, y = p, E = a, z = S;
    else return !1;
    return !z && (v >= w || v <= 0) ? !0 : (g > 0 ? v < w : v > 0) && y && E;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const t = this.options.wrapper;
    return this.isHorizontal ? t.scrollX ?? t.scrollLeft : t.scrollY ?? t.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? Y(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(t) {
    this._isScrolling !== t && (this._isScrolling = t, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(t) {
    this._isStopped !== t && (this._isStopped = t, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(t) {
    this._isLocked !== t && (this._isLocked = t, this.updateClassName());
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let t = "lenis";
    return this.options.autoToggle && (t += " lenis-autoToggle"), this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isScrolling === "smooth" && (t += " lenis-smooth"), t;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};
export {
  U as default
};
