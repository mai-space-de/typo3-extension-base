var Pt = Object.defineProperty;
var ut = (A) => {
  throw TypeError(A);
};
var Mt = (A, v, $) => v in A ? Pt(A, v, { enumerable: !0, configurable: !0, writable: !0, value: $ }) : A[v] = $;
var Ye = (A, v, $) => Mt(A, typeof v != "symbol" ? v + "" : v, $), Xe = (A, v, $) => v.has(A) || ut("Cannot " + $);
var e = (A, v, $) => (Xe(A, v, "read from private field"), $ ? $.call(A) : v.get(A)), U = (A, v, $) => v.has(A) ? ut("Cannot add the same private member more than once") : v instanceof WeakSet ? v.add(A) : v.set(A, $), b = (A, v, $, te) => (Xe(A, v, "write to private field"), te ? te.call(A, $) : v.set(A, $), $), d = (A, v, $) => (Xe(A, v, "access private method"), $);
var pt = (A, v, $, te) => ({
  set _(Y) {
    b(A, v, Y, $);
  },
  get _() {
    return e(A, v, te);
  }
});
var gt;
const $e = (gt = document.querySelector("input[data-mai-captcha-token]")) == null ? void 0 : gt.dataset.assets;
$e && (window.CAP_CUSTOM_WASM_URL = `${$e}cap_wasm_bg.wasm`, window.CAP_CUSTOM_HASHWX_URL = `${$e}hashwx.wasm`, window.CAP_PAKO_URL = `${$e}pako_inflate.min.js`);
var Ue = { exports: {} }, ft;
function It() {
  return ft || (ft = 1, (function(A, v) {
    (() => {
      var V, H, j, C, y, W, O, ie, ue, re, ne, K, oe, o, J, F, X, pe, ae, fe, me, n, be, Ze, he, Qe, Ne, bt, Re, et, We, wt, tt, ke, De, st, Oe, it, vt, rt, yt, _t, nt, ze, ot, xt, Fe, ye, Pe, kt, qe, at;
      const $ = "0.0.8", te = "vibrate" in navigator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (typeof window > "u") return;
      const Y = ["#f5c2e7", "#cba6f7", "#f38ba8", "#fab387", "#f9e2af", "#a6e3a1", "#94e2d5", "#89dceb", "#b4befe"], Ae = (S, h, t) => {
        const s = h === 0 ? "9999px" : "0", i = h === t - 1 ? "9999px" : "0";
        return `color:#1e1e2e;background:${((r) => {
          if (r === "cap") return "#89b4fa";
          let c = 0;
          for (let l = 0; l < r.length; l++) c = r.charCodeAt(l) + ((c << 5) - c);
          return Y[Math.abs(c) % Y.length];
        })(S)};margin-left:${h ? "-6px" : 0};padding:0 6px;border-radius:${s} ${i} ${i} ${s};font-weight:600`;
      }, M = {};
      for (const S of ["debug", "info", "warn", "error"]) M[S] = (h, ...t) => {
        if (window.CAP_SILENT || S === "debug" && !window.CAP_DEBUG) return;
        const s = h.map((r) => `%c${r}`).join(" "), i = h.map((r, c) => Ae(r, c, h.length));
        console[S === "debug" ? "log" : S](s, ...i, ...t);
      };
      const w = (S) => S ? ["cap", S] : ["cap"], se = (S) => `${Math.round(performance.now() - S)}ms`, z = (S, h) => Object.assign(new Error(h), { code: S }), Ee = (S, h = {}) => window != null && window.CAP_CUSTOM_FETCH ? window.CAP_CUSTOM_FETCH(S, h) : fetch(S, h), lt = (S, h) => h ? h.aborted ? Promise.reject(z("aborted", "aborted")) : Promise.race([S, new Promise((t, s) => h.addEventListener("abort", () => s(z("aborted", "aborted")), { once: !0 }))]) : S, At = "initial-state,verifying-label,solved-label,error-label,required-label,troubleshooting-label,group-aria-label,verify-aria-label,verifying-aria-label,verified-aria-label,error-aria-label".split(","), Be = { "zh-cn": "确认你是真人/正在验证.../你是真人/出错了。请重试。/请确认你是真人/故障排除/Cap 验证/点击以确认你是真人/正在验证你是真人，请稍候/我们已确认你是真人，你可以继续了/发生错误，请重试", es: "Verifica que eres humano/Verificando.../Eres humano/Error. Inténtalo de nuevo./Verifica que eres humano/Solucionar problemas/Verificación de Cap/Haz clic para verificar que eres humano/Verificando que eres humano, espera/Hemos verificado que eres humano, ya puedes continuar/Se produjo un error, inténtalo de nuevo", hi: "पुष्टि करें कि आप मानव हैं/सत्यापित हो रहा है.../आप मानव हैं/त्रुटि। पुनः प्रयास करें।/कृपया पुष्टि करें कि आप मानव हैं/समस्या निवारण/Cap सत्यापन/पुष्टि करने के लिए क्लिक करें कि आप मानव हैं/सत्यापित किया जा रहा है कि आप मानव हैं, प्रतीक्षा करें/हमने पुष्टि कर दी है कि आप मानव हैं, अब आप जारी रख सकते हैं/एक त्रुटि हुई, पुनः प्रयास करें", ar: "تحقق من أنك إنسان/جارٍ التحقق.../أنت إنسان/خطأ. حاول مرة أخرى./يرجى التحقق من أنك إنسان/استكشاف الأخطاء وإصلاحها/تحقق Cap/انقر للتحقق من أنك إنسان/جارٍ التحقق من أنك إنسان، يرجى الانتظار/لقد تحققنا من أنك إنسان، يمكنك المتابعة الآن/حدث خطأ، يرجى المحاولة مرة أخرى", pt: "Sou humano/Verificando.../Você é humano/Erro. Tente novamente./Verifique que você é humano/Solução de problemas/Verificação Cap/Clique para verificar que você é humano/Verificando que você é humano, aguarde/Verificamos que você é humano, você pode continuar/Ocorreu um erro, tente novamente", ru: "Я человек/Проверка.../Вы человек/Ошибка. Повторите./Подтвердите, что вы человек/Устранение неполадок/Проверка Cap/Нажмите, чтобы подтвердить, что вы человек/Проверяем, что вы человек, подождите/Мы подтвердили, что вы человек, можете продолжить/Произошла ошибка, повторите попытку", ja: "私は人間です/確認中.../あなたは人間です/エラー。再試行を。/あなたが人間であることを確認してください/トラブルシューティング/Cap 認証/クリックして人間であることを確認/あなたが人間であることを確認しています。お待ちください/あなたが人間であることを確認しました。続行できます/エラーが発生しました。もう一度お試しください", de: "Ich bin ein Mensch/Wird überprüft.../Sie sind ein Mensch/Fehler. Erneut versuchen./Bitte bestätigen Sie, dass Sie ein Mensch sind/Fehlerbehebung/Cap-Verifizierung/Klicken, um zu bestätigen, dass Sie ein Mensch sind/Überprüfung, ob Sie ein Mensch sind, bitte warten/Wir haben bestätigt, dass Sie ein Mensch sind, Sie können fortfahren/Ein Fehler ist aufgetreten, bitte erneut versuchen", fr: "Je suis humain/Vérification.../Vous êtes humain/Erreur. Réessayez./Veuillez vérifier que vous êtes humain/Dépannage/Vérification Cap/Cliquez pour vérifier que vous êtes humain/Vérification que vous êtes humain, veuillez patienter/Nous avons vérifié que vous êtes humain, vous pouvez continuer/Une erreur s'est produite, veuillez réessayer" };
      function Ce(S, h) {
        let t = (function(r) {
          let c = 2166136261;
          for (let l = 0; l < r.length; l++) c ^= r.charCodeAt(l), c += (c << 1) + (c << 4) + (c << 7) + (c << 8) + (c << 24);
          return c >>> 0;
        })(S), s = "";
        function i() {
          return t ^= t << 13, t ^= t >>> 17, t ^= t << 5, t >>> 0;
        }
        for (; s.length < h; )
          s += i().toString(16).padStart(8, "0");
        return s.substring(0, h);
      }
      let Se = null;
      const Et = ["csp_blocked", "natives_tampered", "env_failed", "script_failed"];
      function Ct(S, h) {
        let t, s, i = !1, r = !1, c = !1, l = null, u = null, a = null;
        const m = new Promise((k) => {
          t = k;
        }), g = { observing: !1, result: null, ready: new Promise((k) => {
          s = k;
        }) }, E = () => {
          var k;
          return (k = a == null ? void 0 : a.contentWindow) == null ? void 0 : k.postMessage({ type: "cap:finalize", nonce: l }, "*");
        }, D = (k) => {
          i || (i = !0, g.result = k, clearTimeout(u), window.removeEventListener("message", I), a == null || a.remove(), s(), t(k));
        }, I = (k) => {
          if (!(a != null && a.contentWindow) || k.source !== a.contentWindow) return;
          const P = k.data;
          if (P && typeof P == "object") if (P.type === "cap:ready") r = !0, l = P.nonce, g.observing = P.observe === !0, s(), c && E();
          else if (P.type === "cap:instr") {
            if (P.early === !0) return;
            D(P.blocked ? { __blocked: !0, blockReason: P.blockReason || "automated_browser" } : P.result || { __timeout: !0 });
          } else P.type === "cap:error" && D({ __error: Et.includes(P.reason) ? P.reason : "script_failed" });
        };
        return g.finalize = () => (i || (c = !0, u ?? (u = setTimeout(() => D({ __timeout: !0 }), 2e4)), r && E()), m), g.stop = () => D({ __timeout: !0 }), window.addEventListener("message", I), (async () => {
          var Q;
          const k = atob(S), P = new Uint8Array(k.length);
          for (let _ = 0; _ < k.length; _++) P[_] = k.charCodeAt(_);
          const L = new TextDecoder().decode(await (async function(_) {
            if (typeof DecompressionStream < "u") try {
              const T = new DecompressionStream("deflate-raw"), R = T.writable.getWriter(), B = T.readable.getReader();
              R.write(_).then(() => R.close()).catch(() => {
              });
              const q = [];
              for (; ; ) {
                const { done: x, value: G } = await B.read();
                if (x) break;
                q.push(G);
              }
              let ce = 0;
              for (const x of q) ce += x.length;
              const p = new Uint8Array(ce);
              let f = 0;
              for (const x of q) p.set(x, f), f += x.length;
              return p;
            } catch {
            }
            return Se || (Se = new Promise((T, R) => {
              const B = window.CAP_PAKO_URL || "https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako_inflate.min.js";
              M.debug(w("instr"), "DecompressionStream unavailable, loading pako from", B);
              const q = document.createElement("script");
              q.src = B;
              const ce = window.CAP_SCRIPT_NONCE || window.CAP_CSS_NONCE;
              ce && q.setAttribute("nonce", ce), q.onload = () => {
                var p;
                (p = window.pako) != null && p.inflateRaw ? T(window.pako) : R(new Error("pako loaded but inflateRaw is missing"));
              }, q.onerror = () => {
                Se = null, R(new Error(`failed to load pako fallback from ${B}`));
              }, document.head.appendChild(q);
            })), (await Se).inflateRaw(_);
          })(P));
          if (i) return;
          const le = window.CAP_ISOLATE === !0;
          a = document.createElement("iframe"), a.setAttribute("sandbox", le ? "allow-scripts" : "allow-scripts allow-same-origin"), a.setAttribute("aria-hidden", "true"), a.setAttribute("tabindex", "-1"), a.style.cssText = "position:absolute;width:1px;height:1px;top:-9999px;left:-9999px;border:none;opacity:0;pointer-events:none;";
          const Z = window.CAP_SCRIPT_NONCE || window.CAP_CSS_NONCE, N = Z ? ` nonce="${String(Z).replace(/"/g, "&quot;")}"` : "";
          a.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script${N}>${L}
<\/script></body></html>`, a.addEventListener("load", () => {
            if (le) return void setTimeout(() => {
              r || i || D({ __error: "csp_blocked" });
            }, 1e3);
            let _ = !0;
            try {
              const T = a.contentDocument;
              _ = !(T != null && T.querySelector("script")) || a.contentWindow.onload !== null;
            } catch {
            }
            _ || setTimeout(() => {
              r || i || D({ __error: "csp_blocked" });
            }, 250);
          }), (((Q = h.host) == null ? void 0 : Q.getClientRects().length) === 0 ? document.documentElement : h).appendChild(a);
        })().catch(() => D({ __timeout: !0 })), g;
      }
      let we = null;
      const St = (() => {
        try {
          return new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0])) instanceof WebAssembly.Module;
        } catch {
          return !1;
        }
      })(), Te = () => {
        if (we) return we;
        const S = window.CAP_CUSTOM_WASM_URL || `https://cdn.jsdelivr.net/npm/@cap.js/wasm@${$}/browser/cap_wasm_bg.wasm`, h = performance.now();
        return M.debug(w("wasm"), "fetching", S), we = fetch(S).then((t) => {
          if (!t.ok) throw new Error(`Failed to fetch wasm: ${t.status}`);
          return t.arrayBuffer();
        }).then((t) => WebAssembly.compile(t)).then((t) => (M.debug(w("wasm"), `ready in ${se(h)}`), t)).catch((t) => {
          throw we = null, M.warn(w("wasm"), `load failed (${se(h)}):`, t.message || t), t;
        }), we;
      };
      let ve = null;
      const ct = () => {
        if (ve) return ve;
        const S = window.CAP_CUSTOM_HASHWX_URL || `https://cdn.jsdelivr.net/npm/@cap.js/wasm@${$}/browser/hashwx.wasm`, h = performance.now();
        return M.debug(w("wasm"), "fetching", S), ve = fetch(S).then((t) => {
          if (!t.ok) throw new Error(`Failed to fetch hashwx wasm: ${t.status}`);
          return t.arrayBuffer();
        }).then((t) => WebAssembly.compile(t)).then((t) => (M.debug(w("wasm"), `hashwx ready in ${se(h)}`), t)).catch((t) => {
          throw ve = null, M.warn(w("wasm"), `hashwx load failed (${se(h)}):`, t.message || t), t;
        }), ve;
      };
      typeof WebAssembly == "object" && typeof WebAssembly.compile == "function" && Te().catch(() => {
      });
      let Ve = null;
      function je() {
        return Ve || (Ve = URL.createObjectURL(new Blob(['(()=>{const e=(e,...t)=>{self.CAP_SILENT||console[e]("[cap worker]",...t)};let t=!1;const n="function"==typeof MessageChannel?new MessageChannel:null,s=()=>new Promise(e=>{if(!n)return setTimeout(e,0);n.port1.onmessage=()=>e(),n.port2.postMessage(0)}),r=async({salt:t,target:n})=>{let s=0;const r=new TextEncoder,o=4*n.length,a=Math.floor(o/8),l=o%8,i=n.length%2==0?n:`${n}0`,c=i.length/2,f=new Uint8Array(c);for(let e=0;e<c;e++)f[e]=parseInt(i.substring(2*e,2*e+2),16);const w=l>0?255<<8-l&255:0;for(;;)try{for(let e=0;e<5e4;e++){const e=t+s,n=r.encode(e),o=await crypto.subtle.digest("SHA-256",n),i=new Uint8Array(o);let c=!0;for(let e=0;e<a;e++)if(i[e]!==f[e]){c=!1;break}if(c&&l>0&&(i[a]&w)!==(f[a]&w)&&(c=!1),c)return void self.postMessage({nonce:s,found:!0});s++}}catch(t){return e("error","fallback solver crashed:",t.message||t),void self.postMessage({found:!1,error:t.message})}},o=e=>{const t=BigInt(`0x${e.N}`);let n=BigInt(`0x${e.x}`);const s=0|e.t,r=Math.max(64,Math.floor(s/50)),o=performance.now();for(let e=0;e<s;e+=r){const o=Math.min(s,e+r);for(let s=e;s<o;s++)n=n*n%t;o<s&&self.postMessage({progress:o/s})}self.postMessage({found:!0,y:n.toString(16),durationMs:(performance.now()-o).toFixed(2)})},a=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),l=(e,t)=>{const n=e.length,s=1+(n+8>>6),r=new Uint8Array(s<<6);r.set(e),r[n]=128;const o=8*n,l=new DataView(r.buffer);l.setUint32(r.length-4,o>>>0,!1),l.setUint32(r.length-8,Math.floor(o/4294967296),!1);let i=1779033703,c=3144134277,f=1013904242,w=2773480762,g=1359893119,d=2600822924,h=528734635,u=1541459225;const m=new Uint32Array(64);for(let e=0;e<s;e++){const t=e<<6;for(let e=0;e<16;e++)m[e]=l.getUint32(t+(e<<2),!1);for(let e=16;e<64;e++){const t=m[e-15],n=m[e-2],s=(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3,r=(n>>>17|n<<15)^(n>>>19|n<<13)^n>>>10;m[e]=m[e-16]+s+m[e-7]+r>>>0}let n=i,s=c,r=f,o=w,b=g,p=d,_=h,y=u;for(let e=0;e<64;e++){const t=y+((b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7))+(b&p^~b&_)+a[e]+m[e]>>>0,l=n&s^n&r^s&r;y=_,_=p,p=b,b=o+t>>>0,o=r,r=s,s=n,n=t+(((n>>>2|n<<30)^(n>>>13|n<<19)^(n>>>22|n<<10))+l>>>0)>>>0}i=i+n>>>0,c=c+s>>>0,f=f+r>>>0,w=w+o>>>0,g=g+b>>>0,d=d+p>>>0,h=h+_>>>0,u=u+y>>>0}const b=new DataView(t.buffer,t.byteOffset,32);b.setUint32(0,i,!1),b.setUint32(4,c,!1),b.setUint32(8,f,!1),b.setUint32(12,w,!1),b.setUint32(16,g,!1),b.setUint32(20,d,!1),b.setUint32(24,h,!1),b.setUint32(28,u,!1)};let i=null;const c=async e=>{const{c:n,d:r,n:o,workerIndex:a,workerCount:c,hashwxModule:f}=e;if(!Number.isInteger(o)||o<1||!Number.isInteger(r)||r<1)throw new Error("malformed hashwx challenge payload");const w=o>>>0,g=((1n<<64n)-1n)/BigInt(r);t=!1;const{w:d,ctx:h,compiled:u,seedPtr:m,regPtr:b,memPtr:p}=(e=>{if(i)return i;const t=new WebAssembly.Instance(e,{}).exports;t._initialize&&t._initialize();let n=!0,s=t.hashwx_alloc(1);if(-1!==s&&0!==s||(n=!1,s=t.hashwx_alloc(0)),s<=0)throw new Error("hashwx_alloc failed");return i={w:t,ctx:s,compiled:n,seedPtr:t.hashwx_seed(s),regPtr:n?t.hashwx_registers(s):0,memPtr:n?t.hashwx_memory(s):0},i})(f),_=new Uint8Array(32);for(let e=0;e<32;e++)_[e]=parseInt(n.slice(2*e,2*e+2),16);const y=new Uint8Array(40);y.set(_,0);const x=new Uint8Array(32),M=performance.now();let U=0,A=M,I=M;try{for(let e=a;;e+=c){let n=e;for(let e=0;e<8;e++)y[32+e]=255&n,n=Math.floor(n/256);l(y,x),new Uint8Array(d.memory.buffer,m,32).set(x),d.hashwx_make(h,m);let r=null;if(u){const e=d.hashwx_module(h),t=d.hashwx_module_size(h),n=new Uint8Array(d.memory.buffer,e,t).slice();r=new WebAssembly.Instance(new WebAssembly.Module(n),{env:{memory:d.memory}}).exports.exec}const o=BigInt(e)*BigInt(w);for(let e=0;e<w;e++){const n=o+BigInt(e);let a;if(u?(d.hashwx_exec_begin(h,n),r(b,p),a=BigInt.asUintN(64,d.hashwx_exec_final(h))):a=BigInt.asUintN(64,d.hashwx_exec(h,n)),U++,a<=g)return void self.postMessage({found:!0,nonce:n.toString(),hashes:U,compiled:u,durationMs:(performance.now()-M).toFixed(2)});if(!(255&U)){const e=performance.now();if(e-A>=16&&(e-I>=150&&(I=e,self.postMessage({progress:U})),await s(),A=performance.now(),t))return self.postMessage({found:!1,error:"stopped"})}}}}catch(e){throw i=null,e}};if("object"!=typeof WebAssembly||"function"!=typeof WebAssembly?.instantiate)return e("warn","WebAssembly unavailable, using JS fallback solver (significantly slower)"),void(self.onmessage=async({data:e})=>{if("stop"!==e?.kind)return"rsw"===e?.kind?o(e):"hashwx"===e?.kind?self.postMessage({found:!1,error:"hashwx requires WebAssembly"}):r({salt:e.salt,target:e.target});t=!0});let f=null;self.onmessage=async({data:n})=>{if("stop"===n?.kind)return void(t=!0);if("rsw"===n?.kind)return o(n);if("hashwx"===n?.kind)try{return await c(n)}catch(t){return e("error","hashwx solver threw:",t.message||t),self.postMessage({found:!1,error:t.message||String(t)})}const{salt:s,target:a,wasmModule:l}=n;if(l instanceof WebAssembly.Module&&null===f){const t=(t=>{try{let e,n=0,s=null;const r=()=>(null!==s&&0!==s.byteLength||(s=new Uint8Array(e.memory.buffer)),s),o=new TextEncoder,a=(e,t,s)=>{if(void 0===s){const s=o.encode(e),a=t(s.length,1)>>>0;return r().subarray(a,a+s.length).set(s),n=s.length,a}let a=e.length,l=t(a,1)>>>0;const i=r();let c=0;for(;c<a;c++){const t=e.charCodeAt(c);if(t>127)break;i[l+c]=t}if(c!==a){0!==c&&(e=e.slice(c));const t=c+3*e.length;l=s(l,a,t,1)>>>0,a=t;const n=r().subarray(l+c,l+a),{written:i}=o.encodeInto(e,n);c+=i,l=s(l,a,c,1)>>>0}return n=c,l},l={wbg:{}};l.wbg.__wbindgen_init_externref_table=()=>{const t=e.__wbindgen_export_0,n=t.grow(4);t.set(0,void 0),t.set(n+0,void 0),t.set(n+1,null),t.set(n+2,!0),t.set(n+3,!1)};const i=new WebAssembly.Instance(t,l);return e=i.exports,e.__wbindgen_start&&e.__wbindgen_start(),f=(t,s)=>{const r=a(t,e.__wbindgen_malloc,e.__wbindgen_realloc),o=n,l=a(s,e.__wbindgen_malloc,e.__wbindgen_realloc),i=n;return BigInt.asUintN(64,e.solve_pow(r,o,l,i))},!0}catch(t){return e("error","wasm init failed:",t.message||t),!1}})(l);if(!t)return e("warn","wasm init failed, falling back to JS solver"),r({salt:s,target:a})}if(null===f)return e("warn","no wasm module provided, falling back to JS solver"),r({salt:s,target:a});try{const e=performance.now(),t=f(s,a),n=performance.now();self.postMessage({nonce:Number(t),found:!0,durationMs:(n-e).toFixed(2)})}catch(t){e("error","solve_pow threw:",t.message||t),self.postMessage({found:!1,error:t.message||String(t)})}},self.onerror=e=>{self.postMessage({found:!1,error:e})}})();'], { type: "application/javascript" })), Ve);
      }
      class de {
        constructor(h) {
          this._size = h, this._workers = [], this._idle = [], this._queue = [], this._wasmModule = null, this._spawnFailures = 0;
        }
        setWasm(h) {
          this._wasmModule = h;
        }
        _spawn() {
          const h = je(), t = new Worker(h);
          return t._busy = !1, this._workers.push(t), this._idle.push(t), t;
        }
        _replaceWorker(h) {
          const t = this._workers.indexOf(h);
          t !== -1 && this._workers.splice(t, 1);
          const s = this._idle.indexOf(h);
          s !== -1 && this._idle.splice(s, 1);
          try {
            h.terminate();
          } catch {
          }
          return this._spawnFailures++, M.warn(w("pool"), `worker died, replacing (attempt ${this._spawnFailures}/3)`), this._spawnFailures > 3 ? (M.error(w("pool"), "worker spawn failed repeatedly, giving up"), null) : this._spawn();
        }
        _ensureSize(h) {
          for (; this._workers.length < h; ) this._spawn();
        }
        run(h, t) {
          return new Promise((s, i) => {
            this._queue.push({ salt: h, target: t, resolve: s, reject: i }), this._dispatch();
          });
        }
        runMsg(h, t) {
          return new Promise((s, i) => {
            this._queue.push({ msg: h, onProgress: t, resolve: s, reject: i }), this._dispatch();
          });
        }
        _dispatch() {
          for (; this._idle.length > 0 && this._queue.length > 0; ) {
            const h = this._idle.shift(), t = this._queue.shift(), { resolve: s, reject: i } = t, r = t.msg !== void 0;
            let c = !1;
            const l = ({ data: a }) => {
              if (!c) {
                if (!a || typeof a.progress != "number" || a.found) c = !0, h.removeEventListener("message", l), h.removeEventListener("error", u), this._spawnFailures = 0, this._idle.push(h), a.found ? s(r ? a : a.nonce) : i(new Error(a.error || "worker failed")), this._dispatch();
                else if (t.onProgress) try {
                  t.onProgress(a.progress);
                } catch {
                }
              }
            }, u = (a) => {
              if (c) return;
              c = !0, h.removeEventListener("message", l), h.removeEventListener("error", u);
              const m = this._replaceWorker(h);
              i(a), m && this._dispatch();
            };
            h.addEventListener("message", l), h.addEventListener("error", u), r ? h.postMessage(t.msg) : this._wasmModule ? h.postMessage({ salt: t.salt, target: t.target, wasmModule: this._wasmModule }, []) : h.postMessage({ salt: t.salt, target: t.target });
          }
        }
        stopAll() {
          for (const h of this._workers) try {
            h.postMessage({ kind: "stop" });
          } catch {
          }
        }
        terminate() {
          const h = this._workers;
          this._workers = [], this._idle = [], this._queue = [];
          for (const t of h) try {
            t.postMessage({ kind: "stop" });
          } catch {
          }
          setTimeout(() => {
            for (const t of h) try {
              t.terminate();
            } catch {
            }
          }, 250);
        }
      }
      class ht extends HTMLElement {
        constructor() {
          super();
          U(this, n);
          U(this, V, null);
          U(this, H, navigator.hardwareConcurrency || 8);
          Ye(this, "token", null);
          U(this, j);
          U(this, C);
          U(this, y);
          U(this, W);
          U(this, O);
          U(this, ie, null);
          U(this, ue, 0);
          U(this, re);
          U(this, ne, !1);
          U(this, K);
          U(this, oe);
          U(this, o, null);
          U(this, J, null);
          U(this, F, null);
          U(this, X, null);
          U(this, pe, null);
          U(this, ae, null);
          U(this, fe, 0);
          U(this, me, !1);
          U(this, ye, () => {
            !document.hidden && e(this, me) && (b(this, me, !1), d(this, n, ke).call(this));
          });
          U(this, Pe, () => {
            if (e(this, C)) {
              try {
                this.scrollIntoView({ behavior: "smooth", block: "center" });
              } catch {
                this.scrollIntoView();
              }
              e(this, C).classList.remove("invalid"), e(this, C).offsetWidth, e(this, C).classList.add("invalid"), setTimeout(() => {
                var t;
                return (t = e(this, C)) == null ? void 0 : t.classList.remove("invalid");
              }, 1500);
            }
          });
          e(this, K) && e(this, K).forEach((t, s) => {
            this.removeEventListener(s.slice(2), t);
          }), b(this, K, /* @__PURE__ */ new Map()), this.boundHandleProgress = this.handleProgress.bind(this), this.boundHandleSolve = this.handleSolve.bind(this), this.boundHandleError = this.handleError.bind(this), this.boundHandleReset = this.handleReset.bind(this);
          try {
            b(this, oe, this.attachInternals());
          } catch {
          }
        }
        getI18nText(t, s) {
          var i;
          return this.getAttribute(`data-cap-i18n-${t}`) || ((i = e(this, pe)) == null ? void 0 : i[t]) || s;
        }
        static get observedAttributes() {
          return ["onsolve", "onprogress", "onreset", "onerror", "data-cap-worker-count", "data-cap-i18n-initial-state", "required"];
        }
        initialize() {
          je(), b(this, ae, new AbortController()), e(this, o) || b(this, o, d(this, n, Ze).call(this)), e(this, F) || (b(this, F, new de(1)), e(this, F)._spawn());
        }
        attributeChangedCallback(t, s, i) {
          var r;
          if (t.startsWith("on")) {
            const c = t.slice(2), l = e(this, K).get(t);
            if (l && this.removeEventListener(c, l), i) {
              const u = (a) => {
                const m = this.getAttribute(t);
                typeof window[m] == "function" && window[m].call(this, a);
              };
              e(this, K).set(t, u), this.addEventListener(c, u);
            }
          }
          t === "data-cap-worker-count" && this.setWorkersCount(parseInt(i, 10)), t === "data-cap-i18n-initial-state" && e(this, C) && ((r = e(this, C)) != null && r.querySelector(".label.active")) && this.animateLabel(this.getI18nText("initial-state", "Verify you're human")), t === "required" && d(this, n, Fe).call(this);
        }
        async connectedCallback() {
          b(this, re, this), this.shadowRoot ? b(this, j, this.shadowRoot) : b(this, j, this.attachShadow({ mode: "open" })), e(this, C) || b(this, C, document.createElement("div")), d(this, n, xt).call(this), this.createUI(), this.addEventListeners(), this.initialize(), e(this, y).removeAttribute("disabled");
          const t = this.getAttribute("data-cap-worker-count"), s = t ? parseInt(t, 10) : null;
          this.setWorkersCount(s || navigator.hardwareConcurrency || 8), e(this, re).innerHTML = `<input type="hidden" name="${e(this, n, nt)}">`, M.debug(w(), `widget ready (workers=${e(this, H)}, haptics=${e(this, n, be)})`), d(this, n, st).call(this), d(this, n, ke).call(this), d(this, n, Fe).call(this), this.addEventListener("invalid", e(this, Pe)), document.addEventListener("visibilitychange", e(this, ye));
        }
        async solve() {
          var c, l, u, a, m;
          if (e(this, ne)) return;
          d(this, n, qe).call(this);
          const t = performance.now();
          b(this, ue, Date.now()), b(this, ie, null);
          let s = null, i = null;
          const r = (c = e(this, ae)) == null ? void 0 : c.signal;
          M.debug(w("solve"), "starting");
          try {
            b(this, ne, !0), this.updateUI("verifying", this.getI18nText("verifying-label", "Verifying..."), !0), e(this, y).setAttribute("aria-label", this.getI18nText("verifying-aria-label", "Verifying you're a human, please wait")), this.dispatchEvent("progress", { progress: 0 });
            try {
              let g, E, D = this.getAttribute("data-cap-api-endpoint");
              if (!D && (window != null && window.CAP_CUSTOM_FETCH)) D = "/";
              else if (!D) throw z("missing_endpoint", "Missing API endpoint. Either custom fetch or an API endpoint must be provided.");
              if (D.endsWith("/") || (D += "/"), e(this, o).state === "done" && e(this, o).token && e(this, o).tokenExpires && Date.now() < e(this, o).tokenExpires) return d(this, n, ot).call(this);
              if (e(this, o).redeemError) throw z("invalid_solution", e(this, o).redeemError);
              if (e(this, o).state === "done") g = e(this, o).results, E = e(this, o).challengeResp, this.dispatchEvent("progress", { progress: 100 });
              else if (e(this, o).state === "solving" || e(this, o).state === "redeeming" || e(this, o).state === "fetching" || e(this, o).state === "waiting") {
                e(this, o).state === "waiting" && (e(this, J) && (clearTimeout(e(this, J)), b(this, J, null)), e(this, o).state = "waiting", d(this, n, rt).call(this)), e(this, o).pendingPromotion = e(this, H), e(this, o).promoteFn && e(this, o).promoteFn(e(this, H));
                const _ = setInterval(() => {
                  if (r != null && r.aborted || !e(this, o)) return void clearInterval(_);
                  const T = e(this, o).state;
                  if (T === "done" || T === "error") return void clearInterval(_);
                  const R = e(this, o).challenges ? e(this, o).challenges.length : 1, B = e(this, o).completedCount, q = T === "redeeming" ? 99 : T === "fetching" || T === "waiting" ? 0 : Math.min(98, Math.round(B / R * 100));
                  this.dispatchEvent("progress", { progress: q });
                }, 150);
                if (await new Promise((T) => e(this, o).onSettled(T)), clearInterval(_), (r == null ? void 0 : r.aborted) || !e(this, o)) return;
                if (e(this, o).state === "idle" && ((l = e(this, o).challengeResp) == null ? void 0 : l.format) === 2 && Array.isArray(e(this, o).challengeResp.challenges)) E = d(this, n, tt).call(this), s = E, g = await this.solveChallengesV2(E.challenges, r, E);
                else {
                  if (e(this, o).state !== "done") throw z("solve_failed", "Unable to solve challenge, self-hosted instance likely down. This is not an issue with Cap.");
                  if (e(this, o).token && e(this, o).tokenExpires && Date.now() < e(this, o).tokenExpires) return d(this, n, ot).call(this);
                  if (e(this, o).redeemError) throw z("invalid_solution", e(this, o).redeemError);
                  g = e(this, o).results, E = e(this, o).challengeResp, this.dispatchEvent("progress", { progress: 100 });
                }
              } else {
                if (e(this, o).challengeResp || await d(this, n, We).call(this, r), (r == null ? void 0 : r.aborted) || !e(this, o)) return;
                if (E = d(this, n, tt).call(this), !E) throw z("network_error", "Failed to fetch challenge");
                if (s = E, E.format === 2 && Array.isArray(E.challenges)) g = await this.solveChallengesV2(E.challenges, r, E);
                else {
                  const { challenge: _, token: T } = E;
                  let R = _;
                  if (!Array.isArray(R)) {
                    let B = 0;
                    R = Array.from({ length: _.c }, () => (B++, [Ce(`${T}${B}`, _.s), Ce(`${T}${B}d`, _.d)]));
                  }
                  g = await this.solveChallenges(R, r);
                }
              }
              s = E;
              const I = E.format === 2, k = I ? null : await d(this, n, et).call(this, E);
              if (r != null && r.aborted || !e(this, o)) return;
              const P = I ? (u = g == null ? void 0 : g.find) == null ? void 0 : u.call(g, (_) => (_ == null ? void 0 : _.error) || (_ == null ? void 0 : _.timeout) || (_ == null ? void 0 : _.blocked)) : null, L = P ? { __error: P.error, __timeout: P.timeout, __blocked: P.blocked } : k != null && k.__timeout || k != null && k.__blocked || k != null && k.__error ? k : null;
              if (L) {
                Ee(`${D}redeem`, { method: "POST", body: JSON.stringify({ token: E.token, solutions: g, ...!I && L.__error && { instr_error: L.__error }, ...!I && L.__blocked && { instr_blocked: !0 }, ...!I && L.__timeout && { instr_timeout: !0 } }), headers: { "Content-Type": "application/json" }, signal: r }).catch(() => {
                });
                const _ = L.__error === "csp_blocked";
                b(this, ie, { instrFailure: { error: L.__error ?? null, blocked: !!L.__blocked, timeout: !!L.__timeout, blockReason: L.blockReason ?? null } }), this.updateUIBlocked(_ ? this.getI18nText("csp-error-label", ((a = e(this, pe)) == null ? void 0 : a["error-label"]) || "Blocked by this page") : this.getI18nText("error-label", "Error"), !0), e(this, y).setAttribute("aria-label", this.getI18nText("error-aria-label", "An error occurred, please try again"));
                const T = L.__error ? `instr_${L.__error}` : L.__blocked ? "instr_blocked" : "instr_timeout", R = _ ? "The page's Content-Security-Policy blocked Cap's instrumentation frame" : L.__error ? `Instrumentation failed (${L.__error})` : L.__blocked ? `Instrumentation blocked (${L.blockReason || "automated_browser"})` : "Instrumentation timed out";
                this.removeEventListener("error", this.boundHandleError);
                const B = new CustomEvent("error", { bubbles: !0, composed: !0, detail: { isCap: !0, code: T, message: R } });
                throw super.dispatchEvent(B), this.addEventListener("error", this.boundHandleError), this.executeAttributeCode("onerror", B), M.error(w("instr"), _ ? `[${T}] ${R}. Set window.CAP_SCRIPT_NONCE to the nonce in your script-src before the widget loads, see https://trycap.dev/guide/widget.html#content-security-policy` : `[${T}] ${R}`), d(this, n, he).call(this), i = z(T, R), i;
              }
              const { token: le } = E, Z = await Ee(`${D}redeem`, { method: "POST", body: JSON.stringify({ token: le, solutions: g, ...k && { instr: k } }), headers: { "Content-Type": "application/json" }, signal: r });
              let N;
              try {
                N = await Z.json();
              } catch {
                throw z("redeem_failed", "Failed to parse server response");
              }
              if (r != null && r.aborted || !e(this, o)) return;
              if (this.dispatchEvent("progress", { progress: 100 }), !N.success) throw b(this, ie, { status: Z.status, reason: N.reason ?? null, error: N.error ?? null, instrError: N.instr_error === !0, blockedBy: N.blockedBy ?? N.flags ?? null }), z("invalid_solution", N.error || "Invalid solution");
              d(this, n, ze).call(this, N.token), this.dispatchEvent("solve", { token: N.token }), this.token = N.token, d(this, n, he).call(this), e(this, V) && clearTimeout(e(this, V));
              const Q = new Date(N.expires).getTime() - Date.now();
              return Q > 0 && Q < 864e5 ? b(this, V, setTimeout(() => this.reset(), Q)) : this.error("Invalid expiration time", "invalid_expires"), e(this, y).setAttribute("aria-label", this.getI18nText("verified-aria-label", "We have verified you're a human, you may now continue")), e(this, n, be) && navigator.vibrate([10, 50, 20, 30, 40]), M.debug(w("solve"), `verified in ${se(t)}`), d(this, n, it).call(this), { success: !0, token: this.token };
            } catch (g) {
              if (r != null && r.aborted || !e(this, o)) return;
              throw g === i || (e(this, y).setAttribute("aria-label", this.getI18nText("error-aria-label", "An error occurred, please try again")), this.error(g.message, g.code || "solve_failed"), d(this, n, he).call(this)), g;
            }
          } finally {
            (m = s == null ? void 0 : s._instr) == null || m.stop(), b(this, ne, !1);
          }
        }
        async solveChallengesV2(t, s, i) {
          const r = i ?? { format: 2, challenges: t }, c = t.length;
          let l = 0;
          const u = new Array(t.length);
          for (let p = 0; p < t.length; p++) {
            const f = t[p];
            if (!f || typeof f != "object" || f.protocol !== "sha256-pow" && f.protocol !== "rsw" && f.protocol !== "hashwx" && f.protocol !== "instrumentation") throw z("challenge_unsupported", `unsupported format-2 protocol '${f == null ? void 0 : f.protocol}'`);
          }
          let a = !1, m = 0;
          for (const p of t) if (p.protocol === "sha256-pow") a = !0;
          else if (p.protocol === "hashwx") {
            m++;
            const { c: f, d: x, n: G } = p.payload ?? {};
            if (typeof f != "string" || !/^[0-9a-f]{64}$/i.test(f) || !Number.isInteger(x) || x < 1 || x > 1e9 || !Number.isInteger(G) || G < 1 || G > 1048576) throw z("challenge_unsupported", "malformed hashwx challenge payload");
          }
          const g = m > 0, E = typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function";
          let D = null;
          if (E && a) try {
            D = await Te();
          } catch (p) {
            M.warn(w("wasm"), "unavailable, falling back to JS solver:", p.message || p);
          }
          let I = null;
          if (g) {
            if (!E) throw z("challenge_unsupported", "hashwx requires WebAssembly");
            I = await ct();
          }
          const k = Math.max(1, Math.min(e(this, H), t.length)), P = new de(k);
          P.setWasm(D), P._ensureSize(k);
          const L = Math.max(1, e(this, H)), le = m > L, Z = le ? 1 : L;
          let N = g ? new de(L) : null;
          N && N._ensureSize(L);
          const Q = async (p) => {
            let f;
            N.stopAll();
            const x = await Promise.race([Promise.allSettled(p).then(() => !0), new Promise((G) => {
              f = setTimeout(() => G(!1), 1e3);
            })]);
            clearTimeout(f), x || (M.warn(w("solve"), "hashwx workers did not stop in time, replacing the pool"), N.terminate(), N = new de(L), N._ensureSize(L));
          }, _ = (p, f) => {
            let x;
            return Promise.race([p, new Promise((G, Je) => {
              x = setTimeout(() => Je(new Error(`[cap] ${f} timed out after 60000ms`)), 6e4);
            })]).finally(() => clearTimeout(x));
          }, T = new Array(t.length).fill(0), R = () => {
            const p = T.reduce((x, G) => x + G, 0) + l, f = Math.min(99, Math.round(p / c * 100));
            this.dispatchEvent("progress", { progress: f });
          }, B = async (p, f) => {
            const { c: x, d: G, n: Je } = p.payload, Tt = Math.max(1, G), dt = new Array(Z).fill(0), Me = [];
            try {
              for (let ee = 0; ee < Z; ee++) {
                const Ie = ee, _e = N.runMsg({ kind: "hashwx", hashwxModule: I, c: x, d: G, n: Je, workerIndex: Ie, workerCount: Z }, (xe) => {
                  dt[Ie] = xe;
                  let Le = 0;
                  for (const Ke of dt) Le += Ke;
                  T[f] = Math.min(0.99, Le / Tt), R();
                });
                _e.catch(() => {
                }), Me.push(_e);
              }
              const ge = await _((Ge = Me, new Promise((ee, Ie) => {
                let _e = Ge.length, xe = null;
                for (const Le of Ge) Le.then(ee, (Ke) => {
                  xe || (xe = Ke), _e--, _e === 0 && Ie(xe);
                });
              })).catch((ee) => {
                throw z("solve_failed", (ee == null ? void 0 : ee.message) || "every hashwx worker failed");
              }), `hashwx worker #${f}`);
              u[f] = { nonce: ge.nonce }, M.debug(w("solve"), `hashwx #${f}: ${ge.hashes} hashes in ${ge.durationMs}ms`, `compiled=${ge.compiled}`), T[f] = 0, l++, R();
            } catch (ge) {
              throw await Q(Me), ge;
            }
            var Ge;
            return Me;
          }, q = [];
          t.forEach((p, f) => {
            p.protocol === "hashwx" && q.push({ ch: p, idx: f });
          });
          const ce = q.length ? le ? Promise.all(q.map((p) => B(p.ch, p.idx))) : (async () => {
            for (let p = 0; p < q.length; p++) {
              const f = await B(q[p].ch, q[p].idx);
              p < q.length - 1 && await Q(f);
            }
          })() : null;
          try {
            await lt(Promise.all([ce, ...t.map((p, f) => p.protocol === "sha256-pow" ? _(P.run(p.payload.salt, p.payload.target), `sha256-pow worker #${f}`).then((x) => {
              u[f] = { nonce: Number(x) }, T[f] = 0, l++, R();
            }) : p.protocol === "rsw" ? _(P.runMsg({ kind: "rsw", N: p.payload.N, x: p.payload.x, t: 0 | p.payload.t }, (x) => {
              T[f] = x, R();
            }), `rsw worker #${f}`).then((x) => {
              u[f] = { y: x.y }, T[f] = 0, l++, R();
            }) : p.protocol === "hashwx" ? null : d(this, n, et).call(this, r).then((x) => {
              u[f] = x != null && x.__error ? { error: x.__error } : x != null && x.__timeout ? { timeout: !0 } : x != null && x.__blocked ? { blocked: !0 } : { instr: x }, T[f] = 0, l++, R();
            }))]), s);
          } finally {
            P.terminate(), N && N.terminate();
          }
          return u;
        }
        async solveChallenges(t, s) {
          const i = t.length;
          let r = 0, c = null;
          const l = typeof WebAssembly == "object" && typeof WebAssembly.instantiate == "function";
          if (l) try {
            c = await Te();
          } catch (m) {
            M.warn(w("wasm"), "unavailable, falling back to JS solver:", m.message || m);
          }
          if (!l && (M.warn(w("wasm"), "WebAssembly disabled in this browser, solver will be ~10x slower"), !e(this, j).querySelector(".warning"))) {
            const m = document.createElement("div");
            m.className = "warning", m.style.cssText = "width:var(--cap-widget-width,230px);background:rgb(237,56,46);color:white;padding:4px 6px;padding-bottom:calc(var(--cap-border-radius,14px) + 5px);font-size:10px;box-sizing:border-box;font-family:system-ui;border-top-left-radius:8px;border-top-right-radius:8px;text-align:center;user-select:none;margin-bottom:-35.5px;opacity:0;transition:margin-bottom .3s,opacity .3s;", m.innerText = this.getI18nText("wasm-disabled", "Enable WASM for significantly faster solving"), e(this, j).insertBefore(m, e(this, j).firstChild), setTimeout(() => {
              m.style.marginBottom = "calc(-1 * var(--cap-border-radius, 14px))", m.style.opacity = 1;
            }, 10);
          }
          const u = new de(e(this, H));
          u.setWasm(c), u._ensureSize(e(this, H));
          const a = [];
          try {
            for (let m = 0; m < t.length; m += e(this, H)) {
              const g = t.slice(m, Math.min(m + e(this, H), t.length)), E = await lt(Promise.all(g.map(([D, I]) => u.run(D, I).then((k) => {
                r++;
                const P = Math.min(99, Math.round((0 + r) / i * 100));
                return this.dispatchEvent("progress", { progress: P }), k;
              }))), s);
              a.push(...E);
            }
          } finally {
            u.terminate();
          }
          return a;
        }
        setWorkersCount(t) {
          const s = parseInt(t, 10), i = Math.min(navigator.hardwareConcurrency || 8, 16);
          b(this, H, !Number.isNaN(s) && s > 0 && s <= i ? s : navigator.hardwareConcurrency || 8);
        }
        createUI() {
          e(this, C).classList.add("captcha"), e(this, C).setAttribute("role", "group"), e(this, C).setAttribute("aria-label", this.getI18nText("group-aria-label", "Cap verification")), b(this, y, document.createElement("div")), e(this, y).className = "captcha-trigger", e(this, y).setAttribute("part", "trigger"), e(this, y).setAttribute("role", "button"), e(this, y).setAttribute("tabindex", "0"), e(this, y).setAttribute("aria-label", this.getI18nText("verify-aria-label", "Click to verify you're a human")), e(this, y).setAttribute("aria-live", "polite"), e(this, y).setAttribute("disabled", "true"), e(this, y).innerHTML = `<div class="checkbox" part="checkbox" aria-hidden="true"><svg class="progress-ring" viewBox="0 0 32 32" aria-hidden="true"><circle class="progress-ring-bg" cx="16" cy="16" r="14"></circle><circle class="progress-ring-circle" cx="16" cy="16" r="14"></circle></svg></div><p part="label" class="label-wrapper"><span class="label active">${this.getI18nText("initial-state", "Verify you're human")}</span></p>`, e(this, C).appendChild(e(this, y)), b(this, O, document.createElement("a")), e(this, O).className = "cap-troubleshoot-link", e(this, O).setAttribute("part", "troubleshoot"), e(this, O).setAttribute("target", "_blank"), e(this, O).setAttribute("rel", "noopener"), e(this, O).hidden = !0, e(this, C).appendChild(e(this, O)), b(this, W, document.createElement("a")), e(this, W).className = "credits", e(this, W).setAttribute("aria-label", "Secured by Cap"), e(this, W).setAttribute("href", "https://trycap.dev"), e(this, W).setAttribute("target", "_blank"), e(this, W).setAttribute("title", "Secured by Cap: The self-hosted CAPTCHA for the modern web."), e(this, W).textContent = "Cap", e(this, C).appendChild(e(this, W)), e(this, j).innerHTML = `<style${window.CAP_CSS_NONCE ? ` nonce=${window.CAP_CSS_NONCE}` : ""}>:host{display:inline-block}@media (prefers-reduced-motion:reduce){.captcha,.captcha *{transition:none!important;animation:none!important}.label{filter:none!important;opacity:1!important;transition:none!important;transform:none!important}.label:not(.active),.label.exit{display:none!important}}.captcha,.captcha *{box-sizing:border-box}.captcha{width:var(--cap-widget-width,260px);height:var(--cap-widget-height,58px);background-color:var(--cap-background,#fdfdfd);border:1px solid var(--cap-border-color,#dddddd8f);border-radius:var(--cap-border-radius,14px);-webkit-user-select:none;user-select:none;cursor:pointer;-webkit-tap-highlight-color:#fff0;color:var(--cap-color,#212121);font-family:var(--cap-font,system, -apple-system, "BlinkMacSystemFont", ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", "Ubuntu", "arial", sans-serif);transition:filter .2s,transform .2s,height .2s;display:inline-block;position:relative;overflow:hidden}.captcha.has-troubleshoot{height:calc(var(--cap-widget-height,58px) + 26px)}.captcha.has-troubleshoot .captcha-trigger{inset-block-end:26px}.captcha:not([data-state]):active{transform:scale(.97)}.captcha:hover{filter:brightness(98%)}.captcha-trigger{padding:var(--cap-widget-padding,14px);align-items:center;gap:var(--cap-gap,15px);border-radius:inherit;transition:inset .2s;display:flex;position:absolute;inset:0}.captcha-trigger:focus-visible{outline:2px solid var(--cap-focus-ring,#06c);outline-offset:-3px}.checkbox{width:var(--cap-checkbox-size,25px);height:var(--cap-checkbox-size,25px);border:var(--cap-checkbox-border,1px solid #aaaaaad1);border-radius:var(--cap-checkbox-border-radius,6px);background-color:var(--cap-checkbox-background,#fafafa91);margin-top:var(--cap-checkbox-margin,2px);margin-bottom:var(--cap-checkbox-margin,2px);flex-shrink:0;transition:opacity .2s}.captcha p{-webkit-user-select:none;user-select:none;margin:0;font-size:15px;font-weight:500}.label-wrapper{flex:1;align-items:center;min-width:0;height:2em;display:flex;position:relative;overflow:hidden}.label-wrapper:before,.label-wrapper:after{content:"";pointer-events:none;z-index:1;width:100%;height:.6em;position:absolute;inset-inline-start:0}.label-wrapper:before{background:linear-gradient(to bottom, var(--cap-background,#fdfdfd), transparent);top:0}.label-wrapper:after{background:linear-gradient(to top, var(--cap-background,#fdfdfd), transparent);bottom:0}.label{white-space:nowrap;opacity:0;filter:blur(2px);transition:transform .5s cubic-bezier(.25,1,.5,1),opacity .5s,filter .5s;position:absolute;transform:translateY(100%)}.label.active{opacity:1;filter:none;transform:translateY(0)}.label.exit{opacity:0;filter:blur(2px);transform:translateY(-100%)}.checkbox .progress-ring{width:100%;height:100%;display:none;transform:rotate(-90deg)}.checkbox .progress-ring-bg{fill:none;stroke:var(--cap-spinner-background-color,#eee);stroke-width:var(--cap-spinner-thickness,3)}.checkbox .progress-ring-circle{fill:none;stroke:var(--cap-spinner-color,#000);stroke-width:var(--cap-spinner-thickness,3);stroke-linecap:round;stroke-dasharray:87.96;stroke-dashoffset:87.96px;transition:stroke-dashoffset .3s}.captcha[data-state=verifying] .checkbox{background:0 0;border:none;border-radius:50%;justify-content:center;align-items:center;display:flex;transform:scale(1.1)}.captcha[data-state=verifying] .checkbox .progress-ring{display:block}.captcha[data-state=done] .checkbox{background-image:var(--cap-checkmark,url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E%40keyframes%20anim%7B0%25%7Bstroke-dashoffset%3A23.21320343017578px%7Dto%7Bstroke-dashoffset%3A0%7D%7D%3C%2Fstyle%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%2300a67d%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m5%2012%205%205L20%207%22%20style%3D%22stroke-dashoffset%3A0%3Bstroke-dasharray%3A23.21320343017578px%3Banimation%3Aanim%20.5s%20ease%22%2F%3E%3C%2Fsvg%3E));background-size:cover;border:1px solid #0000}.captcha[data-state=done] .checkbox .progress-ring{display:none}.captcha[data-state=error] .checkbox{background-image:var(--cap-error-cross,url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24'%3E%3Cpath fill='%23f55b50' d='M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8'/%3E%3C%2Fsvg%3E"));background-size:cover;border:1px solid #0000}.captcha[data-state=error] .checkbox .progress-ring{display:none}.captcha.invalid{border-color:var(--cap-invalid-border-color,#f55b50);box-shadow:0 0 0 3px var(--cap-invalid-ring-color,#f55b5033);animation:.5s cubic-bezier(.36,.07,.19,.97) cap-shake}@keyframes cap-shake{10%,90%{transform:translate(-1px)}20%,80%{transform:translate(2px)}30%,50%,70%{transform:translate(-4px)}40%,60%{transform:translate(4px)}}@media (prefers-reduced-motion:reduce){.captcha.invalid{animation:none!important}}.captcha-trigger[disabled]{cursor:not-allowed}.captcha[data-state=verifying] .captcha-trigger{cursor:progress}.captcha[data-state=done] .captcha-trigger{cursor:default}.credits{color:var(--cap-color,#212121);text-underline-offset:.18em;z-index:2;border-radius:4px;align-items:center;padding:3px 4px;line-height:1;text-decoration:underline;text-decoration-thickness:.08em;position:absolute;inset-block-end:6.5px;inset-inline-end:6px;opacity:.8!important;font-size:12px!important;display:inline-flex!important}.captcha .credits{visibility:visible!important;pointer-events:all!important;display:inline-flex!important}.credits:focus-visible{outline:2px solid var(--cap-focus-ring,#06c);outline-offset:2px;opacity:1!important}.cap-troubleshoot-link{min-width:24px;min-height:24px;color:var(--cap-troubleshoot-color,#0050a0);text-underline-offset:.15em;cursor:pointer;z-index:2;border-radius:4px;align-items:center;padding:4px 6px;font-size:13px;font-weight:500;text-decoration:underline;text-decoration-thickness:.08em;display:inline-flex;position:absolute;inset-block-end:4px;inset-inline-start:14px}.cap-troubleshoot-link[hidden]{display:none}.cap-troubleshoot-link:hover{opacity:.85}.cap-troubleshoot-link:focus-visible{outline:2px solid var(--cap-focus-ring,#06c);outline-offset:2px}@media (forced-colors:active){.captcha,.checkbox{border-color:canvastext}:is(.captcha-trigger:focus-visible,.credits:focus-visible,.cap-troubleshoot-link:focus-visible){outline-color:highlight}.progress-ring-bg{stroke:graytext}.progress-ring-circle{stroke:canvastext}.captcha.invalid{box-shadow:none;border-color:mark}.credits{opacity:1!important}}</style>`, e(this, j).appendChild(e(this, C)), d(this, n, qe).call(this), setTimeout(() => d(this, n, qe).call(this), 100);
        }
        addEventListeners() {
          e(this, y) && (e(this, W).addEventListener("click", (t) => {
            t.preventDefault(), window.open(`https://trycap.dev/?${new URLSearchParams({ utm_source: "cap_widget", utm_medium: "referral", utm_campaign: "widget", utm_content: window.CAP_DISABLE_WIDGET_REF ? "" : location.hostname, ref: window.CAP_DISABLE_WIDGET_REF ? "" : location.href || "", sub: window.CAP_DISABLE_WIDGET_REF ? "" : document.referrer || "" }).toString()}`, "_blank");
          }), e(this, y).addEventListener("click", () => {
            e(this, y).hasAttribute("disabled") || this.solve().catch(() => {
            });
          }), e(this, y).addEventListener("mousedown", () => {
            !e(this, y).hasAttribute("disabled") && e(this, n, be) && navigator.vibrate(5);
          }), e(this, y).addEventListener("keydown", (t) => {
            t.target === e(this, y) && (t.key !== "Enter" && t.key !== " " || e(this, y).hasAttribute("disabled") || (t.preventDefault(), t.stopPropagation(), this.solve().catch(() => {
            })));
          }), this.addEventListener("progress", this.boundHandleProgress), this.addEventListener("solve", this.boundHandleSolve), this.addEventListener("error", this.boundHandleError), this.addEventListener("reset", this.boundHandleReset));
        }
        animateLabel(t) {
          var c;
          if (!e(this, y)) return;
          const s = e(this, y).querySelector(".label-wrapper");
          if (!s) return;
          if ((c = window.matchMedia) != null && c.call(window, "(prefers-reduced-motion: reduce)").matches) {
            const l = s.querySelector(".label.active");
            if (l) l.textContent = t;
            else {
              const u = document.createElement("span");
              u.className = "label active", u.textContent = t, s.appendChild(u);
            }
            return;
          }
          const i = s.querySelector(".label.active"), r = document.createElement("span");
          r.className = "label", r.textContent = t, s.appendChild(r), r.offsetWidth, r.classList.add("active"), i && (i.classList.remove("active"), i.classList.add("exit"), i.addEventListener("transitionend", () => i.remove(), { once: !0 }));
        }
        updateUI(t, s, i = !1) {
          e(this, C) && e(this, y) && (e(this, C).setAttribute("data-state", t), e(this, C).classList.remove("has-troubleshoot"), this.animateLabel(s), e(this, O) && (e(this, O).hidden = !0), i ? e(this, y).setAttribute("disabled", "true") : e(this, y).removeAttribute("disabled"));
        }
        updateUIBlocked(t, s = !1) {
          e(this, C) && e(this, y) && (e(this, C).setAttribute("data-state", "error"), e(this, y).removeAttribute("disabled"), this.animateLabel(t), e(this, O) && (s ? (e(this, O).setAttribute("href", d(this, n, at).call(this)), e(this, O).textContent = this.getI18nText("troubleshooting-label", "Troubleshoot"), e(this, O).hidden = !1, e(this, C).classList.add("has-troubleshoot")) : (e(this, O).hidden = !0, e(this, C).classList.remove("has-troubleshoot"))));
        }
        handleProgress(t) {
          if (!e(this, y)) return;
          const s = e(this, y).querySelector(".progress-ring-circle");
          if (s) {
            const r = 2 * Math.PI * 14, c = r - t.detail.progress / 100 * r;
            s.style.strokeDashoffset = c;
          }
          const i = e(this, y).querySelector(".label-wrapper");
          if (i) {
            const r = i.querySelector(".label.active");
            r && (r.textContent = `${this.getI18nText("verifying-label", "Verifying...")}`);
          }
          this.executeAttributeCode("onprogress", t);
        }
        handleSolve(t) {
          var s, i, r;
          this.updateUI("done", this.getI18nText("solved-label", "You're a human"), !0), this.executeAttributeCode("onsolve", t), (i = (s = e(this, oe)) == null ? void 0 : s.setValidity) == null || i.call(s, {}), (r = e(this, C)) == null || r.classList.remove("invalid");
        }
        handleError(t) {
          var s, i, r;
          this.updateUI("error", this.getI18nText("error-label", "Error. Try again.")), ((s = t == null ? void 0 : t.detail) == null ? void 0 : s.code) === "invalid_solution" && ((i = e(this, ie)) != null && i.reason) && e(this, O) && (e(this, O).setAttribute("href", d(this, n, at).call(this, { code: t.detail.code, message: t.detail.message })), e(this, O).textContent = this.getI18nText("troubleshooting-label", "Troubleshoot"), e(this, O).hidden = !1, (r = e(this, C)) == null || r.classList.add("has-troubleshoot")), this.executeAttributeCode("onerror", t), e(this, n, be) && navigator.vibrate([10, 40, 10]);
        }
        handleReset(t) {
          this.updateUI("", this.getI18nText("initial-state", "I'm a human")), this.executeAttributeCode("onreset", t), d(this, n, Fe).call(this);
        }
        executeAttributeCode(t, s) {
          const i = this.getAttribute(t);
          i && (M.warn(w(), "inline `onxxx='…'` handlers are deprecated. use `addEventListener` callbacks instead."), new Function("event", i).call(this, s));
        }
        error(t = "Unknown error", s = "unknown") {
          M.error(w("solve"), `[${s}] ${t}`), this.dispatchEvent("error", { isCap: !0, code: s, message: t });
        }
        dispatchEvent(t, s = {}) {
          const i = new CustomEvent(t, { bubbles: !0, composed: !0, detail: s });
          super.dispatchEvent(i);
        }
        reset() {
          e(this, V) && (clearTimeout(e(this, V)), b(this, V, null)), e(this, J) && (clearTimeout(e(this, J)), b(this, J, null)), e(this, o) && d(this, n, he).call(this), this.token = null, this.dispatchEvent("reset"), d(this, n, ze).call(this, "");
        }
        get tokenValue() {
          return this.token;
        }
        disconnectedCallback() {
          var t;
          (t = e(this, ae)) == null || t.abort(), document.removeEventListener("visibilitychange", e(this, ye)), this.removeEventListener("progress", this.boundHandleProgress), this.removeEventListener("solve", this.boundHandleSolve), this.removeEventListener("error", this.boundHandleError), this.removeEventListener("reset", this.boundHandleReset), e(this, K).forEach((s, i) => {
            this.removeEventListener(i.slice(2), s);
          }), e(this, K).clear(), e(this, j) && (e(this, j).innerHTML = ""), this.reset(), this.cleanup();
        }
        cleanup() {
          e(this, V) && (clearTimeout(e(this, V)), b(this, V, null)), d(this, n, De).call(this), e(this, J) && (clearTimeout(e(this, J)), b(this, J, null)), e(this, F) && (e(this, F).terminate(), b(this, F, null)), e(this, o) && (d(this, n, Qe).call(this, e(this, o)), e(this, o).state = "error", e(this, o).notify(), b(this, o, null));
        }
      }
      V = new WeakMap(), H = new WeakMap(), j = new WeakMap(), C = new WeakMap(), y = new WeakMap(), W = new WeakMap(), O = new WeakMap(), ie = new WeakMap(), ue = new WeakMap(), re = new WeakMap(), ne = new WeakMap(), K = new WeakMap(), oe = new WeakMap(), o = new WeakMap(), J = new WeakMap(), F = new WeakMap(), X = new WeakMap(), pe = new WeakMap(), ae = new WeakMap(), fe = new WeakMap(), me = new WeakMap(), n = new WeakSet(), be = function() {
        return te && !window.CAP_DISABLE_HAPTICS && !this.hasAttribute("data-cap-disable-haptics");
      }, Ze = function() {
        return { state: "idle", challengeResp: null, challenges: null, results: [], completedCount: 0, solvePromise: null, promoteFn: null, _listeners: [], pendingPromotion: null, token: null, tokenExpires: null, fetchP: null, refreshTimer: null, redeemError: null, notify() {
          for (const t of this._listeners) t();
          this._listeners = [];
        }, onSettled(t) {
          this.state === "done" || this.state === "error" ? t() : this._listeners.push(t);
        } };
      }, he = function() {
        d(this, n, Qe).call(this, e(this, o)), b(this, o, d(this, n, Ze).call(this)), d(this, n, st).call(this);
      }, Qe = function(t) {
        var s, i;
        t && (clearTimeout(t.refreshTimer), (i = (s = t.challengeResp) == null ? void 0 : s._instr) == null || i.stop());
      }, Ne = function() {
        let t = this.getAttribute("data-cap-api-endpoint");
        return !t && (window != null && window.CAP_CUSTOM_FETCH) && (t = "/"), t ? t.endsWith("/") ? t : `${t}/` : null;
      }, bt = function(t) {
        var s, i;
        return (t == null ? void 0 : t.format) === 2 && Array.isArray(t.challenges) ? ((i = (s = t.challenges.find((r) => (r == null ? void 0 : r.protocol) === "instrumentation")) == null ? void 0 : s.payload) == null ? void 0 : i.blob) ?? null : (t == null ? void 0 : t.instrumentation) ?? null;
      }, Re = function(t) {
        var i;
        const s = d(this, n, bt).call(this, t);
        return s && e(this, j) ? (t._instr && !((i = t._instr.result) != null && i.__timeout) || (t._instr = Ct(s, e(this, j))), t._instr) : null;
      }, et = function(t) {
        const s = d(this, n, Re).call(this, t);
        return s ? s.finalize() : Promise.resolve(null);
      }, We = function(t) {
        const s = e(this, o);
        if (!s) return Promise.reject(z("aborted", "aborted"));
        if (s.fetchP) return s.fetchP;
        const i = d(this, n, Ne).call(this);
        if (!i) return Promise.reject(z("missing_endpoint", "Missing API endpoint. Either custom fetch or an API endpoint must be provided."));
        const r = (async () => {
          var u;
          const c = await Ee(`${i}challenge${St ? "" : "?wasm=0"}`, { method: "POST", signal: t ?? ((u = e(this, ae)) == null ? void 0 : u.signal) });
          let l;
          try {
            l = await c.json();
          } catch {
            throw z("challenge_parse_error", "Failed to parse challenge response from server");
          }
          if (l.error) throw z("network_error", l.error);
          return l._apiEndpoint = i, e(this, o) !== s || (s.challengeResp = l, d(this, n, Re).call(this, l), d(this, n, wt).call(this, s, l)), l;
        })();
        return s.fetchP = r, r.catch(() => {
          s.fetchP === r && (s.fetchP = null);
        }), r;
      }, wt = function(t, s) {
        var l, u;
        clearTimeout(t.refreshTimer);
        let i = Number.NaN;
        try {
          const a = JSON.parse(atob(s.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
          i = Math.min(a.exp, Number(s.expires) || a.exp) - a.iat;
        } catch {
        }
        i > 0 || (i = Number(s.expires) - Date.now()), i > 6e4 && i < 864e5 || (i = 3e5);
        const r = s.format === 2 && ((u = (l = s.challenges) == null ? void 0 : l.some) == null ? void 0 : u.call(l, (a) => (a == null ? void 0 : a.protocol) === "hashwx")), c = Math.min(i / 2, Math.max(r ? 12e4 : 3e4, i * (r ? 0.3 : 0.15)));
        t.refreshTimer = setTimeout(() => {
          e(this, o) !== t || e(this, ne) || t.token || t.challengeResp === s && (t.state !== "idle" && t.state !== "done" || (d(this, n, he).call(this), e(this, fe) >= 6 || (document.hidden ? b(this, me, !0) : (pt(this, fe)._++, d(this, n, ke).call(this)))));
        }, i - c);
      }, tt = function() {
        const t = e(this, o), s = t.challengeResp;
        return t.challengeResp = null, t.fetchP = null, clearTimeout(t.refreshTimer), s;
      }, ke = function() {
        const t = e(this, o);
        !t || t.challengeResp || t.fetchP || d(this, n, Ne).call(this) && d(this, n, Oe).call(this) && d(this, n, We).call(this).catch(() => {
        });
      }, De = function() {
        e(this, X) && (window.removeEventListener("mousemove", e(this, X)), window.removeEventListener("touchstart", e(this, X)), window.removeEventListener("keydown", e(this, X)), b(this, X, null));
      }, st = function() {
        d(this, n, De).call(this);
        const t = () => {
          d(this, n, De).call(this), b(this, fe, 0), d(this, n, vt).call(this);
        };
        b(this, X, t), window.addEventListener("mousemove", t, { passive: !0 }), window.addEventListener("touchstart", t, { passive: !0 }), window.addEventListener("keydown", t, { passive: !0 });
      }, Oe = function() {
        return typeof this.checkVisibility == "function" ? this.checkVisibility({ checkOpacity: !0, checkVisibilityCSS: !0 }) : !!(this.offsetParent || this.getClientRects().length > 0);
      }, it = function() {
        d(this, n, Oe).call(this) || M.info(w("challenges"), "solved invisible challenge");
      }, vt = function() {
        d(this, n, ke).call(this), e(this, o).state === "idle" && d(this, n, Oe).call(this) && (e(this, o).state = "waiting", b(this, J, setTimeout(() => {
          d(this, n, rt).call(this);
        }, 2500)));
      }, rt = async function() {
        const t = e(this, o);
        if ((t == null ? void 0 : t.state) === "waiting") if (t.state = "fetching", t._t0 = performance.now(), d(this, n, Ne).call(this)) try {
          const s = await d(this, n, We).call(this);
          if (e(this, o) !== t) return;
          if (s.format === 2 && Array.isArray(s.challenges)) return s.challenges.some((l) => (l == null ? void 0 : l.protocol) === "hashwx") && ct().catch(() => {
          }), t.state = "idle", void t.notify();
          const { challenge: i, token: r } = s;
          let c = i;
          if (!Array.isArray(c)) {
            let l = 0;
            c = Array.from({ length: i.c }, () => (l++, [Ce(`${r}${l}`, i.s), Ce(`${r}${l}d`, i.d)]));
          }
          t.challenges = c, t.state = "solving", t.solvePromise = d(this, n, yt).call(this, c, t).catch(() => {
            e(this, o) === t && (t.state = "error", t.notify());
          });
        } catch {
          if (e(this, o) !== t) return;
          t.state = "error", t.notify();
        }
        else t.state = "idle";
      }, yt = async function(t, s) {
        je();
        let i = null;
        try {
          i = await Te();
        } catch {
        }
        if (e(this, o) !== s) return [];
        e(this, F) || (b(this, F, new de(1)), e(this, F)._spawn()), e(this, F).setWasm(i);
        const r = t.length, c = new Array(r);
        let l = 1, u = !1;
        s.promoteFn = (m) => {
          !u && e(this, F) && (u = !0, l = m, e(this, F)._size = m, e(this, F)._ensureSize(m));
        }, s.pendingPromotion !== null && (s.promoteFn(s.pendingPromotion), s.pendingPromotion = null);
        let a = 0;
        for (; a < r; ) {
          if (e(this, o) !== s || !e(this, F)) return c;
          const m = l, g = [], E = [];
          for (let I = 0; I < m && a < r; I++) E.push(a), g.push(t[a]), a++;
          e(this, F)._ensureSize(Math.max(l, m));
          const D = await Promise.all(g.map((I) => e(this, F).run(I[0], I[1]).then((k) => (s.completedCount++, k))));
          for (let I = 0; I < E.length; I++) c[E[I]] = D[I];
          !u && a < r && await new Promise((I) => setTimeout(I, 120));
        }
        return e(this, o) !== s || (s.results = c, s.state = "redeeming", d(this, n, _t).call(this, c, s)), c;
      }, _t = async function(t, s) {
        var r;
        let i = !1;
        try {
          if (e(this, o) !== s) return;
          const c = s.challengeResp, l = c._apiEndpoint;
          if (!l) throw z("missing_endpoint", "speculative redeem: missing apiEndpoint");
          const u = d(this, n, Re).call(this, c);
          if (u && (await Promise.race([u.ready, new Promise((E) => setTimeout(E, 5e3))]), e(this, o) !== s)) return;
          if (u != null && u.observing) return s.state = "done", void s.notify();
          let a = null;
          if (u) {
            if (a = await u.finalize(), e(this, o) !== s) return;
            if (a != null && a.__timeout || a != null && a.__blocked || a != null && a.__error) return s.state = "done", void s.notify();
          }
          const m = await Ee(`${l}redeem`, { method: "POST", body: JSON.stringify({ token: c.token, solutions: t, ...a && { instr: a } }), headers: { "Content-Type": "application/json" }, signal: (r = e(this, ae)) == null ? void 0 : r.signal });
          let g;
          i = !0;
          try {
            g = await m.json();
          } catch {
            throw new Error("Failed to parse server response");
          }
          if (e(this, o) !== s) return;
          if (!g.success) throw new Error(g.error || "Invalid solution");
          s.token = g.token, s.tokenExpires = new Date(g.expires).getTime(), s.state = "done", s._invisibleElapsed = s._t0 ? se(s._t0) : "?", s.notify();
        } catch (c) {
          if (e(this, o) !== s) return;
          i && (s.redeemError = (c == null ? void 0 : c.message) || "Invalid solution"), s.state = "done", s.notify();
        }
      }, nt = function() {
        return this.getAttribute("data-cap-hidden-field-name") || "cap-token";
      }, ze = function(t) {
        const s = this.querySelector(`input[name='${e(this, n, nt)}']`);
        s && (s.value = t);
      }, ot = function() {
        M.debug(w("solve"), `served from speculative cache (saved ${e(this, o)._invisibleElapsed || "?"})`), this.dispatchEvent("progress", { progress: 100 }), d(this, n, ze).call(this, e(this, o).token), this.dispatchEvent("solve", { token: e(this, o).token }), this.token = e(this, o).token;
        const t = e(this, o).tokenExpires - Date.now();
        return e(this, V) && clearTimeout(e(this, V)), b(this, V, setTimeout(() => this.reset(), t)), e(this, y).setAttribute("aria-label", this.getI18nText("verified-aria-label", "We have verified you're a human, you may now continue")), e(this, n, be) && navigator.vibrate([10, 50, 20, 30, 40]), d(this, n, it).call(this), d(this, n, he).call(this), b(this, ne, !1), { success: !0, token: this.token };
      }, xt = function() {
        b(this, pe, (function(t) {
          const s = t ? [t] : navigator.languages || [navigator.language || ""];
          for (let i of s) {
            if (!i) continue;
            if (i = i.toLowerCase(), i === "en" || i.startsWith("en-")) return null;
            const r = Be[i] ? i : Be[i.split("-")[0]] ? i.split("-")[0] : null;
            if (!r) return null;
            const c = Be[r].split("/"), l = {};
            return At.forEach((u, a) => {
              l[u] = c[a];
            }), l;
          }
          return null;
        })(window.CAP_LANG || this.getAttribute("data-cap-lang")));
      }, Fe = function() {
        var t;
        (t = e(this, oe)) != null && t.setValidity && (this.hasAttribute("required") && !this.token ? e(this, oe).setValidity({ valueMissing: !0 }, this.getI18nText("required-label", "Please verify you're human"), e(this, C) || this) : e(this, oe).setValidity({}));
      }, ye = new WeakMap(), Pe = new WeakMap(), kt = function() {
        if (!e(this, re)) return !1;
        const t = e(this, re).getBoundingClientRect();
        if (t.width === 0 && t.height === 0) return !0;
        const s = window.getComputedStyle(e(this, re));
        return s.display === "none" || s.visibility === "hidden";
      }, qe = function() {
        e(this, W) && e(this, C) && !d(this, n, kt).call(this) && (e(this, W).isConnected && e(this, W).parentNode === e(this, C) || e(this, C).appendChild(e(this, W)), e(this, W).textContent && e(this, W).textContent.trim() || (e(this, W).textContent = "Cap"), e(this, W).getAttribute("href") !== "https://trycap.dev" && e(this, W).setAttribute("href", "https://trycap.dev"), e(this, W).style.cssText = ["display: inline-flex !important", "visibility: visible !important", "opacity: 0.8 !important", "pointer-events: all !important", "font-size: 12px !important", "transform: none !important", "clip-path: none !important", "filter: none !important", "position: absolute !important"].join("; "));
      }, at = function(t = {}) {
        const s = this.getAttribute("data-cap-troubleshooting-url") || "https://trycap.dev/guide/troubleshooting/instrumentation.html";
        if (this.hasAttribute("data-cap-troubleshooting-url")) return s;
        const i = {};
        for (const u of this.attributes) (u.name.startsWith("data-cap-") || u.name === "id" || u.name === "class") && (i[u.name] = u.value.slice(0, 200));
        let r = this.getAttribute("data-cap-api-endpoint") || "";
        try {
          r = new URL(r, location.href).href;
        } catch {
        }
        const c = navigator, l = { v: "0.1.63", from: location.href, title: document.title.slice(0, 200), referrer: document.referrer, endpoint: r, attrs: i, server: e(this, ie), solveMs: e(this, ue) ? Date.now() - e(this, ue) : null, at: (/* @__PURE__ */ new Date()).toISOString(), framed: window.top !== window, customFetch: typeof window.CAP_CUSTOM_FETCH == "function", isolate: !!window.CAP_ISOLATE, nonce: !!window.CAP_SCRIPT_NONCE, pageLang: document.documentElement.lang || null, ua: c.userAgent, languages: c.languages, webdriver: c.webdriver, cores: c.hardwareConcurrency, memory: c.deviceMemory ?? null, screen: [screen.width, screen.height, devicePixelRatio], viewport: [innerWidth, innerHeight], tz: Intl.DateTimeFormat().resolvedOptions().timeZone, ...t };
        try {
          let u = JSON.stringify(l);
          u.length > 6e3 && (l.from = l.from.slice(0, 2e3), l.referrer = l.referrer.slice(0, 1e3), u = JSON.stringify(l).slice(0, 6e3));
          const a = new TextEncoder().encode(u);
          let m = "";
          for (const g of a) m += String.fromCharCode(g);
          return `${s}#r=${btoa(m).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
        } catch {
          return s;
        }
      }, Ye(ht, "formAssociated", !0);
      class He {
        constructor(h = {}, t) {
          const s = t || document.createElement("cap-widget");
          if (Object.entries(h).forEach(([i, r]) => {
            s.setAttribute(i, r);
          }), !h.apiEndpoint && !(window != null && window.CAP_CUSTOM_FETCH)) throw s.remove(), new Error("Missing API endpoint. Either custom fetch or an API endpoint must be provided.");
          h.apiEndpoint && s.setAttribute("data-cap-api-endpoint", h.apiEndpoint), t || s.hasAttribute("data-cap-disable-haptics") || s.setAttribute("data-cap-disable-haptics", ""), this.widget = s, this.solve = this.widget.solve.bind(this.widget), this.reset = this.widget.reset.bind(this.widget), this.addEventListener = this.widget.addEventListener.bind(this.widget), Object.defineProperty(this, "token", { get: () => s.token, configurable: !0, enumerable: !0 }), t || (s.style.display = "none", document.documentElement.appendChild(s));
        }
      }
      window.Cap = He, customElements.get("cap-widget") || window != null && window.CAP_DONT_SKIP_REDEFINE ? customElements.get("cap-widget") && M.warn(w(), "cap-widget custom element already defined, skipping re-define. set window.CAP_DONT_SKIP_REDEFINE = true to override") : customElements.define("cap-widget", ht), A.exports = He, v.default = He;
    })();
  })(Ue, Ue.exports)), Ue.exports;
}
It();
const Lt = "input[data-mai-captcha-token]";
function $t(A) {
  const v = A.form, $ = A.dataset.endpoint;
  if (!v || !$ || v.dataset.maiCaptchaBound === "1")
    return;
  v.dataset.maiCaptchaBound = "1";
  const te = new window.Cap({ apiEndpoint: $ });
  let Y = null;
  const Ae = () => (Y === null && (v.dataset.maiCaptchaState = "solving", Y = te.solve().then(({ token: w }) => (A.value = w, v.dataset.maiCaptchaState = "solved", w)).catch((w) => (Y = null, v.dataset.maiCaptchaState = "failed", console.error("Captcha:", (w == null ? void 0 : w.code) ?? "", (w == null ? void 0 : w.message) ?? w), ""))), Y);
  ["focusin", "pointerdown", "keydown"].forEach((w) => {
    v.addEventListener(w, Ae, { once: !0, passive: !0 });
  });
  let M = !1;
  v.addEventListener("submit", (w) => {
    if (M || A.value !== "")
      return;
    w.preventDefault();
    const se = w.submitter;
    Ae().then(() => {
      M = !0, v.requestSubmit(se ?? void 0);
    });
  });
}
function mt() {
  document.querySelectorAll(Lt).forEach($t);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", mt) : mt();
