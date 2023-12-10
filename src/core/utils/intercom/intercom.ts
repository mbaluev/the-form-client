/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-expressions */

export const APP_ID = 'i08j8mhz';

export const load = () => {
  (function () {
    const w = window;
    const ic = w.Intercom;

    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', w.intercomSettings);
    } else {
      const d = document;
      const i: {
        (): void;
        q: any[];
        c(args: any): void;
      } = function () {
        i.c(arguments);
      };

      i.q = [];
      i.c = function (args: any) {
        i.q?.push(args);
      };
      w.Intercom = i;

      const l = function () {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + APP_ID;
        const x = d.getElementsByTagName('script')[0];
        x.parentNode?.insertBefore(s, x);
      };

      if (document.readyState === 'complete') l();
      else if (w.attachEvent) w.attachEvent('onload', l);
      else w.addEventListener('load', l, false);
    }
  })();
};

export const boot = (options = {}) => {
  window &&
    window.Intercom &&
    window.Intercom('boot', {
      app_id: APP_ID,
      api_base: 'https://api-iam.intercom.io',
      ...options,
    });
};

export const update = () => {
  window && window.Intercom && window.Intercom('update');
};
