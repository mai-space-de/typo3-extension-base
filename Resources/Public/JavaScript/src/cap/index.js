// Invisible Cap.js captcha, bundled locally so no visitor request reaches a CDN.
// Import order matters: the runtime config has to run before the widget.
import './runtime-config.js';
// The widget is an IIFE that registers window.Cap and the <cap-widget> element.
import '@cap.js/widget/cap.min.js';

const TOKEN_SELECTOR = 'input[data-mai-captcha-token]';

/**
 * Solves the challenge in the background as soon as the visitor touches the form
 * and writes the token into the hidden field. The form is only held back on submit
 * when the solution is still pending.
 */
function bind(tokenField) {
  const form = tokenField.form;
  const endpoint = tokenField.dataset.endpoint;
  if (!form || !endpoint || form.dataset.maiCaptchaBound === '1') {
    return;
  }
  form.dataset.maiCaptchaBound = '1';

  const cap = new window.Cap({ apiEndpoint: endpoint });
  let pending = null;

  const solve = () => {
    if (pending === null) {
      form.dataset.maiCaptchaState = 'solving';
      pending = cap
        .solve()
        .then(({ token }) => {
          tokenField.value = token;
          form.dataset.maiCaptchaState = 'solved';
          return token;
        })
        .catch((error) => {
          pending = null;
          form.dataset.maiCaptchaState = 'failed';
          console.error('Captcha:', error?.code ?? '', error?.message ?? error);
          return '';
        });
    }

    return pending;
  };

  ['focusin', 'pointerdown', 'keydown'].forEach((type) => {
    form.addEventListener(type, solve, { once: true, passive: true });
  });

  let released = false;

  form.addEventListener('submit', (event) => {
    if (released || tokenField.value !== '') {
      return;
    }

    event.preventDefault();
    const submitter = event.submitter;
    solve().then(() => {
      // Submit even without a token after a failed solve: the server answers with a
      // visible error instead of the form silently doing nothing.
      released = true;
      form.requestSubmit(submitter ?? undefined);
    });
  });
}

function init() {
  document.querySelectorAll(TOKEN_SELECTOR).forEach(bind);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
