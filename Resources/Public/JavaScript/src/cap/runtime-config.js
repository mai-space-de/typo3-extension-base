// Must be evaluated before the widget: it starts fetching its WebAssembly module as
// soon as it is loaded, and falls back to cdn.jsdelivr.net unless these overrides exist.
// The server renders the URL of the local copies into the token field.
const assetBase = document.querySelector('input[data-mai-captcha-token]')?.dataset.assets;

if (assetBase) {
  window.CAP_CUSTOM_WASM_URL = `${assetBase}cap_wasm_bg.wasm`;
  window.CAP_CUSTOM_HASHWX_URL = `${assetBase}hashwx.wasm`;
  window.CAP_PAKO_URL = `${assetBase}pako_inflate.min.js`;
}
