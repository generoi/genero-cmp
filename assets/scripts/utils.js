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

export function getAllCookies() {
  const cookies = document.cookie.split(';')
    .map(cookie => cookie.trim())
    .map(cookie => cookie.split(';')[0].split('=')[0]);

    return cookies;
}

export function removeCookie(cookie) {
  const expires = new Date(0).toUTCString();
  const domains = window.location.hostname.split('.')
    .map((part, idx, parts) => parts.slice(idx).join('.'));

  const paths = window.location.pathname.split('/')
    .map((part, idx, parts) => parts.slice(0, idx + 1).join('/') || '/');

  for (const domain of domains) {
    for (const path of paths) {
      const cookieRemovalString = `${encodeURIComponent(cookie)}=; expires=${expires}; domain=${domain}; path=${path}`
      document.cookie = cookieRemovalString;
    }
  }
}

export function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
  console.debug('gtag', ...arguments);
}
