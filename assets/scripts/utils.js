export function setCookie(name, value) {
  const domain = location.hostname.split('.').splice(-2).join('.')

  const expires = new Date();
  expires.setMonth(expires.getMonth() + 13);

  document.cookie = `${name}=${value}; domain=${domain}; path=/; SameSite=None; Secure; expires=${expires.toUTCString()}`;
}

export function getCookie(cookie) {
  for (const item of document.cookie.split(';')) {
    const [name, value] = item.split('=');
    if (name?.trim() === cookie) {
      return value;
    }
  }
  return null;
}
