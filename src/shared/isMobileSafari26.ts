export function isMobileSafari26() {
  const ua = navigator.userAgent;
  const mobile = /iPhone|iPad|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return mobile && /Version\/26(?:\.|\s)/.test(ua) && /Safari\//.test(ua) &&
    !/(?:CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo)\//.test(ua);
}
