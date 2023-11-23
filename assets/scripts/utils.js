export function setCookie(name, value) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 13);

  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

export function deleteWrongCookie(name) {
  const domain = location.hostname.split('.').splice(-2).join('.');

  document.cookie = `${name}=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
}

export function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
  console.debug('gtag', ...arguments);
}
